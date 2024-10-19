"use server";

import { ConvexError } from 'convex/values';

import { query } from '../_generated/server';

export const getAllAppointments = query({
  handler: async (ctx) => {
    const appointments = await ctx.db.query("appointment");

    if (!appointments) {
      throw new ConvexError({
        message: "Server side error fetching appointments.",
      });
    }

    return appointments;
  },
});
