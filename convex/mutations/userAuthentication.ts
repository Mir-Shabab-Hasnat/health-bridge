"use server";

import { genSaltSync, hashSync } from 'bcrypt-ts';
import { ConvexError, v } from 'convex/values';

import { mutation } from '../_generated/server';

export const authenticate = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.username.length < 6) {
      throw new ConvexError({
        message: "Username is too short",
        serverUsernameError: true,
        serverPasswordError: false,
      });
    }

    if (args.password.length < 8) {
      throw new ConvexError({
        message: "Password must be at least 8 characters.",
        serverUsernameError: false,
        serverPasswordError: true,
      });
    }

    const existingUser = await ctx.db
      .query("user")
      .withIndex("by_username")
      .filter((q) => q.eq(q.field("username"), args.username))
      .first();

    if (existingUser) {
      return existingUser._id, existingUser.isDoctor;
    }

    const salt = genSaltSync(10);
    const hash = hashSync(args.password, salt);

    const userId = await ctx.db.insert("user", {
      hash: hash,
      isDoctor: false,
      username: args.username,
    });

    if (!userId) {
      throw new ConvexError({
        message: "Server side error creating user account.",
        serverUsernameError: false,
        serverPasswordError: false,
      });
    }

    return [userId as string, false];
  },
});
