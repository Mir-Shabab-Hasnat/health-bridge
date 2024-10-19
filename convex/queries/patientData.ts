"use server";

import { ConvexError, v } from "convex/values";

import { query } from "../_generated/server";

export const getPatientData = query({
  args: {
    userId: v.id("user"),
  },
  handler: async (ctx, args) => {
    // This gets the QueryInitializer
    const userData = await ctx.db
      .query("patientData")
      .withIndex("by_user")
      .filter((q) => q.eq(q.field("user"), args.userId))
      .first();

    if (!userData) {
      throw new ConvexError({
        message: "Server side error fetching patient data.",
      });
    }

    return userData;
  },
});
