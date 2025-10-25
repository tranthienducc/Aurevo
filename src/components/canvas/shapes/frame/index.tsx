"use client";
import LiquidGlassButton from "@/components/buttons/liquid-glass";
import { useFrame } from "@/hooks/use-canvas";
import { FrameShape } from "@/redux/slices/shaped";
import { PaintBucket, Pen } from "lucide-react";
import React from "react";
const Frame = ({
  shape,
  toggleInspiration,
}: {
  shape: FrameShape;
  toggleInspiration: () => void;
}) => {
  const { isGenerating, handleGenerateDesign } = useFrame(shape);
  return (
    <>
      {" "}
      <div
        className="absolute pointer-events-none backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] saturate-150"
        style={{
          left: shape.x,
          top: shape.y,
          width: shape.w,
          height: shape.h,
          borderRadius: "12px",
        }}
      />
      <div
        className="absolute pointer-events-none whitespace-nowrap text-xs font-medium text-white/80 select-none"
        style={{
          left: shape.x,
          top: shape.y - 24,
          fontSize: "11px",
          lineHeight: "1.2",
        }}
      >
        Frame {shape.frameNumber}
      </div>
      <div
        className="absolute pointer-events-auto flex gap-4"
        style={{
          left: shape.x + shape.w - 235,
          top: shape.y - 36,
          zIndex: 1000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <LiquidGlassButton
          size="sm"
          variant="subtitle"
          className="flex flex-row gap-2 items-center"
        >
          <PaintBucket className="size-3" />
          Inspiration
        </LiquidGlassButton>
        <LiquidGlassButton
          size="sm"
          variant="subtitle"
          className="flex flex-row gap-2 items-center"
          onClick={handleGenerateDesign}
        >
          <Pen className="size-3" />
          {isGenerating ? "Generating..." : "Generate Design"}
        </LiquidGlassButton>
      </div>
    </>
  );
};
export default Frame;
