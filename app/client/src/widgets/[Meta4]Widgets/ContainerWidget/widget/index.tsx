import type { MouseEventHandler } from "react";
import React from "react";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import type { ContainerStyle } from "../component";
import ContainerComponent from "../component";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import { ValidationTypes } from "constants/WidgetValidation";
import { compact, get, map, sortBy } from "lodash";
import WidgetsMultiSelectBox from "layoutSystems/fixedlayout/common/widgetGrouping/WidgetsMultiSelectBox";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { getSnappedGrid } from "sagas/WidgetOperationUtils";
import { ReduxActionTypes } from "ee/constants/ReduxActionConstants";
import {
  isAutoHeightEnabledForWidget,
  DefaultAutocompleteDefinitions,
  isAutoHeightEnabledForWidgetWithLimits,
} from "widgets/WidgetUtils";
import {
  BlueprintOperationTypes,
  type AnvilConfig,
  type AutocompletionDefinitions,
  type AutoLayoutConfig,
  type WidgetBaseConfiguration,
  type WidgetDefaultProps,
  type FlattenedWidgetProps,
} from "WidgetProvider/constants";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { ButtonBoxShadowTypes } from "components/constants";
import { Colors } from "constants/Colors";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import { GridDefaults, WidgetHeightLimits } from "constants/WidgetConstants";
import {
  FlexVerticalAlignment,
  Positioning,
  ResponsiveBehavior,
} from "layoutSystems/common/utils/constants";
import { renderAppsmithCanvas } from "layoutSystems/CanvasFactory";
import { generateDefaultLayoutPreset } from "layoutSystems/anvil/layoutComponents/presets/DefaultLayoutPreset";
import type { CanvasWidgetsReduxState } from "reducers/entityReducers/canvasWidgetsReducer";
import { LayoutSystemTypes } from "layoutSystems/types";
import type { LayoutProps } from "layoutSystems/anvil/utils/anvilTypes";
import { getWidgetBluePrintUpdates } from "utils/WidgetBlueprintUtils";
import { DynamicHeight } from "utils/WidgetFeatures";
import { useDispatch } from "react-redux";
import { ContainerVariantTypes } from "widgets/[Meta4]Widgets/constants";

export class ContainerWidget extends BaseWidget<
  ContainerWidgetProps<WidgetProps>,
  WidgetState
