import { Area, Plan, BenefitItem } from "./models";

type AreaProps = {
  areas: Area[];
  value?: string;
  activeHintId?: string;
  onSelect?: (value: string) => void;
  onSelectHint?: (value: string) => void;
};

type PlanProps = {
  data: Plan;
  textHighlight?: string;
  isActive: boolean;
  style?: {
    layout?: "col" | "row";
    showButton?: boolean;
    showBenefit?: boolean;
    showImgBottom?: boolean;
  };
  onSelect: () => void;
  planIdActiveId?: string;
  children?: any;
  mustShow?: boolean;
};

type BaseDateProps = {
  label?: string;
  value?: string;
  attr?: {
    name: string;
    id: string;
    placeholder?: string;
    required?: boolean;
  };
  helper?: {
    hint?: string;
  };
  onChange: (e: any) => void;
};

type SingleDateProps = BaseDateProps & {
  type?: "date"; // default
};

type RangeDateProps = BaseDateProps & {
  type: "range";
  // from: string;
  // to: string;
};

type BenefitFullProps = {
  data: {
    activeId?: string;
    plans: {
      code: string;
      name: string;
    }[];
    headers: {
      id: string;
      code: string;
      name: string;
    }[];
    benefits: BenefitItem;
  };
};

type DateProps = SingleDateProps | RangeDateProps;

type PolicyTypeProps = {
  types: {
    text: string;
    value: string;
    hint?: string;
    min?: number;
    max?: number;
    adults?: {
      text?: string;
      hint?: string;
      default?: number;
      min?: number;
      max?: number;
    };
    children?: {
      text?: string;
      hint?: string;
      default?: number;
      min?: number;
      max?: number;
    };
  }[];
  onSelect?: (value: any) => void;
};

export type {
  AreaProps,
  PlanProps,
  DateProps,
  BenefitFullProps,
  PolicyTypeProps,
};
