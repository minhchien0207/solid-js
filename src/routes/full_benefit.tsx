import { Title } from '@solidjs/meta';
import BenefitFull from '~/components/benefit/BenefitFull';

export default function FullBenefitPage() {
  return (
    <div>
      <Title>Full Benefit</Title>
      <BenefitFull data={'Loading…'} />
    </div>
  );
}
