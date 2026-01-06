import { Show } from 'solid-js';

export default function Modal({
  title,
  attr,
  fncHandleClose,
  children,
  body,
}: {
  title?: string;
  attr?: {
    id?: string;
    class?: {
      label?: string;
      modal?: string;
    };
  };
  fncHandleClose?: () => void;
  children?: any;
  body?: any;
}) {
  return (
    <div class="absolute">
      {children && (
        <label for={attr?.id} class={attr?.class?.label}>
          {children}
        </label>
      )}

      <input type="checkbox" id={attr?.id} class="modal-toggle" />
      <div class="modal" role="dialog">
        <div class={`modal-box p-0 ${attr?.class?.modal}`}>
          {/* header */}
          <div class="text-primary flex items-center justify-between p-4 pb-2">
            <div class="text-2xl leading-9 font-bold">{title}</div>
            <div class="">
              <label
                for={attr?.id}
                class="btn btn-sm btn-circle btn-ghost"
                onclick={fncHandleClose}
              >
                ✕
              </label>
            </div>
          </div>
          {/* divider */}
          <div class="divider m-0"></div>
          {/* body */}
          <div class="flex flex-col gap-4 p-4 pt-3">{body}</div>
        </div>
        <label class="modal-backdrop" for={attr?.id} onclick={fncHandleClose}>
          Close
        </label>
      </div>
    </div>
  );
}
