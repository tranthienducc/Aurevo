import { Type } from "lucide-react";
import React from "react";

type Props = {
  typographyGuide: any;
};

const StyleGuideTypography = ({ typographyGuide }: Props) => {
  return (
    <>
      {typographyGuide.length === 0 ? (
        <div className="text-center py-20">
          <Type className="size-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No typography generated yet
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Generate a style guide to see typography recommendations
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {typographyGuide.map((section: any, index: number) => (
            <div className="flex flex-col gap-5" key={index}>
              <div>
                <h3 className="text-lg font-medium text-foreground/50">
                  {section.title}
                </h3>
              </div>
              <div className="grid grid-cols-2"></div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StyleGuideTypography;
