import { Component, JSX, mergeProps, splitProps, createEffect } from "solid-js";
import "./benefit.css";

type BenefitProps = {
  benefit: {
    svg?: JSX.Element;
    svgActive?: JSX.Element;
    name?: string;
    attr?: {
      name?: string;
      id?: string;
    };
    children?: any;
  };
  isActive: boolean;
  onSelect: () => void;
  children?: any;
};

const Benefit: Component<BenefitProps> = (props) => {
  const [local, rest] = splitProps(props, ["benefit", "isActive", "onSelect"]);

  return (
    <div
      class="flex cursor-pointer flex-col items-center gap-6 rounded-[8px] bg-white p-5"
      classList={{
        active: local.isActive,
      }}
      onClick={local.onSelect}
    >
      {local.isActive ? local.benefit.svgActive : local.benefit.svg}
      <label
        class="cursor-pointer font-semibold"
        for={local.benefit.attr?.id}
        onClick={(e) => {
          e.stopPropagation(); // prevent bubble to parent
        }}
      >
        {local.benefit.name}
      </label>
      <input
        type="checkbox"
        class="checkbox checkbox-sm text-primary"
        name={local.benefit.attr?.name}
        id={local.benefit.attr?.id}
        checked={local.isActive}
        onClick={(e) => {
          e.stopPropagation(); // prevent bubble to parent
          local.onSelect(); // call handler only once
        }}
      />
    </div>
  );
};

export default Benefit;
