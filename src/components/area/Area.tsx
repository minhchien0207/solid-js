import { Component, splitProps, createEffect, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Area as AreaType } from '~/types/models';
import { AreaProps } from '~/types/props';

const Area: Component<AreaProps> = (props) => {
  const [local, others] = splitProps(props, [
    'areas',
    'value',
    'activeHintId',
    'onSelect',
    'onSelectHint',
  ]);

  const [stateArea, setStateArea] = createStore<{
    areas: AreaType[];
    value?: string;
    activeId?: string;
    children?: any;
    activeHintId?: string;
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
      activeHintId:
        stateArea.activeHintId &&
        stateArea.activeHintId === selectedArea?.attr?.id
          ? selectedArea?.attr?.id
          : undefined,
      isSchengen: selectedArea?.children ? true : false, // set default in here
    });
    local?.onSelect?.({
      value: val,
      isSchengen: selectedArea?.children ? true : false,
    });
  };

  const showHint = (id: string) => {
    setStateArea({
      activeHintId:
        stateArea.activeHintId && stateArea.activeHintId === id
          ? undefined
          : id,
    });
  };

  return (
    <>
      <div class="flex w-max flex-col gap-2">
        {local.areas.map((area, i) => (
          <div
            class="flex cursor-pointer flex-row items-center gap-2 rounded-lg bg-white p-5"
            on:click={() => selectArea(area.value)}
          >
            <input
              type="radio"
              value={area.value}
              name={area.attr?.name}
              id={area.attr?.id}
              checked={stateArea.value === area.value}
              on:click={(e) => {
                e.stopPropagation();
                selectArea(area.value);
              }}
            />
            <label
              class="cursor-pointer font-semibold"
              for={area.attr?.id}
              on:click={(e) => {
                e.stopPropagation();
              }}
            >
              {area.text}
            </label>
            {area.hint && (
              <div
                class="info cursor-pointer"
                on:click={(e) => {
                  e.stopPropagation();
                  showHint(area.attr?.id);
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66667 13.3334C2.98467 13.3334 0 10.3487 0 6.66667C0 2.98467 2.98467 0 6.66667 0C10.3487 0 13.3334 2.98467 13.3334 6.66667C13.3334 10.3487 10.3487 13.3334 6.66667 13.3334ZM6 6V9.99997H7.33333V6H6ZM6 3.33333V4.66667H7.33333V3.33333H6Z"
                    fill="#5A5A5A"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      <Show when={stateArea.children} keyed>
        <div class="w-max gap-2 transition-all duration-300 ease-in-out">
          {stateArea.children}
        </div>
      </Show>
      <Show
        when={
          stateArea.activeHintId &&
          stateArea.areas.find(
            (area) => area.attr.id === stateArea.activeHintId,
          )?.hint
        }
        keyed
      >
        <div class="gap-2 rounded-lg bg-[#E8191C] p-2 font-light text-white opacity-50 transition-all duration-300 ease-in-out">
          {Object.entries(
            stateArea.areas.find(
              (area) => area.attr.id === stateArea.activeHintId,
            )?.hint ?? {},
          ).map(([key, value]) => (
            <>
              {key === 'title' && (
                <div class="text-[15px] font-semibold">{value}</div>
              )}
              {key === 'content' && (
                <div class="text-[13px] font-normal text-pretty italic">
                  {value}
                </div>
              )}
            </>
          ))}
        </div>
      </Show>
    </>
  );
};

export default Area;
