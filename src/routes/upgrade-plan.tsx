import { Title } from '@solidjs/meta';
import { JSX } from 'solid-js';
import { createStore } from 'solid-js/store';
import UpgradePlan from '../components/plan/UpgradePlan';
import { Plan } from '~/types/models';

const initialPlan: Plan[] = [
  {
    code: 'easy-1',
    name: 'Easy 1',
    price: 220000,
    active: true,
    benefits: [
      {
        code: 'DELAY',
        svg: <img src="/images/benefit/small/delay.svg" class="" alt="" />,
        text: 'Bảo hiểm trễ, hủy chuyến bay',
        price: 12000000,
      },
      {
        code: 'BAGGAGE',
        svg: <img src="/images/benefit/small/baggage.svg" class="" alt="" />,
        text: 'Bảo hiểm mất, hư hỏng hành lý',
        price: 24000000,
      },
      {
        code: 'PA',
        svg: <img src="/images/benefit/small/pa.svg" class="" alt="" />,
        text: 'Bảo hiểm tai nạn cá nhân',
        price: 1800000000,
      },
      {
        code: 'MEDICAL',
        svg: <img src="/images/benefit/small/medical.svg" class="" alt="" />,
        text: 'Bảo hiểm chi phí y tế, điều trị',
        price: 2100000000,
      },
      {
        code: 'MEDICAL2',
        svg: <img src="/images/benefit/small/medical.svg" class="" alt="" />,
        text: 'Bảo hiểm chi phí y tế, điều trị',
        price: 10000,
      },
    ],
  },
  {
    code: 'easy-2',
    name: 'Easy 2',
    price: 360000,
    active: false,
    benefits: [
      {
        code: 'DELAY',
        svg: <img src="/images/benefit/small/delay.svg" class="" alt="" />,
        text: 'Bảo hiểm trễ, hủy chuyến bay',
        price: 18000000,
      },
      {
        code: 'BAGGAGE',
        svg: <img src="/images/benefit/small/baggage.svg" class="" alt="" />,
        text: 'Bảo hiểm mất, hư hỏng hành lý',
        price: 34000000,
      },
      {
        code: 'PA',
        svg: <img src="/images/benefit/small/pa.svg" class="" alt="" />,
        text: 'Bảo hiểm tai nạn cá nhân',
        price: 2400000000,
      },
      {
        code: 'PA2',
        svg: <img src="/images/benefit/small/pa.svg" class="" alt="" />,
        text: 'Bảo hiểm tai nạn cá nhân',
        price: 10000,
      },
      {
        code: 'MEDICAL',
        svg: <img src="/images/benefit/small/medical.svg" class="" alt="" />,
        text: 'Bảo hiểm chi phí y tế, điều trị',
        price: 2800000000,
      },
    ],
  },
];

export default function UpgradePlanPage() {
  const [statePlan, setStatePlan] = createStore<{
    plans: Plan[];
    currentPlan?: Plan;
    recommendedPlan?: Plan;
    benefits?: {
      code: string;
      plans: Plan[];
    }[];
  }>({
    plans: initialPlan.map((plan) => ({
      ...plan,
      name:
        typeof plan?.name === 'string' && plan?.name?.startsWith('Easy')
          ? plan.name.split(' ').map((char, i) => {
              if (i === 0) {
                return char;
              } else {
                return (
                  <>
                    &nbsp;<span class="text-secondary">{char}</span>
                  </>
                );
              }
            })
          : plan.name,
    })),
    currentPlan: initialPlan.find((plan) => plan.active === true), // fake condition using by active property
    recommendedPlan: initialPlan.find((plan) => plan.active === false), // fake condition using by active property
    benefits: groupByBenefit(initialPlan),
  });

  return (
    <>
      <Title>Upgrade Plan</Title>
      <UpgradePlan {...statePlan} />
    </>
  );
}

const groupByBenefit = (plans: Plan[]) => {
  // get all unique benefit code
  const benefitCodes = plans.reduce(
    (acc, plan) => {
      plan?.benefits?.forEach((benefit) => {
        if (benefit?.code && !acc.find((item) => item.code === benefit.code)) {
          acc.push({
            code: benefit.code,
            text: benefit.text,
            svg: benefit.svg,
          });
        }
      });
      return acc;
    },
    [] as { code: string; text?: JSX.Element; svg?: JSX.Element }[],
  );

  return benefitCodes.length > 0
    ? benefitCodes.map((benefit) => {
        return {
          code: benefit.code,
          text: benefit.text,
          svg: benefit.svg,
          plans: plans.filter((plan) =>
            plan.benefits?.some((benefit) => benefit.code === benefit.code),
          ),
        };
      })
    : [];
};
