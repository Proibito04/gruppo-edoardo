export const language: { [key in Language]: string } = {
  it: "Italiano",
  en: "English"
};

export const languageMin: { [key in Language]: string } = {
  it: "It",
  en: "En"
};

export type Language = "it" | "en";

export const defaultLanguage = "it";

export type UI = { [key in Language]: { [key: string]: string } };
