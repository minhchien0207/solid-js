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
      .map((p) => p.type as 'day' | 'month' | 'year'),
    maxValues: {
      day: 31,
      month: 12,
      year: 2099,
    },
    minValues: {
      day: 1,
      month: 1,
      year: 1000,
    },
  };
};

const buildIMaskDateConfig = (locale: string) => {
  const { partsOrder, literals, maxValues, minValues } = getDateMask(locale);

  const tokenMap: {
    day: string;
    month: string;
    year: string;
  } = {
    day: 'DD',
    month: 'MM',
    year: 'YYYY',
  };

  const pattern = partsOrder.map((p) => tokenMap[p]).join(literals);

  // TẠO MAP ĐỂ PARSE ĐÚNG THỨ TỰ
  const parseMap: Record<string, number> = {};
  partsOrder.forEach((type, index) => {
    parseMap[type] = index;
  });

  return {
    mask: pattern,
    lazy: false,
    autofix: false,

    blocks: {
      DD: {
        mask: IMask.MaskedRange,
        from: minValues.day,
        to: maxValues.day,
        maxLength: 2,
      },
      MM: {
        mask: IMask.MaskedRange,
        from: minValues.month,
        to: maxValues.month,
        maxLength: 2,
      },
      YYYY: {
        mask: IMask.MaskedRange,
        from: minValues.year,
        to: maxValues.year,
        maxLength: 4,
      },
    },

    // Transforms value before mask processing
    prepare: (value: string) => {
      return value;
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
    locale: navigator.language,
    inputMask: '',
    separator: '',
  });

  onMount(() => {
    import('cally');
    const mask = getDateMask(state.locale);

    maskRef = IMask(inputRef, buildIMaskDateConfig(state.locale));

    // Lắng nghe sự kiện khi giá trị thay đổi
    maskRef.on('accept', () => {
      const unmaskedValue = maskRef!.unmaskedValue;
      console.log(maskRef);

      // Chỉ gọi onChange khi đã nhập đủ
      if (unmaskedValue.length === 8) {
        // ddmmyyyy = 8 ký tự
        const parts = maskRef!.value.split(mask.literals);

        if (parts.length === 3) {
          // Parse theo thứ tự của locale
          const dateMap: Record<string, number> = {};
          mask.partsOrder.forEach((type, index) => {
            dateMap[type] = parseInt(parts[index]) || 0;
          });

          // Tạo Date object
          const date = new Date(dateMap.year, dateMap.month - 1, dateMap.day);

          // Kiểm tra date hợp lệ
          if (!isNaN(date.getTime())) {
            setState({
              value: `${dateMap.year}-${`0${dateMap.month}`.slice(-2)}-${`0${dateMap.day}`.slice(-2)}`,
            });

            props.onChange?.(date);
          }
        }
      }
    });

    setState({
      inputMask: mask.inputMask,
      separator: mask.literals,
    });

    // Set giá trị ban đầu nếu có
    if (local.value) {
      maskRef.value = local.value;
    }
  });

  onCleanup(() => {
    maskRef?.destroy();
  });

  const handleDateChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const date = new Date(target.value);

    if (!isNaN(date.getTime())) {
      const dtf = new Intl.DateTimeFormat(state.locale);
      const parts = dtf.formatToParts(date);
      const dateFormat = parts
        .map((p) => {
          if (p.type === 'day') return `0${p.value}`.slice(-2);
          if (p.type === 'month') return `0${p.value}`.slice(-2);
          if (p.type === 'year') return p.value;
          return p.value;
        })
        .join('');

      setState({
        value: target.value,
      });

      // Cập nhật mask input
      if (maskRef) {
        maskRef.value = dateFormat;
      }

      local.onChange?.(e);
      setOpen(false);
    }
  };

  return (
    <>
      <fieldset class="fieldset lg:text-base lg:leading-6">
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
          <label class="input rounded-lg outline-0 placeholder:text-[#9191A1] lg:px-4">
            <input
              ref={inputRef}
              inputmode="numeric"
              type="text"
              tabindex="0"
              class="placeholder:text-[13px] focus:outline-0"
              placeholder={state.inputMask}
              required={local.attr?.required ?? false}
              name={local.attr?.name}
              id={local.attr?.id}
              autocomplete="off"
              onfocus={() => setOpen(true)}
            />
            <div class="size-[15px] bg-[#9191A1] mask-[url('/images/calendar.svg')] mask-center mask-no-repeat"></div>
          </label>
          <Show when={open()}>
            <div
              tabindex="-1"
              class="dropdown-content menu bg-base-100 rounded-box card z-1 mt-1 p-2 shadow-sm"
            >
              <calendar-date
                class="cally cally-custom"
                value={state.value}
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
          <p class="label text-[#76758A] lg:text-sm/[22px]">
            {local.helper?.hint}
          </p>
        </Show>
      </fieldset>
    </>
  );
}
