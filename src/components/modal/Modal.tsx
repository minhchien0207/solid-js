export default function Modal({
  title,
  attr,
  children,
}: {
  title?: string;
  attr?: any;
  children?: any;
}) {
  return (
    <div>
      <button onClick={() => attr?.id?.showModal()}>Open</button>
      <dialog id={attr?.id} class="modal">
        <div class="modal-box p-0 lg:w-11/12 lg:max-w-5xl">
          {/* header */}
          <div class="text-primary flex items-center justify-between p-4 pb-2">
            <div class="text-2xl leading-9 font-bold">{title}</div>
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost">✕</button>
            </form>
          </div>
          {/* divider */}
          <div class="divider m-0"></div>
          {/* body */}
          <div class="flex flex-col gap-4 p-4 pt-3">{children}</div>
        </div>
      </dialog>
    </div>
  );
}
