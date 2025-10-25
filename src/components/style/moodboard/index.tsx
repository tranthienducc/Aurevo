"use client";
import ImagesBoard from "@/components/style/moodboard/images.board";
import { Button } from "@/components/ui/button";
import { MoodBroardImage, useMoodBoard } from "@/hooks/use-styles";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

type Props = {
  guideImages: MoodBroardImage[];
};

const StyleGuideMoodboard = ({ guideImages }: Props) => {
  const {
    images,
    dragActive,
    removeImage,
    handldeDrag,
    handleDrop,
    handleFileInput,
    canAddMore,
  } = useMoodBoard(guideImages);
  console.log(
    "images:",
    images?.map((img) => img.preview)
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-10">
      <div
        className={cn(
          "relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-200 min-h-[500px] flex items-center justify-center",
          dragActive
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border/50 hover:border-border"
        )}
        onDragEnter={handldeDrag}
        onDragLeave={handldeDrag}
        onDragOver={handldeDrag}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-3xl" />
        </div>
        {images.length > 0 && (
          <>
            <div className="flex items-center justify-center lg:hidden absolute inset-0">
              <div className="relative">
                {images.map((image, index) => {
                  const seed = image.id
                    .split("")
                    .reduce((a, b) => a + b.charCodeAt(0), 0);
                  const random1 = ((seed * 9301 + 49297) % 233280) / 233280;
                  const random2 =
                    (((seed + 1) * 9301 + 49297) % 233280) / 233280;
                  const random3 =
                    (((seed + 2) * 9301 + 49297) % 233280) / 233280;

                  const rotation = (random1 - 0.5) * 20;
                  const xOffset = (random2 - 0.5) * 40;
                  const yOffset = (random3 - 0.5) * 30;
                  return (
                    <ImagesBoard
                      key={`mobile-${image.id}`}
                      image={image}
                      removeImage={removeImage}
                      xOffset={xOffset}
                      yOffset={yOffset}
                      rotation={rotation}
                      zIndex={index + 1}
                      marginLeft="-80px"
                      marginTop="-96px"
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
        <div className="hidden lg:flex absolute inset-0 items-center justify-center">
          <div className="relative w-full max-w-[700px] h-[300px] mx-auto">
            {images.map((image, index) => {
              const seed = image.id
                .split("")
                .reduce((a, b) => a + b.charCodeAt(0), 0);
              const random1 = ((seed * 9301 + 49297) % 233280) / 233280;
              const random3 = (((seed + 2) * 9301 + 49297) % 233280) / 233280;

              const imageWidth = 192;
              const overlapAmount = 30;
              const spacing = imageWidth - overlapAmount;

              const rotation = (random1 - 0.5) * 50;
              const xOffset =
                index * spacing - ((images.length - 1) * spacing) / 2;
              const yOffset = (random3 - 0.5) * 30;
              const zIndex = index + 1;
              return (
                <ImagesBoard
                  key={`mobile-${image.id}`}
                  image={image}
                  removeImage={removeImage}
                  xOffset={xOffset}
                  yOffset={yOffset}
                  rotation={rotation}
                  zIndex={zIndex}
                  marginLeft="-80px"
                  marginTop="-96px"
                />
              );
            })}
          </div>
        </div>

        {images.length > 0 && (
          <div className="relative z-10 space-y-6">
            <div className="mx-auto size-16 rounded-2xl bg-muted flex items-center justify-center">
              <Upload className="size-8 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">
                Drop your images here
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Drag and drop 5 images to build your mood board
              </p>
            </div>

            <Button onClick={handleUploadClick} variant="outline">
              <Upload className="size-4 mr-2" />
              Chose Files
            </Button>
          </div>
        )}

        {images.length > 0 && canAddMore && (
          <div className="absolute bottom-6 right-6 z-20">
            <Button onClick={handleUploadClick} size="sm" variant="outline">
              <Upload className="size-4 mr-2" />
              Add More
            </Button>
          </div>
        )}
        <input
          className="hidden"
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
        />
      </div>
      {/* TODO: Add AI sau */}
      <Button className="w-fit">Generate Styles With AI</Button>
      {images.length > 5 && (
        <div className="text-center p-4 bg-muted/50 rounded-2xl">
          <p className="text-sm text-muted-foreground">
            Maximum of 5 images reached. Remove image to add more.
          </p>
        </div>
      )}
    </div>
  );
};

export default StyleGuideMoodboard;
