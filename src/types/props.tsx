import { JSX } from 'solid-js';
import { Area, Plan } from './models';

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
    layout?: 'col' | 'row';
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
  type?: 'date'; // default
};

type RangeDateProps = BaseDateProps & {
  type: 'range';
  // from: string;
  // to: string;
};

type DateProps = SingleDateProps | RangeDateProps;

export type { AreaProps, PlanProps, DateProps };
