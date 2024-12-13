import { css } from "styled-components";
import { ButtonVariantTypes } from "components/constants";
import { getCustomHoverColor } from "widgets/WidgetUtils";
import type { ButtonContainerProps } from "./DragContainer";
import {
  ButtonStyleVariantTypes,
  type ButtonVariant,
} from "widgets/[Meta4]Widgets/constants";
import { Colors } from "constants/Colors";

/**
 * This function returns the style based on the button variant type and the provided color map.
 * @param buttonVariant - The button variant to determine styles.
 * @param colorMap - A map of button styles for different states (default, hover, focus, disabled).
 * @param defaultValue - Fallback value if no match is found.
 * @returns A string representing the color or style for the button.
 */
const getButtonStyle = (
  buttonVariant: ButtonVariant | undefined,
  colorMap: Record<string, string>,
  defaultValue: string,
) => {
  return colorMap[buttonVariant as string] ?? defaultValue;
};

// Common Styles
const defaultButtonStyle = {
  PRIMARY: Colors.M_BLUE_700,
  OUTLINE: Colors.M_BASE_WHITE,
  ERROR: Colors.M_RED_700,
  TEXT: "transparent",
};

const hoverButtonStyle = {
  PRIMARY: Colors.M_BLUE_600,
  OUTLINE: Colors.M_BLUE_100,
  ERROR: Colors.M_RED_600,
  TEXT: "transparent",
};

const focusButtonStyle = {
  PRIMARY: Colors.M_BLUE_500,
  OUTLINE: Colors.M_BLUE_200,
  ERROR: Colors.M_RED_500,
  TEXT: "transparent",
};

const borderButtonStyle = {
  PRIMARY: Colors.M_BLUE_700,
  OUTLINE: Colors.M_BLUE_700,
  ERROR: Colors.M_RED_700,
  TEXT: "transparent",
};

const hoverBorderButtonStyle = {
  PRIMARY: Colors.M_BLUE_600,
  OUTLINE: Colors.M_BLUE_600,
  ERROR: Colors.M_RED_600,
  TEXT: "transparent",
};

const disableButtonStyle = {
  PRIMARY: Colors.M_BLUE_200,
  OUTLINE: Colors.M_BASE_WHITE,
  ERROR: Colors.M_RED_200,
  TEXT: "transparent",
};

const disableBorderButtonStyle = {
  PRIMARY: Colors.M_BLUE_200,
  OUTLINE: Colors.M_BLUE_200,
  ERROR: Colors.M_RED_200,
  TEXT: "transparent",
};

const disableTextButtonStyle = {
  PRIMARY: Colors.M_GRAY_500,
  OUTLINE: Colors.M_GRAY_300,
  ERROR: Colors.M_BASE_WHITE,
  TEXT: Colors.M_GRAY_400,
};

/**
 * General hover-active styles for buttons (applied on hover, focus, or active states).
 */
export const buttonHoverActiveStyles = css<ButtonContainerProps>`
  ${({ buttonColor, buttonVariant, disabled, loading, theme }) => {
    if (!disabled && !loading) {
      return `
        background-color: ${getButtonStyle(buttonVariant, hoverButtonStyle, "")} !important;
        color: ${getHoverCustomColor(buttonVariant)} !important;
        border-color:${getButtonStyle(buttonVariant, hoverBorderButtonStyle, "")} !important;
      `;
    }
  }}
`;

// Getter Functions
export const getCustomBackgroundColor = (buttonVariant?: ButtonVariant) =>
  getButtonStyle(buttonVariant, defaultButtonStyle, Colors.M_BASE_WHITE);

export const getCustomHoverBackgroundColor = (buttonVariant?: ButtonVariant) =>
  getButtonStyle(buttonVariant, hoverButtonStyle, Colors.M_BASE_WHITE);

export const getCustomFocusBackgroundColor = (buttonVariant?: ButtonVariant) =>
  getButtonStyle(buttonVariant, focusButtonStyle, Colors.M_BASE_WHITE);

export const getCustomBorderColor = (buttonVariant?: ButtonVariant) =>
  getButtonStyle(buttonVariant, borderButtonStyle, Colors.M_BASE_WHITE);

export const getHoverCustomBorderColor = (buttonVariant?: ButtonVariant) =>
  getButtonStyle(buttonVariant, hoverBorderButtonStyle, Colors.M_BASE_WHITE);

export const getFocusCustomBorderColor = (buttonVariant?: ButtonVariant) =>
  getButtonStyle(buttonVariant, hoverBorderButtonStyle, Colors.M_BASE_WHITE);

export const getCustomDisableBackgroundColor = (
  buttonVariant?: ButtonVariant,
) => getButtonStyle(buttonVariant, disableButtonStyle, Colors.M_BASE_WHITE);

export const getCustomDisableBorderColor = (buttonVariant?: ButtonVariant) =>
  getButtonStyle(buttonVariant, disableBorderButtonStyle, Colors.M_BASE_WHITE);

export const getCustomColor = (buttonVariant?: ButtonVariant) =>
  getButtonStyle(
    buttonVariant,
    {
      PRIMARY: Colors.M_BASE_WHITE,
      OUTLINE: Colors.M_BLUE_700,
      ERROR: Colors.M_BASE_WHITE,
      TEXT: Colors.M_BLUE_700,
    },
    Colors.M_BASE_WHITE,
  );

export const getHoverCustomColor = (buttonVariant?: ButtonVariant) =>
  getButtonStyle(
    buttonVariant,
    {
      PRIMARY: Colors.M_BASE_WHITE,
      OUTLINE: Colors.M_BLUE_700,
      ERROR: Colors.M_BASE_WHITE,
      TEXT: Colors.M_BLUE_600,
    },
    Colors.M_BASE_WHITE,
  );

export const getFocusCustomColor = (buttonVariant?: ButtonVariant) =>
  getButtonStyle(
    buttonVariant,
    {
      PRIMARY: Colors.M_BASE_WHITE,
      OUTLINE: Colors.M_BLUE_700,
      ERROR: Colors.M_BASE_WHITE,
      TEXT: Colors.M_BLUE_500,
    },
    Colors.M_BASE_WHITE,
  );

export const getCustomDisableColor = (buttonVariant?: ButtonVariant) =>
  getButtonStyle(buttonVariant, disableTextButtonStyle, Colors.M_BASE_WHITE);
