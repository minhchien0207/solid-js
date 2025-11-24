import { Title } from "@solidjs/meta";
import { For } from "solid-js";
import Step from "~/components/step";

export default function StepPage() {
  return (
    <>
      <Title>Step</Title>
      <For
        each={Array.from([
          {
            order: 1,
            name: "Thông tin hành trình",
            active: true,
            progress: {
              current: 25,
              total: 100,
            },
            class: "custom class",
            href: "https://google.com",
            // href: '/about',
          },
          {
            order: 2,
            name: "Nhận báo giá",
            active: false,
            progress: {
              current: 100,
              total: 100,
            },
          },
          {
            order: 3,
            name: "Xác nhận và thanh toán",
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
      </For>
    </>
  );
}
