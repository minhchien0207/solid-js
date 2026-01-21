import { Component, splitProps } from 'solid-js';
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
    });
    local?.onSelect?.({
      value: val,
      isSchengen: stateArea.isSchengen,
    });
  };

  return (
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
              <div class="text-[13px] font-normal italic">
                {area.hint.content}
              </div>
            )}
          </div>
        </div>
      ))}
      {stateArea.children && (
        <div class="w-max gap-2 transition-all duration-300 ease-in-out">
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
      )}
    </div>
  );
};

export default Area;
