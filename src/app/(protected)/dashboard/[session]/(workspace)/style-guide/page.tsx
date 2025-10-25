import StyleGuideMoodboard from "@/components/style/moodboard";
import { ThemeContent } from "@/components/style/theme";
import StyleGuideTypography from "@/components/style/typography";
import { TabsContent } from "@/components/ui/tabs";
import { MoodbroardImagesQuery, StyleGuideQuery } from "@/convex/query.config";
import { MoodBroardImage } from "@/hooks/use-styles";
import { StyleGuideProps } from "@/redux/api/style-guide";
import { Palette } from "lucide-react";
import React from "react";

type Props = {
  searchParams: Promise<{
    project: string;
  }>;
};
const Page = async ({ searchParams }: Props) => {
  const projectId = (await searchParams).project;
  const existingStyleGuide = await StyleGuideQuery(projectId);

  console.log("projectId-Style-Guide-Page", projectId);

  const guide = existingStyleGuide.styleGuide
    ?._valueJSON as unknown as StyleGuideProps;

  const colorGuide = guide?.colorSections || [];
  const typographyGuide = guide?.typographySections || [];

  const existingMoodbroard = await MoodbroardImagesQuery(projectId);
  const guideImages = existingMoodbroard.images
    ?._valueJSON as unknown as MoodBroardImage[];
  console.log("guideImages-Style-Guide-Page", existingMoodbroard.images);

  return (
    <div>
      <TabsContent value="colours" className="space-y-8">
        {!guideImages?.length ? (
          <div className="space-y-8">
            <div className="text-center py-20">
              <div className="size-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
                <Palette className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No colors generated yet
              </h3>
              <p>
                Upload images to your mood board and genrate an AI-powered style
                guide with colors and typography.
              </p>
            </div>
          </div>
        ) : (
          <ThemeContent colorGuide={colorGuide} />
        )}
      </TabsContent>

      <TabsContent value="typography">
        <StyleGuideTypography typographyGuide={typographyGuide} />
      </TabsContent>
      <TabsContent value="moodboard">
        <StyleGuideMoodboard guideImages={guideImages} />
      </TabsContent>
    </div>
  );
};

export default Page;
