import { Title } from "@solidjs/meta";
import { JSX } from "solid-js";
import Plan from "~/components/plan/Plan";
import { createStore } from "solid-js/store";

type Plan = {
  name?: JSX.Element;
  description?: JSX.Element;
  price?: JSX.Element;
  attr: { name: string; id: string };
  active?: boolean;
  benefits?: {
    svg?: JSX.Element;
    description?: JSX.Element;
  }[];
};

const initialPlan: Plan[] = [
  {
    name: (
      <div class="text-primary text-[24px] leading-[40px] font-bold">
        Easy&nbsp;<span class="text-[#DD252E]">1</span>
      </div>
    ),
    description: "Gói quyền lợi cơ bản",
    price: "220.000 VNĐ",
    attr: { name: "plan[]", id: "easy-1" },
    active: false,
    benefits: [
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/delay.svg" />,
        description: (
          <div class="">
            Trễ chuyến, hủy chuyến bay lên đến{" "}
            <span class="text-primary font-semibold">12.000.000 VNĐ</span>
          </div>
        ),
      },
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/baggage.svg" />,
        description: (
          <div class="">
            Bảo hiểm mất, hư hỏng hành lý lên đến{" "}
            <span class="text-primary font-semibold">24.000.000 VNĐ</span>
          </div>
        ),
      },
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/pa.svg" />,
        description: (
          <div class="">
            Bảo hiểm tai nạn cá nhân lên đến{" "}
            <span class="text-primary font-semibold">1.800.000.000 VNĐ</span>
          </div>
        ),
      },
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/medical.svg" />,
        description: (
          <div class="">
            Bảo hiểm chi phí y tế, điều trị lên đến{" "}
            <span class="text-primary font-semibold">2.400.000.000 VNĐ</span>
          </div>
        ),
      },
    ],
  },
  {
    name: (
      <div class="text-primary text-[24px] leading-[40px] font-bold">
        Easy&nbsp;<span class="text-[#DD252E]">2</span>
      </div>
    ),
    description: "Gói quyền lợi phố biển nhất",
    price: "360.000 VNĐ",
    attr: { name: "plan[]", id: "easy-2" },
    active: false,
    benefits: [
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/delay.svg" />,
        description: (
          <div class="">
            Trễ chuyến, hủy chuyến bay lên đến{" "}
            <span class="text-primary font-semibold">12.000.000 VNĐ</span>
          </div>
        ),
      },
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/baggage.svg" />,
        description: (
          <div class="">
            Bảo hiểm mất, hư hỏng hành lý lên đến{" "}
            <span class="text-primary font-semibold">24.000.000 VNĐ</span>
          </div>
        ),
      },
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/pa.svg" />,
        description: (
          <div class="">
            Bảo hiểm tai nạn cá nhân lên đến{" "}
            <span class="text-primary font-semibold">1.800.000.000 VNĐ</span>
          </div>
        ),
      },
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/medical.svg" />,
        description: (
          <div class="">
            Bảo hiểm chi phí y tế, điều trị lên đến{" "}
            <span class="text-primary font-semibold">2.400.000.000 VNĐ</span>
          </div>
        ),
      },
    ],
  },
  {
    name: (
      <div class="text-primary text-[24px] leading-[40px] font-bold">
        Easy&nbsp;<span class="text-[#DD252E]">3</span>
      </div>
    ),
    description: "Gói quyền lợi tối đa",
    price: "480.000 VNĐ",
    attr: { name: "plan[]", id: "easy-3" },
    active: false,
    benefits: [
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/delay.svg" />,
        description: (
          <div class="">
            Trễ chuyến, hủy chuyến bay lên đến{" "}
            <span class="text-primary font-semibold">12.000.000 VNĐ</span>
          </div>
        ),
      },
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/baggage.svg" />,
        description: (
          <div class="">
            Bảo hiểm mất, hư hỏng hành lý lên đến{" "}
            <span class="text-primary font-semibold">24.000.000 VNĐ</span>
          </div>
        ),
      },
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/pa.svg" />,
        description: (
          <div class="">
            Bảo hiểm tai nạn cá nhân lên đến{" "}
            <span class="text-primary font-semibold">1.800.000.000 VNĐ</span>
          </div>
        ),
      },
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/medical.svg" />,
        description: (
          <div class="">
            Bảo hiểm chi phí y tế, điều trị lên đến{" "}
            <span class="text-primary font-semibold">2.400.000.000 VNĐ</span>
          </div>
        ),
      },
    ],
  },
  {
    name: (
      <div class="text-primary text-[24px] leading-[40px] font-bold">
        Easy&nbsp;<span class="text-[#DD252E]">Visa</span>
      </div>
    ),
    description: "Gói quyền lợi phù hợp xin thị thực",
    price: "172.000 VNĐ",
    attr: { name: "plan[]", id: "easy-visa" },
    active: false,
    benefits: [
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/delay.svg" />,
        description: (
          <div class="">
            Trễ chuyến, hủy chuyến bay{" "}
            <span class="font-semibold text-[#E34F56]">Không bảo hiểm</span>
          </div>
        ),
      },
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/baggage.svg" />,
        description: (
          <div class="">
            Bảo hiểm mất, hư hỏng hành lý{" "}
            <span class="font-semibold text-[#E34F56]">Không bảo hiểm</span>
          </div>
        ),
      },
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/pa.svg" />,
        description: (
          <div class="">
            Bảo hiểm tai nạn cá nhân lên đến{" "}
            <span class="text-primary font-semibold">1.800.000.000 VNĐ</span>
          </div>
        ),
      },
      {
        svg: <img class="w-[40px]" src="/images/benefit/small/medical.svg" />,
        description: (
          <div class="">
            Bảo hiểm chi phí y tế, điều trị lên đến{" "}
            <span class="text-primary font-semibold">2.400.000.000 VNĐ</span>
          </div>
        ),
      },
    ],
  },
];

export default function PlanPage() {
  const [statePlan, setStatePlan] = createStore<{
    plans: Plan[];
    planIdActiveId?: string;
  }>({
    plans: initialPlan,
    planIdActiveId: undefined,
  });

  const selectPlanById = (id: string) => setStatePlan({ planIdActiveId: id });

  return (
    <main>
      <Title>Plan</Title>
      <div class="flex w-full justify-center max-md:flex-col">
        <div
          class={`grid grid-cols-1 gap-6 lg:grid-cols-${statePlan.plans.length >= 6 ? 6 : statePlan.plans.length}`}
        >
          {statePlan.plans.map((plan, i) => (
            <Plan
              plan={plan}
              isActive={statePlan.planIdActiveId === plan.attr.id}
              onSelect={() => selectPlanById(plan.attr.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
