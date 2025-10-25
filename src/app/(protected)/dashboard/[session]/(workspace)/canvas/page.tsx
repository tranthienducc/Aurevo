import InfiniteCanvas from "@/components/canvas";
import ProjectsProvider from "@/components/list/provider";
import ProjectProvider from "@/components/project/provider";
import { ProjectQuery } from "@/convex/query.config";
import React from "react";

type CanvasPageProps = {
  searchParams: Promise<{ project?: string }>;
};
const Page = async ({ searchParams }: CanvasPageProps) => {
  const params = await searchParams;
  const projectId = params.project;

  if (!projectId) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No project selected</p>
      </div>
    );
  }

  const { profile, projects } = await ProjectQuery(projectId);
  if (!profile) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Authenticated required</p>
      </div>
    );
  }

  if (!projects) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500">Project not found or access denied</p>
      </div>
    );
  }
  return (
    <ProjectProvider initialProject={projects}>
      <InfiniteCanvas />
    </ProjectProvider>
  );
};

export default Page;
