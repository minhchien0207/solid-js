import { Component, JSX, onMount, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { PlanProps } from '~/types/props';
import { chunk2Array, numb2CurrencyStr, convertCurrency } from '~/ulties';
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
        class={`relative flex cursor-pointer ${layoutGeneral} md:visible]: z-0 gap-6 overflow-hidden rounded-[16px] border bg-white transition-all duration-300 lg:hover:scale-[1.05] lg:hover:opacity-100`}
        classList={{
          'lg:w-[299px] p-5': local.style?.layout === 'col',
          'items-center justify-evenly p-15': local.style?.layout === 'row',
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
        {local.isActive && (
          <div class="absolute top-0 left-0 w-full rounded-tl-[16px] rounded-tr-[16px] bg-[#F8D3D5] p-[6px] text-center text-[18px] leading-[26px] font-semibold text-[#DD252E]">
            {local.textHighlight ?? 'Lựa chọn của bạn'}
          </div>
        )}

        {local.planIdActiveId &&
          local.isActive &&
          local.style?.showImgBottom && (
            <div
              class="absolute bottom-0 left-0 z-[-1] w-full"
              classList={{
                'bottom-0': local.style?.layout === 'col',
                'lg:bottom-[-40px]':
                  local.style?.layout === 'row' &&
                  statePlan.benefits.length === 1,
                'lg:bottom-[-70px]':
                  local.style?.layout === 'row' &&
                  statePlan.benefits.length > 1,
                'animate-fade-in': local.isActive,
                'animate-fade-out': !local.isActive,
              }}
            >
              <img src="/images/pc-wave.webp" class="w-full opacity-70" />
            </div>
          )}

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
              <div class="name">{statePlan.data.name}</div>
              <div class="text-light description text-[16px] leading-[22px] text-[#76758A] italic">
                {statePlan.data.description}
              </div>
            </div>
            {/* Price */}
            <div class="text-primary price text-center text-[40px] leading-[56px] font-bold">
              {convertCurrency(statePlan.data.price)}
            </div>
          </div>
          {/* Button */}
          {(local.style?.showButton ?? true) && (
            <button
              type="button"
              class="btn w-full rounded-[8px]"
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
          )}
        </div>
        {/* Benefit + child plan */}
        <div class="flex flex-col items-center gap-4">
          {/* Benefit */}
          {statePlan.data?.benefits && (
            <div
              class="flex flex-col gap-[22px]"
              classList={{
                'lg:w-[644px]':
                  local.style?.layout === 'row' &&
                  statePlan.benefits.length > 1,
                'lg:w-[322px]':
                  local.style?.layout === 'row' &&
                  statePlan.benefits.length === 1,
              }}
            >
              <div class="text-[18px] leading-[26px] font-semibold text-[#18171C]">
                Gói bảo hiểm bao gồm:
              </div>
              <div
                class={`grid gap-[22px] max-sm:grid-cols-1 ${layoutBenefit}`}
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
                            <div class="text-[16px] leading-[22px]">
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
          )}
          <div class="w-full text-center">{local.children}</div>
        </div>
      </div>
      {/* for mobile */}
      {!local.mustShow && (
        <div
          class="relative rounded-lg border-2 bg-white p-4 max-sm:visible md:hidden"
          classList={{
            'border-transparent': !local.isActive,
            'border-[#F8D3D5]': local.isActive,
          }}
          onClick={local.onSelect}
        >
          {local.isActive && (
            <div class="absolute top-0 left-[30px] -m-4 rounded-full bg-[#F8D3D5] px-[12px] py-[2px] font-semibold text-[#DD252E]">
              Lựa chọn của bạn
            </div>
          )}
          <div class="flex flex-col">
            <div class="flex items-center justify-between">
              <div class="">{statePlan.data.name}</div>
              <div class="text-primary text-2xl leading-7 font-bold">
                {convertCurrency(statePlan.data.price)}
              </div>
            </div>
            <div class="flex items-end justify-between">
              <div class="font-light">{statePlan.data.description}</div>
              <button
                type="button"
                class="btn rounded-[8px] px-[20px] py-[8px] text-[17px] font-semibold"
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
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.73333 9.7335L10.4333 5.0335L9.5 4.10016L5.73333 7.86683L3.83333 5.96683L2.9 6.90016L5.73333 9.7335ZM6.66667 13.3335C5.74444 13.3335 4.87778 13.1585 4.06667 12.8085C3.25556 12.4585 2.55 11.9835 1.95 11.3835C1.35 10.7835 0.875 10.0779 0.525 9.26683C0.175 8.45572 0 7.58905 0 6.66683C0 5.74461 0.175 4.87794 0.525 4.06683C0.875 3.25572 1.35 2.55016 1.95 1.95016C2.55 1.35016 3.25556 0.875162 4.06667 0.525162C4.87778 0.175162 5.74444 0.000162125 6.66667 0.000162125C7.58889 0.000162125 8.45556 0.175162 9.26667 0.525162C10.0778 0.875162 10.7833 1.35016 11.3833 1.95016C11.9833 2.55016 12.4583 3.25572 12.8083 4.06683C13.1583 4.87794 13.3333 5.74461 13.3333 6.66683C13.3333 7.58905 13.1583 8.45572 12.8083 9.26683C12.4583 10.0779 11.9833 10.7835 11.3833 11.3835C10.7833 11.9835 10.0778 12.4585 9.26667 12.8085C8.45556 13.1585 7.58889 13.3335 6.66667 13.3335ZM6.66667 12.0002C8.15556 12.0002 9.41667 11.4835 10.45 10.4502C11.4833 9.41683 12 8.15572 12 6.66683C12 5.17794 11.4833 3.91683 10.45 2.8835C9.41667 1.85016 8.15556 1.3335 6.66667 1.3335C5.17778 1.3335 3.91667 1.85016 2.88333 2.8835C1.85 3.91683 1.33333 5.17794 1.33333 6.66683C1.33333 8.15572 1.85 9.41683 2.88333 10.4502C3.91667 11.4835 5.17778 12.0002 6.66667 12.0002Z"
                      fill="#DD252E"
                    />
                  </svg>
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
                          <div class="flex w-full justify-between text-[16px] leading-[22px]">
                            <div class="text-[12px]">{benefit.text}</div>
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
      )}
    </>
  );
};

export default Plan;
