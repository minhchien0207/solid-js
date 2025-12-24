import { splitProps, Show, createSignal, createEffect, on } from 'solid-js';
import { debounce } from '@solid-primitives/scheduled';

// Types cho validation
type ValidationRule = {
  type: 'local' | 'api';
  validator: (value: string) => Promise<string | null> | string | null;
  message?: string;
};

type InputProps = {
  label: string;
  value?: string;
  attr?: { name: string; id: string; placeholder?: string; required?: boolean };
  helper?: { hint?: string };
  onChange: (e: Event) => void;
  validationRules?: ValidationRule[];
  debounceTime?: number; // ms, mặc định 500ms
  onValidationChange?: (error: string | null) => void;
};

export default function Input(props: InputProps) {
  const [local, rest] = splitProps(props, [
    'value',
    'label',
    'helper',
    'attr',
    'onChange',
    'validationRules',
    'debounceTime',
    'onValidationChange',
  ]);

  const [error, setError] = createSignal<string | null>(null);
  const [isValidating, setIsValidating] = createSignal(false);

  // Hàm validate local (không cần debounce)
  const validateLocal = (value: string): string | null => {
    if (!local.validationRules) return null;

    for (const rule of local.validationRules) {
      if (rule.type === 'local') {
        const result = rule.validator(value);
        if (typeof result === 'string') {
          return result;
        }
      }
    }
    return null;
  };

  // Hàm validate API (cần debounce)
  const validateAPI = async (value: string): Promise<string | null> => {
    if (!local.validationRules) return null;

    setIsValidating(true);
    try {
      for (const rule of local.validationRules) {
        if (rule.type === 'api') {
          const result = await rule.validator(value);
          if (typeof result === 'string') {
            return result;
          }
        }
      }
      return null;
    } finally {
      setIsValidating(false);
    }
  };

  // Tạo debounced validator cho API
  const debouncedAPIValidation = debounce(async (value: string) => {
    const apiError = await validateAPI(value);
    if (apiError) {
      setError(apiError);
      local.onValidationChange?.(apiError);
    } else {
      // Nếu không có lỗi API, giữ lại lỗi local nếu có
      const localError = validateLocal(value);
      setError(localError);
      local.onValidationChange?.(localError);
    }
  }, local.debounceTime ?? 500);

  // Handler cho input change
  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    // Gọi onChange callback
    local.onChange(e);

    // Validate local ngay lập tức
    const localError = validateLocal(value);
    setError(localError);

    // Nếu không có lỗi local, trigger API validation với debounce
    if (
      !localError &&
      local.validationRules?.some((rule) => rule.type === 'api')
    ) {
      debouncedAPIValidation(value);
    } else if (!localError) {
      local.onValidationChange?.(null);
    } else {
      local.onValidationChange?.(localError);
    }
  };

  return (
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
      <div class="relative">
        <input
          type="text"
          class="input rounded-[8px] placeholder:text-[#9191A1] focus:outline-0 lg:px-[16px] lg:py-[12px]"
          classList={{
            'border-red-500': error() !== null,
            'border-gray-300': error() === null,
          }}
          autocomplete="off"
          name={local.attr?.name}
          id={local.attr?.id}
          value={local?.value ?? ''}
          placeholder={local?.attr?.placeholder}
          required={local.attr?.required ?? false}
          onInput={handleInput}
        />
        <Show when={isValidating()}>
          <div class="absolute top-1/2 right-3 h-[15px] w-[15px] -translate-y-1/2 animate-spin bg-[#9191A1] mask-[url('/images/checking.svg')] mask-center mask-no-repeat"></div>
        </Show>
      </div>
      <Show when={error()}>
        <p class="text-[12px] text-red-500">{error()}</p>
      </Show>
      <Show when={local.helper?.hint && !error()}>
        <p class="label text-[#76758A] lg:text-[14px] lg:leading-[22px]">
          {local.helper?.hint}
        </p>
      </Show>
    </fieldset>
  );
}
