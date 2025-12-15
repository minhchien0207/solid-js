import { splitProps, Show } from 'solid-js';

export default function Input(props: {
  label: string;
  value?: string;
  attr?: { name: string; id: string; placeholder?: string; required?: boolean };
  optional?: { hint?: string };
  onChange: (e: Event) => void;
}) {
  const [local, rest] = splitProps(props, [
    'value',
    'label',
    'optional',
    'attr',
    'onChange',
  ]);

  return (
    <>
      <fieldset class="fieldset lg:text-[16px] lg:leading-6">
        <legend
          class="fieldset-legend font-semibold text-[#18171C]"
          classList={{
            'required gap-[3px] after:content-["*"] after:text-red-500':
              local.attr?.required,
          }}
        >
          {local.label}
        </legend>
        <input
          type="text"
          class="input rounded-[8px] placeholder:text-[#9191A1] focus:outline-0 lg:px-[16px] lg:py-[12px]"
          name={local.attr?.name}
          id={local.attr?.id}
          value={local?.value ?? ''}
          placeholder={local?.attr?.placeholder}
          required={local.attr?.required ?? false}
          onChange={local.onChange}
        />
        <Show when={local.optional?.hint}>
          <p class="label text-[#76758A] lg:text-[14px] lg:leading-[22px]">
            {local.optional?.hint}
          </p>
        </Show>
      </fieldset>
    </>
  );
}
