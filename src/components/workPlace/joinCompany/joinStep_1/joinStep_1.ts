import {Component, toNative, Vue} from "vue-facing-decorator";
import {VueCons} from "vue-facing-decorator/dist/esm/class";

@Component({
    components: {
        /*InputText,
        ComboBox,
        CustomButton,
        yandexMap,
        ymapMarker,
        loadYmap*/
    }
})
export default class JoinStep_1 extends Vue {

    /*@Inject('api') api: ApiB2B | undefined;
    private restriction : RestrictionFactory = new RestrictionFactory();
    private joinCompany : JoinCompanyInterface = this.$store.getters.joinCompany;
    private companyList : Array<Company> = new Array<Company>();
    private map: any = null;

    created(){
        this.updateCompany(this.createGeocoder(this.coords));
    }

    mounted(){
        // @ts-ignore
        console.warn(this.events)
        //this.addEventListener('click', this.onResize);
    }

    public getActivity() : RequestCombo {
        const uri = companyApi('/activity');
        if(!uri){
            throw new Error("ApiB2B not create")
        }
        return new RequestCombo(uri,'GET',null,'name','uuid',true,'name')
    }

    get coords() : Array<number>{
        if(this.$store.getters.coordsUser){
            const position : GeolocationCoordinates = this.$store.getters.coordsUser
            return [position.latitude,position.longitude]
        }
        return [55.749346930602925,37.611106671875];
    }

    get settings() : MapSettings | null{
        return this.$store.getters.settingsMap
    }

    get companies() : Array<Company> {
        return this.companyList;
    }

    public updateCompany(geoPosition : Geocoder , activity : Activity | null = null): void{
        const companyImpl = new CompanyImpl();
        const geocoderImpl = geoPosition;
        let activities = null;
        if(activity) {
            activities = new Array();
            activities.push(activity)
        }
        companyImpl.geoPosition = geocoderImpl;
        companyImpl.activities = activities;
        this.api?.postApi<Array<Company>>(companyApi('/company/search'),companyImpl).then(list => {
            this.companyList.splice(0, this.companyList.length);
            list.forEach(item => this.companyList.push(item));
        })

    }

    get markerCompany(){
        return {
            //layout: 'default#imageWithContent',
            imageSize: [43, 43],
            imageOffset: [-15, -43],
            content: this.$t('label.createCompany.companyStep_2.myCompany'),
            contentOffset: [0, 45],
            shadow:true,
            iconContent: 'islands#blueFactoryIcon',
            contentLayout: '<div style="background: #1E98FF; width: 65px; color: #000000; font-weight: bold; border-radius: 10px">$[properties.iconContent]</div>'
        }
    }

    public initEventsMap(ymap: any){
        this.map = ymap;
        this.map.events.add('actionend', this.onResize);
        console.error(this.map.events)
    }

    onResize(){
        console.warn("event")
        console.warn(this.map.getBounds())
    }

    public createCoord(geoPosition : Geocoder) : Array<number> | null{
        if(geoPosition.latitude && geoPosition.longitude) {
            return [geoPosition.latitude, geoPosition.longitude]
        }
        else {
           return null;
        }
    }

    public createGeocoder(coord : Array<number>) : Geocoder {
        const geocoderImpl = new GeocoderImpl();
        geocoderImpl.latitude = coord[0];
        geocoderImpl.longitude = coord[1];
        return geocoderImpl;
    }*/

}