import type BaseWidget from "widgets/BaseWidget";
import M4ContainerWidget from "./ContainerWidget";
import M4ButtonWidget from "./ButtonWidget";
import M4InputWidget from "./InputWidget";
import M4TextWidget from "./TextWidget";

const Meta4Widgets = [
  M4ContainerWidget,
  M4ButtonWidget,
  M4InputWidget,
  M4TextWidget,
];

const Widgets = [...Meta4Widgets] as (typeof BaseWidget)[];

export default Widgets;
