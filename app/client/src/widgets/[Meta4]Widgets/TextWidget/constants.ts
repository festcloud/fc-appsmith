export enum OverflowTypes {
  SCROLL = "SCROLL",
  TRUNCATE = "TRUNCATE",
  NONE = "NONE",
}

export const typographyOptions = [
  { label: "H1-B", value: "h1-b" },
  { label: "H2-L", value: "h2-l" },
  { label: "H2-B", value: "h2-b" },
  { label: "H3-L", value: "h3-l" },
  { label: "H3-SB", value: "h3-sb" },
  { label: "H4-L", value: "h4-l" },
  { label: "H4-B", value: "h4-b" },
  { label: "H5-B", value: "h5-b" },
  { label: "H6-SB", value: "h6-sb" },
  { label: "H6-B", value: "h6-b" },
  { label: "H7-M", value: "h7-m" },
  { label: "Body1-M", value: "body1-m" },
  { label: "Body1-B", value: "body1-b" },
  { label: "Body2-B", value: "body2-b" },
  { label: "Body3-L", value: "body3-l" },
  { label: "Body3", value: "body3" },
  { label: "Body3-B", value: "body3-b" },
  { label: "Body4", value: "body4" },
  { label: "Body4-M", value: "body4-m" },
  { label: "Body4-B", value: "body4-b" },
  { label: "Body5", value: "body5" },
  { label: "Body5-SB", value: "body5-sb" },
  { label: "Body6", value: "body6" },
  { label: "Subtitle1-SB", value: "subtitle1-sb" },
  { label: "Subtitle2-M", value: "subtitle2-m" },
  { label: "Overline1", value: "overline1" },
  { label: "Overline2", value: "overline2" },
  { label: "Overline3", value: "overline3" },
  { label: "Overline4", value: "overline4" },
  { label: "Service1", value: "service1" },
] as const;

export type OptionValue = (typeof typographyOptions)[number]["value"];


export type typographyType = {
  fontFamily: string;
  fontSize: string;
  fontStyle: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing?: string;
};

export type typographyVariantsType = {
  [key: string]: typographyType;  
};

export const typographyVariants: typographyVariantsType = {
  h1: {
    fontFamily: "Geologica",
    fontSize: "64px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "76px",
  },
  "h1-b": {
    fontFamily: "Geologica",
    fontSize: "64px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "76px",
  },
  "h2-l": {
    fontFamily: "Geologica",
    fontSize: "48px",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "60px",
  },
  h2: {
    fontFamily: "Geologica",
    fontSize: "48px",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "60px",
  },
  "h2-b": {
    fontFamily: "Geologica",
    fontSize: "48px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "60px",
  },

  h3: {
    fontFamily: "Geologica",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "40px",
  },
  "h3-l": {
    fontFamily: "Geologica",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "40px",
  },
  "h3-sb": {
    fontFamily: "Geologica",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "40px",
  },
  "h4-l": {
    fontFamily: "Geologica",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "26px",
  },
  h4: {
    fontFamily: "Geologica",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "26px",
  },
  "h4-b": {
    fontFamily: "Geologica",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "26px",
  },
  "h5-b": {
    fontFamily: "Geologica",
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "24px",
  },
  "h6-sb": {
    fontFamily: "Geologica",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "24px",
    letterSpacing: "0.5px",
  },
  "h6-b": {
    fontFamily: "Geologica",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "24px",
  },
  "h7-m": {
    fontFamily: "Geologica",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0.5px",
  },
  body1: {
    fontFamily: "Onest",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "36px",
  },
  "body1-m": {
    fontFamily: "Onest",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "36px",
  },
  "body1-b": {
    fontFamily: "Onest",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "36px",
  },
  body2: {
    fontFamily: "Onest",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "30px",
  },

  "body2-b": {
    fontFamily: "Onest",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "30px",
  },

  "body3-l": {
    fontFamily: "Onest",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "24px",
  },

  body3: {
    fontFamily: "Onest",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
  },

  "body3-b": {
    fontFamily: "Onest",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "24px",
  },

  body4: {
    fontFamily: "Onest",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "21px",
  },

  "body4-m": {
    fontFamily: "Onest",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "21px",
  },

  "body4-b": {
    fontFamily: "Onest",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "21px",
  },

  body5: {
    fontFamily: "Onest",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "18px",
  },

  "body5-sb": {
    fontFamily: "Onest",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "18px",
  },

  body6: {
    fontFamily: "Onest",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "15px",
  },

  "subtitle1-sb": {
    fontFamily: "Onest",
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "33px",
  },

  "subtitle2-m": {
    fontFamily: "Onest",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "27px",
  },

  overline1: {
    fontFamily: "Onest",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "28px",
  },

  overline2: {
    fontFamily: "Onest",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "21px",
    letterSpacing: "1px",
  },

  overline3: {
    fontFamily: "Onest",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "18px",
    letterSpacing: "0.5px",
  },

  overline4: {
    fontFamily: "Onest",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "15px",
    letterSpacing: "0.5px",
  },

  service1: {
    fontFamily: "Onest",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "18px",
    letterSpacing: "2px",
  },
  button: {
    fontFamily: "Onest",
    fontSize: "16px",
    lineHeight: "28px",
    fontStyle: "normal",
    fontWeight: 600,
  },
};
