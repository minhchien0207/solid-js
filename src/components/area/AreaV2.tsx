import { Title } from "@solidjs/meta";
import Radio from "~/components/menu/Radio";
import { createStore } from "solid-js/store";

type Area = {
  name: string;
  value: string;
  attr: { name: string; id: string };
  active: boolean;
  children?: any;
  hint?: any;
};

export default function Area({ areas }: { areas: Area[] }) {
  const [stateArea, setStateArea] = createStore<{
    areas: Area[];
    value?: string;
  }>({
    areas: areas,
    value: "",
  });

  const selectArea = (value: string) => setStateArea("value", value);

  return (
    <>
      <Title>Area</Title>
      <div class="flex w-max flex-col gap-2">
        {stateArea.areas.map((area, i) => (
          <Radio
            area={area}
            isActive={stateArea.value === area.value}
            onSelect={() => selectArea(area.value)}
          />
        ))}
      </div>
    </>
  );
}
