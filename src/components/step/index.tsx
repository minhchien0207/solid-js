import { Component, JSX, mergeProps, splitProps } from 'solid-js';
import { A, useMatch } from '@solidjs/router';
import { Dynamic } from 'solid-js/web';
import './step.css';

export interface StepPropsCore extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  order: number;
  name: string;
  progress?: Progress;
  active?: boolean;
  class?: string;
  href?: string;
  as?: keyof JSX.IntrinsicElements; // cho phép override nếu cần
  children?: any;
}

interface Progress {
  current: number;
  total: number;
}

interface StepProps extends Partial<StepPropsCore> {}

const mergeClass = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

const Step: Component<StepProps> = (initialProps) => {
  const props = mergeProps(
    {
      // default props value
      active: false,
    },
    initialProps
  );

  const [local, rest] = splitProps(props, ['children', 'class', 'href', 'as']);

  const isLink = () => Boolean(local.href);

  // useMatch trả về match object nếu href khớp; null/undefined nếu không khớp
  const match = () => (isLink() ? useMatch(() => local.href!)() : null);

  const tag = () => (isLink() ? A : local.as ?? 'div');

  // Khi component là A, truyền href; khi là div không truyền href
  const hrefProps = isLink() ? { href: local.href } : {};

  return (
    <Dynamic
      component={tag()}
      {...rest}
      {...hrefProps}
      class={mergeClass('step', local.class)}
      classList={{
        'opacity-50': !props.active,
      }}
    >
      {/* for tablet or higher */}
      <div class="flex flex-col items-center gap-2 max-md:hidden">
        <div class="flex items-center gap-2 text-[#18171C]">
          <div class="flex justify-evenly items-center w-[20px] h-[20px] rounded-[50%] bg-[#EAEEFA] text-[10px] order">
            {props.order}
          </div>
          <div class="name text-[18px]" classList={{ 'font-semibold': props.active }}>
            {props.name}
          </div>
        </div>
        {props.progress && (
          <progress
            class="progress text-primary w-56"
            value={props.progress.current}
            max={props.progress.total}
          ></progress>
        )}
      </div>
      {/* for mobile */}
      <div class="flex-row items-center flex-nowrap gap-2 hidden max-md:flex">
        <div class="flex flex-col items-end">
          <div class="text-[#ADACB9] font-light sub-step">{`Bước ${props.order}`}</div>
          <div class="text-[#18171C] text-[18px] name" classList={{ 'font-semibold': props.active }}>
            {props.name}
          </div>
        </div>
        {props.progress && (
          <div class="relative">
            <div
              class="radial-progress text-primary relative z-1"
              style={`--value:${props.progress.current};--size:2.5rem;--thickness:5px;`}
              aria-valuenow={props.progress.current}
              role="progressbar"
            >
              {props.order}
            </div>
            <div
              class="radial-progress text-[#E4E3E8] absolute left-0 top-0"
              style={`--value:100;--size:2.5rem;--thickness:5px;`}
              aria-valuenow={100}
              role="progressbar"
            ></div>
          </div>
        )}
      </div>
      {local.children}
    </Dynamic>
  );
};

export default Step;
