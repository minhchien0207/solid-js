import { JSX } from 'solid-js';

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

type Plan = {
  code?: string;
  name?: JSX.Element;
  description?: JSX.Element;
  price: number | JSX.Element;
  attr?: { name?: string; id?: string };
  active?: boolean;
  benefits?: {
    code?: string;
    svg?: JSX.Element;
    text?: JSX.Element;
    price?: JSX.Element;
    description?: JSX.Element;
    isMax?: boolean;
  }[];
};

export type { Area, Benefit, Plan };
