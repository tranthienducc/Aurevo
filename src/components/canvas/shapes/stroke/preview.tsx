import { polylineBox } from "@/lib/utils";
import { Point } from "@/redux/slices/viewport";
import React from "react";

type FreeDrawStrokePreviewProps = {
  points: readonly Point[];
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
};

const FreeDrawStrokePreview = ({
  points,
  strokeWidth = 2,
  stroke = "#000",
  fill = "none",
}: FreeDrawStrokePreviewProps) => {
  if (!points || points.length < 2) return null;

  const { minX, minY, width, height } = polylineBox(points);
  const pad = strokeWidth;

  const dPts = points
    .map((p) => `${p.x - minX + pad},${p.y - minY + pad}`)
    .join(" ");

  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        left: minX - pad,
        top: minY - pad,
        width: width + pad * 2,
        height: height + pad * 2,
      }}
      aria-hidden
    >
      <polyline
        points={dPts}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default FreeDrawStrokePreview;
