import Component from "vue-class-component";
import Vue from "vue";
import Statistic from "@/components/workPlace/myCompany/statistic/Statistic.vue";
import Employees from "@/components/workPlace/myCompany/employees/Employees.vue";
import CreateServiceType from "@/components/workPlace/myCompany/createServiceType/CreateServiceType.vue";
import Integration from "@/components/workPlace/myCompany/integration/Integration.vue";

@Component({
    components: {
        Statistic,
        Employees,
        CreateServiceType,
        Integration
    }
})
export default class MyCompany extends Vue {

    public static STATISTIC = 'STATISTIC';
    public static EMPLOYEES = 'EMPLOYEES';
    public static CREATE_SERVICE_TYPE = 'CREATE_SERVICE_TYPE';
    public static INTEGRATION = 'INTEGRATION';

    private frame : String = MyCompany.STATISTIC;

    get currentFrame() : String {
        return this.frame;
    }

    public setFrame(frame : String){
        this.frame = frame;
    }


}