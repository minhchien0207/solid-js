import { Component, JSX, splitProps } from "solid-js";
import "./upgrade-plan.css";

type UpgradePlanProps = {};

const UpgradePlan: Component<UpgradePlanProps> = (props) => {
  const [local, others] = splitProps(props, []);
  return (
    <div class="flex flex-col items-center transition-all duration-300 lg:w-[900px]">
      <div class="relative z-1 w-full overflow-hidden rounded-t-[16px] lg:h-[296px]">
        <img
          class="w-full lg:absolute lg:-top-[135px] lg:left-0 lg:z-0"
          src="/images/upgrade-plan-background.jpg"
          alt=""
          srcset=""
        />
      </div>
      {/* body */}
      <div class="flex w-full flex-col items-center gap-6 bg-white max-sm:p-6 lg:p-[48px]">
        <div class="text-primary text-center text-[40px] leading-[56px] font-bold">
          Nâng cấp gói quyền lợi
        </div>
        <div class="text-justify text-[16px] leading-[22px] font-normal text-[#18171C]">
          Nâng cấp quyền lợi bảo hiểm để an tâm trải nghiệm trọn vẹn chuyến đi
          của bạn. Được bảo vệ nhiều hơn cho các trường hợp khẩn cấp y tế, hủy
          chuyến, tai nạn cá nhân và mất hành lý. Một bước nhỏ giúp bạn tránh
          những chi phí bất ngờ lớn.{" "}
          <span class="italic">
            Du lịch thoải mái, vì luôn biết rằng bạn đã được bảo vệ toàn diện.
          </span>
        </div>
        <div class="flex flex-row flex-wrap items-center justify-between gap-[18px] text-[16px] leading-[22px] font-normal text-[#18171C] max-sm:justify-center">
          <div class="font-semibold text-[#ADACB9] max-sm:order-1 lg:basis-1/3">
            Bạn sẽ nhận được thêm:
          </div>
          <a
            href="#"
            class="text-primary cursor-pointer font-semibold max-sm:order-3 lg:basis-1/3 lg:text-right"
          >
            Xem chi tiết quyền lợi bảo hiểm
          </a>
          <div class="basis w-full max-sm:order-2">
            <div class="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border">
              <table class="table">
                <thead>
                  <tr class="bg-[#EEF1FC] text-center">
                    <th class=""></th>
                    <th class="">Gói hiện tại</th>
                    <th class="">
                      Gói{" "}
                      <span class="text-primary">
                        Easy <span class="text-[#DD252E]">2</span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-[#E4E3E8]">Cy Ganderton</td>
                    <td class="border border-[#E4E3E8]">
                      Quality Control Specialist
                    </td>
                    <td class="border border-[#E4E3E8]">Blue</td>
                  </tr>
                  <tr>
                    <td class="border border-[#E4E3E8]">Hart Hagerty</td>
                    <td class="border border-[#E4E3E8]">
                      Desktop Support Technician
                    </td>
                    <td class="border border-[#E4E3E8]">Purple</td>
                  </tr>
                  <tr>
                    <td class="border border-[#E4E3E8]">Brice Swyre</td>
                    <td class="border border-[#E4E3E8]">Tax Accountant</td>
                    <td class="border border-[#E4E3E8]">Red</td>
                  </tr>
                  <tr>
                    <td class="border border-[#E4E3E8]">Brice Swyre</td>
                    <td class="border border-[#E4E3E8]">Tax Accountant</td>
                    <td class="border border-[#E4E3E8]">Red</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div class="flex w-full justify-between gap-6 rounded-b-[16px] bg-[#EEF1FC] px-[48px] py-[32px] max-sm:flex-col lg:flex-row">
        <button class="btn rounded-[8px] px-[20px] py-[12px] text-[16px] leading-6 font-semibold text-[#474653] max-sm:order-2">
          Tôi sẽ suy nghĩ thêm
        </button>
        <button class="btn btn-primary rounded-[8px] px-[20px] py-[12px] text-[16px] leading-6 font-semibold text-white max-sm:order-1">
          Nâng cấp gói +300.000 VNĐ &#8594;
        </button>
      </div>
    </div>
  );
};

export default UpgradePlan;
