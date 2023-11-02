import Component from "vue-class-component";
import Vue from "vue";
import {SimpleValue, State} from "@/store/model";
import CreateRole from "@/components/workPlace/createRole/CreateRole.vue";
import CreatePermission from "@/components/workPlace/createPermission/CreatePermission.vue";
import CreateCompany from "@/components/workPlace/createCompany/CreateCompany.vue";
import CreateActivity from "@/components/workPlace/createActivity/CreateActivity.vue";
import ClaimCompany from "@/components/workPlace/claimCompany/ClaimCompany.vue";
import {Inject} from "vue-property-decorator";
import {FastWebWS} from "@/components/api/ws/fastWebWS";
import AddEmployee from "@/components/workPlace/addEmployee/AddEmployee.vue";
import MyCompany from "@/components/workPlace/myCompany/MyCompany.vue";
import SettingsWindow from "@/components/workPlace/settingsWindow/SettingsWindow.vue";
import SeeClaimService from "@/components/workPlace/seeClaimService/SeeClaimService.vue";
import FixPartTime from "@/components/workPlace/fixPartTime/FixPartTime.vue";

@Component({
    components: {
        CreateRole,
        CreatePermission,
        CreateCompany,
        CreateActivity,
        ClaimCompany,
        AddEmployee,
        MyCompany,
        SettingsWindow,
        SeeClaimService,
        FixPartTime
    }

})
export default class WorkPlace extends Vue {
    @Inject('socket') socketMain: FastWebWS | undefined;
    @Inject('state') state: State | undefined;

    get socket(){
        return this.socketMain?.socket
    }

    get currentFrame() : String | undefined | null{
        return this.state?.currentMenuItem?.permission;
    }

    get haveEmployee() : boolean{
        return !!this.$store.getters.employee
    }

}