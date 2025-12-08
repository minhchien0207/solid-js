import { Title } from '@solidjs/meta';
import BenefitFull from '~/components/benefit/BenefitFull';
import { createResource, Suspense } from 'solid-js';

export default function FullBenefitPage() {
  const [benefits] = createResource(() =>
    fetch('http://localhost:3008/data/full-benefit.json').then((res) =>
      res.json(),
    ),
  );

  return (
    <div class="overflow-x-auto">
      <Title>Full Benefit</Title>
      <Suspense fallback="Loading...">
        <BenefitFull
          data={{
            plans: ['easy_1', 'easy_2', 'easy_3', 'easy_visa'],
            benefits: benefits() ?? [],
          }}
        />
      </Suspense>
    </div>
  );
}
