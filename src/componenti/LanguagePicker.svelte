<script>
  export let selectedLang = "it"; // La lingua selezionata di default
  import { language } from "../i18n/ui";
  function switchLanguage(event) {
    const lang = event.target.value;
    if (lang === "it") {
      // Se la lingua selezionata è l'italiano, vai alla root del sito
      window.location.href = "/";
    } else {
      window.location.href = `/${lang}/`;
    }
  }
</script>

<select bind:value={selectedLang} on:change={switchLanguage}>
  {#each Object.entries(language) as [lang, label]}
    <option value={lang}>
      {label}
    </option>
  {/each}
</select>
