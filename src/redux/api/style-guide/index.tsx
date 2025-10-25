export interface ColorSwatch {
  name: string;
  color: string;
  hex: string;
}
export interface ColorSection {
  title:
    | "Primary Colours"
    | "Secondary & Accent Colours"
    | "UI Component Colours"
    | "Utility & Form Colours"
    | "Status & Feedback Colours";
  swatches: ColorSwatch[];
}

export interface TypographyStyle {
  name: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
  description?: string;
}
export interface TypographySection {
  title: string;
  styles: TypographyStyle[];
}

export type StyleGuideProps = {
  theme: string;
  description: string;
  colorSections: [
    ColorSection,
    ColorSection,
    ColorSection,
    ColorSection,
    ColorSection,
  ];
  typographySections: [TypographySection, TypographySection, TypographySection];
};
