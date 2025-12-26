import { Component, JSX, splitProps, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { PlanProps } from '~/types/props';
import { chunk2Array, numb2CurrencyStr, convertCurrency } from '~/utils';
import './plan.css';

const Plan: Component<PlanProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'data',
    'textHighlight',
    'style',
    'planIdActiveId',
    'isActive',
    'onSelect',
    'children',
    'mustShow',
  ]);

  const [statePlan, setStatePlan] = createStore({
    data: local.data,
    benefits: chunk2Array(local?.data?.benefits ?? []),
  });

  const layoutGeneral = local.style?.layout
    ? local.style.layout === 'row'
      ? 'max-sm:flex-col lg:flex-row'
      : 'flex-col'
    : 'flex-col';

  const layoutBenefit = local.style?.layout
    ? local.style.layout === 'row'
      ? statePlan.benefits.length > 1
        ? 'max-sm:grid-cols-1 lg:grid-cols-2'
        : 'grid-cols-1'
      : 'grid-cols-1'
    : 'grid-cols-1';

  return (
    <>
      <div
        class={`relative flex cursor-pointer ${layoutGeneral} md:visible]: z-0 gap-6 overflow-hidden rounded-2xl border bg-white transition-all duration-300 lg:hover:scale-[1.05] lg:hover:opacity-100`}
        classList={{
          'lg:w-[299px] p-5': local.style?.layout === 'col',
          'items-center lg:items-start justify-evenly p-15':
            local.style?.layout === 'row',
          'lg:w-[1140px]':
            local.style?.layout === 'row' && statePlan.benefits.length > 1,
          'lg:w-[796px]':
            local.style?.layout === 'row' && statePlan.benefits.length === 1,
          'opacity-100': !local.planIdActiveId, // support for case no plan selected
          'border-transparent opacity-70':
            !local.isActive || !local.planIdActiveId,
          'active max-sm:animate-zoom-in-out lg:animate-zoom-out-in border-[#DD252E]':
            local.isActive,
          'pb-12': local.style?.showImgBottom,
          'max-sm:hidden': !local.mustShow,
        }}
        onClick={local.onSelect}
      >
        <Show when={local.isActive} keyed>
          <div class="absolute top-0 left-0 w-full rounded-tl-[16px] rounded-tr-[16px] bg-[#F8D3D5] p-1.5 text-center text-lg/[26px] font-semibold text-[#DD252E]">
            {local.textHighlight ?? 'Lựa chọn của bạn'}
          </div>
        </Show>

        <Show
          when={
            local.planIdActiveId && local.isActive && local.style?.showImgBottom
          }
          keyed
        >
          <div
            class="absolute bottom-0 left-0 z-[-1] w-full"
            classList={{
              'bottom-0': local.style?.layout === 'col',
              'lg:bottom-[-40px]':
                local.style?.layout === 'row' &&
                statePlan.benefits.length === 1,
              'lg:bottom-[-70px]':
                local.style?.layout === 'row' && statePlan.benefits.length > 1,
              'animate-fade-in': local.isActive,
              'animate-fade-out': !local.isActive,
            }}
          >
            <img src="/images/pc-wave.webp" class="w-full opacity-70" />
          </div>
        </Show>

        <div class="flex w-full flex-col items-center gap-6">
          <div
            class="flex flex-col items-center"
            classList={{
              'gap-4': local.style?.layout === 'row',
              'gap-8': local.style?.layout === 'col',
            }}
          >
            {/* Name + Description */}
            <div
              class="flex flex-col items-center"
              classList={{
                'mt-7': local.style?.layout === 'col',
              }}
            >
              <div class="name text-primary text-2xl/10 font-bold">
                {statePlan.data.name}
              </div>
              <div class="text-light description text-base/[22px] text-[#76758A] italic">
                {statePlan.data.description}
              </div>
            </div>
            {/* Price */}
            <div class="text-primary price text-center text-[40px]/14 font-bold">
              {convertCurrency(statePlan.data.price)}
            </div>
          </div>
          {/* Button */}
          <Show when={local.style?.showButton ?? true} keyed>
            <button
              type="button"
              class="btn w-full rounded-lg"
              classList={{
                'btn-primary text-white': local.isActive,
                'bg-[#EEF1FC] text-primary': !local.isActive,
              }}
              onClick={(e) => {
                e.stopPropagation();
                local.onSelect();
              }}
            >
              {local.isActive ? 'Gói đã chọn' : 'Chọn gói'}
            </button>
          </Show>
        </div>
        {/* Benefit + child plan */}
        <div class="flex flex-col items-center gap-4">
          {/* Benefit */}
          <Show when={statePlan.data?.benefits} keyed>
            <div
              class="flex flex-col gap-[11px]"
              classList={{
                'lg:w-[644px]':
                  local.style?.layout === 'row' &&
                  statePlan.benefits.length > 1,
                'lg:w-[322px]':
                  local.style?.layout === 'row' &&
                  statePlan.benefits.length === 1,
              }}
            >
              <div class="text-lg/[26px] font-semibold text-[#18171C]">
                Gói bảo hiểm bao gồm:
              </div>
              <div
                class={`grid gap-[11px] max-sm:grid-cols-1 ${layoutBenefit}`}
              >
                {statePlan.benefits.map(
                  (
                    arrBenefit: {
                      svg?: JSX.Element;
                      text?: string;
                      price?: string;
                      description?: JSX.Element;
                    }[],
                  ) => (
                    <div class="flex flex-col items-center gap-[11px]">
                      {arrBenefit.map(
                        (benefit: {
                          svg?: JSX.Element;
                          text?: string;
                          price?: string;
                          description?: JSX.Element;
                        }) => (
                          <div class="flex items-center gap-[11px]">
                            <div class="icon">{benefit.svg}</div>
                            <div class="text-base/[22px]">
                              <div>
                                {benefit.text}{' '}
                                <span class="text-primary font-semibold">
                                  {benefit.price &&
                                    new Intl.NumberFormat('vi-VN', {
                                      style: 'currency',
                                      currency: 'VND',
                                    }).format(Number(benefit.price))}
                                </span>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          </Show>
          <div class="w-full text-center">{local.children}</div>
        </div>
      </div>
      {/* for mobile */}
      <Show when={!local.mustShow} keyed>
        <div
          class="relative rounded-lg border-2 bg-white p-4 max-sm:visible md:hidden"
          classList={{
            'border-transparent': !local.isActive,
            'border-[#F8D3D5]': local.isActive,
          }}
          onClick={local.onSelect}
        >
          {local.isActive && (
            <div class="absolute top-0 left-[30px] -m-4 rounded-full bg-[#F8D3D5] px-3 py-0.5 font-semibold text-[#DD252E]">
              Lựa chọn của bạn
            </div>
          )}
          <div class="flex flex-col">
            <div class="flex items-center justify-between">
              <div class="text-primary text-2xl/10 font-bold">
                {statePlan.data.name}
              </div>
              <div class="text-primary text-2xl leading-7 font-bold">
                {convertCurrency(statePlan.data.price)}
              </div>
            </div>
            <div class="flex items-end justify-between">
              <div class="font-light">{statePlan.data.description}</div>
              <button
                type="button"
                class="btn rounded-lg px-5 py-2 text-[17px] font-semibold"
                classList={{
                  'bg-[#F8D3D5] text-[#DD252E] flex items-center':
                    local.isActive,
                  'bg-[#E0E7FF] text-primary': !local.isActive,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  local.onSelect();
                }}
              >
                {local.isActive && (
                  <div class="h-[14px] w-[14px] bg-[#DD252E] mask-[url('/images/success.svg')] mask-center mask-no-repeat"></div>
                )}
                {local.isActive ? 'Đã chọn' : 'Chọn gói'}
              </button>
            </div>
          </div>
          <div class="divider"></div>
          {/* benefit */}
          <div class="flex flex-col gap-[11px]">
            {statePlan.data?.benefits &&
              statePlan.benefits.map(
                (
                  arrBenefit: {
                    svg?: JSX.Element;
                    description?: JSX.Element;
                  }[],
                ) => (
                  <div class="flex flex-col gap-[11px]">
                    {arrBenefit.map(
                      (benefit: {
                        svg?: JSX.Element;
                        text?: string;
                        price?: string;
                        description?: JSX.Element;
                      }) => (
                        <div class="flex items-center gap-[11px]">
                          <div class="w-[20px]">{benefit.svg}</div>
                          <div class="flex w-full justify-between text-base/[22px]">
                            <div class="text-xs">{benefit.text}</div>
                            <div class="text-primary font-semibold">
                              {benefit.price &&
                                numb2CurrencyStr(Number(benefit.price), 'vn')}
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ),
              )}
          </div>
        </div>
      </Show>
    </>
  );
};

export default Plan;
