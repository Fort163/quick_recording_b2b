import Component from "vue-class-component";
import Vue from "vue";
import {Inject, Prop} from "vue-property-decorator";
import {
    ClaimCompanyRequestModel,
    DtoWhitLong,
    Employee,
    EmployeeModel,
    ModalWindow,
    SimpleValue,
    State
} from "@/store/model";
import {FastWebApi} from "@/components/api/fastWebApi";
import {FastWebWS} from "@/components/api/ws/fastWebWS";

@Component({
    components: {

    }
})
export default class WithOutConfig extends Vue {
    @Inject('state') state: State | undefined;
    @Inject('api') api: FastWebApi | undefined;
    @Inject('socket') socketMain: FastWebWS | undefined;
    @Prop() selectRequest : ClaimCompanyRequestModel | undefined;

    private currentEmployee : EmployeeModel = new Employee();

    get requestName() : String | undefined{
        return this.selectRequest?.user.fullName;
    }

    get employeeName() : string | null {
        return this.currentEmployee.name
    }

    set employeeName(value : string | null){
        this.currentEmployee.name = value
    }

    public save(){
        const data = new DtoWhitLong(this.currentEmployee,<number>this.selectRequest?.id);
        const flag : Promise<Number> = <Promise<Number>>this.api?.postApi<Number>("/company/create/employee/config",data);
        flag.then((item : Number)=> {
            if(item){
                const simpleValue = new SimpleValue();
                simpleValue.valueLong = item.valueOf();
                this.socketMain?.socket?.send('/b2b/socket/addEmployee',JSON.stringify(simpleValue));
                this.$store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = 'Информация о сотруднике успешно сохранена';
                    show : boolean = true;
                });
                this.$store.commit('setCurrentMenuItem',null);
            }
            else{
                this.$store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = 'Произошла ошибка';
                    show : boolean = true;
                });
            }
        });
    }

}