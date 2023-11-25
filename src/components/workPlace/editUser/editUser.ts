import Component from "vue-class-component";
import Vue from "vue";
import {Combo, ComboItem, State, UserInfo, UserInfoChange} from "@/store/model";
import {Inject} from "vue-property-decorator";
import {AuthProvider} from "@/auth/AuthProvider";
import InputText from "@/components/inputText/InputText.vue";
import Button from "@/components/button/Button.vue";
import {ApiB2B} from "@/api/api";
import InputDate from "@/components/inputDate/InputDate.vue";
import {RestrictionFactory} from "@/store/restriction/RestrictionFactory";
import {DateUtil} from "@/store/util/DateUtil";
import ComboBox from "@/components/comboBox/ComboBox.vue";
import {RequestCombo} from "@/components/comboBox/comboBox";

@Component({
    components: {
        InputText,
        InputDate,
        Button,
        ComboBox
    }

})
export default class EditUser extends Vue {

    @Inject('api') api: ApiB2B | undefined;
    private info : UserInfoChange | null = null
    private emailCode : string | null  = null
    private emailCodeSend : Boolean  = false
    private emailCodeSendAgain : Boolean  = false
    private emailVerified : boolean = false
    private phoneCode : string | null  = null
    private phoneCodeSend : Boolean  = false
    private phoneCodeSendAgain : Boolean  = false
    private phoneVerified : boolean = false
    private restriction : RestrictionFactory = new RestrictionFactory();
    private dateUtil : DateUtil = new DateUtil();


    mounted() {
        const userInfo : UserInfo | null = AuthProvider.init().getUserInfo();
        if(userInfo){
            this.info = new UserInfoChange(userInfo);
            this.emailVerified = !!this.info.email;
            this.phoneVerified = !!this.info.phoneNumber;
        }
    }

    public createCodeEmail(){
        if(this.info && this.info.email) {
            this.emailCodeSendAgain = false;
            const requestParams = new URLSearchParams();
            requestParams.append("email", this.info.email);
            this.api?.getApi<Boolean>('/user/createCodeEmail',requestParams).then(response => {
                this.timerEmail()
                this.emailCodeSend = response;
            })
        }
    }

    public checkCodeEmail(){
        if(this.info && this.info.email && this.emailCode) {
            const requestParams = new URLSearchParams();
            requestParams.append("email", this.info.email);
            requestParams.append("code", this.emailCode);
            this.api?.getApi<boolean>('/user/checkCodeEmail',requestParams).then(response => {
                this.emailCodeSend = false;
                this.emailCode = null;
                this.emailVerified = response;
            })
        }
    }

    public createCodePhone(){
        if(this.info && this.info.phoneNumber) {
            this.phoneCodeSendAgain = false;
            const requestParams = new URLSearchParams();
            requestParams.append("phone", this.info.phoneNumber);
            this.api?.getApi<Boolean>('/user/createCodePhone',requestParams).then(response => {
                this.timerPhone()
                this.phoneCodeSend = response;
            })
        }
    }

    public checkCodePhone(){
        if(this.info && this.info.phoneNumber && this.phoneCode) {
            const requestParams = new URLSearchParams();
            requestParams.append("phone", this.info.phoneNumber);
            requestParams.append("code", this.phoneCode);
            this.api?.getApi<boolean>('/user/checkCodePhone',requestParams).then(response => {
                this.phoneCodeSend = false;
                this.phoneCode = null;
                this.phoneVerified = response;
            })
        }
    }

    public createGender() : Array<Combo>{
        const result = new Array<Combo>();
        result.push(new ComboItem("MALE","Мужской"));
        result.push(new ComboItem("FEMALE","Женский"));
        result.push(new ComboItem("NOT_DEFINED","Не определено"));
        return result;
    }

    private timerPhone(){
        setTimeout(()=>{
            this.phoneCodeSendAgain = true;
        },30000)
    }

    private timerEmail(){
        setTimeout(()=>{
            this.emailCodeSendAgain = true;
        },30000)
    }


    public getRequest() : RequestCombo{
        //(uri: String, method: String, param: URLSearchParams | FormData, value : string, key: string, needQuery?: boolean, paramQuery?: string)
        return new RequestCombo("/user/test/company","GET",null,'name','uuid')
    }

    public getRequest1() : RequestCombo{
        //(uri: String, method: String, param: URLSearchParams | FormData, value : string, key: string, needQuery?: boolean, paramQuery?: string)
        return new RequestCombo("/user/test/combo1","GET",null,'name','uuid')
    }

    public getRequest2() : RequestCombo | null{
        if(this.info?.test1){
            const param : any = new Object();
            param['parentUUID'] = this.info.test1.key
            param['staticParam'] = 'GOOGOL'
            return new RequestCombo("/user/test/combo2","POST",param,'name','uuid')
        }
        return null;
    }

    public submit(){
        console.error(this.restriction.checkError())
    }

}