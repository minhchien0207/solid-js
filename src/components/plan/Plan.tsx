import { Component, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { PlanProps } from '~/types/props';
import { chunk2Array, numb2CurrencyStr, convertCurrency } from '~/utils';
import './plan.css';
import AnimatedNumber from '~/components/animate/AnimatedNumber';

const formatPlanName = (name: string | any) => {
  if (typeof name === 'string' && name.startsWith('Easy')) {
    const parts = name.split(' ');
    return (
      <>
        {parts[0]}
        {parts.slice(1).map((char) => (
          <>
            &nbsp;<span class="text-secondary">{char}</span>
          </>
        ))}
      </>
    );
  }
  return name;
};

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
      {/* for desktop/tablet */}
      <div
        class={`relative flex cursor-pointer ${layoutGeneral} md:visible]: z-0 gap-6 overflow-hidden rounded-2xl border bg-white transition-all duration-300 xl:hover:scale-[1.05] xl:hover:opacity-100`}
        classList={{
          'xl:w-[299px] p-5': local.style?.layout === 'col',
          'items-center lg:items-start justify-evenly p-15':
            local.style?.layout === 'row',
          'lg:w-[1140px]':
            local.style?.layout === 'row' && statePlan.benefits.length > 1,
          'lg:w-[796px]':
            local.style?.layout === 'row' && statePlan.benefits.length === 1,
          'opacity-100': !local.planIdActiveId, // support for case no plan selected
          'border-transparent opacity-70':
            !local.isActive || !local.planIdActiveId,
          'active max-sm:animate-zoom-in-out xl:animate-zoom-out-in border-[#DD252E]':
            local.isActive,
          'pb-12': local.style?.showImgBottom,
          'max-sm:hidden': !local.mustShow,
        }}
        onClick={local.onSelect}
      >
        {local.isActive && (
          <div class="text-secondary absolute top-0 left-0 w-full rounded-tl-[16px] rounded-tr-[16px] bg-[#F8D3D5] p-1.5 text-center text-lg/[26px] font-semibold">
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
              <div class="name text-primary text-2xl/10 font-bold">
                {formatPlanName(statePlan.data.name)}
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
          {(local.style?.showButton ?? true) && (
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
          )}
        </div>
        {/* Benefit + child plan */}
        <div class="flex flex-col gap-4 md:h-full md:items-start md:justify-between xl:items-center">
          {/* Benefit */}
          {statePlan.data?.benefits && (
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
                      code: string;
                      text?: string;
                      price?: string;
                    }[],
                  ) => (
                    <div class="flex flex-col items-center gap-[11px]">
                      {arrBenefit.map(
                        (benefit: {
                          code: string;
                          text?: string;
                          price?: string;
                        }) => (
                          <div class="flex w-full items-center gap-[11px]">
                            <div class="icon">
                              <img
                                class="md:w-[30px] xl:w-[40px]"
                                src={`/images/benefit/small/${benefit.code}.svg`}
                              />
                            </div>
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
            <div class="text-secondary absolute top-0 left-[30px] -m-4 rounded-full bg-[#F8D3D5] px-3 py-0.5 font-semibold">
              Lựa chọn của bạn
            </div>
          )}
          <div class="flex flex-col">
            <div class="flex items-center justify-between">
              <div class="text-primary text-2xl/10 font-bold">
                {formatPlanName(statePlan.data.name)}
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
                  'bg-[#F8D3D5] text-secondary flex items-center':
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
                    code: string;
                  }[],
                ) => (
                  <div class="flex flex-col gap-[11px]">
                    {arrBenefit.map(
                      (benefit: {
                        code: string;
                        text?: string;
                        price?: string;
                      }) => (
                        <div class="flex items-center gap-[11px]">
                          <div class="w-[20px]">
                            <img
                              class="md:w-[30px] xl:w-[40px]"
                              src={`/images/benefit/small/${benefit.code}.svg`}
                            />
                          </div>
                          <div class="flex w-full justify-between text-base/[22px]">
                            <div class="text-xs">{benefit.text}</div>
                            {benefit.price && (
                              <>
                                lên đến{' '}
                                <div class="text-primary font-semibold">
                                  {numb2CurrencyStr(
                                    Number(benefit.price),
                                    'vn',
                                  )}
                                </div>
                              </>
                            )}
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
