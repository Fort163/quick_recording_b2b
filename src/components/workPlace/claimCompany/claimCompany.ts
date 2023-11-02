import Component from "vue-class-component";
import Vue from "vue";
import {ComboboxModel, ModalWindow, SimpleValue, State} from "@/store/model";
import {Inject} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi";
import SelectBoxFilter from "@/components/selectBoxFilter/SelectBoxFilter.vue";
import {EmptyCombobox} from "@/components/selectBoxFilter/selectBoxFilter";
// @ts-ignore
import {loadYmap} from 'vue-yandex-maps'
import {FastWebWS} from "@/components/api/ws/fastWebWS";

@Component({
    components: {
        SelectBoxFilter
    }
})
export default class ClaimCompany extends Vue {
    @Inject('socket') socketMain: FastWebWS | undefined;
    @Inject('state') state: State | undefined;
    @Inject('api') api: FastWebApi | undefined;
    private companyArray = new Array<ComboboxModel>();
    public selectCompany : ComboboxModel = new EmptyCombobox();
    private city : string = '';

    get socket(){
        return this.socketMain?.socket
    }

    created() {
        this.downloadCompany();
    }

    async mounted() {
        // @ts-ignore
        await loadYmap(this.settings);
    }

    get settings(){
        return this.state?.mapInfo.settings;
    }

    get user(){
        return this.state?.loginModel.currentUser
    }

    get coords() : GeolocationCoordinates | null | undefined{
        return this.state?.mapInfo.coords;
    }

    get company() : Array<ComboboxModel>{
        return this.companyArray;
    }

    get valueCompany() : ComboboxModel{
        return this.selectCompany;
    }

    get value() : string | undefined{
        return this.valueCompany.name.toString();
    }

    get sizeCompany() : number{
        return this.company.length
    }

    public watchPosition(){
        navigator.geolocation.getCurrentPosition((pos : GeolocationPosition) => {
            this.$store.commit('setCoords',pos.coords);
            this.downloadCompany();
        }, err => {
            console.error("Position user not set");
        })
    }

    public getCoords(){
        ymaps.geocode(this.city).then(
            (res : any) => {
                const data : Array<number> = res.geoObjects.get(0).geometry._coordinates;
                const coords = {
                    latitude: data[0],
                    longitude: data[1]
                }
                this.$store.commit('setCoords',coords);
                this.downloadCompany();
            },
            (err : any) => {
                alert(err);
            }
        )
    }

    get companyId(){
        return this.selectCompany.id
    }

    get isDisabled(){
        return this.companyId===-1;
    }

    public claim(){
        const flag : Promise<boolean> = <Promise<boolean>>this.api?.postApi<boolean>('/company/claim/company',
            {
                userId : this.user?.id,
                companyId : this.companyId,
            });
        flag.then( (res:boolean) => {
            if(res){
                const simpleValue = new SimpleValue();
                simpleValue.valueLong = this.companyId.valueOf();
                this.socket?.send('/b2b/socket/claimCompany',JSON.stringify(simpleValue));
                this.$store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = 'Вы подали заявку в компанию. Теперь необходимо дождаться когда руководитель рассмотрит обращение.';
                    show : boolean = true;
                });
                this.$store.commit('setCurrentMenuItem',null);
                this.$store.commit('clearRole');
            }
        });
    }

    private downloadCompany(){
        if(this.coords){
            const companies : Promise<Array<ComboboxModel>> = <Promise<Array<ComboboxModel>>>this.api?.postApi<Array<ComboboxModel>>('/company/get/company',
                {
                    longitude : this.coords.longitude,
                    latitude : this.coords.latitude,
                });
            companies.then((items:Array<ComboboxModel>)=> {
                items.forEach(item =>{
                    this.companyArray.push(item);
                })
            });
        }
    }

}