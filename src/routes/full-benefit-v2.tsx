import { Title } from "@solidjs/meta";
import BenefitFull from "~/components/benefit/BenefitFullV2";
import { createResource, Suspense } from "solid-js";
import { createStore } from "solid-js/store";

export default function FullBenefitPage() {
  const [benefits] = createResource(() =>
    fetch("http://localhost:3008/data/full-benefit.json").then((res) =>
      res.json(),
    ),
  );

  const [store, setStore] = createStore<{
    plans: { code?: string; name?: string };
    headers: { id: string; code: string; name: string }[];
    benefits: { code: string; name: string }[];
    activeId?: string;
  }>({
    plans: { code: undefined, name: undefined },
    headers:
      benefits()?.benefits?.map((item: any) => ({ ...item.benefit })) ?? [],
    benefits: [],
  });

  return (
    <div class="overflow-x-auto">
      <Title>Full Benefit v2</Title>
      <Suspense fallback="Loading...">
        <BenefitFull
          data={{
            activeId: store.activeId,
            plans: [
              {
                code: "easy_1",
                name: "Easy 1",
              },
              {
                code: "easy_2",
                name: "Easy 2",
              },
              {
                code: "easy_3",
                name: "Easy 3",
              },
              {
                code: "easy_visa",
                name: "Easy Visa",
              },
            ],
            headers: store.headers,
            benefits: benefits() ?? [],
          }}
        />
      </Suspense>
    </div>
  );
}
