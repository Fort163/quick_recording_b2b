import Component from "vue-class-component";
import Vue from "vue";
import {ServiceTypeModel, SimpleValue, State} from "@/store/model";
import {Inject} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi";

@Component({
    components: {
    }

})
export default class WarningWindow extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    @Inject('state') state: State | undefined;

    private countServiceType : number = 0;

    mounted(){
        if(this.isOwner) {
            const simpleValue = new SimpleValue();
            simpleValue.valueLong = this.$store.getters.company?.id;
            const serviceTypes: Promise<Array<ServiceTypeModel>> = <Promise<Array<ServiceTypeModel>>>this.api?.postApi<Array<ServiceTypeModel>>("/company/get/serviceType", simpleValue);
            serviceTypes.then((items:Array<ServiceTypeModel>)=> {
                this.countServiceType = items.length;
            });
        }
    }

    get noPhone() : string | undefined{
        return this.$store.getters.user?.phoneNumber
    }

    get isOwner() : boolean {
        return this.$store.getters.owner
    }

    get ownerWithoutService() : boolean{
        if(this.isOwner)
            return this.$store.getters.ownerWithoutService
        else
            return false;
    }

    get count() : number{
        return this.countServiceType
    }

}