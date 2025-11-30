import { Component, splitProps, createEffect } from "solid-js";
import { Title } from "@solidjs/meta";
import { createStore } from "solid-js/store";
import { Area as AreaType } from "~/types/models";
import { AreaProps } from "~/types/props";

const Area: Component<AreaProps> = (props) => {
  const [local, others] = splitProps(props, ["areas", "value", "onSelect"]);

  const [stateArea, setStateArea] = createStore<{
    areas: AreaType[];
    value?: string;
    activeId: string;
  }>({
    areas: local.areas,
    value: local.value,
    activeId: "",
  });

  createEffect(() => {
    const val = local.value;

    setStateArea({
      value: val,
    });
  });

  return (
    <>
      <Title>Area</Title>
      <div class="flex w-max flex-col gap-2">
        {stateArea.areas.map((area, i) => (
          <div class="bg-base-100 border-base-300 collapse border">
            <input
              type="radio"
              name={area.attr.name}
              id={area.attr.id}
              checked={stateArea.value === area.value}
              onclick={(e) => {
                e.stopPropagation();
                local?.onSelect?.(area.value);
              }}
            />
            <div class="collapse-title flex items-center gap-3 font-semibold">
              <input type="radio" checked={stateArea.value === area.value} />{" "}
              <span class="lg:text-[18px] lg:leading-[26px]">{area.text}</span>
            </div>
            <div class="collapse-content text-sm text-[#E8191C] opacity-75">
              {area.hint}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Area;
