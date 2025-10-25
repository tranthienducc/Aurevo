import { RectShape } from "@/redux/slices/shaped";
import React from "react";

const Rectangle = ({ shape }: { shape: RectShape }) => {
  return (
    <div
      className="absolute border-solid pointer-events-auto"
      style={{
        left: shape.x,
        top: shape.y,
        width: shape.w,
        height: shape.h,
        borderColor: shape.stroke,
        borderWidth: shape.strokeWidth,
        backgroundColor: shape.fill ?? "transparent",
        borderRadius: "8px",
      }}
    />
  );
};

export default Rectangle;
