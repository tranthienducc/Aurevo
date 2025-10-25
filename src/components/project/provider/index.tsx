"use client";
import { loadProject } from "@/redux/slices/shaped";
import { restoreViewPort } from "@/redux/slices/viewport";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  children: React.ReactNode;
  initialProject: any;
};

const ProjectProvider = ({ children, initialProject }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialProject?._valueJSON?.sketchesData) {
      const projectData = initialProject._valueJSON;

      dispatch(loadProject(projectData.sketchesData));

      if (projectData.viewportData) {
        dispatch(restoreViewPort(projectData.viewportData));
      }
    }
  }, [dispatch, initialProject]);
  return <div>{children}</div>;
};

export default ProjectProvider;
