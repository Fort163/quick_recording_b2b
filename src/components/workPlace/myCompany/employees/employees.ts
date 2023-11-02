import Component from "vue-class-component";
import Vue from "vue";
import TableCustom from "@/components/table/TableCustom.vue";
import {Inject} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi";
import {EmployeeModel, ServiceModel} from "@/store/model";
import WithConfig from "@/components/workPlace/addEmployee/withConfig/WithConfig.vue";

@Component({
    components: {
        WithConfig
    }
})
export default class Employees extends Vue {
    @Inject('api') api: FastWebApi | undefined;

    private employeeList: Array<EmployeeModel> = new Array<EmployeeModel>();
    private employee: EmployeeModel | null = null;

    mounted(){
        const requestMap : Map<string, Number> = new Map<string, Number>();
        requestMap.set("companyId",this.$store.getters.company.id);
        const emploees: Promise<Array<EmployeeModel>> = <Promise<Array<EmployeeModel>>>this.api?.getApi<Array<EmployeeModel>>("/employee/get/employees",requestMap);
        emploees.then((items: Array<EmployeeModel>) => {
            items.forEach(item => {
                this.employeeList.push(item);
            })
        });
    }

    get employees() : Array<EmployeeModel> {
        return this.employeeList;
    }


    get selectEmployee(): EmployeeModel | null {
        return this.employee;
    }

    set selectEmployee(value: EmployeeModel | null) {
        this.employee = value;
    }

}