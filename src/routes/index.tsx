import { Title } from '@solidjs/meta';
// import Counter from '~/components/Counter';
import Card from '~/components/card/Card';
import { For } from 'solid-js';

export default function Home() {
  return (
    <main>
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

      <div class="flex w-full flex-col items-center gap-4 pr-4 pl-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <For each={Array.from({ length: 10 })} fallback={<p>Loading...</p>}>
            {(item) => <Card />}
          </For>
        </div>

        <div class="flex flex-col rounded-[8px] bg-[#D8DEEE] p-6 text-center font-bold max-sm:gap-6 lg:w-[738px] lg:gap-2.5">
          <h1 class="text-primary text-[22px] leading-6 uppercase">
            LIÊN HỆ HỖ TRỢ
          </h1>
          <div class="mb-2.5 flex max-sm:flex-col max-sm:gap-6 lg:flex-row lg:justify-around">
            <div class="flex flex-col items-center gap-1">
              <p class="text-[16px] leading-6 text-[#474653]">
                Trong chuyến đi
              </p>
              <div class="flex items-center gap-1.5 text-[18px] leading-[26px] text-[#DD252E]">
                <span class="h-[12px] w-[12px] bg-[#DD252E] mask-[url('/images/phone.svg')] mask-center mask-no-repeat"></span>
                <span>+84 28 3535 9505</span>
              </div>
              <div class="text-[16px] leading-[22px] text-[#76758A]">
                <div>Hỗ trợ du lịch toàn cầu 24/7</div>
                <div>(có tiếng việt)</div>
              </div>
            </div>
            <div class="flex flex-col items-center gap-1">
              <p class="text-[16px] leading-6 text-[#474653]">
                Trước và sau chuyến đi
              </p>
              <div class="flex items-center gap-1.5 text-[18px] leading-[26px] text-[#DD252E]">
                <span class="h-[12px] w-[12px] bg-[#DD252E] mask-[url('/images/phone.svg')] mask-center mask-no-repeat"></span>
                <span>0888 176 198</span>
              </div>
              <div class="text-[16px] leading-[22px] text-[#76758A]">
                <div>Thứ 2 đến thứ 6 (giờ hành chính)</div>
                <div>Không bao gồm các ngày lễ, Tết</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
