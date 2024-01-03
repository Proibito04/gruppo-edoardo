<script lang="ts">
  import { onMount } from "svelte";
  import ImmobileAnteprima from "../immobili/immobile-anteprima.svelte";
  import type { Language, UI } from "../../i18n/ui.ts";
  import { useTranslations } from "../../i18n/utilis.ts";

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
    return `https://privato.gruppoedoardo.it/wp-json/wp/v2/immobili?_fields=acf,galleriaSrc,id&page=${pagina}`;
  }

  /**
   * Ottiene gli immobili dal server
   * @param pagina
   */
  function ottieniImmobili(pagina: string): void {
    fetch(ottieniUrl(pagina as string))
      .then((response) => {
        if (!response.ok) {
          throw Error("Troppe pagine!");
        }

        if (response.headers.get("x-wp-totalpages") != null) {
          pagineTotali = parseInt(
            response.headers.get("x-wp-totalpages") as string
          );
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((element: any) => {
          let immagine = element.galleriaSrc[element.acf.immagine_copertina];
          immagine = immagine ? immagine.media : "/img/solo-a.svg";
          element.acf.immagine_copertina = immagine;
          element.acf.id = element.id;
          immobili.push(element.acf);
        });

        paginaCorrente = parseInt(pagina);
        immobili = immobili;
      })
      .catch((errore) => {
        console.error(errore);
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

  const ui: UI = {
    it: {
      next: "Pagina Successiva",
      previous: "Pagina precedente"
    },
    en: {
      next: "Next page",
      previous: "Previous page"
    }
  };
  export let lang: Language = "it";
  const t = useTranslations(lang, ui);
</script>

<div>
  <div class="my-5 flex gap-5">
    <button
      on:click={paginaPrecedente}
      on:keydown
      disabled={paginaCorrente <= 1}
      class="inline-block rounded bg-blue-600 p-3 text-white transition-all disabled:bg-gray-400"
    >
      ⬅️ {t("previous")}
    </button
    >
    <button
      on:click={paginaSuccesiva}
      on:keydown
      disabled={paginaCorrente >= pagineTotali}
      class="inline-block rounded bg-blue-600 p-3 text-white transition-all disabled:bg-gray-400"
    >{t("next")} ➡️
    </button
    >
  </div>
  <div class="flex flex-wrap gap-10">
    {#if immobili.length == 0}
      {#each Array(8) as _}
        <ImmobileAnteprima />
      {/each}
    {/if}

    {#each immobili as immobile}
      <ImmobileAnteprima immobile={immobile} />
    {/each}
  </div>
</div>
