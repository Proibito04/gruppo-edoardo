<script lang="ts">
  import type { Language, UI } from "../../i18n/ui";
  import { useTranslations } from "../../i18n/utilis";
  import type { Immobile } from "../../types/immobili";

  export let immobile: Immobile | null = null;

  let prezzo: any;
  if (immobile?.prezzo) {
    prezzo = parseInt(immobile.prezzo) ?? 0;
    prezzo = isNaN(prezzo) ? immobile?.prezzo : prezzo.toLocaleString();
  }

  const ui: UI = {
    it: {
      floor: "Piano",
      area: "Superficie",
      price: "Prezzo"
    },
    en: {
      floor: "Floor",
      area: "Area",
      price: "Price"
    }
  };
  export let lang: Language = "it";
  const t = useTranslations(lang, ui);

  function getLink(): string {
    if (!immobile) return "#";
    if (lang == "en") return `/en/immobile/${immobile.id}`;
    return `/immobile/${immobile.id}`;
  }
</script>

<a
  class="drop-shadow-xs flex h-auto w-[330px] flex-col rounded border bg-white transition-all hover:border-gray-300 hover:drop-shadow-xl"
  href={getLink()}
>
  <div class="flex flex-col gap-5 p-5">
    {#if immobile == null}
      <div class="aspect-video h-full w-full animate-pulse bg-slate-300" />
      <div class="h-6 animate-pulse bg-slate-300" />
    {:else}
      <div class="aspect-video h-full w-full bg-white">
        <img
          src={immobile.immagine_copertina}
          alt=""
          class="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div class="h-auto font-medium text-primario">
        <span class="font-poppins text-xl"
        >{immobile.indirizzo_immobile.name} - {immobile.indirizzo_immobile
          .state_short}</span
        >
        <span class="block text-sm">{immobile.tipologia}</span>
      </div>
    {/if}
  </div>

  <div class="flex h-full flex-col bg-primario p-6 py-10">
    {#if immobile == null}
      <div class="mb-5 flex gap-5 [&>*]:rounded">
        <div class="h-6 w-5 animate-pulse bg-slate-300" />
        <div class="h-6 w-5 animate-pulse bg-slate-300" />
        <div class="h-6 w-5 animate-pulse bg-slate-300" />
        <div class="h-6 w-5 animate-pulse bg-slate-300" />
      </div>
      <div class="h-6 w-[50%] animate-pulse bg-slate-300" />
    {:else}
      <div
        class="flex h-full flex-col flex-wrap justify-between gap-5 text-white"
      >
        <div
          class=" flex flex-col flex-wrap gap-3 [&>div]:flex [&>div]:gap-2 [&>div]:fill-white [&>svg]:w-1"
        >
          <!-- piano -->
          <div class="flex gap-2 [&>svg]:w-5">
            <svg viewBox="0 0 24 24" width="24" height="24" class="w-full">
              <path
                d="M24,23.48a.85.85,0,0,1-.89.52Q12,24,.87,24A.79.79,0,0,1,0,23.13q0-2.67,0-5.34a.8.8,0,0,1,.88-.87c1.49,0,3,0,4.45,0h.31v-.29c0-1.49,0-3,0-4.46a.79.79,0,0,1,.9-.89c1.49,0,3,0,4.47,0h.29V6.47a.73.73,0,0,1,.83-.83h4.81V5.34c0-1.46,0-2.92,0-4.38a.94.94,0,0,1,.51-1h6A1,1,0,0,1,24,.52ZM18.37,1.42V6.13c0,.69-.25.93-.95.93H12.71v.3c0,1.5,0,3,0,4.49a.8.8,0,0,1-.87.86c-1.51,0-3,0-4.52,0H7.07v4.7c0,.72-.24,1-1,1H1.43v4.21H22.58V1.42Z"
              />
            </svg>
            <span> {t("floor")}: {immobile.piano} </span>
          </div>

          <!--  superficie -->
          <div>
            <svg viewBox="0 0 24 24" width="24" height="24" class="w-5">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
              />
            </svg>
            <span
            >{t("area")}: {immobile.superficie}
              <span class="text-xs">mq²</span></span
            >
          </div>
          <!-- fine dettagli -->
        </div>

        <div class="h-0.5 bg-white" />

        <div class="h-fit self-end">
          <span class="text-xl font-medium">{t("price")}: € {prezzo}</span>
        </div>
      </div>
    {/if}
  </div>
</a>
