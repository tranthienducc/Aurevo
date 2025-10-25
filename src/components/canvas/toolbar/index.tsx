import HistoryPill from "@/components/canvas/toolbar/history";
import ToolBarShapes from "@/components/canvas/toolbar/shapes";
import ZoomBar from "@/components/canvas/toolbar/zoom";
import React from "react";

const Toolbar = () => {
  return (
    <div className="fixed bottom-0 w-full grid grid-cols-3 z-50 p-5">
      <HistoryPill />
      <ToolBarShapes />
      <ZoomBar />
    </div>
  );
};

export default Toolbar;
