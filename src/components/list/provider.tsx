"use client";
import { fetchProjectsSuccess } from "@/redux/slices/projects";
import { useAppDispatch } from "@/redux/store";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  initialProjects: any;
};

const ProjectsProvider = ({ children, initialProjects }: Props) => {
  const dispatch = useAppDispatch();
  console.log("initialProjects", initialProjects);

  useEffect(() => {
    if (initialProjects?._valueJSON) {
      const projectsData = initialProjects._valueJSON;
      dispatch(
        fetchProjectsSuccess({
          projects: projectsData,
          total: projectsData.length,
        })
      );
    }
  }, [dispatch, initialProjects]);
  return <div>{children}</div>;
};

export default ProjectsProvider;
