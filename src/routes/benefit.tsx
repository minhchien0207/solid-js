import { Title } from "@solidjs/meta";
import { JSX } from "solid-js";
import Benefit from "~/components/benefit/benefit";
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
    name: "Trễ chuyến, hủy chuyến bay",
    attr: { name: "benefit[]", id: "delay" },
    active: false,
  },
  {
    name: "Mất, hư hỏng hành lý",
    attr: { name: "benefit[]", id: "baggage" },
    active: false,
  },
  {
    name: "Mất, hư hỏng giấy tờ du lịch",
    attr: { name: "benefit[]", id: "documents" },
    active: false,
  },
  {
    name: "Chậm hành lý xách tay, ký gửi",
    attr: { name: "benefit[]", id: "delay-baggage" },
    active: false,
  },
  {
    name: "Hỗ trợ chi phí y tế khi du lịch",
    attr: { name: "benefit[]", id: "medical" },
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
        <div class="flex flex-row gap-2">
          {stateBenefit.benefits.map((benefit, i) => (
            <Benefit
              benefit={benefit}
              isActive={stateBenefit.benefitIdActive.includes(benefit.attr.id)}
              onSelect={() => selectBenefitById(benefit.attr.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
