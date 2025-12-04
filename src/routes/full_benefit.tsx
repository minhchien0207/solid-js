import { Title } from '@solidjs/meta';
import BenefitFull from '~/components/benefit/BenefitFull';
import { createResource, Suspense } from 'solid-js';

export default function FullBenefitPage() {
  const [benefits] = createResource(() =>
    fetch('http://localhost:3000/data/full-benefit.json').then((res) =>
      res.json(),
    ),
  );

  return (
    <div>
      <Title>Full Benefit</Title>
      <Suspense fallback="Loading...">
        <BenefitFull
          data={{
            plans: ['easy-1', 'easy-2', 'easy-3', 'easy-visa'],
            benefits: benefits() ?? [],
          }}
        />
      </Suspense>
    </div>
  );
}
