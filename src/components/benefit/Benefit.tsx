import { Component, JSX, splitProps } from "solid-js";
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
      class="flex cursor-pointer flex-col items-center justify-between gap-6 rounded-[8px] bg-white p-5 transition-all duration-300 lg:min-h-[320px] lg:w-[209px] lg:hover:scale-[1.01]"
      classList={{
        "active animate-pulse-v2": local.isActive,
      }}
      onClick={local.onSelect}
    >
      <div class="flex min-h-[98px] items-end">
        {local.isActive ? local.benefit.svgActive : local.benefit.svg}
      </div>
      <label
        class="cursor-pointer text-center text-[18px] leading-[26px] font-semibold"
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
