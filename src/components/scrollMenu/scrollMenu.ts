import Component from "vue-class-component";
import Vue from "vue";
import {UserInfo} from "@/models/user-service";
import {Company, CompanyHierarchy, Employee} from "@/models/company-service";

@Component({
    components: {
    }
})
export default class ScrollMenu extends Vue {

    private side : boolean = true
    private userInfo : UserInfo = this.$store.getters.userInfo
    private company : Company | null = this.userInfo.company
    private employee : Employee | null = this.userInfo.employee



        public hasCompany() : boolean{
        return !!this.company
    }

    public isEnabled(value : Array<string>) : boolean{
        const result = this.authority?.find(item => value.includes(item));
        return !!result
    }

    public submit(pathName : string){
        this.$router.push(pathName)
    }

    get authority() : Array<CompanyHierarchy> | undefined {
        return this.employee?.permissions
    }

}