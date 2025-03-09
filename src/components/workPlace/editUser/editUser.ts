import Component from "vue-class-component";
import Vue from "vue";
import {Combo, ComboItem, Errors, State, UserInfo, UserInfoChange} from "@/store/model";
import {Inject} from "vue-property-decorator";
import {AuthProvider} from "@/auth/AuthProvider";
import InputText from "@/components/inputText/InputText.vue";
import Button from "@/components/button/Button.vue";
import {ApiB2B} from "@/api/api";
import InputDate from "@/components/inputDate/InputDate.vue";
import {RestrictionFactory} from "@/store/restriction/RestrictionFactory";
import {DateUtil} from "@/store/util/DateUtil";
import ComboBox from "@/components/comboBox/ComboBox.vue";
import {authApi, notifyApi} from "@/api/apiUtil";

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
    private genderCombo : ComboItem | null = null
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
    private pageError : Array<string> = new Array<string>()
    private emailError : Array<string> = new Array<string>()
    private phoneError : Array<string> = new Array<string>()


    mounted() {
        const userInfo : UserInfo | null = AuthProvider.init().userInfo;
        if(userInfo){
            this.info = new UserInfoChange(userInfo);
            this.genderCombo = this.getGender(this.info.gender);
            this.emailVerified = !!this.info.email;
            this.phoneVerified = !!this.info.phoneNumber;
        }
    }

    public createCodeEmail(){
        this.emailError = new Array<string>()
        if(this.info && this.info.email) {
            this.emailCodeSendAgain = false;
            const requestParams = new URLSearchParams();
            requestParams.append("email", this.info.email);
            this.api?.getApi<Boolean>(notifyApi('/email/createCode'),requestParams).then(response => {
                this.timerEmail()
                this.emailCodeSend = response;
            })
        }
        else {
            this.emailError.push(this.$t('label.editUser.restriction.inputEmail').toString())
        }
    }

    public checkCodeEmail(){

        if(this.info && this.info.email && this.emailCode) {
            const requestParams = new URLSearchParams();
            requestParams.append("email", this.info.email);
            requestParams.append("code", this.emailCode);
            this.api?.getApi<boolean>(notifyApi('/email/checkCode'),requestParams).then(response => {
                this.emailError = new Array<string>()
                if(response){
                    this.emailCodeSend = false;
                    this.emailCode = null;
                    this.emailVerified = response;
                }
                else {
                    this.emailError.push(this.$t('label.editUser.restriction.wrongCode').toString())
                }
                this.emailVerified = response;
            })
        }
    }

    public createCodePhone(){
        this.phoneError = new Array<string>()
        if(this.info && this.info.phoneNumber) {
            this.phoneCodeSendAgain = false;
            const requestParams = new URLSearchParams();
            requestParams.append("phone", this.info.phoneNumber);
            this.api?.getApi<Boolean>(notifyApi('/phone/createCode'),requestParams).then(response => {
                this.timerPhone()
                this.phoneCodeSend = response;
            })
        }
        else {
            this.phoneError.push(this.$t('label.editUser.restriction.inputPhone').toString())
        }
    }

    public checkCodePhone(){
        if(this.info && this.info.phoneNumber && this.phoneCode) {
            const requestParams = new URLSearchParams();
            requestParams.append("phone", this.info.phoneNumber);
            requestParams.append("code", this.phoneCode);
            this.api?.getApi<boolean>(notifyApi('/phone/checkCode'),requestParams).then(response => {
                this.phoneError = new Array<string>()
                if(response){
                    this.phoneCodeSend = false;
                    this.phoneCode = null;
                    this.phoneVerified = response;
                }
                else {
                    this.phoneError.push(this.$t('label.editUser.restriction.wrongCode').toString())
                }
            })
        }
    }

    public createGender() : Array<Combo>{
        const result = new Array<Combo>();
        result.push(new ComboItem("MALE",this.$t('enums.gender.male').toString()));
        result.push(new ComboItem("FEMALE",this.$t('enums.gender.female').toString()));
        result.push(new ComboItem("NOT_DEFINED",this.$t('enums.gender.notDefined').toString()));
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

    public submit(){
        this.pageError = new Array<string>();
        if(this.info?.email && !this.emailVerified){
            this.pageError.push(this.$t('label.editUser.restriction.confirmEmail').toString())
        }
        if(this.info?.phoneNumber && !this.phoneVerified){
            this.pageError.push(this.$t('label.editUser.restriction.confirmPhone').toString())
        }
        const error : Errors = this.restriction.checkError()
        if(error.hasError){
            error.errors.forEach(item => {
                this.pageError.push(item)
            })
        }
        if(this.pageError.length === 0){
            if(this.genderCombo && this.info) {
                this.info.gender = this.genderCombo.key
            }
            this.api?.patchApi<UserInfo>(authApi('/user'),this.info).then(response => {
                console.log(response)
                AuthProvider.init().userInfo = response
                this.$router.push('/')
            });
        }
    }

    private getGender(gender : string) : ComboItem{
        return <ComboItem>this.createGender().find(item => item.key === gender)
    }

}