"use server";

import { ConvexError, v } from 'convex/values';

import { Id } from '../_generated/dataModel';
import { mutation } from '../_generated/server';

export const insertAppointment = mutation({
  args: {
    issue: v.string(),
    medication: v.string(),
    others: v.string(),
    severity: v.number(),
    symptoms: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.severity < 0) {
      throw new ConvexError({
        message: "Severity was not determined.",
      });
    }

    // TODO get the user's id from the cookie
    const userId = "jd75yrfk7hhrfgsrkg4y4dj6f572zbj7" as Id<"user">;

    // In a deployed environment, we would NOT do this based on an id cookie
    // We would store the hash and re-authenticate them here
    const user = await ctx.db.get(userId);

    if (!user) {
      throw new ConvexError({
        message: "User does not exist, cannot create appointment.",
      });
    }

    const appointmentId = await ctx.db.insert("appointment", {
      doctor: "" as Id<"user">,
      end: "",
      issue: args.issue,
      medication: args.medication,
      others: args.others,
      patient: userId,
      severity: args.severity,
      start: "",
      symptoms: args.symptoms,
    });

    return typeof appointmentId !== "undefined";
  },
});
