"use server";

import { v } from "convex/values";

import { mutation } from "../_generated/server";

export const createPatientData = mutation({
  args: {
    dob: v.string(),
    healthcard: v.number(),
    name: v.string(),
    phone: v.number(),
    userId: v.id("user"),
  },
  handler: async (ctx, args) => {
    // This gets the QueryInitializer
    const userData = await ctx.db
      .query("patientData")
      .withIndex("by_user")
      .filter((q) => q.eq(q.field("user"), args.userId))
      .first();

    // If the user's patient data doesn't exist, create it
    if (!userData) {
      await ctx.db.insert("patientData", {
        dob: args.dob,
        healthcard: args.healthcard,
        name: args.name,
        phone: args.phone,
        user: args.userId,
      });
      return true;
    } else {
      // Update the user's patient data when applicable
      await ctx.db.patch(userData._id, {
        dob: args.dob,
        healthcard: args.healthcard,
        name: args.name,
        phone: args.phone,
        user: args.userId,
      });
      return true;
    }
  },
});
