import { preloadQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { ConvexUserRaw, normalizeProfile } from "@/types/users";
import { Id } from "../../convex/_generated/dataModel";
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";

export async function ProfileQuery() {
  const { getToken } = await auth();
  const token = await getToken({ template: "convex" }); // phải có template "convex"

  const queryResult = await fetchQuery(
    api.users.getCurrentUser,
    {},
    { token: token ?? undefined }
  );

  console.log("query-result", queryResult);
  return queryResult;
}

export const SubscriptionEntitlementQuery = async () => {
  const rawProfile = await ProfileQuery();

  if (!rawProfile) {
    console.error("rawProfile is null");
    return { entitlement: null, profileName: null };
  }
  const profile = normalizeProfile(rawProfile as ConvexUserRaw | null);
  console.log("profile", rawProfile);
  const entitlement = await preloadQuery(
    api.subscriptions.hasEntitlement,
    {
      clerkId: profile?.id as string,
    },
    { token: await convexAuthNextjsToken() }
  );
  return { entitlement, profileName: profile?.name };
};

export const ProjectsQuery = async () => {
  const rawProfile = await ProfileQuery();
  const profile = normalizeProfile(rawProfile as ConvexUserRaw | null);

  if (!profile?.id) {
    return { projects: null, profile: null };
  }
  const projects = await preloadQuery(
    api.projects.getUserProjects,
    { clerkId: profile.clerkId }, // profile.id = Clerk userId string
    { token: await convexAuthNextjsToken() }
  );
  console.log("projects-in-query-config", projects);

  return { profile, projects };
};
export const ProjectQuery = async (projectId: string) => {
  const rawProfile = await ProfileQuery();
  const profile = normalizeProfile(rawProfile as ConvexUserRaw | null);

  if (!profile?.id) {
    return { projects: null, profile: null };
  }
  const projects = await preloadQuery(
    api.projects.getUserProjects,
    { clerkId: projectId as Id<"projects"> }, // profile.id = Clerk userId string
    { token: await convexAuthNextjsToken() }
  );

  return { profile, projects };
};

export const StyleGuideQuery = async (projectId: string) => {
  const styleGuide = await preloadQuery(
    api.projects.getProjectsStyleGuide,
    { projectId: projectId as Id<"projects"> },
    { token: await convexAuthNextjsToken() }
  );

  return { styleGuide };
};

export const MoodbroardImagesQuery = async (projectId: string) => {
  const images = await preloadQuery(
    api.moodbroard.getMoodBroardImages,
    { projectId: projectId as Id<"projects"> },
    { token: await convexAuthNextjsToken() }
  );
  console.log("moodebard-query-img", images);

  return { images };
};
