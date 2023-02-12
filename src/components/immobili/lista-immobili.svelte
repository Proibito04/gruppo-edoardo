<script lang="ts">
  import { onMount } from "svelte";
  import ImmobileAnteprima from "./immobile-anteprima.svelte";

  export let urlImmobili: string;
  let caricamento = true;
  let dataImmobili: any;

  onMount(async () => {
    const response = await fetch(urlImmobili);
    const character = await response.json();
    dataImmobili = character;
    console.log(character);
    caricamento = false;
  });
</script>

<div class="flex overflow-x-auto gap-5 flex-wrap md:justify-start">
  {#if caricamento}
    <ImmobileAnteprima />
    <ImmobileAnteprima />
    <ImmobileAnteprima />
  {:else}
    {#each dataImmobili as immobile}
      <ImmobileAnteprima {immobile} />
    {/each}
  {/if}
</div>

<!-- TODO quando aggiorno un immobile mandare il json a google cloud -->
