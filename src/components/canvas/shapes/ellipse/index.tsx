import { EllipseShape } from "@/redux/slices/shaped";
import React from "react";

const Ellipse = ({ shape }: { shape: EllipseShape }) => {
  const { x, y, w, h } = shape;

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
        fill="transparent"
        stroke="black"
        strokeWidth={1}
      />
    </svg>
  );
};

export default Ellipse;
