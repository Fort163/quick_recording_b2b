import VueI18n from "vue-i18n";
import Vue from "vue";
import VueCookies from "vue-cookies";

Vue.use(VueI18n);

function loadLocaleMessages() {
    const locales = require.context(
        "./",
        true,
        /[A-Za-z0-9-_,\s]+\.json$/i
    );
    const messages = {};
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            // @ts-ignore
            messages[locale] = locales(key);
        }
    });
    return messages;
}

function loadLocale() : string{
    return process.env.VUE_APP_I18N_LOCALE;
}

export default new VueI18n({
    locale: loadLocale(),
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
    messages: loadLocaleMessages()
});