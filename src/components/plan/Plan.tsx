import { Component, JSX, splitProps } from "solid-js";
import "./plan.css";

type PlanProps = {
  data: {
    name?: JSX.Element;
    description?: JSX.Element;
    price: JSX.Element | number;
    attr?: {
      name?: string;
      id?: string;
    };
    benefits?: any;
  };
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
};

const Plan: Component<PlanProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "data",
    "textHighlight",
    "style",
    "planIdActiveId",
    "isActive",
    "onSelect",
    "children",
  ]);

  const benefits = chunk2Array(local.data.benefits);

  const layoutGeneral = local.style?.layout
    ? local.style.layout === "row"
      ? "max-sm:flex-col lg:flex-row"
      : "flex-col"
    : "flex-col";

  const layoutBenefit = local.style?.layout
    ? local.style.layout === "row"
      ? benefits.length > 1
        ? "max-sm:grid-cols-1 lg:grid-cols-2"
        : "grid-cols-1"
      : "grid-cols-1"
    : "grid-cols-1";

  return (
    <div
      class={`relative flex cursor-pointer ${layoutGeneral} z-0 gap-6 overflow-hidden rounded-[16px] border bg-white transition-all duration-300 lg:hover:scale-[1.05] lg:hover:opacity-100`}
      classList={{
        "lg:w-[299px] p-5": local.style?.layout === "col",
        "items-center justify-evenly p-15": local.style?.layout === "row",
        "lg:w-[1140px]": local.style?.layout === "row" && benefits.length > 1,
        "lg:w-[796px]": local.style?.layout === "row" && benefits.length === 1,
        "opacity-100": !local.planIdActiveId, // support for case no plan selected
        "border-transparent opacity-70":
          !local.isActive || !local.planIdActiveId,
        "active max-sm:animate-zoom-in-out lg:animate-zoom-out-in border-[#DD252E]":
          local.isActive,
        "pb-12": local.style?.showImgBottom,
      }}
      onClick={local.onSelect}
    >
      {local.isActive && (
        <div class="absolute top-0 left-0 w-full rounded-tl-[16px] rounded-tr-[16px] bg-[#F8D3D5] p-[6px] text-center text-[18px] leading-[26px] font-semibold text-[#DD252E]">
          {local.textHighlight ?? "Lựa chọn của bạn"}
        </div>
      )}

      {local.planIdActiveId && local.isActive && local.style?.showImgBottom && (
        <div
          class="absolute bottom-0 left-0 z-[-1] w-full"
          classList={{
            "bottom-0": local.style?.layout === "col",
            "lg:bottom-[-40px]":
              local.style?.layout === "row" && benefits.length === 1,
            "lg:bottom-[-70px]":
              local.style?.layout === "row" && benefits.length > 1,
            "animate-fade-in": local.isActive,
            "animate-fade-out": !local.isActive,
          }}
        >
          <img src="/images/pc-wave.webp" class="w-full opacity-70" />
        </div>
      )}

      <div class="flex w-full flex-col items-center gap-6">
        <div
          class="flex flex-col items-center"
          classList={{
            "gap-4": local.style?.layout === "row",
            "gap-8": local.style?.layout === "col",
          }}
        >
          {/* Name + Description */}
          <div
            class="flex flex-col items-center"
            classList={{
              "mt-7": local.style?.layout === "col",
            }}
          >
            <div class="name">{local.data.name}</div>
            <div class="text-light description text-[16px] leading-[22px] text-[#76758A] italic">
              {local.data.description}
            </div>
          </div>
          {/* Price */}
          <div class="text-primary price text-center text-[40px] leading-[56px] font-bold">
            {local.data.price}
          </div>
        </div>
        {/* Button */}
        {(local.style?.showButton ?? true) && (
          <button
            type="button"
            class="btn w-full rounded-[8px]"
            classList={{
              "btn-primary text-white": local.isActive,
              "bg-[#EEF1FC] text-primary": !local.isActive,
            }}
          >
            {local.isActive ? "Gói đã chọn" : "Chọn gói"}
          </button>
        )}
      </div>
      {/* Benefit + child plan */}
      <div class="flex flex-col items-center gap-4">
        {/* Benefit */}
        {local.data?.benefits && (
          <div
            class="flex flex-col gap-[22px]"
            classList={{
              "lg:w-[644px]":
                local.style?.layout === "row" && benefits.length > 1,
              "lg:w-[322px]":
                local.style?.layout === "row" && benefits.length === 1,
            }}
          >
            <div class="text-[18px] leading-[26px] font-semibold text-[#18171C]">
              Gói bảo hiểm bao gồm:
            </div>
            <div class={`grid gap-[22px] max-sm:grid-cols-1 ${layoutBenefit}`}>
              {benefits.map(
                (
                  arrBenefit: {
                    svg?: JSX.Element;
                    description?: JSX.Element;
                  }[],
                ) => (
                  <div class="flex flex-col items-center gap-[11px]">
                    {arrBenefit.map(
                      (benefit: {
                        svg?: JSX.Element;
                        description?: JSX.Element;
                      }) => (
                        <div class="flex items-center gap-[11px]">
                          <div class="icon">{benefit.svg}</div>
                          <div class="description text-[16px] leading-[22px]">
                            {benefit.description}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        )}
        <div class="w-full text-center">{local.children}</div>
      </div>
    </div>
  );
};

const chunkArray = (array: any[], size: number) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
};

const chunk2Array = (array: any[]) => {
  const chunkedArray = [];
  const end = array.length > 2 ? Math.round(array.length / 2) : array.length;
  chunkedArray.push(array.slice(0, end));
  if (array.length > 2) {
    chunkedArray.push(array.slice(end, end + array.length));
  }
  return chunkedArray;
};

export default Plan;
