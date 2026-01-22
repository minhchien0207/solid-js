import { Component, splitProps, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Area as AreaType } from '~/types/models';
import { AreaProps } from '~/types/props';

const Area: Component<AreaProps> = (props) => {
  const [local, others] = splitProps(props, ['areas', 'value', 'onSelect']);

  const [stateArea, setStateArea] = createStore<{
    areas: AreaType[];
    value?: string;
    children?: any;
    isSchengen?: boolean;
  }>({
    areas: local.areas,
    value: local.value,
    isSchengen: false,
  });

  const selectArea = (val: string) => {
    const selectedArea = local.areas.find((area) => area.value === val);
    setStateArea({
      value: val,
      children: selectedArea?.children,
      isSchengen: selectedArea?.children ? true : false, // set default in here
    });
    local?.onSelect?.({
      value: val,
      isSchengen: stateArea.isSchengen,
    });
  };

  return (
    <div class="flex flex-col gap-2">
      {stateArea.areas.map((area, i) => (
        <div class="bg-base-100 border-base-300 collapse border">
          <input
            type="radio"
            name={area.attr.name}
            id={area.attr.id}
            checked={stateArea.value === area.value}
            onclick={(e) => {
              e.stopPropagation();
              selectArea(area.value);
            }}
          />
          <div class="collapse-title flex items-center gap-3 font-semibold">
            <input type="radio" checked={stateArea.value === area.value} />{' '}
            <span class="lg:text-lg/[26px]">{area.text}</span>
          </div>
          <div class="collapse-content text-sm text-[#E8191C] opacity-75">
            {area?.hint?.title && (
              <div class="text-[15px] font-semibold">{area.hint.title}</div>
            )}
            {area?.hint?.content && (
              <div class="text-[13px] font-normal text-pretty italic">
                {area.hint.content}
              </div>
            )}
          </div>
        </div>
      ))}
      <Show when={stateArea.children}>
        <div class="gap-2">
          {typeof stateArea.children === 'function'
            ? stateArea.children({
                isSchengen: stateArea.isSchengen ?? false,
                onSchengenChange: (value: boolean) => {
                  setStateArea({ isSchengen: value });
                  local?.onSelect?.({
                    value: stateArea.value!,
                    isSchengen: value,
                  });
                },
              })
            : stateArea.children}
        </div>
      </Show>
    </div>
  );
};

export default Area;
