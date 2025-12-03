import { MetaProvider, Title } from '@solidjs/meta';
import { A, Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import { For } from 'solid-js';
import './app.css';
import { createSignal } from 'solid-js';

export default function App() {
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
          href: '/area',
        },
        {
          name: 'Area v2',
          href: '/area_v2',
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
          name: 'Plan',
          href: '/plan',
        },
        {
          name: 'Upgrade Plan',
          href: '/upgrade-plan',
        },
        {
          name: 'Question',
          href: '/question',
        },
      ],
    },
  ];

  const [open, setOpen] = createSignal(false);

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
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
                  <For each={menu}>
                    {(item) => (
                      <li>
                        {item.child ? (
                          <>
                            <a>{item.name}</a>
                            <ul class="p-2">
                              <For each={item.child}>
                                {(child) => (
                                  <li>
                                    <A
                                      href={child?.href ?? void 0}
                                      end={child.href === '/'}
                                      activeClass="bg-gray-200"
                                    >
                                      {child.name}
                                    </A>
                                  </li>
                                )}
                              </For>
                            </ul>
                          </>
                        ) : (
                          <A
                            href={item?.href ?? void 0}
                            end={item.href === '/'}
                            activeClass="bg-gray-200"
                          >
                            {item.name}
                          </A>
                        )}
                      </li>
                    )}
                  </For>
                </ul>
              </div>
              <a class="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div class="navbar-center hidden lg:z-2 lg:flex">
              <ul class="menu menu-horizontal px-1">
                <For each={menu}>
                  {(item) => (
                    <li>
                      {item.child ? (
                        <details open={open()}>
                          <summary>{item.name}</summary>
                          <ul class="z-1 p-2">
                            <For each={item.child}>
                              {(child) => (
                                <li on:click={() => setOpen(!open())}>
                                  <A
                                    class="whitespace-nowrap"
                                    href={child?.href ?? void 0}
                                    end={child.href === '/'}
                                    activeClass="bg-gray-200"
                                    on:click={() => setOpen(!open())}
                                  >
                                    {child.name}
                                  </A>
                                </li>
                              )}
                            </For>
                          </ul>
                        </details>
                      ) : (
                        <A
                          href={item?.href ?? void 0}
                          end={item.href === '/'}
                          activeClass="bg-gray-200"
                        >
                          {item.name}
                        </A>
                      )}
                    </li>
                  )}
                </For>
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
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
