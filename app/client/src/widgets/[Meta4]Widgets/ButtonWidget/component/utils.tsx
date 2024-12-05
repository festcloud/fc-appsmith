import { css } from "styled-components";

import { ButtonVariantTypes } from "components/constants";
import { getCustomHoverColor } from "widgets/WidgetUtils";
import type { ButtonContainerProps } from "./DragContainer";

import {
  ButtonStyleVariantTypes,
  type ButtonVariant,
} from "widgets/[Meta4]Widgets/constants";
import { Colors } from "constants/Colors";

/*
  Created a css util so that we don't repeat our styles.
  Add more styles in the future also make sure you pass the
  same props to the ButtonContainerProps, because we have to
  repeat on the button and the container.
*/

export const buttonHoverActiveStyles = css<ButtonContainerProps>`
  ${({ buttonColor, buttonVariant, disabled, loading, theme }) => {
    if (!disabled && !loading) {
      return `
        background: ${
          // getCustomHoverColor(theme, buttonVariant, buttonColor) !== "none"
          //   ? getCustomHoverColor(theme, buttonVariant, buttonColor)
          //   : buttonVariant === ButtonVariantTypes.SECONDARY
          //     ? theme.colors.button.primary.secondary.hoverColor
          //     : buttonVariant === ButtonVariantTypes.TERTIARY
          //       ? theme.colors.button.primary.tertiary.hoverColor
          //       : theme.colors.button.primary.primary.hoverColor
          "none"
        } !important;
      `;
    }
  }}
`;

export const getCustomBackgroundColor = (buttonVariant?: ButtonVariant) => {
  return (
    (buttonVariant === ButtonStyleVariantTypes.PRIMARY && Colors.M_BLUE_700) ||
    (buttonVariant === ButtonStyleVariantTypes.OUTLINE &&
      Colors.M_BASE_WHITE) ||
    (buttonVariant === ButtonStyleVariantTypes.ERROR && Colors.M_RED_700) ||
    (buttonVariant === ButtonStyleVariantTypes.TEXT && "transparent")
  );
};

export const getCustomBorderColor = (buttonVariant?: ButtonVariant) => {
  return (
    (buttonVariant === ButtonStyleVariantTypes.PRIMARY && Colors.M_BLUE_700) ||
    (buttonVariant === ButtonStyleVariantTypes.OUTLINE && Colors.M_BLUE_700) ||
    (buttonVariant === ButtonStyleVariantTypes.ERROR && Colors.M_RED_700)
  );
};

export const getCustomColor = (buttonVariant?: ButtonVariant) => {
  return (
    (buttonVariant === ButtonStyleVariantTypes.PRIMARY &&
      Colors.M_BASE_WHITE) ||
    (buttonVariant === ButtonStyleVariantTypes.OUTLINE && Colors.M_BLUE_700) ||
    (buttonVariant === ButtonStyleVariantTypes.ERROR && Colors.M_BASE_WHITE) ||
    (buttonVariant === ButtonStyleVariantTypes.TEXT && Colors.M_BLUE_700)
  );
};
