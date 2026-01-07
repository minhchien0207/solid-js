import { Title } from "@solidjs/meta";
import { JSX } from "solid-js";
import Benefit from "~/components/benefit/Benefit";
import { createStore } from "solid-js/store";

type Benefit = {
  svg?: JSX.Element;
  svgActive?: JSX.Element;
  name: string;
  attr: { name: string; id: string };
  active: boolean;
  children?: any;
};

const initialBenefit: Benefit[] = [
  {
    svg: <img src="/images/benefit/delay.svg" />,
    svgActive: <img src="/images/benefit/delay-color.svg" />,
    name: "Trễ chuyến, hủy chuyến bay",
    attr: { name: "benefit[]", id: "delay" },
    active: false,
  },
  {
    svg: <img src="/images/benefit/baggage.svg" />,
    svgActive: <img src="/images/benefit/baggage-color.svg" />,
    name: "Mất, hư hỏng hành lý",
    attr: { name: "benefit[]", id: "baggage" },
    active: false,
  },
  {
    svg: <img src="/images/benefit/documents.svg" />,
    svgActive: <img src="/images/benefit/documents-color.svg" />,
    name: "Mất, hư hỏng giấy tờ du lịch",
    attr: { name: "benefit[]", id: "documents" },
    active: false,
  },
  {
    svg: <img src="/images/benefit/delay-baggage.svg" />,
    svgActive: <img src="/images/benefit/delay-baggage-color.svg" />,
    name: "Chậm hành lý xách tay, ký gửi",
    attr: { name: "benefit[]", id: "delay-baggage" },
    active: false,
  },
  {
    svg: <img src="/images/benefit/medical.svg" />,
    svgActive: <img src="/images/benefit/medical-color.svg" />,
    name: "Hỗ trợ chi phí y tế khi du lịch",
    attr: { name: "benefit[]", id: "medical" },
    active: false,
  },
  {
    svg: <img src="/images/benefit/worldwide-support-247.svg" />,
    svgActive: <img src="/images/benefit/worldwide-support-247-color.svg" />,
    name: "Dịch vụ hỗ trợ toàn cầu 24/7",
    attr: { name: "benefit[]", id: "worldwide-support" },
    active: false,
  },
];

export default function BenefitPage() {
  const [stateBenefit, setStateBenefit] = createStore<{
    benefits: Benefit[];
    benefitIdActive: string[];
  }>({
    benefits: initialBenefit,
    benefitIdActive: [],
  });

  const selectBenefitById = (id: string) =>
    setStateBenefit((state) => {
      const benefitIdActive = [...state.benefitIdActive];
      const index = benefitIdActive.indexOf(id);
      if (index > -1) {
        benefitIdActive.splice(index, 1);
      } else {
        benefitIdActive.push(id);
      }
      return {
        benefitIdActive: [...benefitIdActive],
      };
    });

  return (
    <main>
      <Title>Benefit</Title>
      <div class="flex w-full justify-center max-md:flex-col">
        <div
          class={`grid grid-cols-2 gap-6 lg:grid-cols-${Math.min(stateBenefit.benefits.length, 6)}`}
        >
          {stateBenefit.benefits.map((benefit, i) => (
            <Benefit
              benefit={benefit}
              benefitIdActiveId={stateBenefit.benefitIdActive}
              isActive={stateBenefit.benefitIdActive.includes(benefit.attr.id)}
              onSelect={() => selectBenefitById(benefit.attr.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
