import Component from "vue-class-component";
import Vue from "vue";
import {Company, MapSettings, State} from "@/store/model";
import {Inject} from "vue-property-decorator";
import Button from "@/components/button/Button.vue";
import {RestrictionFactory} from "@/store/restriction/RestrictionFactory";
// @ts-ignore
import {loadYmap, yandexMap, ymapMarker} from 'vue-yandex-maps'
import {GeocoderResultDefault} from "@/structure/map/ymapsModel";

@Component({
    components: {
        Button,
        yandexMap,
        ymapMarker,
        loadYmap,
    }

})
export default class CompanyStep_2 extends Vue {

    private company : Company = this.$store.getters.createCompany
    private restriction : RestrictionFactory = new RestrictionFactory();
    private pageError : Array<string> = new Array<string>()


    get settings() : MapSettings | null{
        return this.$store.getters.settingsMap
    }

    get coords() : Array<number>{
        if(this.company.geoPosition){
            return [this.company.geoPosition.latitude,this.company.geoPosition.longitude]
        }
        if(this.$store.getters.coordsUser){
            const position : GeolocationCoordinates = this.$store.getters.coordsUser
            return [position.latitude,position.longitude]
        }
        return [55.749346930602925,37.611106671875];
    }

    get markerCompany(){
        return {
            //layout: 'default#imageWithContent',
            imageSize: [43, 43],
            imageOffset: [-15, -43],
            content: 'Моя компания',
            contentOffset: [0, 45],
            shadow:true,
            iconContent: 'islands#blueFactoryIcon',
            contentLayout: '<div style="background: #1E98FF; width: 65px; color: #000000; font-weight: bold; border-radius: 10px">$[properties.iconContent]</div>'
        }
    }

    get companyCoords() : [number,number] | undefined{
        const geocoderResult = this.company.geoPosition;
        if(geocoderResult) {
            return [geocoderResult.latitude,geocoderResult.longitude];
        }
        return undefined;
    }

    public onClick(event: any) {
        ymaps.geocode(event.get('coords')).then(
            (res : any) => {
                this.company.geoPosition = new GeocoderResultDefault(res,event.get('coords'));
            },
            (err : any) => {
                alert(err);
            }
        )
    }

    public submit(){
        if(this.company.geoPosition) {
            this.$store.commit("setCreateCompany", this.company);
            this.$router.push('step_3')
        }
    }

    public back(){
        this.$router.push('step_1')
    }

}