import { splitProps, Show, createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import './Date.css';
import type { DateProps } from '~/types/props';

const getDateMask = (locale: string) => {
  const dtf = new Intl.DateTimeFormat(locale);
  const parts = dtf.formatToParts(new Date());

  return {
    inputMask: `${parts
      .map((p) => {
        if (p.type === 'day') return 'dd';
        if (p.type === 'month') return 'mm';
        if (p.type === 'year') return 'yyyy';
        return p.value;
      })
      .join('')} - ${parts
      .map((p) => {
        if (p.type === 'day') return 'dd';
        if (p.type === 'month') return 'mm';
        if (p.type === 'year') return 'yyyy';
        return p.value;
      })
      .join('')}`,
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
      year: 1900,
    },
  };
};

export default function DateRangeInput(props: DateProps) {
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
    numDate: 0,
  });

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
    // it's "range"
    const dates = target.value.split('/');
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[1]);
    const dtf = new Intl.DateTimeFormat(navigator.language);
    const partsStartDate = dtf.formatToParts(startDate);
    const partsEndDate = dtf.formatToParts(endDate);
    setState({
      value: `${partsStartDate
        .map((p) => {
          if (p.type === 'day') return `0${p.value}`.slice(-2);
          if (p.type === 'month') return `0${p.value}`.slice(-2);
          if (p.type === 'year') return p.value;
          return p.value;
        })
        .join('')} - ${partsEndDate
        .map((p) => {
          if (p.type === 'day') return `0${p.value}`.slice(-2);
          if (p.type === 'month') return `0${p.value}`.slice(-2);
          if (p.type === 'year') return p.value;
          return p.value;
        })
        .join('')}`,
      numDate: Math.round(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1,
      ),
    });
    local.onChange({
      startDate,
      endDate,
    });
    setOpen(false);
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
          <label class="input cursor-pointer rounded-lg outline-0 placeholder:text-[90%] placeholder:text-[#9191A1] lg:px-4">
            <input
              type="text"
              tabindex="0"
              class="grow cursor-pointer focus:outline-0"
              value={state.value}
              placeholder={local?.attr?.placeholder ?? state.inputMask}
              required={local.attr?.required ?? false}
              name={local.attr?.name}
              id={local.attr?.id}
              onChange={local.onChange}
              autocomplete="off"
              readOnly
              onfocus={() => setOpen(true)}
            />
            <div class="size-[15px] bg-[#9191A1] mask-[url('/images/calendar.svg')] mask-center mask-no-repeat"></div>
          </label>
          <Show when={open()}>
            <div
              tabindex="-1"
              class="dropdown-content menu bg-base-100 rounded-box card z-1 mt-1 p-2 shadow-sm"
            >
              <calendar-range
                months="2"
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
                <calendar-month></calendar-month>
                <calendar-month offset="1"></calendar-month>
              </calendar-range>
            </div>
          </Show>
        </div>

        <Show when={local.helper?.hint || state.numDate}>
          <p class="label text-[#76758A] lg:text-sm/[22px]">
            {local.helper?.hint ||
              (state.numDate ? (
                <div>
                  Hành trình của bạn sẽ kéo dài trong{' '}
                  <span class="font-semibold">{state.numDate} ngày</span>.
                </div>
              ) : (
                ''
              ))}
          </p>
        </Show>
      </fieldset>
    </>
  );
}
