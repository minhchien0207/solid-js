import { Title } from '@solidjs/meta';
import { createStore } from 'solid-js/store';
import Area from '~/components/area/AreaV2';
import { Area as AreaType } from '~/types/models';

export const initialArea: AreaType[] = [
  {
    text: 'Đông Nam Á',
    value: 'sea',
    attr: { name: 'area', id: 'sea' },
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
    text: 'Châu Á',
    value: 'asia',
    attr: { name: 'area', id: 'asia' },
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
    text: 'Toàn cầu',
    value: 'worldwide',
    attr: { name: 'area', id: 'worldwide' },
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
      <div class="flex flex-row items-center gap-2 rounded-lg bg-white p-5">
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
          Điểm đến của bạn có yêu cầu{' '}
          <span class="text-primary font-semibold">Visa Schengen</span>?
        </label>
        <input type="checkbox" checked={true} class="checkbox checkbox-xs" />
      </div>
    ),
  },
];

export default function AreaPage() {
  const [stateArea, setStateArea] = createStore<{
    areas: AreaType[];
    value?: string;
    activeHintId: string;
  }>({
    areas: initialArea,
    value: '',
    activeHintId: '',
  });

  const selectArea = (val: string) =>
    setStateArea({
      value: val,
      activeHintId:
        stateArea.activeHintId && stateArea.activeHintId !== val
          ? ''
          : stateArea.activeHintId,
    });

  const selectAreaHintById = (id: string) =>
    setStateArea(
      'activeHintId',
      stateArea.activeHintId === ''
        ? id
        : stateArea.activeHintId === id
          ? ''
          : id,
    );

  return (
    <>
      <Title>Area</Title>
      <div class="flex flex-col gap-2">
        <Area
          areas={stateArea.areas}
          value={stateArea.value}
          activeHintId={stateArea.activeHintId}
          onSelect={selectArea}
          onSelectHint={selectAreaHintById}
        />
      </div>
    </>
  );
}
