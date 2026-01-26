import { Title } from '@solidjs/meta';
import Plan from '~/components/plan/Plan';
import { createStore } from 'solid-js/store';
import { useSearchParams } from '@solidjs/router';
import { Plan as PlanType } from '~/types/models';
import { toPlainText } from '~/utils';

const initialPlan: PlanType[] = [
  {
    code: 'easy-1',
    name: 'Easy 1',
    description: 'Gói quyền lợi cơ bản',
    price: 220000,
    attr: { name: 'plan[]', id: 'easy-1' },
    active: false,
    benefits: [
      {
        code: 'delay',
        svg: <img class="w-[40px]" src="/images/benefit/small/delay.svg" />,
        text: 'Trễ chuyến, hủy chuyến bay',
        price: 12000000,
      },
      {
        code: 'baggage',
        svg: <img class="w-[40px]" src="/images/benefit/small/baggage.svg" />,
        text: 'Bảo hiểm mất, hư hỏng hành lý',
        price: 24000000,
      },
    ],
  },
  {
    code: 'easy-2',
    name: 'Easy 2',
    description: 'Gói quyền lợi phố biển nhất',
    price: 360000,
    attr: { name: 'plan[]', id: 'easy-2' },
    active: false,
    benefits: [
      {
        code: 'delay',
        svg: <img class="w-[40px]" src="/images/benefit/small/delay.svg" />,
        text: 'Trễ chuyến, hủy chuyến bay',
        price: 12000000,
      },
      {
        code: 'baggage',
        svg: <img class="w-[40px]" src="/images/benefit/small/baggage.svg" />,
        text: 'Bảo hiểm mất, hư hỏng hành lý',
        price: 24000000,
      },
      {
        code: 'pa',
        svg: <img class="w-[40px]" src="/images/benefit/small/pa.svg" />,
        text: 'Bảo hiểm tai nạn cá nhân',
        price: 1800000000,
      },
      {
        code: 'medical',
        svg: <img class="w-[40px]" src="/images/benefit/small/medical.svg" />,
        text: 'Bảo hiểm chi phí y tế, điều trị',
        price: 2400000000,
      },
    ],
  },
  {
    code: 'easy-3',
    name: 'Easy 3',
    description: 'Gói quyền lợi tối đa',
    price: 480000,
    attr: { name: 'plan[]', id: 'easy-3' },
    active: false,
    benefits: [
      {
        code: 'delay',
        svg: <img class="w-[40px]" src="/images/benefit/small/delay.svg" />,
        text: 'Trễ chuyến, hủy chuyến bay',
        price: 12000000,
      },
      {
        code: 'baggage',
        svg: <img class="w-[40px]" src="/images/benefit/small/baggage.svg" />,
        text: 'Bảo hiểm mất, hư hỏng hành lý',
        price: 24000000,
      },
      {
        code: 'pa',
        svg: <img class="w-[40px]" src="/images/benefit/small/pa.svg" />,
        text: 'Bảo hiểm tai nạn cá nhân',
        price: 1800000000,
      },
      {
        code: 'medical',
        svg: <img class="w-[40px]" src="/images/benefit/small/medical.svg" />,
        text: 'Bảo hiểm chi phí y tế, điều trị',
        price: 2400000000,
      },
    ],
  },
  {
    code: 'easy-visa',
    name: 'Easy Visa',
    description: 'Gói quyền lợi phù hợp xin thị thực',
    price: 172000,
    attr: { name: 'plan[]', id: 'easy-visa' },
    active: false,
    benefits: [
      {
        code: 'pa',
        svg: <img class="w-[40px]" src="/images/benefit/small/pa.svg" />,
        text: 'Bảo hiểm tai nạn cá nhân',
        price: 180000000,
      },
      {
        code: 'medical',
        svg: <img class="w-[40px]" src="/images/benefit/small/medical.svg" />,
        text: 'Bảo hiểm chi phí y tế, điều trị',
        price: 2400000000,
      },
      {
        code: 'worldwide-support-247',
        svg: (
          <img
            class="w-[40px]"
            src="/images/benefit/small/worldwide-support-247.svg"
          />
        ),
        text: 'Dịch vụ hỗ trợ du lịch 24/7 của MSIG Việt Nam',
      },
    ],
  },
];

export default function PlanPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawLayout = searchParams.layout;
  const layout: 'row' | 'col' =
    typeof rawLayout === 'string' &&
    (rawLayout === 'row' || rawLayout === 'col')
      ? rawLayout
      : 'col';

  const [statePlan, setStatePlan] = createStore<{
    plans: PlanType[];
    planIdActiveId?: string;
    textHighlight?: string;
    layout?: 'row' | 'col';
  }>({
    plans: initialPlan,
    planIdActiveId: undefined,
    textHighlight: 'Được đề xuất',
    layout,
  });

  const selectPlanById = (id?: string) =>
    setStatePlan({ planIdActiveId: id ?? '' });

  return (
    <main>
      <Title>Plan</Title>
      <div class="flex w-full justify-center max-md:flex-col">
        <div
          class={`grid gap-6 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-${layout === 'row' ? 1 : Math.min(statePlan.plans.length, 6)}`}
        >
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
                class="text-primary text-base/6 font-semibold"
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
