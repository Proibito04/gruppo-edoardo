export const language = {
  it: "Italiano",
  en: "English",
}

export type Language = "it" | "en"

export const defaultLanguage = "it"

export type UI = { [key in Language]: { [key: string]: string } } 