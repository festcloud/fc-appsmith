import type BaseWidget from "widgets/BaseWidget";
import ContainerWidget from "./ContainerWidget";
import ButtonWidget from "./ButtonWidget";
import InputWidget from "./InputWidget";
import TextWidget from "./TextWidget";

const Meta4Widgets = [
  ContainerWidget, 
  ButtonWidget, 
  InputWidget, 
  TextWidget,
];

const Widgets = [...Meta4Widgets] as (typeof BaseWidget)[];

export default Widgets;
