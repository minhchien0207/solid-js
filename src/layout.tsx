// routes/layout.tsx
import { A } from "@solidjs/router";
import { For, createSignal, Suspense } from "solid-js";
import Footer from "~/components/Footer";

type Menu = {
  name: string;
  href?: string;
  child?: Menu[];
  highLight?: boolean;
};

const menu = [
  {
    name: "Trang chủ",
    href: "/",
  },
  {
    name: "Về chúng tôi",
    href: "/about",
  },
  {
    name: "Component",
    child: [
      {
        name: "Area",
        child: [
          {
            name: "v1",
            href: "/area",
          },
          {
            name: "v2",
            href: "/area-v2",
            highLight: true,
          },
        ],
      },
      {
        name: "Step",
        href: "/step",
      },
      {
        name: "Benefit",
        href: "/benefit",
      },
      {
        name: "Full Benefit",
        child: [
          {
            name: "v1",
            href: "/full-benefit",
          },
          {
            name: "v2",
            href: "/full-benefit-v2",
          },
        ],
      },
      {
        name: "Plan",
        href: "/plan",
      },
      {
        name: "Upgrade Plan",
        href: "/upgrade-plan",
      },
      {
        name: "Question",
        child: [
          {
            name: "v1",
            href: "/question",
          },
          {
            name: "v2",
            href: "/question-v2",
            highLight: true,
          },
        ],
      },
      {
        name: "Form",
        href: "/form",
      },
      {
        name: "Policy Type",
        href: "/policy-type",
      },
    ],
  },
];

