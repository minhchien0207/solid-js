import { JSX } from 'solid-js';

type AreaChildrenHandlers = {
  isSchengen: boolean;
  onSchengenChange: (value: boolean) => void;
};

type AreaHint = {
  title?: string;
  content?: string;
};

type Area = {
  text: string;
  value: string;
  attr: { name: string; id: string };
  active: boolean;
  children?: JSX.Element | ((handlers: AreaChildrenHandlers) => JSX.Element);
  hint?: AreaHint;
};

type BenefitDetail = {
  id: string;
  code: string;
  name: string;
  description?: string;
};

type BenefitItem = {
  benefit: BenefitDetail;
  index: number;
  plan: {
    [planCode: string]: {
      id: string;
      si?: string;
      siInWords?: string;
      siInSymbols?: 'check' | 'close';
      [key: string]: any;
    };
  };
  benefits: BenefitItem[];
};

type Benefit = {
  code?: string;
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
  price: number;
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

type BasePerson = {
  name: string;
  dob: string;
  gender: string;
  nationality: string;
  relationship: string;
  idType: string;
  idNumber: string;
};

type InsuredPerson = BasePerson & {
  mobileNumber: string;
};

type Individual = BasePerson & {
  type: 'individual';
  mobileNumber: string;
};

type Corporate = Omit<
  BasePerson,
  'dob' | 'gender' | 'nationality' | 'relationship' | 'idType' | 'idNumber'
> & {
  type: 'corporate';
  taxNumber: string;
};

type Delivery = {
  email?: string;
  mobileNumber?: string;
  address?: string;
  province?: string;
};

type PolicyHolder = Individual | Corporate;

export type {
  Area,
  AreaChildrenHandlers,
  Benefit,
  Plan,
  InsuredPerson,
  PolicyHolder,
  Delivery,
  BenefitDetail,
  BenefitItem,
};
