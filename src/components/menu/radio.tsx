import { Component, JSX, mergeProps, splitProps } from "solid-js";
import "./radio.css";

type Props = {
  area: {
    name?: string;
    attr?: {
      name?: string;
      id?: string;
    };
    hint?: any;
    children?: any;
  };
  isActive: boolean;
  isActiveHint: boolean;
  onSelect: () => void;
  onSelectHint: () => void;
  children?: any;
};

const Radio: Component<Props> = (props) => {
  const [local, rest] = splitProps(props, [
    "area",
    "isActive",
    "onSelect",
    "onSelectHint",
    "isActiveHint",
  ]);

  return (
    <>
      <div
        class="flex flex-row items-center gap-2 rounded-[8px] bg-white p-5"
        on:click={local.onSelect}
      >
        <input
          type="radio"
          name={local.area.attr?.name}
          id={local.area.attr?.id}
          checked={local.isActive}
          on:click={(e) => {
            e.stopPropagation();
            local.onSelect();
          }}
        />
        <label
          for={local.area.attr?.id}
          on:click={(e) => {
            e.stopPropagation();
          }}
        >
          {local.area.name}
        </label>
        <div class="info cursor-pointer" on:click={local.onSelectHint}>
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
      </div>
      {local.isActive && local.area.children ? (
        <div class="gap-2 transition-all duration-300 ease-in-out">
          {local.area.children}
        </div>
      ) : null}
      {local.isActiveHint && local.area.hint ? (
        <div class="gap-2 rounded-[8px] bg-[#E8191C] p-2 font-light text-white opacity-50 transition-all duration-300 ease-in-out">
          {local.area.hint}
        </div>
      ) : null}
    </>
  );
};

export default Radio;
