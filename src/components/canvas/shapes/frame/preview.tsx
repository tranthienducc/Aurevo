import React from "react";

const FramePreview = ({
  startWorld,
  currentWorld,
}: {
  startWorld: { x: number; y: number };
  currentWorld: { x: number; y: number };
}) => {
  // Tính toán vị trí và kích thước khung preview
  const left = Math.min(startWorld.x, currentWorld.x);
  const top = Math.min(startWorld.y, currentWorld.y);
  const width = Math.abs(currentWorld.x - startWorld.x);
  const height = Math.abs(currentWorld.y - startWorld.y);

  return (
    <div
      className="absolute pointer-events-none backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] saturate-150"
      style={{
        left,
        top,
        width,
        height,
        borderRadius: "100px",
        zIndex: 1000,
      }}
    />
  );
};

export default FramePreview;
