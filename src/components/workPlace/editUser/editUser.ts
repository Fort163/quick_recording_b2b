import Component from "vue-class-component";
import Vue from "vue";
import {State, UserInfo, UserInfoChange} from "@/store/model";
import {Inject} from "vue-property-decorator";
import {AuthProvider} from "@/auth/AuthProvider";
import InputText from "@/components/inputText/InputText.vue";
import Button from "@/components/button/Button.vue";
import {ApiB2B} from "@/api/api";

@Component({
    components: {
        InputText,
        Button
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
    private ephoneCodeSendAgain : Boolean  = false
    private phoneVerified : boolean = false


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
            this.timerEmail()
            this.api?.getApi<Boolean>('/user/createCodeEmail',requestParams).then(response => {
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

    private timerEmail(){
        setTimeout(()=>{
            this.emailCodeSendAgain = true;
        },30000)
    }

}