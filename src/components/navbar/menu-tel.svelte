<script lang="ts">
  import type { ElementiMenu } from "./types";

  let visibile = false;

  export let elementiMenu: ElementiMenu;

  let target: Element | null;
  function portal(node: any, inject: string) {
    target = document.querySelector(inject);
    if (target && target.parentElement) {
      target.className = "portal fixed top-0 z-[999999] h-full w-full";
      target.appendChild(node);
      document.body.className = "overflow-hidden";
    }

    return {
      update() {
        // the value of `bar` has changed
      },

      destroy() {
        if (target) {
          target.className = "portal";
          document.body.className = "";
        }
      },
    };
  }
</script>

<div
  on:click={() => {
    visibile = true;
  }}
  on:keydown
>
  <svg
    fill="currentColor"
    class="h-5 w-8 text-gray-800 "
    width="24"
    height="24"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Menu</title>
    <path
      class="astronav-toggle hidden"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
    />
    <path
      class="astronav-toggle"
      fill-rule="evenodd"
      d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
    />
  </svg>
</div>

{#if visibile}
  <div class="p-5 flex align-middle h-full w-full bg-slate-500/50" use:portal={".portal"}>
    <div class="flex flex-col bg-white shadow-lg rounded w-full p-5 overflow-auto">
      <div class="mb-5">
        <span class="text-2xl font-medium">Il menu</span>
        <span
          class="float-right w-8 h-8"
          on:click={() => {
            visibile = false;
          }}
          on:keydown
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
            ><path
              d="m12.45 37.95-2.4-2.4L21.6 24 10.05 12.45l2.4-2.4L24 21.6l11.55-11.55 2.4 2.4L26.4 24l11.55 11.55-2.4 2.4L24 26.4Z"
            /></svg
          >
        </span>
      </div>
      {#each elementiMenu as elemento}
        <a class="border-t-[1px]  py-2 text-md" href={elemento.link}>{elemento.nome}</a>
      {/each}
    </div>
  </div>
{/if}
