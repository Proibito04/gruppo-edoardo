<script lang="ts">
  let nome: string = "",
    cognome: string = "",
    email: string = "",
    dettagli = "",
    inviati = false;
  let caricando = false;
  let errore = false;

  function inviaForm() {
    caricando = true;
    fetch("https://privato.gruppoedoardo.it/wp-json/forms/contatti-interessati", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        cognome: cognome,
        email: email,
        dettagli: dettagli,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        nascondiNotifica();
        nome = "";
        cognome = "";
        email = "";
        dettagli = "";
        inviati = false;
      })
      .catch((error) => {
        nascondiNotifica(true);
      });
  }

  function nascondiNotifica(errore: boolean = false) {
    setTimeout(() => {
      caricando = false;
      errore = errore;
    }, 5000);
  }
</script>

<form on:submit|preventDefault={inviaForm} class:inviati>
  <label class="block">
    <span class="text-gray-700">Nome</span>
    <input
      type="text"
      class="input-text"
      placeholder="Mario"
      name="nome"
      bind:value={nome}
      required
    />
  </label>
  <label class="block">
    <span class="text-gray-700">Cognome</span>
    <input type="text" class="input-text" placeholder="Rossi" bind:value={cognome} required />
  </label>
  <label class="block">
    <span class="text-gray-700">Email</span>
    <input
      type="email"
      class="input-text"
      placeholder="mario@esempio.it"
      bind:value={email}
      required
    />
  </label>
  <label class="block">
    <span class="text-gray-700">Dettagli</span>
    <textarea
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      bind:value={dettagli}
      rows="3"
    />
  </label>

  <div class="block">
    <div class="">
      <div>
        <label class="inline-flex items-center">
          <input
            type="checkbox"
            class="my-3 rounded border-gray-300 text-blue-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
            required
          />
          <span class="ml-2">Accetta la privacy</span>
        </label>
      </div>
    </div>
  </div>
  <input
    type="submit"
    value="📤 Invia"
    class="submit w-full rounded bg-blue-600 p-5 py-4 text-center font-bold text-white transition-all hover:cursor-pointer hover:bg-blue-700"
    on:click={() => {
      inviati = true;
    }}
  />
</form>

{#if caricando}
  {#if errore}
    <div class="border border-red-400 bg-white p-2 text-red-600">errore</div>
  {:else}
    <div class="border  bg-green-500 p-2 text-white">Form inviato con successo</div>
  {/if}
{/if}

<style type="text/postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .input-text {
    @apply mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm;
  }

  .input-text:focus {
    @apply border-indigo-300 ring ring-indigo-200 ring-opacity-50;
  }

  .inviati:invalid .input-text:invalid,
  .inviati:invalid .submit:invalid {
    @apply border-red-300 ring ring-red-200 ring-opacity-50;
  }

  label {
    @apply mt-3;
  }

  /* .input-text:valid{
    @apply border-green-300 ring ring-green-200 ring-opacity-50 ;
  } */
</style>
