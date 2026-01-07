import { splitProps, JSX, createEffect, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { createStore } from "solid-js/store";
import { numb2CurrencyStr, convertCurrency } from "~/utils";
import type { BenefitFullProps } from "~/types/props";
import type { BenefitItem } from "~/types/models";

export default function BenefitFull({ data }: BenefitFullProps) {
  const [local] = splitProps(data, [
    "activeId",
    "plans",
    "headers",
    "benefits",
  ]);

  const [store, setStore] = createStore<{
    activeId?: string;
    activeBenefits?: BenefitItem[];
    plans: { code: string; name: string }[];
    headers: { id: string; code: string; name: string }[];
    benefits: BenefitItem;
  }>({
    activeId: local.activeId ?? local?.headers?.[0]?.id,
    plans: local.plans,
    headers: local.headers,
    benefits: local.benefits,
  });

  const handleTabChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setStore("activeId", target.value);
  };

  createEffect(() => {
    const activeId = store.activeId;
    const benefits = local.benefits?.benefits?.find(
      (benefit) => benefit.benefit.id === activeId,
    );
    setStore("activeBenefits", benefits?.benefits);
  });

  return (
    <div class="flex flex-col">
      <div class="header-tabs flex w-full gap-4 overflow-x-auto bg-[#F1F1F3] p-4 pb-0">
        {store?.headers?.map((header) => (
          <input
            type="radio"
            name="full_benefit"
            class="tab h-fit p-0 pb-4 font-semibold text-[#76758A]"
            classList={{
              "before:absolute before:w-full before:h-[3px] before:bg-primary before:bottom-0 text-primary":
                store.activeId === header.id,
            }}
            aria-label={`${header.name}`}
            checked={store.activeId === header.id}
            value={header.id}
            onChange={handleTabChange}
          />
        ))}
      </div>
      <div class="w-full" id="content-tab">
        <div
          class={`grid max-sm:text-sm lg:grid-cols-${Math.min(local?.plans?.length + 1, 5)}`}
        >
          {store.activeBenefits && (
            <>
              <div class="bg-[#E4E3E8] text-[#18171C] max-sm:hidden lg:col-span-1"></div>
              {store?.plans?.map((plan) => (
                <div class="col-span-1 bg-[#E4E3E8] font-semibold text-[#18171C] max-sm:sticky max-sm:py-3 lg:py-5 lg:text-lg/7">
                  <div class="flex items-center justify-center">
                    {plan.name}
                  </div>
                </div>
              ))}
            </>
          )}
          {renderBenefitsV2(store.activeBenefits ?? [], store.plans, 1, 1)}
        </div>
      </div>
      <div class="flex w-full flex-col bg-[#F1F1F3] max-sm:hidden lg:visible lg:gap-4 lg:px-8 lg:py-4">
        <div class="text-secondary text-2xl font-bold">Lưu ý quan trọng</div>
        <ol class="list-decimal text-justify text-base leading-6.5 lg:pl-5">
          <li>
            Quyền lợi "Mất hoặc hư hỏng hành lý": KHÔNG ÁP DỤNG đối với Hành lý
            không phải là Hành lý du lịch, động vật, xe cơ giới (bao gồm phụ
            tùng của các loại xe này), bất kỳ phương tiện hoặc tàu bè nào khác,
            ván trượt tuyết, đồ dùng gia đình, đồ cổ, ti vi, máy nghe đĩa CD,
            máy tính xách tay, máy tính cầm tay hoặc bất kỳ thiết bị điện tử di
            động nào hoặc bất kỳ loại Thiết bị thông minh, điện thoại di động
            nào, kim cương, vàng, bạc, bao gồm các sản phẩm làm từ vàng và bạc,
            đá quý, kim loại quý, lông thú, hoặc các vật dụng được trang trí
            bằng những vật liệu này, trang sức, đồng hồ và vòng đeo tay các
            loại, kính áp tròng, xe lăn, răng giả, chân tay giả, thiết bị trợ
            thính, chứng khoán, tài liệu, hối phiếu, giấy bạc, tiền xu hoặc đồ
            lưu niệm.
          </li>
          <li>
            Với đơn bảo hiểm Gia đình, mức chi trả tối đa cho mỗi người được bảo
            hiểm bằng mức chi trả tối đa tương ứng trong đơn bảo hiểm không phải
            Gia đình. Trong mọi trường hợp, mức chi trả tối đa cho cả gia đình
            không vượt quá hạn mức "Gia đình" được quy định.
          </li>
        </ol>
      </div>
      <details class="collapse-arrow collapse rounded-b-[16px] bg-[#F1F1F3] max-sm:visible lg:hidden">
        <summary class="collapse-title p-6">
          <span class="text-secondary text-xl leading-8 font-bold">
            Lưu ý quan trọng
          </span>
        </summary>
        <div class="collapse-content p-6 pt-0 text-sm">
          <ol class="list-decimal pl-4 text-justify text-base leading-5">
            <li>
              Quyền lợi "Mất hoặc hư hỏng hành lý": KHÔNG ÁP DỤNG đối với Hành
              lý không phải là Hành lý du lịch, động vật, xe cơ giới (bao gồm
              phụ tùng của các loại xe này), bất kỳ phương tiện hoặc tàu bè nào
              khác, ván trượt tuyết, đồ dùng gia đình, đồ cổ, ti vi, máy nghe
              đĩa CD, máy tính xách tay, máy tính cầm tay hoặc bất kỳ thiết bị
              điện tử di động nào hoặc bất kỳ loại Thiết bị thông minh, điện
              thoại di động nào, kim cương, vàng, bạc, bao gồm các sản phẩm làm
              từ vàng và bạc, đá quý, kim loại quý, lông thú, hoặc các vật dụng
              được trang trí bằng những vật liệu này, trang sức, đồng hồ và vòng
              đeo tay các loại, kính áp tròng, xe lăn, răng giả, chân tay giả,
              thiết bị trợ thính, chứng khoán, tài liệu, hối phiếu, giấy bạc,
              tiền xu hoặc đồ lưu niệm.
            </li>
            <li>
              Với đơn bảo hiểm Gia đình, mức chi trả tối đa cho mỗi người được
              bảo hiểm bằng mức chi trả tối đa tương ứng trong đơn bảo hiểm
              không phải Gia đình. Trong mọi trường hợp, mức chi trả tối đa cho
              cả gia đình không vượt quá hạn mức "Gia đình" được quy định.
            </li>
          </ol>
        </div>
      </details>
    </div>
  );
}

