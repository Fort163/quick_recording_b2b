import Component from "vue-class-component";
import Vue from "vue";
import {Inject, Prop} from "vue-property-decorator";
import {ComboboxModel, SearchServiceDto, SimpleValue, State} from "@/store/model";
import SelectBox from "@/components/selectBox/SelectBox.vue";
import {FastWebApi} from "@/components/api/fastWebApi";

@Component({
    components: {
        SelectBox
    }

})
export default class SearchService extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    @Inject('state') state: State | undefined;
    private dto: SearchServiceDto = new SearchServiceDto();

    private employee : Array<ComboboxModel> = new Array<ComboboxModel>();
    private serviceType : Array<ComboboxModel> = new Array<ComboboxModel>();
    private selectEmployeeValue : Array<ComboboxModel> = new Array<ComboboxModel>();
    private selectServiceTypeValue : Array<ComboboxModel> = new Array<ComboboxModel>();
    private companyId : number | null = null;
    private isEmployee = false;
    private clearValue = false;

    mounted(){
        this.isEmployee = this.state?.currentMenuItem?.permission === 'ROLE_SEE_CLAIM_SERVICE';
        this.companyId = this.$store.getters.company.id;
        const data = new SimpleValue();
        data.valueLong = this.companyId;
        const serviceTypes: Promise<Array<ComboboxModel>> = <Promise<Array<ComboboxModel>>>this.api?.postApi<Array<ComboboxModel>>('/company/get/serviceType', data);
        serviceTypes.then((items: Array<ComboboxModel>) => {
            items.forEach(item => {
                this.serviceType.push(item);
            })
        });
        if(!this.isEmployee){
            const employees: Promise<Array<ComboboxModel>> = <Promise<Array<ComboboxModel>>>this.api?.postApi<Array<ComboboxModel>>('/company/get/employee', data);
            employees.then((items: Array<ComboboxModel>) => {
                items.forEach(item => {
                    this.employee.push(item);
                })
            });
        }
        else{
            this.dto.companyId = this.companyId;
            this.dto.employeeId = this.$store.getters.employee.id
            this.dto.id = this.dto.id+1;
            this.$store.commit('searchService',this.dto);
        }
    }

    get comboEmployee() : Array<ComboboxModel>{
        return this.employee;
    }

    get comboServiceType() : Array<ComboboxModel>{
        return this.serviceType;
    }

    get selectEmployee() : Array<ComboboxModel>{
        return this.selectEmployeeValue;
    }

    get selectServiceType() : Array<ComboboxModel>{
        return this.selectServiceTypeValue;
    }

    get showEmployee() : boolean{
        return !this.isEmployee;
    }

    get getWidthCombo() : string{
        return this.isEmployee?'80%':'45%';
    }

    get fromDate() : string | null {
        return this.dto?.periodFrom;
    }

    set fromDate(value : string | null ){
        this.dto.periodFrom = value;
    }

    get toDate() : string | null {
        return this.dto?.periodTo;
    }

    set toDate(value : string | null ){
        this.dto.periodTo = value;
    }

    get phone() : string | null{
        return this.dto?.clientPhone;
    }

    set phone(value : string | null){
        this.dto.clientPhone = value;
    }

    get needClear() :boolean{
        return this.clearValue;
    }

    public search(){
        this.dto.companyId = this.companyId;
        const employee = this.selectEmployeeValue.slice(0,1)[0];
        if(employee){
            this.dto.employeeId = employee.id;
        }
        else{
            if(this.isEmployee){
                this.dto.employeeId = this.$store.getters.employee.id
            }
        }
        const serviceType = this.selectServiceType.slice(0,1)[0];
        if(serviceType){
            this.dto.serviceTypeId = serviceType.id;
        }
        this.dto.id = this.dto.id+1;
        this.$store.commit('searchService',this.dto);
    }

    public clear(){
        this.clearValue = true;
        this.dto = new SearchServiceDto();
        setTimeout(() => {
            this.clearValue = false;
        }, 500)
        this.dto.companyId = this.companyId;
        this.$store.commit('searchService',this.dto);
    }

}