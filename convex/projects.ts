import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getProjects = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const project = await ctx.db.get(projectId);

    if (!project) throw new Error("Project not found");
    if (project.clerkId !== userId && !project.isPublic) {
      throw new Error("Access denied");
    }
    return project;
  },
});

export const createProject = mutation({
  args: {
    clerkId: v.id("users"),
    name: v.optional(v.string()),
    sketchesData: v.any(),
    thumbnail: v.optional(v.string()),
  },
  handler: async (ctx, { clerkId, name, sketchesData, thumbnail }) => {
    console.log("[Convex] Creating project for user:", clerkId);
    const projectNumber = await getNextProjectNumber(ctx.db, clerkId);
    const projectName = name || `Project ${projectNumber}`;

    const projectId = await ctx.db.insert("projects", {
      clerkId,
      name: projectName,
      sketchesData,
      thumbnail,
      projectNumber,
      lastModified: Date.now(),
      createdAt: Date.now(),
      isPublic: false,
    });

    console.log("✅ Project created:", {
      projectId,
      name: projectName,
      projectNumber,
    });

    return {
      projectId,
      name: projectName,
      projectNumber,
    };
  },
});

import { DatabaseWriter } from "./_generated/server";

async function getNextProjectNumber(
  ctx: DatabaseWriter,
  clerkId: string
): Promise<number> {
  const counter = await ctx
    .query("project_counters")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
    .first();

  if (!counter) {
    await ctx.insert("project_counters", {
      clerkId,
      nextProjectNumber: 2,
    });
    return 1;
  }

  const projectNumber = counter.nextProjectNumber;

  await ctx.patch(counter._id, {
    nextProjectNumber: projectNumber + 1,
  });
  return projectNumber;
}

export const getUserProjects = query({
  args: { clerkId: v.string(), limit: v.optional(v.number()) }, // dùng v.string()
  handler: async (ctx, { clerkId, limit = 20 }) => {
    const allProjects = await ctx.db
      .query("projects")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .order("desc")
      .collect();

    return allProjects.slice(0, limit).map((project) => ({
      _id: project._id,
      name: project.name,
      projectNumber: project.projectNumber,
      thumbnail: project.thumbnail,
      lastModified: project.lastModified,
      createdAt: project.createdAt,
      isPublic: project.isPublic,
    }));
  },
});

export const getProjectsStyleGuide = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    const userId = await getAuthUserId(ctx);

    // if (!userId) throw new Error("Not authenticated");
    const project = await ctx.db.get(projectId);
    if (!project) throw new Error("Project not found");

    console.log("userid-in project- style guide", userId);
    if (project.clerkId !== userId && !project.isPublic) {
      throw new Error("Access denied");
    }

    return project.styleGuide ? JSON.parse(project.styleGuide) : null;
  },
});
