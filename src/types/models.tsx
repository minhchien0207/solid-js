import { JSX } from "solid-js";

type Area = {
  text: string;
  value: string;
  attr: { name: string; id: string };
  active: boolean;
  children?: any;
  hint?: any;
};

type Benefit = {
  svg?: JSX.Element;
  svgActive?: JSX.Element;
  name: string;
  attr: { name: string; id: string };
  active: boolean;
  children?: any;
};

export type { Area, Benefit };
