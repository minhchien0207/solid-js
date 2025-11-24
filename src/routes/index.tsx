import { Title } from "@solidjs/meta";
// import Counter from '~/components/Counter';
import Card from "~/components/card/Card";
import { JSX, For, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import Step from "~/components/step";
import Radio from "~/components/menu/radio";
import Benefit from "~/components/benefit/benefit";

/* type Area = {
  name: string;
  attr: { name: string; id: string };
  active: boolean;
  children?: any;
  hint?: any;
};

const initialArea: Area[] = [
  {
    name: "Đông Nam Á",
    attr: { name: "area", id: "sea" },
    hint: (
      <div>
        <div class="font-[15px] font-semibold">
          Quốc gia thuộc khu vực Đông Nam Á
        </div>
        <div class="font-[13px] font-[400] italic">
          Đông Nam Á, Úc, Trung Quốc, Hong Kong, Ấn Độ, Nhật Bản, Hàn Quốc,
          Macau, New Zealand, Đài Loan
        </div>
      </div>
    ),
    active: false,
  },
  {
    name: "Châu Á",
    attr: { name: "area", id: "asia" },
    hint: (
      <div>
        <div class="font-[15px] font-semibold">
          Quốc gia thuộc khu vực Châu Á
        </div>
        <div class="font-[13px] font-[400] italic">
          Brunei, Campuchia, Indonesia, Lào, Malaysia, Myanmar, Philippines,
          Singapore, Thái Lan, Đông Timor
        </div>
      </div>
    ),
    active: false,
  },
  {
    name: "Toàn cầu",
    attr: { name: "area", id: "worldwide" },
    hint: (
      <div>
        <div class="font-[15px] font-semibold">Toàn cầu</div>
        <div class="font-[13px] font-[400] italic">
          Tất cả các quốc gia, loại trừ các quốc gia bị cấm vận theo Nghị quyết
          của Liên Hiệp Quốc, Hợp Chủng quốc Hoa Kỳ, Liên minh Châu Âu, Nhật
          Bản, Thụy Sĩ và Vương Quốc Anh
        </div>
      </div>
    ),
    active: false,
    children: (
      <div class="flex flex-row items-center gap-2 rounded-[8px] bg-white p-5">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66667 13.3334C2.98467 13.3334 0 10.3487 0 6.66667C0 2.98467 2.98467 0 6.66667 0C10.3487 0 13.3334 2.98467 13.3334 6.66667C13.3334 10.3487 10.3487 13.3334 6.66667 13.3334ZM6 6V9.99997H7.33333V6H6ZM6 3.33333V4.66667H7.33333V3.33333H6Z"
            fill="#5A5A5A"
          />
        </svg>
        <label>
          Điểm đến của bạn có yêu cầu{" "}
          <span class="text-primary font-semibold">Visa Schengen</span>?
        </label>
        <input type="checkbox" checked={true} class="checkbox checkbox-xs" />
      </div>
    ),
  },
]; */

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

export default function Home() {
  /* const [stateArea, setStateArea] = createStore<{
    areas: Area[];
    activeId: string;
    activeHintId: string;
  }>({
    areas: initialArea,
    activeId: "",
    activeHintId: "",
  });

  const selectAreaById = (id: string) =>
    setStateArea({
      activeId: id,
      activeHintId:
        stateArea.activeHintId && stateArea.activeHintId !== id
          ? ""
          : stateArea.activeHintId,
    });
  const selectAreaHintById = (id: string) =>
    setStateArea(
      "activeHintId",
      stateArea.activeHintId === ""
        ? id
        : stateArea.activeHintId === id
          ? ""
          : id,
    ); */

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
    <main class="h-screen bg-[#EAEEFA]">
      <Title>Hello World</Title>
      {/* <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p> */}

      {/* <div class="w-full pl-4 pr-4">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <For each={Array.from({ length: 10 })} fallback={<p>Loading...</p>}>
            {(item) => <Card />}
          </For>
        </div>
      </div> */}

      <div class="flex w-full justify-center max-md:flex-col">
        {/* <For
          each={Array.from([
            {
              order: 1,
              name: 'Thông tin hành trình',
              active: true,
              progress: {
                current: 25,
                total: 100,
              },
              class: 'custom class',
              href: 'https://google.com',
              // href: '/about',
            },
            {
              order: 2,
              name: 'Nhận báo giá',
              active: false,
              progress: {
                current: 100,
                total: 100,
              },
            },
            {
              order: 3,
              name: 'Xác nhận và thanh toán',
              active: false,
              progress: {
                current: 100,
                total: 100,
              },
            },
          ])}
          fallback={<p>Loading...</p>}
        >
          {(item) => <Step {...item} />}
        </For> */}

        {/* <div class="flex flex-col gap-2">
          {stateArea.areas.map((area, i) => (
            <Radio
              area={area}
              isActive={stateArea.activeId === area.attr.id}
              isActiveHint={stateArea.activeHintId === area.attr.id}
              onSelect={() => selectAreaById(area.attr.id)}
              onSelectHint={() => selectAreaHintById(area.attr.id)}
            />
          ))}
        </div> */}

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
