import { Title } from "@solidjs/meta";
import { JSX } from "solid-js";
import Plan from "~/components/plan/Plan";
import { createStore } from "solid-js/store";
import { useSearchParams } from "@solidjs/router";

export type Plan = {
  code?: string;
  name?: JSX.Element;
  description?: JSX.Element;
  price: number | JSX.Element;
  attr?: { name?: string; id?: string };
  active?: boolean;
  benefits?: {
    code?: string;
    svg?: JSX.Element;
    text?: JSX.Element;
    price?: JSX.Element;
    description?: JSX.Element;
    isMax?: boolean;
  }[];
};

const initialPlan: Plan[] = [
  {
    code: "easy-1",
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
      // {
      //   svg: <img class="w-[40px]" src="/images/benefit/small/pa.svg" />,
      //   description: (
      //     <div class="">
      //       Bảo hiểm tai nạn cá nhân lên đến{" "}
      //       <span class="text-primary font-semibold">1.800.000.000 VNĐ</span>
      //     </div>
      //   ),
      // },
      // {
      //   svg: <img class="w-[40px]" src="/images/benefit/small/medical.svg" />,
      //   description: (
      //     <div class="">
      //       Bảo hiểm chi phí y tế, điều trị lên đến{" "}
      //       <span class="text-primary font-semibold">2.400.000.000 VNĐ</span>
      //     </div>
      //   ),
      // },
    ],
  },
  {
    code: "easy-2",
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
    code: "easy-3",
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
    code: "easy-visa",
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
  const [searchParams, setSearchParams] = useSearchParams();
  const rawLayout = searchParams.layout;
  const layout: "row" | "col" =
    typeof rawLayout === "string" &&
    (rawLayout === "row" || rawLayout === "col")
      ? rawLayout
      : "col";

  const [statePlan, setStatePlan] = createStore<{
    plans: Plan[];
    planIdActiveId?: string;
    textHighlight?: string;
    layout?: "row" | "col";
  }>({
    plans: initialPlan,
    planIdActiveId: undefined,
    textHighlight: "Được đề xuất",
    layout,
  });

  const selectPlanById = (id?: string) =>
    setStatePlan({ planIdActiveId: id ?? "" });

  const cols = layout === "row" ? 1 : Math.min(statePlan.plans.length, 6);
  const cls = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  }[cols];

  return (
    <main>
      <Title>Plan</Title>
      <div class="flex w-full justify-center max-md:flex-col">
        <div class={`grid gap-6 max-sm:grid-cols-1 ${cls}`}>
          {statePlan.plans.map((plan, i) => (
            <Plan
              data={plan}
              mustShow={false}
              style={{ layout, showButton: true, showImgBottom: true }}
              textHighlight={statePlan.textHighlight}
              planIdActiveId={statePlan.planIdActiveId}
              isActive={statePlan.planIdActiveId === plan?.attr?.id}
              onSelect={() => selectPlanById(plan?.attr?.id)}
            >
              <a
                href="#"
                class="text-primary text-[16px] leading-[24px] font-semibold"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Xem chi tiết quyền lợi ${toPlainText(plan.name)}`);
                }}
              >
                Xem chi tiết quyền lợi bảo hiểm
              </a>
            </Plan>
          ))}
        </div>
      </div>
    </main>
  );
}

function toPlainText(v: unknown) {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (v instanceof Node) return (v as HTMLElement).textContent || "";
  return String(v);
}
