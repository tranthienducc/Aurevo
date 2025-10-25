import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  subscriptions: defineTable({
    clerkId: v.string(),
    polarCustomerId: v.string(),
    polarSubscriptionId: v.string(),
    productId: v.optional(v.string()),
    priceId: v.optional(v.string()),
    planCode: v.optional(v.string()),
    status: v.string(),
    currentPeriodEnd: v.optional(v.number()),
    trialEndsAt: v.optional(v.number()),
    cancelAt: v.optional(v.number()),
    canceledAt: v.optional(v.number()),
    seats: v.optional(v.number()),
    metadata: v.optional(v.any()),
    creditsBalance: v.number(),
    creditGrantPerPeriod: v.number(),
    creditRolloverLimit: v.number(),
    lastGrantCursor: v.optional(v.string()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_polarSubscriptionId", ["polarSubscriptionId"])
    .index("by_status", ["status"]),
  credits_ledger: defineTable({
    clerkId: v.id("users"),
    subscriptionId: v.id("subscriptions"),
    amount: v.number(),
    type: v.string(),
    reason: v.optional(v.string()),
    idempotencyKey: v.optional(v.string()),
    meta: v.optional(v.any()),
  })
    .index("by_subscriptionId", ["subscriptionId"])
    .index("by_clerk_id", ["clerkId"])
    .index("by_idempotencyKey", ["idempotencyKey"]),
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.string(),
  }).index("by_clerk_id", ["clerkId"]),
  projects: defineTable({
    clerkId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    styleGuide: v.optional(v.string()),
    sketchesData: v.any(),
    viewportData: v.optional(v.any()),
    generatedDesignData: v.optional(v.any()),
    thumbnail: v.optional(v.string()),
    moodBoardImages: v.optional(v.array(v.id("_storage"))),
    inspirationImages: v.optional(v.array(v.string())),
    lastModified: v.number(),
    createdAt: v.number(),
    isPublic: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())),
    projectNumber: v.number(),
  }).index("by_clerk_id", ["clerkId"]),
  project_counters: defineTable({
    clerkId: v.string(),
    nextProjectNumber: v.number(),
  }).index("by_clerk_id", ["clerkId"]),
});
