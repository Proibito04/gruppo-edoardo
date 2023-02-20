<script lang="ts">
  import type { Immobile } from "../../types/immobili";


  export let immobile: Immobile | null = null;

  
  let prezzo: any;
  if (immobile?.prezzo) {
    prezzo = parseInt(immobile.prezzo) ?? 0;
    prezzo = isNaN(prezzo) ? immobile?.prezzo : prezzo.toLocaleString();
  }
</script>

<a class="flex flex-col drop-shadow-xs border bg-white w-[330px] rounded h-auto hover:drop-shadow-xl hover:border-gray-300 transition-all" href={immobile ? `/immobile/${immobile.id}` : "./"}>
  <div class="p-5 flex flex-col gap-5">
    {#if immobile == null}
      <div class="w-full bg-slate-300 h-full aspect-video animate-pulse" />
      <div class="h-6 bg-slate-300 animate-pulse" />
    {:else}
      <div class="w-full bg-white h-[220px] aspect-video">
        <img
          src={immobile.immagine_copertina}
          alt=""
          class="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div class="font-medium text-primario h-auto">
        <span class="font-poppins text-xl"
          >{immobile.indirizzo_immobile.name} - {immobile.indirizzo_immobile.state_short}</span
        >
        <span class="block text-sm">{immobile.tipologia}</span>
      </div>
    {/if}
  </div>

  <div class="bg-primario p-6 py-10 flex flex-col h-full">
    {#if immobile == null}
      <div class="flex gap-5 [&>*]:rounded mb-5">
        <div class="h-6 bg-slate-300 animate-pulse w-5" />
        <div class="h-6 bg-slate-300 animate-pulse w-5" />
        <div class="h-6 bg-slate-300 animate-pulse w-5" />
        <div class="h-6 bg-slate-300 animate-pulse w-5" />
      </div>
      <div class="h-6 bg-slate-300 animate-pulse w-[50%]" />
    {:else}
      <div class="flex flex-wrap text-white gap-5 h-full flex-col justify-between">
        <div
          class=" [&>div]:flex [&>div]:fill-white [&>div]:gap-2 [&>svg]:w-1 flex gap-3 flex-wrap"
        >
          <!-- piano -->
          <div class="flex gap-2 [&>svg]:w-5">
            <svg viewBox="0 0 24 24" width="24" height="24" class="w-full">
              <path
                d="M24,23.48a.85.85,0,0,1-.89.52Q12,24,.87,24A.79.79,0,0,1,0,23.13q0-2.67,0-5.34a.8.8,0,0,1,.88-.87c1.49,0,3,0,4.45,0h.31v-.29c0-1.49,0-3,0-4.46a.79.79,0,0,1,.9-.89c1.49,0,3,0,4.47,0h.29V6.47a.73.73,0,0,1,.83-.83h4.81V5.34c0-1.46,0-2.92,0-4.38a.94.94,0,0,1,.51-1h6A1,1,0,0,1,24,.52ZM18.37,1.42V6.13c0,.69-.25.93-.95.93H12.71v.3c0,1.5,0,3,0,4.49a.8.8,0,0,1-.87.86c-1.51,0-3,0-4.52,0H7.07v4.7c0,.72-.24,1-1,1H1.43v4.21H22.58V1.42Z"
              />
            </svg>
            <span> {immobile.piano} </span>
          </div>

          <!--  superficie -->
          <div>
            <svg viewBox="0 0 24 24" width="24" height="24" class="w-5">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
              />
            </svg>
            <span>{immobile.superficie} <span class="text-xs">mq²</span></span>
          </div>

          <!--  superficie -->
          <div>
            <svg viewBox="0 0 24 24" width="24" height="24" class="w-5">
              <path d="M0 0h24v24H0V0z" fill="none" /><path
                d="M19 19V4h-4V3H5v16H3v2h12V6h2v15h4v-2h-2zm-6 0H7V5h6v14zm-3-8h2v2h-2z"
              />
            </svg>
            <span>{immobile.superficie} <span class="text-xs">mq²</span></span>
          </div>
          <!-- fine dettagli -->
        </div>

        <div class="h-0.5 bg-white"></div>

        <div class="h-fit self-end">
          <span class="text-xl font-medium  ">€ {prezzo}</span>
        </div>
      </div>
    {/if}
  </div>
</a>
