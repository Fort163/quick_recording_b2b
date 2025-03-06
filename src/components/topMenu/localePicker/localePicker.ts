import Component from "vue-class-component";
import Vue from "vue";
import {LocaleItem} from "@/store/model";
import {convertI18nLocale} from "@/store/util/LocaleUtil";

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
        this.$cookies.set("i18next", value.localeCookie, "expiring time")
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

}