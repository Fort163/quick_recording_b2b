import Component from "vue-class-component";
import Vue from "vue";
import {Inject} from "vue-property-decorator";
import {FastWebWS} from "@/components/api/ws/fastWebWS";
import {
    ClaimCompanyRequestModel,
    DtoWhitLong,
    ModalWindow,
    PermissionModel,
    Role,
    SimpleValue,
    State
} from "@/store/model";
import {FastWebApi} from "@/components/api/fastWebApi";
import WithConfig from "@/components/workPlace/addEmployee/withConfig/WithConfig.vue";
import WithOutConfig from "@/components/workPlace/addEmployee/withOutConfig/WithOutConfig.vue";
import {Client} from "webstomp-client";

@Component({
    components: {
        WithConfig,
        WithOutConfig
    }
})
export default class AddEmployee extends Vue {
    @Inject('socket') socketMain: FastWebWS | undefined;
    @Inject('state') state: State | undefined;
    @Inject('api') api: FastWebApi | undefined;

    public static MAIN = 'MAIN';
    public static WITH_CONFIG = 'WITH_CONFIG';
    public static WITH_OUT_CONFIG = 'WITH_OUT_CONFIG';

    public frame : String = AddEmployee.MAIN;

    private claimCompanyRequest : Array<ClaimCompanyRequestModel> = new Array<ClaimCompanyRequestModel>();
    private selectRequest : ClaimCompanyRequestModel | null = null;

    mounted(){
        const claimCompanyRequestPromise : Promise<Array<ClaimCompanyRequestModel>> = <Promise<Array<ClaimCompanyRequestModel>>>this.api?.postApi<Array<ClaimCompanyRequestModel>>("/company/get/claims");
        claimCompanyRequestPromise.then((items:Array<ClaimCompanyRequestModel>)=> {
            items.forEach(item =>{
                this.claimCompanyRequest.push(item);
            })
        });
    }

    get claims(){
        return this.claimCompanyRequest;
    }

    get socket() : Client | null | undefined {
        return this.socketMain?.socket
    }

    public refuse(request : ClaimCompanyRequestModel){
        const simpleValue = new SimpleValue();
        simpleValue.valueLong = request.id.valueOf();
        const flag : Promise<Number> = <Promise<Number>>this.api?.postApi<Number>("/company/refuse/employee",simpleValue);
        flag.then((item : Number)=> {
            if(item){
                const simpleValue = new SimpleValue();
                simpleValue.valueLong = item.valueOf();
                this.socket?.send('/b2b/socket/addEmployee',JSON.stringify(simpleValue));
                this.$store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = 'Запрос сотрудника отклонен';
                    show : boolean = true;
                });
                this.claims.splice(this.claims.indexOf(request),1);
            }
            else{
                this.$store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = 'Произошла ошибка';
                    show : boolean = true;
                });
            }
        });
    }

    public selectWithConfig(request : ClaimCompanyRequestModel){
        this.selectRequest = request;
        this.currentFrame = AddEmployee.WITH_CONFIG;
    }

    public selectWithOutConfig(request : ClaimCompanyRequestModel){
        this.selectRequest = request;
        this.currentFrame = AddEmployee.WITH_OUT_CONFIG;
    }

    get currentFrame() : String {
        return this.frame;
    }

    set currentFrame(frame : String){
        this.frame = frame;
    }

    get showOwnerEmployee() : boolean{
        return this.$store.getters.ownerWithoutService;
    }

    public backFrame(){
        this.frame = AddEmployee.MAIN;
    }

}