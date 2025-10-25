import React from "react";

const EllipsePreview = ({
  startWorld,
  currentWorld,
}: {
  startWorld: { x: number; y: number };
  currentWorld: { x: number; y: number };
}) => {
  // Tính toán vị trí và kích thước ellipse
  const x = Math.min(startWorld.x, currentWorld.x);
  const y = Math.min(startWorld.y, currentWorld.y);
  const w = Math.abs(currentWorld.x - startWorld.x);
  const h = Math.abs(currentWorld.y - startWorld.y);

  const cx = x + w / 2;
  const cy = y + h / 2;
  const rx = w / 2;
  const ry = h / 2;

  return (
    <svg
      style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
      width={x + w}
      height={y + h}
    >
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="rgba(0,0,0,0.05)"
        stroke="blue"
        strokeWidth={1}
        strokeDasharray="4"
      />
    </svg>
  );
};

export default EllipsePreview;
