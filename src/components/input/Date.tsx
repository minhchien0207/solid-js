import { splitProps, Show, createSignal, onMount, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import './Date.css';
import type { DateProps } from '~/types/props';
import IMask from 'imask';

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

const buildIMaskDateConfig = (locale: string) => {
  const { partsOrder, literals, maxValues, minValues } = getDateMask(locale);

  const tokenMap = {
    day: 'DD',
    month: 'MM',
    year: 'YYYY',
  } as const;

  const pattern = partsOrder.map((p) => tokenMap[p]).join(literals);

  return {
    mask: Date,
    pattern,
    lazy: false,
    autofix: true,

    blocks: {
      DD: {
        mask: IMask.MaskedRange,
        from: minValues.day,
        to: maxValues.day,
      },
      MM: {
        mask: IMask.MaskedRange,
        from: minValues.month,
        to: maxValues.month,
      },
      YYYY: {
        mask: IMask.MaskedRange,
        from: minValues.year,
        to: maxValues.year,
      },
    },

    format: (date: Date) => new Intl.DateTimeFormat(locale).format(date),

    parse: (str: string) => {
      const parts = str.split(literals);
      const map: Record<string, number> = {};

      partsOrder.forEach((p, i) => {
        map[p] = Number(parts[i]);
      });

      return new Date(map.year, map.month - 1, map.day);
    },
  };
};

export default function DateInput(props: DateProps) {
  let inputRef!: HTMLInputElement;
  let maskRef: IMask.InputMask<any> | null = null;

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

  onMount(() => {
    import('cally');

    maskRef = IMask(inputRef, buildIMaskDateConfig(navigator.language));
    maskRef.on('accept', () => {
      props.onChange?.(maskRef!.typedValue ?? null);
    });

    const mask = getDateMask(navigator.language);
    setState({
      inputMask: mask.inputMask,
      separator: mask.literals,
    });
  });

  onCleanup(() => {
    maskRef?.destroy();
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
              ref={inputRef}
              inputmode="numeric"
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
