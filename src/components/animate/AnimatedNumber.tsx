import { createSignal, onMount, onCleanup } from 'solid-js';
import { Motion } from 'solid-motionone';
import { animate } from 'motion';

export default function AnimatedNumber({
  from,
  to,
  duration,
  class: className,
}: {
  from: number;
  to: number;
  duration: number;
  class?: string;
}) {
  const [count, setCount] = createSignal<number>(from);

  onMount(() => {
    const animation = animate(from, to, {
      duration,
      easing: 'circ-out',
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    onCleanup(() => animation.stop());
  });

  return (
    <Motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1, easing: 'ease-in-out' }}
      class={className}
    >
      {count()}
    </Motion.div>
  );
}
