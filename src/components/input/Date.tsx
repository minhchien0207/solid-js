import { splitProps, Show, createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  createInputMask,
  createMaskPattern,
} from '@solid-primitives/input-mask';
import './Date.css';
import type { DateProps } from '~/types/props';

const getDateMask = (locale: string) => {
  const dtf = new Intl.DateTimeFormat(locale);
  const parts = dtf.formatToParts(new Date());

  const inputMask = parts
    .map((p) => {
      if (p.type === 'day') return 'dd';
      if (p.type === 'month') return 'mm';
      if (p.type === 'year') return 'yyyy';
      return p.value;
    })
    .join('');

  return {
    inputMask,
    literals: parts.find((p) => p.type === 'literal')?.value ?? '-',
    partsOrder: parts
      .filter((p) => ['day', 'month', 'year'].includes(p.type))
      .map((p) => p.type), // Thứ tự: ['month', 'day', 'year'] hoặc tương tự
    maxValues: {
      day: 31,
      month: 12,
      year: 2099,
    },
    minValues: {
      day: 1,
      month: 1,
      year: 1000, // Giả sử min year, điều chỉnh nếu cần
    },
  };
};

// Custom mask function cho createInputMask
const createDateMaskFunction = (mask: ReturnType<typeof getDateMask>) => {
  const { inputMask, literals, partsOrder, maxValues, minValues } = mask;
  const partLengths = { day: 2, month: 2, year: 4 };
  const separator = literals;

  return (
    value: string,
    selection: [number, number],
  ): [string, [number, number]] => {
    const cleanValue = value.replace(new RegExp(`\\${separator}`, 'g'), ''); // Bỏ separators để parse digits
    if (!/^\d*$/.test(cleanValue)) {
      // Chỉ cho digits, reject non-digit
      return [value.slice(0, -1), selection];
    }

    // Xây dựng newValue với separators
    let newValue = '';
    let digitIndex = 0;
    for (const char of inputMask) {
      if (char === 'd' || char === 'm' || char === 'y') {
        newValue += cleanValue[digitIndex] || '_'; // Placeholder nếu chưa đủ
        digitIndex++;
      } else {
        newValue += separator;
      }
    }

    // Parse các phần hoàn chỉnh
    const parts: { [key: string]: number | null } = {};
    let offset = 0;
    for (const partType of partsOrder) {
      const length = partLengths[partType];
      const partStr = cleanValue.slice(offset, offset + length);
      if (partStr.length === length) {
        // Chỉ validate khi phần hoàn chỉnh
        const partNum = parseInt(partStr, 10);
        const min = minValues[partType];
        const max = maxValues[partType];
        if (isNaN(partNum) || partNum < min || partNum > max) {
          // Invalid: reject bằng cách return value cũ (bỏ digit cuối)
          return [value.slice(0, -1), [selection[0] - 1, selection[1] - 1]];
        }
        parts[partType] = partNum;
      }
      offset += length;
    }

    // Nếu valid, format với separators thực tế
    newValue = '';
    digitIndex = 0;
    for (let i = 0; i < inputMask.length; i++) {
      const char = inputMask[i];
      if (char === 'd' || char === 'm' || char === 'y') {
        newValue += cleanValue[digitIndex] || '';
        digitIndex++;
      } else if (digitIndex < cleanValue.length) {
        newValue += separator;
      }
    }

    // Adjust selection (cursor) để giữ vị trí
    const newStart = selection[0] + (newValue.length - value.length);
    const newEnd = selection[1] + (newValue.length - value.length);

    return [newValue, [newStart, newEnd]];
  };
};

export default function DateInput(props: DateProps) {
  const [local, rest] = splitProps(props, [
    'value',
    'label',
    'helper',
    'attr',
    'onChange',
  ]);

  const [open, setOpen] = createSignal(false);
  const [state, setState] = createStore({
    value: local.value ?? '',
    inputMask: '',
    separator: '',
  });

  const customMaskFn = createDateMaskFunction(getDateMask(navigator.language));

  onMount(() => {
    import('cally');
    const mask = getDateMask(navigator.language);
    setState({
      inputMask: mask.inputMask,
      separator: mask.literals,
    });
  });

  const handleDateChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const date = new Date(target.value);
    const dtf = new Intl.DateTimeFormat(navigator.language);
    const parts = dtf.formatToParts(date);
    setState({
      value: parts
        .map((p) => {
          if (p.type === 'day') return `0${p.value}`.slice(-2);
          if (p.type === 'month') return `0${p.value}`.slice(-2);
          if (p.type === 'year') return p.value;
          return p.value;
        })
        .join(''),
    });
    local.onChange(e);
    setOpen(false);
  };

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
          <label
            for={local.attr?.id}
            id={`${local.attr?.id}-pattern-view`}
          ></label>
          <label class="input rounded-[8px] outline-0 placeholder:text-[#9191A1] lg:px-[16px]">
            <input
              type="text"
              tabindex="0"
              class="placeholder:text-[13px] focus:outline-0"
              value={state.value}
              placeholder={state.inputMask}
              required={local.attr?.required ?? false}
              name={local.attr?.name}
              id={local.attr?.id}
              onChange={local.onChange}
              autocomplete="off"
              onInput={createMaskPattern(
                createInputMask(customMaskFn),
                () => state.inputMask,
              )}
              onfocus={() => setOpen(true)}
            />
            <div class="h-[15px] w-[15px] bg-[#9191A1] mask-[url('/images/calendar.svg')] mask-center mask-no-repeat"></div>
          </label>
          <Show when={open()}>
            <div
              tabindex="-1"
              class="dropdown-content menu bg-base-100 rounded-box card z-1 mt-1 p-2 shadow-sm"
            >
              <calendar-date
                class="cally cally-custom"
                onchange={(e) => {
                  e.stopPropagation();
                  handleDateChange(e);
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
                <calendar-select-year class="flex w-fit items-center justify-center"></calendar-select-year>
                <calendar-select-month class="flex w-fit items-center justify-center"></calendar-select-month>
                <calendar-month></calendar-month>
              </calendar-date>
            </div>
          </Show>
        </div>

        <Show when={local.helper?.hint}>
          <p class="label text-[#76758A] lg:text-[14px] lg:leading-[22px]">
            {local.helper?.hint}
          </p>
        </Show>
      </fieldset>
    </>
  );
}
