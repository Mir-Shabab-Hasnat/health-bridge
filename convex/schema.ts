import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  user: defineTable({
    isDoctor: v.boolean(),
    hash: v.string(),
    username: v.string(),
  }).index("by_username", ["username"]),

  patientData: defineTable({
    dob: v.string(),
    healthcard: v.number(),
    name: v.string(),
    phone: v.number(),
    user: v.id("user"),
  }).index("by_user", ["user"]),

  appointment: defineTable({
    doctor: v.id("user"),
    end: v.string(),
    issue: v.string(),
    medication: v.string(),
    others: v.string(),
    patient: v.id("user"),
    severity: v.number(),
    start: v.string(),
    symptoms: v.string(),
  })
    .index("by_patient", ["patient"])
    .index("by_doctor", ["doctor"]),
});
