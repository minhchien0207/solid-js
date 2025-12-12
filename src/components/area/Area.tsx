import { Component, splitProps, createEffect, Show } from 'solid-js';
import { Title } from '@solidjs/meta';
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
    activeId: string;
    activeHintId: string;
  }>({
    areas: local.areas,
    value: local.value,
    activeId: '',
    activeHintId: '',
  });

  createEffect(() => {
    const val = local.value;
    const hintId = local.activeHintId;

    setStateArea({
      value: val,
      activeHintId: hintId,
    });
  });

  return (
    <>
      <Title>Area</Title>
      <div class="flex w-max flex-col gap-2">
        {stateArea.areas.map((area, i) => (
          <div
            class="flex cursor-pointer flex-row items-center gap-2 rounded-[8px] bg-white p-5"
            on:click={() => local.onSelect?.(area.value)}
          >
            <input
              type="radio"
              value={area.value}
              name={area.attr?.name}
              id={area.attr?.id}
              checked={stateArea.value === area.value}
              on:click={(e) => {
                e.stopPropagation();
                local?.onSelect?.(area.value);
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
            <Show when={area.hint}>
              <div
                class="info cursor-pointer"
                on:click={(e) => {
                  e.stopPropagation();
                  local?.onSelectHint?.(area.attr.id);
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
            </Show>
          </div>
        ))}
      </div>
      <Show
        when={
          stateArea.value &&
          stateArea.areas.find((area) => area.value === stateArea.value)
            ?.children
        }
        keyed
      >
        <div class="w-max gap-2 transition-all duration-300 ease-in-out">
          {
            stateArea.areas.find((area) => area.value === stateArea.value)
              ?.children
          }
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
        <div class="gap-2 rounded-[8px] bg-[#E8191C] p-2 font-light text-white opacity-50 transition-all duration-300 ease-in-out">
          {
            stateArea.areas.find(
              (area) => area.attr.id === stateArea.activeHintId,
            )?.hint
          }
        </div>
      </Show>
    </>
  );
};

export default Area;
