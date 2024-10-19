"use server";

import { ConvexError, v } from 'convex/values';

import { query } from '../_generated/server';

export const getAllAppointments = query({
  handler: async (ctx) => {
    const allAppointments = await ctx.db.query("appointment");

    if (!allAppointments) {
      throw new ConvexError({
        message: "Server side error fetching appointments.",
      });
    }

    return allAppointments.collect();
  },
});

export const getPatientAppointments = query({
  args: {
    userId: v.id("user"),
  },
  handler: async (ctx, args) => {
    const userAppointments = await ctx.db
      .query("appointment")
      .filter((q) => q.eq(q.field("patient"), args.userId));

    if (!userAppointments) {
      throw new ConvexError({
        message: "Server side error fetching appointments.",
      });
    }

    return userAppointments;
  },
});
