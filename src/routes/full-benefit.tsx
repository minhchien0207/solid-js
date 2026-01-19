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
            plans: [
              {
                code: 'easy_1',
                name: 'Easy 1',
              },
              {
                code: 'easy_2',
                name: 'Easy 2',
              },
              {
                code: 'easy_3',
                name: 'Easy 3',
              },
              {
                code: 'easy_visa',
                name: 'Easy Visa',
              },
            ],
            benefits: benefits() ?? [],
          }}
        />
      </Suspense>
    </div>
  );
}
