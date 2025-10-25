import Arrow from "@/components/canvas/shapes/arrow";
import Ellipse from "@/components/canvas/shapes/ellipse";
import Frame from "@/components/canvas/shapes/frame";
import Line from "@/components/canvas/shapes/line";
import Rectangle from "@/components/canvas/shapes/rectangle";
import Stroke from "@/components/canvas/shapes/stroke";
import TextElement from "@/components/canvas/shapes/text";
import { Shape } from "@/redux/slices/shaped";
import React from "react";

const ShapeRenderer = ({
  shape,
  toggleInspiration,
  toggleChat,
  generateWorkflow,
  exportDesign,
}: {
  shape: Shape;
  toggleInspiration: () => void;
  toggleChat: (generatedUIId: string) => void;
  generateWorkflow: (generatedUIId: string) => void;
  exportDesign: (generatedUIId: string, element: HTMLElement | null) => void;
}) => {
  switch (shape.type) {
    case "frame":
      return <Frame shape={shape} toggleInspiration={toggleInspiration} />;
    case "rect":
      return <Rectangle shape={shape} />;
    case "ellipse":
      return <Ellipse shape={shape} />;
    case "freedraw":
      return <Stroke shape={shape} />;
    case "arrow":
      return <Arrow shape={shape} />;
    case "line":
      return <Line shape={shape} />;
    case "text":
      return <TextElement shape={shape} />;
  }
};

export default ShapeRenderer;
