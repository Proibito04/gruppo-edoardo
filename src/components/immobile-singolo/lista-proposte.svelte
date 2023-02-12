<script lang="ts">
  import { onMount } from "svelte";
  import ImmobileAnteprima from "../immobili/immobile-anteprima.svelte";

  let pagineTotali = 0;
  let immobili: any[] = [];
  let paginaCorrente = 0;
  let controllo = 0;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pagina = urlParams.get("pagina");

    ottieniImmobili(pagina as string);
  });

  function ottieniUrl(pagina: string): string {
    return `https://gruppoedoardo.it/wp-json/wp/v2/immobili?_fields=acf,galleriaSrc,id&page=${pagina}`;
  }

  function ottieniImmobili(pagina: string) {
    fetch(ottieniUrl(pagina as string))
      .then((response) => {
        if (!response.ok) {
          throw Error("Troppe pagine!");
        }

        if (response.headers.get("x-wp-totalpages") != null) {
          pagineTotali = parseInt(response.headers.get("x-wp-totalpages") as string);
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((element: any) => {
          element.acf.immagine_copertina =
            element.galleriaSrc[element.acf.immagine_copertina].media;
          element.acf.id = element.id;
          immobili.push(element.acf);
        });

        paginaCorrente = parseInt(pagina);
        immobili = immobili;
      })
      .catch(() => {
        if (controllo < 3) {
          controllo++;
          aggiornaUrl(1);
        } else {
          console.error("errore Irriversibile!");
        }
      });
  }

  function paginaSuccesiva() {
    immobili = [];
    paginaCorrente++;
    aggiornaUrl(paginaCorrente);
  }

  function paginaPrecedente() {
    immobili = [];
    paginaCorrente--;
    aggiornaUrl(paginaCorrente);
  }

  function aggiornaUrl(pagina: number) {
    const url = new URL(document.location.toString());
    url.searchParams.set("pagina", pagina.toString());
    window.history.pushState({}, "", url);
    ottieniImmobili(pagina.toString());
  }
</script>

<div>
  <div class="my-5 flex gap-5">
    <button
      on:click={paginaPrecedente}
      on:keydown
      disabled={paginaCorrente <= 1}
      class="inline-block rounded bg-blue-600 p-3 text-white transition-all disabled:bg-gray-400"
    >
      ⬅️ Pagina precedente</button
    >
    <button
      on:click={paginaSuccesiva}
      on:keydown
      disabled={paginaCorrente >= pagineTotali}
      class="inline-block rounded bg-blue-600 p-3 text-white transition-all disabled:bg-gray-400"
      >Pagina successiva ➡️</button
    >
  </div>
  <div class="flex flex-wrap gap-10">
    {#if immobili.length == 0}
      {#each Array(8) as _, i}
        <ImmobileAnteprima />
      {/each}
    {/if}

    {#each immobili as immobile}
      <ImmobileAnteprima {immobile} />
    {/each}
  </div>
</div>