const menuMobile = (menu: Menu[]) => {
  if (menu.length === 0) return null;

  return (
    <For each={menu}>
      {(item: Menu) => (
        <li>
          {item.child ? (
            <>
              <a>{item.name}</a>
              <ul class="p-2">{menuMobile(item.child)}</ul>
            </>
          ) : (
            <A
              href={item?.href ?? ""}
              end={item.href === "/"}
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

const menuDesktop = (
  menu: Menu[],
  statusOpen: boolean,
  setOpen: (open: boolean) => void,
) => {
  return (
    <For each={menu}>
      {(item) => (
        <li
          // data-stagger="ttb"
          // style={`--stagger-translate-x: -1em;--stagger-translate-y: 0;`}
          on:click={() => setOpen(!statusOpen)}
        >
          {item.child ? (
            <details open={statusOpen}>
              <summary on:click={(e) => e.stopPropagation()}>
                {item.name}
              </summary>
              <ul class="z-1 p-2">
                {menuDesktop(item.child, statusOpen, setOpen)}
              </ul>
            </details>
          ) : (
            <A
              href={item?.href ?? ""}
              end={item.href === "/"}
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
  let languageRef;
  const [open, setOpen] = createSignal(false);
  const [language, setLanguage] = createSignal(navigator.language);

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
    languageRef?.click();
  };

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
                {" "}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabindex="-1"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {menuMobile(menu)}
            </ul>
          </div>
          <a class="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div class="navbar-center hidden lg:z-2 lg:flex">
          <ul class="menu menu-horizontal px-1">
            {menuDesktop(menu, open(), setOpen)}
          </ul>
        </div>
        {/* in future is step */}
        <div class="navbar-end">
          <details class="dropdown dropdown-end">
            <summary class="btn btn-ghost m-1" ref={languageRef}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z" />
              </svg>
              {language()}
            </summary>
            <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-fit p-2 shadow-sm">
              <li
                classList={{
                  active: language() === "vi",
                }}
              >
                <button on:click={() => handleChangeLanguage("vi")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <rect
                      x="1"
                      y="4"
                      width="30"
                      height="24"
                      rx="4"
                      ry="4"
                      fill="#c93728"
                    ></rect>
                    <path
                      d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                      opacity=".15"
                    ></path>
                    <path
                      d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                      fill="#fff"
                      opacity=".2"
                    ></path>
                    <path
                      fill="#ff5"
                      d="M18.008 16.366L21.257 14.006 17.241 14.006 16 10.186 14.759 14.006 10.743 14.006 13.992 16.366 12.751 20.186 16 17.825 19.249 20.186 18.008 16.366z"
                    ></path>
                  </svg>
                </button>
              </li>
              <li
                classList={{
                  active: language() === "en-US",
                }}
              >
                <button on:click={() => handleChangeLanguage("en-US")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <rect
                      x="1"
                      y="4"
                      width="30"
                      height="24"
                      rx="4"
                      ry="4"
                      fill="#fff"
                    ></rect>
                    <path
                      d="M1.638,5.846H30.362c-.711-1.108-1.947-1.846-3.362-1.846H5c-1.414,0-2.65,.738-3.362,1.846Z"
                      fill="#a62842"
                    ></path>
                    <path
                      d="M2.03,7.692c-.008,.103-.03,.202-.03,.308v1.539H31v-1.539c0-.105-.022-.204-.03-.308H2.03Z"
                      fill="#a62842"
                    ></path>
                    <path fill="#a62842" d="M2 11.385H31V13.231H2z"></path>
                    <path
                      fill="#a62842"
                      d="M2 15.077H31V16.923000000000002H2z"
                    ></path>
                    <path fill="#a62842" d="M1 18.769H31V20.615H1z"></path>
                    <path
                      d="M1,24c0,.105,.023,.204,.031,.308H30.969c.008-.103,.031-.202,.031-.308v-1.539H1v1.539Z"
                      fill="#a62842"
                    ></path>
                    <path
                      d="M30.362,26.154H1.638c.711,1.108,1.947,1.846,3.362,1.846H27c1.414,0,2.65-.738,3.362-1.846Z"
                      fill="#a62842"
                    ></path>
                    <path
                      d="M5,4h11v12.923H1V8c0-2.208,1.792-4,4-4Z"
                      fill="#102d5e"
                    ></path>
                    <path
                      d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                      opacity=".15"
                    ></path>
                    <path
                      d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                      fill="#fff"
                      opacity=".2"
                    ></path>
                    <path
                      fill="#fff"
                      d="M4.601 7.463L5.193 7.033 4.462 7.033 4.236 6.338 4.01 7.033 3.279 7.033 3.87 7.463 3.644 8.158 4.236 7.729 4.827 8.158 4.601 7.463z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M7.58 7.463L8.172 7.033 7.441 7.033 7.215 6.338 6.989 7.033 6.258 7.033 6.849 7.463 6.623 8.158 7.215 7.729 7.806 8.158 7.58 7.463z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M10.56 7.463L11.151 7.033 10.42 7.033 10.194 6.338 9.968 7.033 9.237 7.033 9.828 7.463 9.603 8.158 10.194 7.729 10.785 8.158 10.56 7.463z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M6.066 9.283L6.658 8.854 5.927 8.854 5.701 8.158 5.475 8.854 4.744 8.854 5.335 9.283 5.109 9.979 5.701 9.549 6.292 9.979 6.066 9.283z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M9.046 9.283L9.637 8.854 8.906 8.854 8.68 8.158 8.454 8.854 7.723 8.854 8.314 9.283 8.089 9.979 8.68 9.549 9.271 9.979 9.046 9.283z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M12.025 9.283L12.616 8.854 11.885 8.854 11.659 8.158 11.433 8.854 10.702 8.854 11.294 9.283 11.068 9.979 11.659 9.549 12.251 9.979 12.025 9.283z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M6.066 12.924L6.658 12.494 5.927 12.494 5.701 11.799 5.475 12.494 4.744 12.494 5.335 12.924 5.109 13.619 5.701 13.19 6.292 13.619 6.066 12.924z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M9.046 12.924L9.637 12.494 8.906 12.494 8.68 11.799 8.454 12.494 7.723 12.494 8.314 12.924 8.089 13.619 8.68 13.19 9.271 13.619 9.046 12.924z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M12.025 12.924L12.616 12.494 11.885 12.494 11.659 11.799 11.433 12.494 10.702 12.494 11.294 12.924 11.068 13.619 11.659 13.19 12.251 13.619 12.025 12.924z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M13.539 7.463L14.13 7.033 13.399 7.033 13.173 6.338 12.947 7.033 12.216 7.033 12.808 7.463 12.582 8.158 13.173 7.729 13.765 8.158 13.539 7.463z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M4.601 11.104L5.193 10.674 4.462 10.674 4.236 9.979 4.01 10.674 3.279 10.674 3.87 11.104 3.644 11.799 4.236 11.369 4.827 11.799 4.601 11.104z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M7.58 11.104L8.172 10.674 7.441 10.674 7.215 9.979 6.989 10.674 6.258 10.674 6.849 11.104 6.623 11.799 7.215 11.369 7.806 11.799 7.58 11.104z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M10.56 11.104L11.151 10.674 10.42 10.674 10.194 9.979 9.968 10.674 9.237 10.674 9.828 11.104 9.603 11.799 10.194 11.369 10.785 11.799 10.56 11.104z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M13.539 11.104L14.13 10.674 13.399 10.674 13.173 9.979 12.947 10.674 12.216 10.674 12.808 11.104 12.582 11.799 13.173 11.369 13.765 11.799 13.539 11.104z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M4.601 14.744L5.193 14.315 4.462 14.315 4.236 13.619 4.01 14.315 3.279 14.315 3.87 14.744 3.644 15.44 4.236 15.01 4.827 15.44 4.601 14.744z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M7.58 14.744L8.172 14.315 7.441 14.315 7.215 13.619 6.989 14.315 6.258 14.315 6.849 14.744 6.623 15.44 7.215 15.01 7.806 15.44 7.58 14.744z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M10.56 14.744L11.151 14.315 10.42 14.315 10.194 13.619 9.968 14.315 9.237 14.315 9.828 14.744 9.603 15.44 10.194 15.01 10.785 15.44 10.56 14.744z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M13.539 14.744L14.13 14.315 13.399 14.315 13.173 13.619 12.947 14.315 12.216 14.315 12.808 14.744 12.582 15.44 13.173 15.01 13.765 15.44 13.539 14.744z"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </details>
        </div>
      </div>
      <div class="mr-auto ml-auto flex w-full grow justify-center gap-6 p-4 max-md:flex-col">
        <Suspense>{props.children}</Suspense>
      </div>

      <Footer />
    </>
  );
}