const renderBenefitsV2 = (
  bnfGroup: BenefitItem[],
  plans: { code: string; name: string }[],
  level?: number,
  label?: string | number,
): JSX.Element => {
  if (!bnfGroup || bnfGroup.length === 0) return null;
  return bnfGroup.map((bnf, index) => {
    const lb = level && level > 1 ? `${label}${index + 1}` : `${index + 1}`;
    const tag = () => (bnf.benefit.description ? "details" : "div");

    const cols = Math.min(plans?.length + 1, 5);
    const clsItem = {
      1: "max-sm:col-end-1",
      2: "max-sm:col-end-2",
      3: "max-sm:col-end-3",
      4: "max-sm:col-end-4",
      5: "max-sm:col-end-5",
    }[cols];

    const clsDivider = {
      1: "lg:col-end-2 max-sm:col-end-1",
      2: "lg:col-end-3 max-sm:col-end-2",
      3: "lg:col-end-4 max-sm:col-end-3",
      4: "lg:col-end-5 max-sm:col-end-4",
      5: "lg:col-end-6 max-sm:col-end-5",
    }[cols];

    return (
      <>
        {index !== 0 && (
          <div
            class={`divider col-start-1 m-0 h-0 p-0 max-sm:px-6 lg:px-8 ${clsDivider}`}
          ></div>
        )}
        <div
          class={`level-${level} index-${index} max-sm:col-start-1 max-sm:w-full max-sm:px-6 max-sm:pt-4 lg:max-w-[444px] lg:px-8 lg:py-4 ${clsItem}`}
          classList={{
            "font-semibold":
              level === 1 || (level === 2 && bnf.benefits?.length > 0),
            "lg:pl-12": level ? level > 1 : false,
            "lg:pl-14": level ? level > 2 : false,
          }}
        >
          <div class="flex justify-between">
            <Dynamic component={tag()} class="collapse rounded-none">
              <summary
                class="collapse-title p-0 lg:w-fit"
                classList={{
                  "font-semibold": !!bnf?.benefit?.description,
                }}
              >
                <div class="flex items-center gap-2">
                  <span
                    classList={{
                      "text-primary": level ? level === 1 : false,
                    }}
                  >
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
                <div
                  class="collapse-content mt-2.5 w-fit border-l-2 border-[#E6A441] pr-0 pb-0 text-justify text-sm font-normal italic"
                  classList={{
                    "ml-1": level ? level === 1 : false,
                    "ml-2": level ? level > 1 : false,
                  }}
                >
                  {bnf.benefit.description}
                </div>
              )}
            </Dynamic>
          </div>
        </div>
        {plans?.map((plan) => (
          <div class="flex flex-col items-center justify-center text-center font-semibold max-sm:p-2">
            {bnf?.plan?.[plan.code]?.siInWords
              ?.split(/\n/g)
              .map((line) => <div>{line}</div>) ??
              (bnf?.plan?.[plan.code]?.si ? (
                <>
                  <div class="max-sm:visible lg:hidden">
                    {numb2CurrencyStr(Number(bnf?.plan?.[plan.code]?.si))}
                  </div>
                  <div class="max-sm:hidden lg:visible">
                    {convertCurrency(Number(bnf?.plan?.[plan.code]?.si))}
                  </div>
                </>
              ) : (
                ""
              ))}
          </div>
        ))}
        {bnf.benefits?.length > 0 && (
          <div
            class={`divider col-start-1 m-0 h-0 p-0 max-sm:px-6 lg:px-8 ${clsDivider}`}
          ></div>
        )}
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
