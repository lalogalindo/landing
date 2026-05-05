import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import { dict, SUPPORTED_LANGS } from "./translations";

const DEFAULT_LANG = process.env.REACT_APP_DEFAULT_LANG || "en";

const I18nContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (path) => path,
});

function getByPath(obj, path) {
  return path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(
    SUPPORTED_LANGS.includes(DEFAULT_LANG) ? DEFAULT_LANG : "en"
  );

  const t = useCallback(
    (path) => {
      const value = getByPath(dict[lang], path);
      if (value === undefined) {
        const fallback = getByPath(dict.en, path);
        return fallback !== undefined ? fallback : path;
      }
      return value;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useT() {
  return useContext(I18nContext);
}
