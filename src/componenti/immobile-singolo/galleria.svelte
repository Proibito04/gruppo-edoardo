<script lang="ts">
  type galleria = {
    [key: string]: {
      media: string;
      large: string;
    };
  };
  export let galleriaSrc: galleria;
  export let galleriaId: string[];

  let contatore = 0;
  let immagineCorrente = galleriaId[contatore];

  function incrementaContatore() {
    if (contatore < galleriaId.length - 1) {
      contatore++;
      immagineCorrente = galleriaId[contatore];
    }
  }

  function decrementaContatore() {
    if (contatore > 0) {
      contatore--;
      immagineCorrente = galleriaId[contatore];
    }
  }
</script>

<div
  class="relative h-[300px] w-full select-none border drop-shadow-md md:h-[550px] xl:w-[65%]"
>
  <div class="absolute h-full w-full md:w-[66%]">
    <div class="absolute flex h-full w-full items-center justify-between">
      <div
        on:click={decrementaContatore}
        on:keydown={decrementaContatore}
        class="flex h-full cursor-pointer items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          class="mx-5 w-10 {contatore === 0 ? 'fill-gray-300' : 'fill-white'}"
        >
          <path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z" />
        </svg
        >
      </div>
      <div
        on:click={incrementaContatore}
        on:keydown={incrementaContatore}
        class="flex h-full cursor-pointer items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          class="mx-5 w-10 {contatore === galleriaId.length - 1
            ? 'fill-gray-300'
            : 'fill-white'}"
        >
          <path
            d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"
          />
        </svg
        >
      </div>
    </div>

    <img
      src={galleriaSrc[immagineCorrente].large}
      alt=""
      class="h-full w-full object-cover"
    />
  </div>

  <div class="absolute left-[66%] hidden h-[50%] w-[34%] md:block">
    <img
      src={galleriaSrc[galleriaId[1]].media}
      alt=""
      class="h-full w-full object-cover"
    />
  </div>
  <div class="absolute left-[66%] top-[50%] hidden h-[50%] w-[34%] md:block">
    <div class="h-full w-full">
      <img
        src={galleriaSrc[galleriaId[2]].media}
        alt=""
        class="h-full w-full object-cover"
      />
    </div>
  </div>
</div>
