"use client";
import SelectionOverlay from "@/components/canvas/selection";
import ShapeRenderer from "@/components/canvas/shapes";
import ArrowPreview from "@/components/canvas/shapes/arrow/preview";
import EllipsePreview from "@/components/canvas/shapes/ellipse/preview";
import FramePreview from "@/components/canvas/shapes/frame/preview";
import LinePreview from "@/components/canvas/shapes/line/preview";
import RectanglePreview from "@/components/canvas/shapes/rectangle/preview";
import FreeDrawStrokePreview from "@/components/canvas/shapes/stroke/preview";
import TextSidebar from "@/components/canvas/text-sidebar";
import { useInfiniteCanvas } from "@/hooks/use-canvas";
import { cn } from "@/lib/utils";
import React from "react";

const InfiniteCanvas = () => {
  const {
    viewport,
    shapes,
    currentTool,
    selectedShapes,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    attachCanvasRef,
    getDraftShape,
    getFreeDrawPoints,
    isSidebarOpen,
    hasSelectedText,
  } = useInfiniteCanvas();

  const draftShape = getDraftShape();
  const freeDrawPoints = getFreeDrawPoints();
  return (
    <>
      <TextSidebar isOpen={isSidebarOpen && hasSelectedText} />
      {/* Inspiration */}
      {/* Chat window */}
      <div
        ref={attachCanvasRef}
        role="application"
        aria-label="Infinite drawing canvas"
        className={cn(
          "relative w-full h-screen overflow-hidden select-none z-0",
          {
            "cursor-grabbing": viewport.mode === "panning",
            "cursor-grab": viewport.mode === "shiftPanning",
            "cursor-crosshair":
              currentTool !== "selected" && viewport.mode === "idle",
            "cursor-default":
              currentTool === "selected" && viewport.mode === "idle",
          }
        )}
        style={{ touchAction: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
      >
        <div
          className="absolute origin-top-left pointer-events-none z-10"
          style={{
            transform: `translate3d(${viewport.translate.x}px, ${viewport.translate.y}px, 0) scale(${viewport.scale})`,
            transformOrigin: "0 0",
            willChange: "transform",
          }}
        >
          {shapes.map((shape) => (
            <ShapeRenderer
              key={shape.id}
              shape={shape}
              // toggleInspiration={toggleInspiration}
              // toggleChat={toggleChat}
              // generateWorkflow={generateWorkflow}
              // exportDesign={exportDesign}
            />
          ))}

          {shapes.map((shape) => (
            <SelectionOverlay
              key={`selection-${shape.id}`}
              shape={shape}
              isSelected={!!selectedShapes[shape.id]}
            />
          ))}
          {draftShape && draftShape.type === "frame" && (
            <FramePreview
              startWorld={draftShape.startWorld}
              currentWorld={draftShape.currentWorld}
            />
          )}
          {draftShape && draftShape.type === "rect" && (
            <RectanglePreview
              startWorld={draftShape.startWorld}
              currentWorld={draftShape.currentWorld}
            />
          )}
          {draftShape && draftShape.type === "ellipse" && (
            <EllipsePreview
              startWorld={draftShape.startWorld}
              currentWorld={draftShape.currentWorld}
            />
          )}
          {draftShape && draftShape.type === "arrow" && (
            <ArrowPreview
              startWorld={draftShape.startWorld}
              currentWorld={draftShape.currentWorld}
            />
          )}
          {draftShape && draftShape.type === "line" && (
            <LinePreview
              startWorld={draftShape.startWorld}
              currentWorld={draftShape.currentWorld}
            />
          )}
          {currentTool === "freedraw" && freeDrawPoints.length > 1 && (
            <FreeDrawStrokePreview points={freeDrawPoints} />
          )}
        </div>
      </div>
    </>
  );
};

export default InfiniteCanvas;
