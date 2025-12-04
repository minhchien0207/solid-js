import { splitProps } from 'solid-js';
// import { createStore } from 'solid-js/store';

type Plan = {
  [planCode: string]: {
    id: string;
    siInWords: string;
    [key: string]: any;
  };
};

type BenefitDetail = {
  id: string;
  code: string;
  name: string;
  description: string;
};

type BenefitItem = {
  benefit: BenefitDetail;
  index: number;
  plan: Plan; // Đây chính là object động theo plan_code
  benefits: BenefitItem[]; // đệ quy nếu có benefit con (trong data của bạn đang là mảng rỗng)
};

type BenefitFullProps = {
  data: {
    plans: string[];
    benefits: BenefitItem;
  };
};

export default function BenefitFull({ data }: BenefitFullProps) {
  const [local, rest] = splitProps(data, ['plans', 'benefits']);
  // const [store, setStore] = createStore<{
  //   plans: string[];
  //   benefits: BenefitItem[];
  // }>({
  //   plans: local.plans,
  //   benefits: local.benefits,
  // });

  return (
    <div class="flex w-full">
      <div class="tabs tabs-border">
        {local?.benefits?.benefits?.map((bnfGroup, bnfGroupIndex) => (
          <>
            <input
              type="radio"
              name="full_benefit"
              class="tab"
              aria-label={`${bnfGroup.benefit.name}`}
            />
            <div class="tab-content border-base-300 bg-base-100 p-10">
              <pre class="text-wrap">
                {JSON.stringify(bnfGroup.benefits, null, 2)}
              </pre>
              {/* {bnfGroup.benefit.name} */}
            </div>
          </>
        ))}
      </div>
      {/* debug */}
      {/* <pre class="text-wrap">{JSON.stringify(local, null, 2)}</pre> */}
    </div>
  );
}
