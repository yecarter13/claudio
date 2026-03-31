"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { fr } from "./fr";
import { en } from "./en";
import type { Translations } from "./fr";

export type Lang = "fr" | "en";

interface I18nCtx {
  lang: Lang;
  t: Translations & { lang: Lang };
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nCtx>({
  lang: "fr",
  t: { ...fr, lang: "fr" as Lang },
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
  };

  return (
    <I18nContext.Provider value={{ lang, t: { ...(lang === "fr" ? fr : en), lang }, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
