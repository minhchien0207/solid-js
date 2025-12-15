import { splitProps, Show, createSignal } from 'solid-js';
import { clientOnly } from '@solidjs/start';
import {
  createInputMask,
  createMaskPattern,
} from '@solid-primitives/input-mask';
clientOnly(() => import('cally'));

export default function Date(props: {
  label: string;
  value?: string;
  attr?: { name: string; id: string; placeholder?: string; required?: boolean };
  optional?: { hint?: string };
  onChange: (e: Event) => void;
}) {
  const [local, rest] = splitProps(props, [
    'value',
    'label',
    'optional',
    'attr',
    'onChange',
  ]);

  const [value, setValue] = createSignal(local.value);

  return (
    <>
      <fieldset class="fieldset lg:text-[16px] lg:leading-6">
        <legend
          class="fieldset-legend font-semibold text-[#18171C]"
          classList={{
            'required gap-[3px] after:content-["*"] after:text-red-500':
              local.attr?.required,
          }}
        >
          {local.label}
        </legend>

        <div class="dropdown">
          <input
            type="text"
            tabindex="0"
            class="input rounded-[8px] placeholder:text-[#9191A1] focus:outline-0 lg:px-[16px] lg:py-[12px]"
            value={value() ?? null}
            placeholder={local.attr?.placeholder}
            required={local.attr?.required ?? false}
            name={local.attr?.name}
            id={local.attr?.id}
            onChange={local.onChange}
            autocomplete="off"
            // onInput={createMaskPattern(
            //   createInputMask('9999-99-99'),
            //   () => 'DD/MM/YYYY',
            // )}
          />
          <div
            tabindex="-1"
            class="dropdown-content menu bg-base-100 rounded-box z-1 mt-1 p-2 shadow-sm"
          >
            <calendar-date
              class="cally"
              onchange={(e) => {
                setValue(e.target.value);
                local.onChange(e);
              }}
            >
              <svg
                aria-label="Previous"
                class="size-4 fill-current"
                slot="previous"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
              </svg>
              <svg
                aria-label="Next"
                class="size-4 fill-current"
                slot="next"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
              </svg>
              <calendar-month></calendar-month>
            </calendar-date>
          </div>
        </div>

        <Show when={local.optional?.hint}>
          <p class="label text-[#76758A] lg:text-[14px] lg:leading-[22px]">
            {local.optional?.hint}
          </p>
        </Show>
      </fieldset>
    </>
  );
}
