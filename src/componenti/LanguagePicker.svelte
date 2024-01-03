<script>
  import { onMount } from "svelte";

  export let selectedLang = "it"; // La lingua selezionata di default
  import { language, languageMin } from "../i18n/ui";

  const urlMap = {
    "/contatti/": "/en/contacts/",
    "/il-team/": "/en/our-team/",
    "/lavora-con-noi/": "/en/work-with-us/",
    "/le-nostre-proposte/": "/en/our-proposal/"
  };

  function convertPath(path, lang) {
    const staticMapping = Object.entries(urlMap).find(([itPath, enPath]) =>
      path === itPath || path === enPath
    );
    if (staticMapping) {
      return lang === "it" ? staticMapping[0] : staticMapping[1];
    }

    if (lang === "it") {
      return path.startsWith("/en/immobile/") ? path.replace("/en/immobile/", "/immobile/") : path.replace("/en/", "/");
    } else {
      return path.startsWith("/immobile/") ? `/en${path}` : `/en${path}`;
    }
  }


  function switchLanguage(event) {
    const lang = event.target.value;
    const currentPath = window.location.pathname;
    window.location.href = convertPath(currentPath, lang);
  }

  let isMobile = false;

  onMount(() => {
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  });

  function checkIfMobile() {
    isMobile = window.innerWidth <= 768; // O qualsiasi altra soglia che ritieni appropriata
  }

</script>

<select bind:value={selectedLang} on:change={switchLanguage}>
  {#each Object.entries(isMobile ? languageMin : language) as [lang, label]}
    <option value={lang}>
      {label}
    </option>
  {/each}
</select>
