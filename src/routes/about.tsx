import { Title } from '@solidjs/meta';
import { Motion } from 'solid-motionone';
import AnimatedNumber from '~/components/animate/AnimatedNumber';

export default function About() {
  return (
    <main>
      <Title>About</Title>
      <Motion.h1
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1, easing: 'ease-in-out' }}
      >
        About
      </Motion.h1>
      <AnimatedNumber
        class="text-2xl font-bold"
        from={0}
        to={100}
        duration={2}
      />
    </main>
  );
}
