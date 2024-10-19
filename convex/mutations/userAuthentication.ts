"use server";

import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import { ConvexError, v } from "convex/values";

import { mutation } from "../_generated/server";

export const authenticate = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Throw an error for too short usernames
    if (args.username.length < 6) {
      throw new ConvexError({
        message: "Username is too short",
        serverUsernameError: true,
        serverPasswordError: false,
      });
    }

    // Throw an error for too short passwords
    if (args.password.length < 8) {
      throw new ConvexError({
        message: "Password must be at least 8 characters.",
        serverUsernameError: false,
        serverPasswordError: true,
      });
    }

    // Check to see if a user exists (login vs. register)
    const existingUser = await ctx.db
      .query("user")
      .withIndex("by_username")
      .filter((q) => q.eq(q.field("username"), args.username))
      .first();

    // Attempt to log this user in
    if (existingUser) {
      // Check their password against their hash
      if (compareSync(args.password, existingUser.hash)) {
        return [existingUser._id, existingUser.isDoctor];
      } else {
        // Their password is incorrect, so don't log them in
        throw new ConvexError({
          message: "Incorrect username or password.",
          serverUsernameError: true,
          serverPasswordError: true,
        });
      }
    }

    // Hash up the password for a registration
    const salt = genSaltSync(10);
    const hash = hashSync(args.password, salt);

    // Put the user in the table, record their id
    const userId = await ctx.db.insert("user", {
      hash: hash,
      isDoctor: false,
      username: args.username,
    });

    // No userId denotes an error with talking to Convex
    if (!userId) {
      throw new ConvexError({
        message: "Server side error creating user account.",
        serverUsernameError: false,
        serverPasswordError: false,
      });
    }

    // The user was successfully registered, now log them in
    return [userId as string, false];
  },
});
