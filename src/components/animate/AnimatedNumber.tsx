import { createSignal, onMount, onCleanup } from 'solid-js';
import { Motion } from 'solid-motionone';
import { animate } from 'motion';

/**
 * Animated number component
 *
 * @param from - Start number
 * @param to - End number
 * @param duration - Animation duration in seconds
 * @param class - CSS class
 * @returns Animated number component
 */
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
      ease: 'circOut',
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
