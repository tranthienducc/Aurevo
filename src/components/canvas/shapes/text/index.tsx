"use client";
import { removeShape, TextShape, updateShape } from "@/redux/slices/shaped";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const TextElement = ({ shape }: { shape: TextShape }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(shape.text === "Type here...");
  const [tempText, setTempText] = useState(shape.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shape.text === "Type here..." && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
      setIsEditing(true);
    }
  }, [shape.text]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (shape.text === "Type here...") {
        inputRef.current.select();
      }
    }
  }, [isEditing, shape.text]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTempText(shape.text);
  };
  const handleBlur = () => {
    setIsEditing(false);
    if (tempText.trim() === "" || tempText.trim() === "Type here...") {
      dispatch(removeShape(shape.id));
    } else if (tempText.trim() !== shape.text) {
      dispatch(
        updateShape({
          id: shape.id,
          patch: { text: tempText.trim() },
        })
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      if (shape.text === "Type here...") {
        dispatch(removeShape(shape.id));
      } else {
        setIsEditing(false);
        setTempText(shape.text);
      }
    }
  };

  if (isEditing) {
    return (
      <input
        type="text"
        ref={inputRef}
        className="absolute pointer-events-auto bg-transparent outline-none text-white rounded px-2 py-1"
        style={{
          left: shape.x,
          top: shape.y,
          fontSize: shape.fontSize,
          fontFamily: shape.fontFamily,
          fontWeight: shape.fontWeight,
          fontStyle: shape.fontStyle,
          textAlign: shape.textAlign,
          textDecoration: shape.textDecoration,
          lineHeight: shape.lineHeight,
          letterSpacing: shape.letterSpacing,
          textTransform: shape.textTransform,
          color: shape.fill || "#ffffff",
          minWidth: "100px",
          whiteSpace: "nowrap",
        }}
        value={tempText}
        onChange={(e) => setTempText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder=""
        autoComplete="off"
      />
    );
  }
  return (
    <div
      className="absolute pointer-events-none cursor-text select-none rounded px-2 py-1"
      style={{
        left: shape.x,
        top: shape.y,
        fontSize: shape.fontSize,
        fontFamily: shape.fontFamily,
        fontWeight: shape.fontWeight,
        fontStyle: shape.fontStyle,
        textAlign: shape.textAlign,
        textDecoration: shape.textDecoration,
        lineHeight: shape.lineHeight,
        letterSpacing: shape.letterSpacing,
        textTransform: shape.textTransform,
        color: shape.fill || "#ffffff",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
      onDoubleClick={handleDoubleClick}
      title="Double-click to edit"
    >
      <span
        className="pointer-events-auto"
        style={{
          display: "block",
          minWidth: "20px",
          minHeight: "1em",
        }}
      >
        {shape.text}
      </span>
    </div>
  );
};

export default TextElement;
