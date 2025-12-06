import { splitProps, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
// import { createStore } from 'solid-js/store';
import { numb2CurrencyStr, convertCurrency } from '~/utils';

type Plan = {
  [planCode: string]: {
    id: string;
    si?: string;
    siInWords?: string;
    [key: string]: any;
  };
};

type BenefitDetail = {
  id: string;
  code: string;
  name: string;
  description?: string;
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
  const [local] = splitProps(data, ['plans', 'benefits']);
  // const [store, setStore] = createStore<{
  //   plans: string[];
  //   benefits: BenefitItem[];
  // }>({
  //   plans: local.plans,
  //   benefits: local.benefits,
  // });

  return (
    <div class="mb-8 flex w-full">
      <div class="tabs tabs-border bg-[#F1F1F3]">
        {local?.benefits?.benefits?.map((bnfGroup, bnfGroupIndex) => (
          <>
            <input
              type="radio"
              name="full_benefit"
              class="tab text-primary h-fit px-4 py-6 first:ml-3"
              aria-label={`${bnfGroup.benefit.name}`}
              checked={bnfGroupIndex === 1}
            />
            <div class="tab-content border-base-300 bg-base-100 rounded-none">
              <div class="overflow-x-auto">
                <table class="table">
                  <thead>
                    <tr>
                      <th></th>
                      {local?.plans?.map((plan) => (
                        <th class="text-center font-semibold text-[#18171C]">
                          {plan}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {renderBenefitsV2(
                      bnfGroup.benefits ?? [],
                      local?.plans,
                      1,
                      1,
                    )}
                  </tbody>
                </table>
                {/* debug */}
                {/* <pre class="text-wrap">
                  {JSON.stringify(bnfGroup.benefits, null, 2)}
                </pre> */}
              </div>
            </div>
          </>
        ))}
      </div>
      {/* debug */}
      {/* <pre class="text-wrap">{JSON.stringify(local, null, 2)}</pre> */}
    </div>
  );
}

const renderBenefitsV2 = (
  bnfGroup: BenefitItem[],
  plans: string[],
  level?: number,
  label?: string | number,
): JSX.Element => {
  if (!bnfGroup || bnfGroup.length === 0) return null;
  return bnfGroup.map((bnf, index) => {
    const lb = level && level > 1 ? `${label}${index + 1}` : `${index + 1}`;
    const tag = () => (bnf.benefit.description ? 'details' : 'div');

    return (
      <>
        <tr class={`level-${level} index-${index}`}>
          <td
            class="lg:max-w-[444px]"
            classList={{
              'font-semibold':
                level === 1 || (level === 2 && bnf.benefits?.length > 0),
              'pl-7': level ? level > 1 : false,
              'pl-10': level ? level > 2 : false,
            }}
          >
            <div class="flex justify-between">
              <Dynamic component={tag()} class="collapse">
                <summary class="collapse-title w-fit p-0 font-semibold">
                  <div class="flex items-center gap-2">
                    <span>
                      {lb}. {bnf.benefit.name}
                    </span>
                    {bnf.benefit.description && (
                      <div
                        class="info cursor-pointer"
                        on:click={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.66667 13.3334C2.98467 13.3334 0 10.3487 0 6.66667C0 2.98467 2.98467 0 6.66667 0C10.3487 0 13.3334 2.98467 13.3334 6.66667C13.3334 10.3487 10.3487 13.3334 6.66667 13.3334ZM6 6V9.99997H7.33333V6H6ZM6 3.33333V4.66667H7.33333V3.33333H6Z"
                            fill="#E6A441"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </summary>
                {bnf.benefit.description && (
                  <div class="collapse-content w-fit p-4 text-justify text-sm font-normal italic">
                    {bnf.benefit.description}
                  </div>
                )}
              </Dynamic>
              {/* {bnf.benefits.length > 0 && (
                <div class="cursor-pointer">&#9662;</div>
              )} */}
            </div>
          </td>
          {plans?.map((plan) => (
            <td class="text-center font-semibold">
              {bnf?.plan?.[plan]?.siInWords ??
                (bnf?.plan?.[plan]?.si ? (
                  <>
                    <div class="max-sm:visible lg:hidden">
                      {numb2CurrencyStr(Number(bnf?.plan?.[plan]?.si))}
                    </div>
                    <div class="max-sm:hidden lg:visible">
                      {convertCurrency(Number(bnf?.plan?.[plan]?.si))}
                    </div>
                  </>
                ) : (
                  ''
                ))}
            </td>
          ))}
        </tr>
        {renderBenefitsV2(
          bnf.benefits,
          plans,
          level ? level + 1 : 1,
          level ? `${lb}.` : `${index + 1}.`,
        )}
      </>
    );
  });
};
