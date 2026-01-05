// routes/layout.tsx
import { A, useLocation } from '@solidjs/router';
import { For, Show, createSignal, Suspense } from 'solid-js';
import Footer from '~/components/Footer';

type Menu = {
  name: string;
  href?: string;
  child?: Menu[];
  highLight?: boolean;
};

const menu = [
  {
    name: 'Trang chủ',
    href: '/',
  },
  {
    name: 'Về chúng tôi',
    href: '/about',
  },
  {
    name: 'Component',
    child: [
      {
        name: 'Area',
        child: [
          {
            name: 'v1',
            href: '/area',
          },
          {
            name: 'v2',
            href: '/area-v2',
            highLight: true,
          },
        ],
      },
      {
        name: 'Step',
        href: '/step',
      },
      {
        name: 'Benefit',
        href: '/benefit',
      },
      {
        name: 'Full Benefit',
        child: [
          {
            name: 'v1',
            href: '/full-benefit',
          },
          {
            name: 'v2',
            href: '/full-benefit-v2',
          },
        ],
      },
      {
        name: 'Plan',
        href: '/plan',
      },
      {
        name: 'Upgrade Plan',
        href: '/upgrade-plan',
      },
      {
        name: 'Question',
        child: [
          {
            name: 'v1',
            href: '/question',
          },
          {
            name: 'v2',
            href: '/question-v2',
            highLight: true,
          },
        ],
      },
      {
        name: 'Form',
        href: '/form',
      },
    ],
  },
];

const menuDesktop = (menu: Menu[]) => {
  if (menu.length === 0) return null;

  return (
    <For each={menu}>
      {(item: Menu) => (
        <li>
          {item.child ? (
            <>
              <a>{item.name}</a>
              <ul class="p-2">{menuDesktop(item.child)}</ul>
            </>
          ) : (
            <A
              href={item?.href ?? ''}
              end={item.href === '/'}
              activeClass="bg-gray-200"
              class="whitespace-nowrap"
            >
              {item.name}
            </A>
          )}
        </li>
      )}
    </For>
  );
};

const menuMobile = (
  menu: Menu[],
  statusOpen: boolean,
  setOpen: (open: boolean) => void,
) => {
  return (
    <For each={menu}>
      {(item) => (
        <li
          // style={`--stagger-translate-x: -1em;--stagger-translate-y: 0;`}
          on:click={() => setOpen(!statusOpen)}
        >
          {item.child ? (
            <details open={statusOpen}>
              <summary on:click={(e) => e.stopPropagation()}>
                {item.name}
              </summary>
              <ul class="z-1 p-2">
                {menuMobile(item.child, statusOpen, setOpen)}
              </ul>
            </details>
          ) : (
            <A
              href={item?.href ?? ''}
              end={item.href === '/'}
              activeClass="bg-gray-200"
              class="whitespace-nowrap"
              on:click={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              {item.name}
              {item.highLight && (
                <div class="inline-grid *:[grid-area:1/1]">
                  <div class="status status-success animate-ping"></div>
                  <div class="status status-success"></div>
                </div>
              )}
            </A>
          )}
        </li>
      )}
    </For>
  );
};

export default function Layout(props: { children: any }) {
  const location = useLocation();
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <div class="navbar bg-base-100 shadow-sm">
        <div class="navbar-start">
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabindex="-1"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {menuDesktop(menu)}
            </ul>
          </div>
          <a class="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div class="navbar-center hidden lg:z-2 lg:flex">
          <ul class="menu menu-horizontal px-1">
            {menuMobile(menu, open(), setOpen)}
          </ul>
        </div>
        {/* in future is step */}
        <div class="navbar-end">
          <a class="btn">Button</a>
        </div>
      </div>
      <div class="mr-auto ml-auto flex w-full grow justify-center gap-6 p-4 max-md:flex-col">
        <Suspense>{props.children}</Suspense>
      </div>

      <Footer />
    </>
  );
}
