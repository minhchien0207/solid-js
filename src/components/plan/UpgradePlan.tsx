import { Component, JSX, onMount, splitProps } from "solid-js";
import { createStore } from "solid-js/store";
import { Plan } from "~/routes/plan";
import "./upgrade-plan.css";

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
    "plans",
    "benefits",
    "currentPlan",
    "recommendedPlan",
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
            if (typeof benefit.price === "number") {
              return benefit.price;
            }
            if (typeof benefit.price === "string") {
              return parseInt(benefit.price.replace(/\D/g, "")) || 0;
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
                if (typeof benefit.price === "number") {
                  price = benefit.price;
                } else if (typeof benefit.price === "string") {
                  price = parseInt(benefit.price.replace(/\D/g, "")) || 0;
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
          những chi phí bất ngờ lớn.{" "}
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
            <div class="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border">
              <table class="table">
                <thead>
                  <tr class="bg-[#EEF1FC] text-center">
                    <th class=""></th>
                    {state.plans?.map((plan, index) => (
                      <th class="text-primary text-[16px] leading-[24px] font-bold">
                        {plan.active ? "Gói hiện tại" : plan.name}
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
                              "text-[#9191A1]": !isMax,
                              "text-primary font-semibold": isMax,
                            }}
                          >
                            {price ? (
                              new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(Number(price))
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
            console.log("clicked");
          }}
        >
          {state.plans && state.plans?.length > 1
            ? "Tôi sẽ suy nghĩ thêm"
            : "Đóng"}
        </button>
        {state.plans &&
          state.plans?.length > 1 &&
          state.recommendedPlan &&
          state.currentPlan && (
            <button class="btn btn-primary rounded-[8px] px-[20px] py-[12px] text-[16px] leading-6 font-semibold text-white max-sm:order-1 lg:order-1">
              Nâng cấp gói chỉ với{" "}
              <span class="skeleton skeleton-text font-bold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  Number(state.recommendedPlan.price - state.currentPlan.price),
                )}{" "}
              </span>
              &#8594;
            </button>
          )}
      </div>
    </div>
  );
};

export default UpgradePlan;
