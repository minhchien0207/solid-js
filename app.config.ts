import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import devtools from "solid-devtools/vite";

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss({
        // config: {
        //   content: ['./src/**/*.{js,jsx,ts,tsx}'],
        //   safelist: [],
        // },
      }),
      devtools({
        /* features options - all disabled by default */
        autoname: true, // e.g. enable autoname
        locator: {
          targetIDE: "vscode",
          componentLocation: true,
          jsxLocation: true,
        },
      }),
    ],
  },
});
