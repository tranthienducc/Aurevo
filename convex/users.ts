import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const storeUser = mutation({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Check user đã có chưa
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!existingUser) {
      await ctx.db.insert("users", {
        clerkId: identity.subject,
        email: identity.email ?? "",
        name: identity.name ?? "",
        imageUrl: identity.pictureUrl ?? "",
      });
    }
  },
});

// 👉 Query user hiện tại
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log("Identity:", identity);
    if (!identity) {
      console.error("Không tìm thấy identity, người dùng chưa xác thực");
      return null;
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    console.log("User found:", user);
    return user;
  },
});
