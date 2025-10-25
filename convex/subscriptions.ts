import { v } from "convex/values";
import { query } from "./_generated/server";

export const hasEntitlement = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const now = Date.now();
    for await (const sub of ctx.db
      .query("subscriptions")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))) {
      const status = String(sub.status || "").toLowerCase();
      const periodOk =
        sub.currentPeriodEnd == null || sub.currentPeriodEnd > now;
      if (status === "active" && periodOk) return true;
    }
  },
});
