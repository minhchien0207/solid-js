import { Title } from "@solidjs/meta";
// import Counter from '~/components/Counter';
import Card from "~/components/card/Card";
import { For } from "solid-js";

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      {/* <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p> */}

      <div class="w-full pr-4 pl-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <For each={Array.from({ length: 10 })} fallback={<p>Loading...</p>}>
            {(item) => <Card />}
          </For>
        </div>
      </div>
    </main>
  );
}
