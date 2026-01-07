import type { PolicyTypeProps } from "~/types/props";
import { Show, createSignal, createEffect, splitProps } from "solid-js";
import { createStore } from "solid-js/store";

const PolicyType = (props: PolicyTypeProps) => {
  const [local, others] = splitProps(props, ["types", "onSelect"]);

  const [policyType, setPolicyType] = createSignal("");
  const [adults, setAdults] = createSignal(1);
  const [children, setChildren] = createSignal(0);

  const handleSelectPolicyType = (value: string) => {
    const type = local.types.find((type) => type.value === value);

    setPolicyType(value);
    setAdults(type?.adults?.default || 1);
    setChildren(type?.children?.default || 0);

    props.onSelect?.({
      type: value,
      adults: adults(),
      children: children(),
    });
  };

  const handleSelectAdults = (value: number) => {
    const type = local.types.find((type) => type.value === policyType());
    const max = type?.max || 1;
    setAdults((prev) => {
      if (
        (type?.adults?.min && value < type?.adults?.min) ||
        (type?.adults?.max && value > type?.adults?.max) ||
        value + children() > max
      ) {
        return prev;
      }
      return type?.adults?.min && value <= type?.adults?.min
        ? type?.adults?.min
        : value;
    });

    props.onSelect?.({
      type: policyType(),
      adults: adults(),
      children: children(),
    });
  };

  const handleSelectChildren = (value: number) => {
    const type = local.types.find((type) => type.value === policyType());
    const max = type?.max || 1;
    const minChild = type?.children?.min || 0;
    setChildren((prev) => {
      if (
        value < minChild ||
        (type?.children?.max && value > type?.children?.max) ||
        value + adults() > max
      ) {
        return prev;
      }
      return value <= minChild ? minChild : value;
    });

    props.onSelect?.({
      type: policyType(),
      adults: adults(),
      children: children(),
    });
  };

  return (
    <div class="flex flex-col gap-2 text-base/normal lg:min-w-[640px]">
      {local.types.map((type) => (
        <>
          <div
            class="flex cursor-pointer items-center gap-3 rounded-lg bg-white p-4"
            on:click={() => handleSelectPolicyType(type.value)}
          >
            <input
              type="radio"
              value={type.value}
              name="policy_type"
              id={type.value}
              checked={policyType() === type.value}
              on:click={(e) => {
                e.stopPropagation();
                handleSelectPolicyType(type.value);
              }}
            />
            <label
              class="cursor-pointer font-semibold"
              for={type.value}
              on:click={(e) => {
                e.stopPropagation();
              }}
            >
              {type.text}
            </label>
          </div>
          <Show when={policyType() && policyType() === type.value}>
            {(type?.hint || (type?.min && type.min > 1)) && (
              <div class="flex flex-col gap-3 rounded-lg bg-white p-4">
                {type?.adults && (
                  <div class="flex justify-between">
                    <div class="flex flex-col text-[#18171C]">
                      {type.adults?.text && (
                        <span class="font-semibold">{type.adults.text}:</span>
                      )}
                      {type.adults?.hint && (
                        <span class="text-sm/snug font-light">
                          {type.adults.hint}
                        </span>
                      )}
                    </div>
                    <div class="grid grid-cols-3 place-items-center gap-3">
                      <button
                        class="btn size-9 rounded-lg bg-white font-light text-[#474653]"
                        on:click={() => handleSelectAdults(adults() - 1)}
                      >
                        -
                      </button>
                      <span class="font-semibold text-[#18171C]">
                        {adults()}
                      </span>
                      <button
                        class="btn size-9 rounded-lg bg-white font-light text-[#474653]"
                        on:click={() => handleSelectAdults(adults() + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
                {type?.children && (
                  <div class="flex justify-between">
                    <div class="flex flex-col text-[#18171C]">
                      {type.children?.text && (
                        <span class="font-semibold">{type.children.text}:</span>
                      )}
                      {type.children?.hint && (
                        <span class="text-sm/snug font-light">
                          {type.children.hint}
                        </span>
                      )}
                    </div>
                    <div class="grid grid-cols-3 place-items-center gap-3">
                      <button
                        class="btn size-9 rounded-lg bg-white font-light text-[#474653]"
                        on:click={() => handleSelectChildren(children() - 1)}
                      >
                        -
                      </button>
                      <span class="font-semibold text-[#18171C]">
                        {children()}
                      </span>
                      <button
                        class="btn size-9 rounded-lg bg-white font-light text-[#474653]"
                        on:click={() => handleSelectChildren(children() + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
                {type?.hint && (
                  <div class="text-center text-base/[26px] font-semibold text-[#C23232] italic">
                    {type.hint.split("\n").map((line, index) => {
                      const currentType = local.types.find(
                        (type) => type.value === policyType(),
                      );
                      const maxAdult = currentType?.adults?.max || 1;
                      const maxChildren = currentType?.children?.max || 0;
                      const max = currentType?.max || maxAdult + maxChildren;
                      return (
                        <>
                          {line
                            .replace("%adults", maxAdult.toString())
                            .replace("%children", maxChildren.toString())
                            .replace("%d", max.toString())}
                          {type?.hint &&
                            index < type.hint.split("\n").length - 1 && <br />}
                        </>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </Show>
        </>
      ))}
    </div>
  );
};

export default PolicyType;
