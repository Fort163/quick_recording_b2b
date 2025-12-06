
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ru from './locales/ru.json';

export default createI18n({
  locale: import.meta.env.VITE_I18N_LOCALE,
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE,
  messages: {
    en,
    ru
  }
});
