import { defaultLanguage } from "./ui"

import type { Language, UI } from "./ui"


export function useTranslations(lang: Language, ui: UI): (key: string) => string {
  return function t(key: string) {
    return ui[lang][key] ?? ui.it[key] ?? "";
  }
}