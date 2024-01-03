<script lang="ts">
  import { onMount } from "svelte";
  import ImmobileAnteprima from "./immobile-anteprima.svelte";
  import type { Language } from "../../i18n/ui";

  export let urlImmobili: string;
  let caricamento = true;
  let dataImmobili: any;

  onMount(async () => {
    const response = await fetch(urlImmobili);
    const character = await response.json();
    dataImmobili = character;

    caricamento = false;
  });

  export let lang: Language = "it";
</script>


<div class="flex flex-wrap gap-5 overflow-x-auto md:justify-start">
  {#if caricamento}
    <ImmobileAnteprima />
    <ImmobileAnteprima />
    <ImmobileAnteprima />
  {:else}
    {#each dataImmobili as immobile}
      <ImmobileAnteprima {immobile} {lang} />
    {/each}
  {/if}
</div>

<!-- TODO quando aggiorno un immobile mandare il json a google cloud -->
