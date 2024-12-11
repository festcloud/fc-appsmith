export enum ContainerVariantTypes {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  EXTRA_LARGE = "EXTRA_LARGE",
}

export enum ButtonStyleVariantTypes {
  PRIMARY = "PRIMARY",
  OUTLINE = "OUTLINE",
  ERROR = "ERROR",
  TEXT = "TEXT",
}

export type ButtonVariant = keyof typeof ButtonStyleVariantTypes;

export enum ButtonSizeTypes {
  MEDIUM = "MEDIUM",
  SMALL = "SMALL",
}

export type ButtonSize = keyof typeof ButtonSizeTypes;
