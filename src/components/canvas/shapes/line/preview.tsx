import React from "react";

const LinePreview = ({
  startWorld,
  currentWorld,
}: {
  startWorld: { x: number; y: number };
  currentWorld: { x: number; y: number };
}) => {
  const { x: startX, y: startY } = startWorld;
  const { x: endX, y: endY } = currentWorld;

  const minX = Math.min(startX, endX) - 5;
  const minY = Math.min(startY, endY) - 5;
  const maxX = Math.max(startX, endX) + 5;
  const maxY = Math.max(startY, endY) + 5;
  const width = maxX - minX;
  const height = maxY - minY;

  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        left: minX,
        top: minY,
        width,
        height,
      }}
      aria-hidden
    >
      <line
        x1={startX - minX}
        y1={startY - minY}
        x2={endX - minX}
        y2={endY - minY}
        stroke="#888"
        strokeWidth={2}
        strokeDasharray="4 2"
      />
    </svg>
  );
};

export default LinePreview;