> {
  static type = "M4_CONTAINER_WIDGET";

  constructor(props: ContainerWidgetProps<WidgetProps>) {
    super(props);
    this.renderChildWidget = this.renderChildWidget.bind(this);
  }

  static getConfig(): WidgetBaseConfiguration {
    return {
      name: "Container Widget",
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.META4],
      isCanvas: true,
      searchTags: ["div", "parent", "group"],
    };
  }

  static getFeatures() {
    return null;
    // return {
    //   dynamicHeight: {
    //     sectionIndex: 0,
    //     defaultValue: DynamicHeight.FIXED,
    //     active: true,
    //   },
    // };
  }

  static getMethods() {
    return {
      getCanvasHeightOffset: (props: WidgetProps): number => {
        const offset =
          props.borderWidth && props.borderWidth > 1
            ? Math.ceil(
                (2 * parseInt(props.borderWidth, 10) || 0) /
                  GridDefaults.DEFAULT_GRID_ROW_HEIGHT,
              )
            : 0;

        return offset;
      },
    };
  }

  static getDefaults(): WidgetDefaultProps {
    return {
      backgroundColor: "#FFFFFF",
      rows: 18,
      columns: 21,
      widgetName: "Container",
      containerVariant: ContainerVariantTypes.LARGE,
      containerStyle: "card",
      borderColor: Colors.M_BLUE_200,
      borderWidth: "1",
      borderRadius: "24px",
      boxShadow: ButtonBoxShadowTypes.NONE,
      animateLoading: true,
      children: [],
      blueprint: {
        view: [
          {
            type: "CANVAS_WIDGET",
            position: { top: 0, left: 0 },
            props: {
              containerStyle: "none",
              canExtend: false,
              detachFromLayout: true,
              children: [],
            },
          },
        ],
        operations: [
          {
            type: BlueprintOperationTypes.MODIFY_PROPS,
            fn: (
              widget: FlattenedWidgetProps,
              widgets: CanvasWidgetsReduxState,
              parent: FlattenedWidgetProps,
              layoutSystemType: LayoutSystemTypes,
            ) => {
              if (layoutSystemType !== LayoutSystemTypes.ANVIL) {
                return [];
              }

              //get Canvas Widget
              const canvasWidget: FlattenedWidgetProps = get(
                widget,
                "children.0",
              );

              const layout: LayoutProps[] = generateDefaultLayoutPreset();

              return getWidgetBluePrintUpdates({
                [canvasWidget.widgetId]: {
                  layout,
                },
              });
            },
          },
        ],
      },
      version: 1,
      flexVerticalAlignment: FlexVerticalAlignment.Stretch,
      responsiveBehavior: ResponsiveBehavior.Fill,
      minWidth: FILL_WIDGET_MIN_WIDTH,
    };
  }

  static getAutoLayoutConfig(): AutoLayoutConfig {
    return {
      widgetSize: [
        {
          viewportMinWidth: 0,
          configuration: () => {
            return {
              width: "417px",
              height: "390px",
            };
          },
        },
      ],
      autoDimension: {
        width: false,
        height: false,
      },
      disableResizeHandles: (props: ContainerWidgetProps<WidgetProps>) => ({
        // Disables vertical resize handles for all container widgets except for the List item container
        vertical: false,
        horizontal: false,
      }),
    };
  }

  static getAnvilConfig(): AnvilConfig | null {
    return {
      isLargeWidget: false,
      widgetSize: {
        maxHeight: { base: "390px" },
        maxWidth: { base: "417px" },
        minHeight: { base: "390px" },
        minWidth: { base: "417px" },
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        "Containers are used to group widgets together to form logical higher order widgets. Containers let you organize your page better and move all the widgets inside them together.",
      "!url": "https://docs.appsmith.com/widget-reference/container",
      backgroundColor: {
        "!type": "string",
        "!url": "https://docs.appsmith.com/widget-reference/container",
      },
      isVisible: DefaultAutocompleteDefinitions.isVisible,
    };
  }

  static getSetterConfig(): SetterConfig | null {
    return {
      __setters: {
        setVisibility: {
          path: "isVisible",
          type: "boolean",
        },
      },
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: "General",
        children: [
          // Container SIZE
          // {
          //   propertyName: "containerVariant",
          //   label: "Container variant",
          //   controlType: "ICON_TABS",
          //   defaultValue: ContainerVariantTypes.LARGE,
          //   fullWidth: true,
          //   helpText: "Sets the variant of the icon button",
          //   options: [
          //     {
          //       label: "Small",
          //       value: ContainerVariantTypes.SMALL,
          //     },
          //     {
          //       label: "Medium",
          //       value: ContainerVariantTypes.MEDIUM,
          //     },
          //     {
          //       label: "Large",
          //       value: ContainerVariantTypes.LARGE,
          //     },
          //     {
          //       label: "Extra",
          //       value: ContainerVariantTypes.EXTRA_LARGE,
          //     },
          //   ],
          //   isJSConvertible: true,
          //   isBindProperty: true,
          //   isTriggerProperty: false,
          //   validation: {
          //     type: ValidationTypes.TEXT,
          //     params: {
          //       allowedValues: [
          //         ContainerVariantTypes.SMALL,
          //         ContainerVariantTypes.MEDIUM,
          //         ContainerVariantTypes.LARGE,
          //         ContainerVariantTypes.EXTRA_LARGE,
          //       ],
          //       default: ContainerVariantTypes.LARGE,
          //     },
          //   },
          // },
          {
            helpText: "Controls the visibility of the widget",
            propertyName: "isVisible",
            label: "Visible",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: "Enables scrolling for content inside the widget",
            propertyName: "shouldScrollContents",
            label: "Scroll contents",
            controlType: "SWITCH",
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "animateLoading",
            label: "Animate loading",
            controlType: "SWITCH",
            helpText: "Controls the loading of the widget",
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
    ];
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: "Color",
        children: [
          {
            helpText: "Use a html color name, HEX, RGB or RGBA value",
            placeholderText: "#FFFFFF / Gray / rgb(255, 99, 71)",
            propertyName: "backgroundColor",
            label: "Background color",
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: "Use a html color name, HEX, RGB or RGBA value",
            placeholderText: "#FFFFFF / Gray / rgb(255, 99, 71)",
            propertyName: "borderColor",
            label: "Border color",
            controlType: "COLOR_PICKER",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: "Border and shadow",
        children: [
          {
            helpText: "Enter value for border width",
            propertyName: "borderWidth",
            label: "Border width",
            placeholderText: "Enter value in px",
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.NUMBER },
            postUpdateAction: ReduxActionTypes.CHECK_CONTAINERS_FOR_AUTO_HEIGHT,
          },
          {
            propertyName: "borderRadius",
            label: "Border radius",
            helpText: "Rounds the corners of the widgets's outer border edge",
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: "Box shadow",
            helpText:
              "Enables you to cast a drop shadow from the frame of the widget",
            controlType: "BOX_SHADOW_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
    ];
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {};
  }
  static getDefaultPropertiesMap(): Record<string, string> {
    return {};
  }
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {};
  }

  getSnapSpaces = () => {
    const { componentWidth } = this.props;
    const { snapGrid } = getSnappedGrid(this.props, componentWidth);

    return snapGrid;
  };

  renderChildWidget(childWidgetData: WidgetProps): React.ReactNode {
    const childWidget = { ...childWidgetData };

    const { componentHeight, componentWidth } = this.props;

    childWidget.rightColumn = componentWidth;
    childWidget.bottomRow = this.props.shouldScrollContents
      ? childWidget.bottomRow
      : componentHeight;
    childWidget.minHeight = componentHeight;
    childWidget.shouldScrollContents = false;
    childWidget.canExtend = this.props.shouldScrollContents;

    childWidget.parentId = this.props.widgetId;
    // Pass layout controls to children
    childWidget.positioning =
      childWidget?.positioning || this.props.positioning;
    childWidget.useAutoLayout = this.props.positioning
      ? this.props.positioning === Positioning.Vertical
      : false;

    return renderAppsmithCanvas(childWidget as WidgetProps);
  }

  renderChildren = () => {
    return map(
      // sort by row so stacking context is correct
      // TODO(abhinav): This is hacky. The stacking context should increase for widgets rendered top to bottom, always.
      // Figure out a way in which the stacking context is consistent.
      this.props.positioning !== Positioning.Fixed
        ? this.props.children
        : sortBy(compact(this.props.children), (child) => child.topRow),
      this.renderChildWidget,
    );
  };

  renderAsContainerComponent(props: ContainerWidgetProps<WidgetProps>) {
    const isAutoHeightEnabled: boolean =
      isAutoHeightEnabledForWidget(this.props) &&
      !isAutoHeightEnabledForWidgetWithLimits(this.props) &&
      this.props.positioning !== Positioning.Vertical;

    return (
      <ContainerComponent
        key={props.widgetId}
        {...props}
        noScroll={isAutoHeightEnabled}
      >
        <WidgetsMultiSelectBox
          {...this.getSnapSpaces()}
          noContainerOffset={!!props.noContainerOffset}
          widgetId={this.props.widgetId}
          widgetType={this.props.type}
        />
        {/* without the wrapping div onClick events are triggered twice */}
        <>{this.renderChildren()}</>
      </ContainerComponent>
    );
  }

  getWidgetView() {
    const newProp = {
      ...this.props,
      resizeDisabled: true,
    };
    //CHANGE for classs component
    // const dispatch = useDispatch();

    // dispatch({
    //   type: ReduxActionTypes.UPDATE_WIDGET_AUTO_HEIGHT,
    //   payload: {
    //     resizeDisabled: true,
    //   },
    // });

    return this.renderAsContainerComponent(newProp);
  }
}

export interface ContainerWidgetProps<T extends WidgetProps>
  extends WidgetProps {
  children?: T[];
  containerStyle?: ContainerStyle;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onClickCapture?: MouseEventHandler<HTMLDivElement>;
  shouldScrollContents?: boolean;
  noPad?: boolean;
  positioning?: Positioning;
}

export default ContainerWidget;
