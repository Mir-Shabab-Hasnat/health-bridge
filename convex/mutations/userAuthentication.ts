"use server";

import { genSaltSync, hashSync } from 'bcrypt-ts';
import { ConvexError, v } from 'convex/values';
import { mutation } from '../_generated/server';


export const registerUser = mutation({
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
      throw new ConvexError({
        message: "Username already in use. Please choose another one.",
        serverUsernameError: true,
        serverPasswordError: false,
      });
    }

    const salt = genSaltSync(10);
    const hash = hashSync(args.password, salt);

    // TODO remove this disable line when we implement handling the userId
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userId = await ctx.db.insert("user", {
      hash: hash,
      isDoctor: false,
      username: args.username,
    });

        return { userId };
  },
});
