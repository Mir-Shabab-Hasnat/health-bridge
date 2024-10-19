"use server";

import { ConvexError, v } from "convex/values";

import { query } from "../_generated/server";

export const getExhaustiveAppointmentInfo = query({
  args: {
    doctorId: v.id("user"),
    appointmentId: v.id("appointment"),
  },
  handler: async (ctx, args) => {
    const appointmentData = await ctx.db
      .query("appointment")
      .withIndex("by_id")
      .filter((q) => q.eq(q.field("_id"), args.appointmentId))
      .first();

    const patientData = await ctx.db
      .query("patientData")
      .withIndex("by_user")
      .filter((q) => q.eq(q.field("user"), appointmentData?.patient))
      .first();

    if (!appointmentData || !patientData) {
      throw new ConvexError({
        message: "Server side error fetching patient + assignment data.",
      });
    }

    return [patientData, appointmentData];
  },
});
