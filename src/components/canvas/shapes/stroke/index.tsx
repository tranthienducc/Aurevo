import { polylineBox } from "@/lib/utils";
import { FreeDrawShape } from "@/redux/slices/shaped";
import React from "react";

const Stroke = ({ shape }: { shape: FreeDrawShape }) => {
  const { points, strokeWidth = 2, stroke = "#000", fill = "none" } = shape;

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
        fill={fill ?? "none"}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Stroke;
