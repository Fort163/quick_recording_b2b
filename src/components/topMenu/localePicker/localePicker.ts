import Component from "vue-class-component";
import Vue from "vue";
import {convertI18nLocale} from "@/store/util/LocaleUtil";
import {LocaleItem} from "@/models/main";

@Component({
    components: {
    }
})
export default class LocalePicker extends Vue {

    private show : boolean = false;

    private store : Array<LocaleItem> = new Array<LocaleItem>()
    private value : LocaleItem = this.convertLocale(this.$i18n.locale);

    created() {
        this.$i18n.availableLocales.forEach(item => {
            this.store.push(this.convertLocale(item))
        })
    }

    public setLocale(value : LocaleItem) : void{
        this.show = false;
        this.value = value;
        this.$i18n.locale = value.locale
        this.$cookies.set("i18next", value.localeCookie, this.getCookieExpires())
        this.$store.commit("setLocale",value);
    }

    private convertLocale(locale : string) : LocaleItem {
        let result = convertI18nLocale(locale);
        if(!result){
            result = new LocaleItem("ru","ru", "ru_RU", "ru_RU")
        }
        return result;
    }

    getOffset() : string{
        const offset = (this.store.length - 1) * -25;
        return offset+'px';
    }

    getImgUrl(locale: string) {
        const images = require.context("../../../assets/locales/", false, /\.png$/)
        return images('./' + locale + ".png")
    }

    getCookieExpires() : Date {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1)
        return date;
    }

}