"use server";

import { ConvexError, v } from 'convex/values';

import { mutation } from '../_generated/server';

export const createAppointment = mutation({
  args: {
    issue: v.string(),
    medication: v.string(),
    others: v.string(),
    severity: v.number(),
    symptoms: v.string(),
    userId: v.id("user"),
  },
  handler: async (ctx, args) => {
    // Severity needs to be set for the appointment to be created
    if (args.severity < 0) {
      throw new ConvexError({
        message: "Severity was not determined.",
      });
    }

    // In a deployed (to the web) environment, we would NOT do this based on an id cookie
    // We would store the hash and re-authenticate them here
    const user = await ctx.db.get(args.userId);

    // Make sure we're creating an appointment for an existing user
    if (!user) {
      throw new ConvexError({
        message: "User does not exist, cannot create appointment.",
      });
    }

    // Insert the appointment into the table, and get the id
    const appointmentId = await ctx.db.insert("appointment", {
      doctor: args.userId, // Set the "doctor" arbitrarily to the user, and update later
      end: "",
      issue: args.issue,
      medication: args.medication,
      others: args.others,
      patient: args.userId,
      severity: args.severity,
      start: "",
      symptoms: args.symptoms,
      status: "pending",
    });

    return typeof appointmentId !== "undefined";
  },
});
