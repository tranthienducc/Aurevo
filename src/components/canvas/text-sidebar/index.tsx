"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { TextShape, updateShape } from "@/redux/slices/shaped";
import { useAppSelector } from "@/redux/store";
import { Bold, Italic, Palette, Strikethrough, Underline } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  isOpen: boolean;
};

const fontFamilies = [
  "Arial, sans-serif",
  "Helvetica, sans-serif",
  "Times New Roman, serif",
  "Georgia, serif",
  "Courier New, monospace",
  "Verdana, sans-serif",
  "Tahoma, sans-serif",
  "Trebuchet MS, sans-serif",
  "Impact, sans-serif",
  "Comic Sans MS, cursive, sans-serif",
];

const TextSidebar = ({ isOpen }: Props) => {
  const selectedShapes = useAppSelector((state) => state.shapes.selected);
  const shapesEntities = useAppSelector(
    (state) => state.shapes.shapes.entities
  );

  const selectedTextShape = Object.keys(selectedShapes)
    .map((id) => shapesEntities[id])
    .find((shape) => shape?.type === "text") as TextShape | undefined;
  const dispatch = useDispatch();

  const [colorInput, setColorInput] = React.useState<string>(
    selectedTextShape?.fill || "#ffffff"
  );

  const updateTextProperty = (property: keyof TextShape, value: any) => {
    if (!selectedTextShape) return;

    dispatch(
      updateShape({
        id: selectedTextShape.id,
        patch: { [property]: value },
      })
    );
  };

  if (!isOpen || !selectedTextShape) return null;

  const handleColorChange = (color: string) => {
    setColorInput(color);
    if (/^#[0-9A-F]{6}$/i.test(color) || /^#[0-9A-F]$/i.test(color)) {
      updateTextProperty("fill", color);
    }
  };

  return (
    <div
      className={cn(
        "fixed right-5 top-1/2 transform -translate-y-1/2 w-80 backdrop-blur-xl bg-white/[0.08] border-white/[0.12] gap-2 p-3 saturate-150 border rounded-lg z-50 transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="p-4 flex flex-col gap-10 overflow-y-auto max-h-[calc(100vh-8rem)]">
        <div className="space-y-2">
          <Label className="text-white/80">Font Family</Label>
          <Select
            value={selectedTextShape?.fontFamily}
            onValueChange={(value) => updateTextProperty("fontFamily", value)}
          >
            <SelectTrigger className="bg-white/5 border-white/10 w-full text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/10">
              {fontFamilies.map((font) => (
                <SelectItem
                  key={font}
                  value={font}
                  className="text-white hover:bg-white/10"
                >
                  <span style={{ fontFamily: font }}>{font.split(",")[0]}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-white/80">
            Font Size: {selectedTextShape?.fontSize}px
          </Label>
          <Slider
            value={[selectedTextShape.fontSize]}
            onValueChange={([value]) => updateTextProperty("fontSize", value)}
            min={8}
            max={128}
            step={1}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white/80">
            Font Weight: {selectedTextShape?.fontWeight}px
          </Label>
          <Slider
            value={[selectedTextShape?.fontWeight]}
            onValueChange={([value]) => updateTextProperty("fontSize", value)}
            min={100}
            max={900}
            step={100}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-white/80">Style</Label>
          <div className="flex gap-2">
            <Toggle
              pressed={selectedTextShape.fontWeight >= 600}
              onPressedChange={(pressd) =>
                updateTextProperty("fontWeight", pressd ? 700 : 400)
              }
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
            >
              <Bold className="size-4" />
            </Toggle>
            <Toggle
              pressed={selectedTextShape.fontStyle === "italic"}
              onPressedChange={(pressd) =>
                updateTextProperty("fontStyle", pressd ? "italic" : "normal")
              }
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
            >
              <Italic className="size-4" />
            </Toggle>
            <Toggle
              pressed={selectedTextShape.textDecoration === "underline"}
              onPressedChange={(pressd) =>
                updateTextProperty(
                  "textDecoration",
                  pressd ? "underline" : "none"
                )
              }
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
            >
              <Underline className="size-4" />
            </Toggle>
            <Toggle
              pressed={selectedTextShape.textDecoration === "line-through"}
              onPressedChange={(pressd) =>
                updateTextProperty(
                  "textDecoration",
                  pressd ? "line-through" : "none"
                )
              }
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
            >
              <Strikethrough className="size-4" />
            </Toggle>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">
            Letter Spacing: {selectedTextShape.letterSpacing}px
          </Label>
          <Slider
            value={[selectedTextShape?.letterSpacing]}
            onValueChange={([value]) =>
              updateTextProperty("letterSpacing", value)
            }
            min={-2}
            max={10}
            step={0.1}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white/80">
            <Palette className="size-4" />
            Text Color
          </Label>
          <div className="flex gap-2">
            <Input
              value={colorInput}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder="#ffffff"
              className="bg-white/5 border-white/10 text-white flex-1"
            />
            <div
              className="size-10 rounded border border-white/20 cursor-pointer"
              style={{ backgroundColor: selectedTextShape.fill || "#ffffff" }}
              onClick={() => {
                const input = document.createElement("input");
                input.type = "color";
                input.value = selectedTextShape.fill || "#ffffff";
                input.onchange = (e) => {
                  const color = (e.target as HTMLInputElement).value;
                  setColorInput(color);
                  updateTextProperty("fill", color);
                };
                input.click();
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSidebar;
