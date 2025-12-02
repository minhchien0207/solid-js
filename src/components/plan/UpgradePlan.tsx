import { Component, JSX, onMount, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Plan } from '~/types/models';
import { convertCurrency, numb2CurrencyStr, toPlainText } from '~/utils';
import './upgrade-plan.css';

type UpgradePlanProps = {
  plans?: Plan[];
  benefits?: {
    code: string;
    text?: JSX.Element;
    svg?: JSX.Element;
    plans: Plan[];
  }[];
  currentPlan?: Plan;
  recommendedPlan?: Plan;
};

const UpgradePlan: Component<UpgradePlanProps> = (props) => {
  const [local, others] = splitProps(props, [
    'plans',
    'benefits',
    'currentPlan',
    'recommendedPlan',
  ]);
  const [state, setState] = createStore<UpgradePlanProps>({
    plans: local.plans,
    benefits: local.benefits,
    currentPlan: local.currentPlan,
    recommendedPlan: local.recommendedPlan,
  });

  onMount(() => {
    setState({
      benefits: state?.benefits?.map((bnf) => {
        const maxPrice = Math.max(
          ...bnf.plans.flatMap((plan) => {
            const benefit = plan.benefits?.find((b) => b.code === bnf.code);
            if (!benefit) return 0;
            if (typeof benefit.price === 'number') {
              return benefit.price;
            }
            if (typeof benefit.price === 'string') {
              return parseInt(benefit.price.replace(/\D/g, '')) || 0;
            }
            return 0;
          }),
        );

        return {
          ...bnf,
          plans: bnf.plans.map((plan) => ({
            ...plan,
            benefits: plan.benefits?.map((benefit) => {
              if (benefit.code === bnf.code) {
                let price = 0;
                if (typeof benefit.price === 'number') {
                  price = benefit.price;
                } else if (typeof benefit.price === 'string') {
                  price = parseInt(benefit.price.replace(/\D/g, '')) || 0;
                }
                return {
                  ...benefit,
                  isMax: price === maxPrice && price > 0,
                };
              }
              return benefit;
            }),
          })),
        };
      }),
    });
  });

  return (
    <div class="flex flex-col items-center transition-all duration-300 lg:w-[900px]">
      <div class="relative z-1 w-full overflow-hidden rounded-t-[16px] lg:h-[296px]">
        <img
          class="w-full lg:absolute lg:-top-[135px] lg:left-0 lg:z-0"
          src="/images/upgrade-plan-background.jpg"
          alt=""
          srcset=""
        />
      </div>
      {/* body */}
      <div class="flex w-full flex-col items-center gap-6 bg-white max-sm:p-6 lg:p-[48px]">
        <div class="text-primary text-center text-[40px] leading-[56px] font-bold">
          Nâng cấp gói quyền lợi
        </div>
        <div class="text-justify text-[16px] leading-[22px] font-normal text-[#18171C]">
          Nâng cấp quyền lợi bảo hiểm để an tâm trải nghiệm trọn vẹn chuyến đi
          của bạn. Được bảo vệ nhiều hơn cho các trường hợp khẩn cấp y tế, hủy
          chuyến, tai nạn cá nhân và mất hành lý. Một bước nhỏ giúp bạn tránh
          những chi phí bất ngờ lớn.{' '}
          <span class="italic">
            Du lịch thoải mái, vì luôn biết rằng bạn đã được bảo vệ toàn diện.
          </span>
        </div>
        <div class="flex w-full flex-row flex-wrap items-center justify-between gap-[18px] text-[16px] leading-[22px] font-normal text-[#18171C] max-sm:justify-center">
          <div class="font-semibold text-[#ADACB9] max-sm:order-1 lg:basis-1/3">
            Bạn sẽ nhận được thêm:
          </div>
          <a
            href="#"
            class="text-primary cursor-pointer font-semibold max-sm:order-3 lg:basis-1/3 lg:text-right"
          >
            Xem chi tiết quyền lợi bảo hiểm
          </a>
          <div class="basis w-full max-sm:order-2">
            <div class="lg:rounded-box lg:border-base-content/5 lg:bg-base-100 lg:overflow-x-auto lg:border">
              {/* for PC */}
              <table class="table max-sm:hidden">
                <thead>
                  <tr class="bg-[#EEF1FC] text-center">
                    <th class=""></th>
                    {state.plans?.map((plan, index) => (
                      <th class="text-primary text-[16px] leading-[24px] font-bold">
                        <div class="items-cente flex flex-col">
                          <div class="text-black">
                            {plan.code === state.currentPlan?.code
                              ? 'Gói hiện tại'
                              : 'Gói nâng cấp'}
                          </div>
                          <span>{plan.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {state.benefits?.map((benefit, index) => (
                    <tr>
                      <td class="w-fit border border-[#E4E3E8] lg:px-3 lg:py-6">
                        <div class="flex items-center gap-[11px]">
                          <div class="icon max-sm:hidden">{benefit.svg}</div>
                          <div class="description text-[16px] leading-[22px]">
                            {benefit.text}
                          </div>
                        </div>
                      </td>
                      {benefit.plans.map((plan, index) => {
                        const { price, isMax } =
                          plan.benefits?.find(
                            (bnf) => bnf.code === benefit.code,
                          ) ?? {};
                        return (
                          <td
                            class="border border-[#E4E3E8] text-center text-[16px] leading-[24px] lg:px-2 lg:py-[22px]"
                            classList={{
                              'text-[#9191A1]': !isMax,
                              'text-primary font-semibold': isMax,
                            }}
                          >
                            {price ? (
                              convertCurrency(Number(price))
                            ) : (
                              <>&#9472;</>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* for mobile */}
              <div class="gap-2 max-sm:grid max-sm:grid-cols-3 lg:hidden">
                <div class="flex items-center justify-center font-bold">
                  Quyền lợi
                </div>
                {state.plans?.map((plan, index) => (
                  <div
                    class="text-primary flex flex-col items-center justify-center rounded-[8px] px-1 py-2 text-[14px] leading-[20px] font-bold"
                    classList={{
                      'bg-[#F3F4F6]': plan.code === state.currentPlan?.code,
                      'bg-primary': plan.code === state.recommendedPlan?.code,
                    }}
                  >
                    <div
                      class=""
                      classList={{
                        'text-[#1F2937]': plan.code === state.currentPlan?.code,
                        'text-white': plan.code === state.recommendedPlan?.code,
                      }}
                    >
                      {plan.code === state.currentPlan?.code
                        ? 'Gói hiện tại'
                        : 'Gói nâng cấp'}
                    </div>
                    <div
                      class=""
                      classList={{
                        'text-[#6B7280]': plan.code === state.currentPlan?.code,
                        'text-[#C7D2FE]':
                          plan.code === state.recommendedPlan?.code,
                      }}
                    >
                      {plan.name}
                    </div>
                  </div>
                ))}
                {state.benefits?.map((benefit, index) => (
                  <>
                    <div
                      class="text-[14px] leading-[22px]"
                      classList={{
                        'm-1': index === 0,
                      }}
                    >
                      {benefit.text}
                    </div>
                    {benefit.plans.map((plan) => {
                      const { price, isMax } =
                        plan.benefits?.find(
                          (bnf) => bnf.code === benefit.code,
                        ) ?? {};
                      return (
                        <div
                          class="flex items-center justify-center text-[16px] leading-[24px]"
                          classList={{
                            'text-[#9191A1]': !isMax,
                            'text-primary font-bold': isMax,
                          }}
                        >
                          {price ? (
                            numb2CurrencyStr(Number(price))
                          ) : (
                            <>&#9472;</>
                          )}
                        </div>
                      );
                    })}
                    {state.benefits && index < state.benefits.length - 1 && (
                      <div class="divider col-span-3 m-0"></div>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div class="flex w-full justify-between gap-6 rounded-b-[16px] bg-[#EEF1FC] px-[48px] py-[32px] max-sm:flex-col lg:flex-row-reverse">
        <button
          class="btn rounded-[8px] px-[20px] py-[12px] text-[16px] leading-6 font-semibold text-[#474653] max-sm:order-2 lg:order-2"
          on:click={(e) => {
            e.stopPropagation();
            console.log('clicked');
          }}
        >
          {state.plans && state.plans?.length > 1
            ? 'Tôi sẽ suy nghĩ thêm'
            : 'Đóng'}
        </button>
        {state.plans &&
          state.plans?.length > 1 &&
          state.recommendedPlan &&
          state.currentPlan && (
            <button class="btn btn-primary rounded-[8px] px-[20px] py-[12px] text-[16px] leading-6 font-semibold text-white max-sm:order-1 lg:order-1">
              Nâng cấp gói chỉ với&nbsp;
              <span class="skeleton skeleton-text font-bold">
                {convertCurrency(
                  Number(state.recommendedPlan.price - state.currentPlan.price),
                )}
              </span>
              &nbsp;&#8594;
            </button>
          )}
      </div>
    </div>
  );
};

export default UpgradePlan;
