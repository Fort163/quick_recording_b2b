import {LocaleItem} from "@/models/main";

export function convertI18nLocale(locale: string): LocaleItem | null {
    switch (locale) {
        case "ru" : {
            return new LocaleItem("ru", "ru", "ru_RU", "ru_RU");
        }
        case "en" : {
            return new LocaleItem("en", "en", "en_EN", "en_US");
        }
        default: {
            return null;
        }
    }
}

export function convertCookieLocale(locale: string): LocaleItem | null {
    switch (locale) {
        case "ru_RU" : {
            return new LocaleItem("ru", "ru", "ru_RU", "ru_RU");
        }
        case "en_EN" : {
            return new LocaleItem("en", "en", "en_EN", "en_US");
        }
        default: {
            return null;
        }
    }
}
