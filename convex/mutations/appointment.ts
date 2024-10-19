"use server";

import { ConvexError, v } from "convex/values";
import { z } from "zod";

import { mutation } from "../_generated/server";

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

export const updateAppointment = mutation({
  args: {
    appointmentId: v.id("appointment"),
    doctor: v.id("user"),
    end: v.string(),
    issue: v.optional(v.string()),
    medication: v.optional(v.string()),
    others: v.optional(v.string()),
    severity: v.optional(v.number()),
    start: v.string(),
    symptoms: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Set up validation code to ensure iso8601 time
    const iso8601Schema = z.string().refine(
      (date) => {
        return !isNaN(Date.parse(date));
      },
      {
        message: "Invalid ISO8601 date format",
      }
    );
    function validateISO8601(date: string) {
      const result = iso8601Schema.safeParse(date);
      return result.success;
    }

    // Doctor + End + Start needs to be set for the appointment to be created
    if (!validateISO8601(args.start) || !validateISO8601(args.end)) {
      throw new ConvexError({
        message: "Invalid start or end time, cannot update appointment.",
      });
    }

    // In a deployed (to the web) environment, we would NOT do this based on an id cookie
    // We would store the hash and re-authenticate them here
    const doctor = await ctx.db.get(args.doctor);

    // Make sure we're creating an appointment for an existing user
    if (!doctor) {
      throw new ConvexError({
        message: "Doctor does not exist, cannot update appointment.",
      });
    }

    // Patch the appointment
    await ctx.db.patch(args.appointmentId, {
      doctor: args.doctor,
      end: args.end,
      start: args.start,
      ...(args.issue ? { issue: args.issue } : {}),
      ...(args.medication ? { medication: args.medication } : {}),
      ...(args.others ? { others: args.others } : {}),
      ...(args.severity !== undefined ? { severity: args.severity } : {}),
      ...(args.symptoms ? { symptoms: args.symptoms } : {}),
    });

    return true;
  },
});
