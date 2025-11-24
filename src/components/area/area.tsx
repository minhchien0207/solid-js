import { Title } from "@solidjs/meta";
import Radio from "~/components/menu/radio";
import { createStore } from "solid-js/store";

type Area = {
  name: string;
  attr: { name: string; id: string };
  active: boolean;
  children?: any;
  hint?: any;
};

export default function Area({ areas }: { areas: Area[] }) {
  const [stateArea, setStateArea] = createStore<{
    areas: Area[];
    activeId: string;
    activeHintId: string;
  }>({
    areas: areas,
    activeId: "",
    activeHintId: "",
  });

  const selectAreaById = (id: string) =>
    setStateArea({
      activeId: id,
      activeHintId:
        stateArea.activeHintId && stateArea.activeHintId !== id
          ? ""
          : stateArea.activeHintId,
    });
  const selectAreaHintById = (id: string) =>
    setStateArea(
      "activeHintId",
      stateArea.activeHintId === ""
        ? id
        : stateArea.activeHintId === id
          ? ""
          : id,
    );

  return (
    <>
      <Title>Area</Title>
      <div class="flex w-max flex-col gap-2">
        {stateArea.areas.map((area, i) => (
          <Radio
            area={area}
            isActive={stateArea.activeId === area.attr.id}
            // isActiveHint={stateArea.activeHintId === area.attr.id}
            onSelect={() => selectAreaById(area.attr.id)}
            onSelectHint={() => selectAreaHintById(area.attr.id)}
          />
        ))}
      </div>
      {stateArea.activeId &&
      stateArea.areas.find((area) => area.attr.id === stateArea.activeId)
        ?.children ? (
        <div class="w-max gap-2 transition-all duration-300 ease-in-out">
          {
            stateArea.areas.find((area) => area.attr.id === stateArea.activeId)
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
}
