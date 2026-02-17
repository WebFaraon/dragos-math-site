import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ro from './locales/ro.json'
import ru from './locales/ru.json'

const resources = {
  ro: { translation: ro },
  en: { translation: en },
  ru: { translation: ru },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ro',
    supportedLngs: ['ro', 'en', 'ru'],
    load: 'languageOnly',
    cleanCode: true,
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
