"use server";

import { compare } from 'bcrypt-ts';
import { ConvexError, v } from 'convex/values';

import { mutation } from '../_generated/server';

export const loginUser = mutation({
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

    if (!existingUser) {
      throw new ConvexError({
        message: "Username does not exist. Please register your account.",
        serverUsernameError: true,
        serverPasswordError: false,
      });
    }

    compare(args.password, existingUser.hash).then((correctPassword) => {
      if (correctPassword) {
        return true;
      }
    });

    // TODO: cookie cheking

    // Login did not succeed
    return false;
  },
});
