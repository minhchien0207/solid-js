import { Component, JSX, splitProps } from "solid-js";
import "./plan.css";

type PlanProps = {
  plan: {
    name?: JSX.Element;
    description?: JSX.Element;
    price?: JSX.Element;
    attr?: {
      name?: string;
      id?: string;
    };
    benefits?: any;
  };
  isActive: boolean;
  onSelect: () => void;
  planIdActiveId?: string;
  children?: any;
};

const Plan: Component<PlanProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "plan",
    "planIdActiveId",
    "isActive",
    "onSelect",
    "children",
  ]);

  return (
    <div
      class="relative flex cursor-pointer flex-col rounded-[16px] border bg-white p-5 transition-all duration-300 lg:w-[299px] lg:hover:scale-[1.05] lg:hover:opacity-100"
      classList={{
        "opacity-100": !local.planIdActiveId, // support for case no plan selected
        "border-transparent opacity-70":
          !local.isActive || !local.planIdActiveId,
        "active animate-pulse-v2 border-[#DD252E]": local.isActive,
      }}
      onClick={local.onSelect}
    >
      {local.isActive && (
        <div class="absolute top-0 left-0 w-full rounded-tl-[16px] rounded-tr-[16px] bg-[#F8D3D5] p-[6px] text-center text-[18px] leading-[26px] font-semibold text-[#DD252E]">
          Lựa chọn của bạn
        </div>
      )}

      {/* Name + Description */}
      <div class="mt-7 flex flex-col items-center">
        <div class="name">{local.plan.name}</div>
        <div class="text-light description mb-8 text-[16px] leading-[22px] text-[#76758A] italic">
          {local.plan.description}
        </div>
      </div>
      {/* Price */}
      <div class="text-primary price mb-8 text-center text-[40px] font-bold">
        {local.plan.price}
      </div>
      {/* Button */}
      <button
        type="button"
        class="btn mb-8 w-full rounded-[8px]"
        classList={{
          "btn-primary text-white": local.isActive,
          "bg-[#EEF1FC] text-primary": !local.isActive,
        }}
      >
        {local.isActive ? "Gói đã chọn" : "Chọn gói"}
      </button>
      {/* Benefit */}
      {local.plan?.benefits && (
        <div class="benefit-parent flex flex-col gap-[22px]">
          <div class="text-[18px] leading-[26px] font-semibold text-[#18171C]">
            Gói bảo hiểm bao gồm:
          </div>
          {local.plan.benefits.map(
            (benefit: { svg?: JSX.Element; description?: JSX.Element }) => (
              <div class="benefit-child flex items-center gap-[11px]">
                <div class="icon">{benefit.svg}</div>
                <div class="description text-[16px] leading-[22px]">
                  {benefit.description}
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default Plan;
