"use server";

import { ConvexError, v } from "convex/values";

import { query } from "../_generated/server";

export const getAllAppointments = query({
  handler: async (ctx) => {
    // This gets the QueryInitializer
    const allAppointments = await ctx.db.query("appointment");

    // Stop if nothing was received
    if (!allAppointments) {
      throw new ConvexError({
        message: "Server side error fetching appointments.",
      });
    }

    // Use .collect() to send an array that can be used directly with .map()
    return allAppointments.collect();
  },
});

export const getPatientAppointments = query({
  args: {
    userId: v.id("user"),
  },
  handler: async (ctx, args) => {
    // This gets the QueryInitializer
    const userAppointments = await ctx.db
      .query("appointment")
      .filter((q) => q.eq(q.field("patient"), args.userId));

    // Stop if nothing was received
    if (!userAppointments) {
      throw new ConvexError({
        message: "Server side error fetching appointments.",
      });
    }

    // Use .collect() to send an array that can be used directly with .map()
    return userAppointments.collect();
  },
});
