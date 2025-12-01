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

export type { AreaProps, PlanProps };
