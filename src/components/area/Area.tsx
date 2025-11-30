import { Component, splitProps, createEffect } from "solid-js";
import { Title } from "@solidjs/meta";
import Radio from "~/components/menu/Radio";
import { createStore } from "solid-js/store";
import { Area as AreaType } from "~/types/models";
import { AreaProps } from "~/types/props";

const Area: Component<AreaProps> = (props) => {
  const [local, others] = splitProps(props, [
    "areas",
    "value",
    "activeHintId",
    "onSelect",
    "onSelectHint",
  ]);

  const [stateArea, setStateArea] = createStore<{
    areas: AreaType[];
    value?: string;
    activeId: string;
    activeHintId: string;
  }>({
    areas: local.areas,
    value: local.value,
    activeId: "",
    activeHintId: "",
  });

  createEffect(() => {
    setStateArea({
      value: local.value,
      activeHintId: local.activeHintId,
    });
  });

  return (
    <>
      <Title>Area</Title>
      <div class="flex w-max flex-col gap-2">
        {stateArea.areas.map((area, i) => (
          <Radio
            area={area}
            isActive={stateArea.value === area.value}
            onSelect={() => local.onSelect?.(area.value)}
            onSelectHint={() => local.onSelectHint?.(area.attr.id)}
          />
        ))}
      </div>
      {stateArea.value &&
      stateArea.areas.find((area) => area.value === stateArea.value)
        ?.children ? (
        <div class="w-max gap-2 transition-all duration-300 ease-in-out">
          {
            stateArea.areas.find((area) => area.value === stateArea.value)
              ?.children
          }
        </div>
      ) : null}
      {stateArea.activeHintId &&
      stateArea.areas.find((area) => area.attr.id === stateArea.activeHintId)
        ?.hint ? (
        <div class="gap-2 rounded-[8px] bg-[#E8191C] p-2 font-light text-white opacity-50 transition-all duration-300 ease-in-out">
          {
            stateArea.areas.find(
              (area) => area.attr.id === stateArea.activeHintId,
            )?.hint
          }
        </div>
      ) : null}
    </>
  );
};

export default Area;
