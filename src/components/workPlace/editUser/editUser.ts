import {Component, toNative, Vue} from "vue-facing-decorator";
import {VueCons} from "vue-facing-decorator/dist/esm/class";

@Component({
    components: {
        /*InputText,
        InputDate,
        CustomButton,
        ComboBox*/
    }

})
export default class EditUser extends Vue {

    /*@Inject('api') api: ApiB2B | undefined;
    private info : UserChange | null = null
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
        const userInfo : UserInfo | null = this.$store.getters.userInfo;
        if(userInfo){
            this.info = new UserChange(userInfo.user);
            this.genderCombo = this.getGender(this.info.gender);
            this.emailVerified = !!this.info.email;
            this.phoneVerified = !!this.info.phoneNumber;
        }
    }

    public createCodeEmail(){
        this.emailError = new Array<string>()
        if(this.info && this.info.email) {
            this.emailCodeSendAgain = false;
            const data = new MailCodeClass(this.info.email, TemplateEnum.QR_B2B_CODE,null)
            this.api?.postApi<MailResult>(notificationApi('/mail/sender/code'),data).then(response => {
                this.timerEmail()
                if(response.result == Result.SUCCESS){
                    this.emailCodeSend = true;
                }
                else {
                    this.emailCodeSend = false;
                    if(response.resultText) {
                        this.emailError.push(response.resultText)
                    }
                }
            })
        }
        else {
            this.emailError.push(this.$t('label.editUser.restriction.inputEmail').toString())
        }
    }

    public checkCodeEmail(){
        if(this.info && this.info.email && this.emailCode) {
            const data = new MailCodeClass(this.info.email, null,this.emailCode);
            this.api?.postApi<boolean>(notificationApi('/mail/sender/code/check'),data).then(response => {
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
            this.api?.getApi<Boolean>(qrB2BApi('/user/createCodePhone'),requestParams).then(response => {
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
            this.api?.getApi<boolean>(qrB2BApi('/user/checkCodePhone'),requestParams).then(response => {
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
        const error : Errors = this.restriction.checkError(this)
        if(error.hasError){
            error.messages.forEach(item => {
                this.pageError.push(item)
            })
        }
        if(this.pageError.length === 0){
            if(this.genderCombo && this.info) {
                this.info.gender = this.genderCombo.key
            }
            this.api?.putApi<User>(authApi('/user/patch'),this.info).then(response => {
                const userInfo : UserInfo = this.$store.getters.userInfo;
                userInfo.user = response
                this.$store.commit("setUserInfo", userInfo);
                this.$router.push('/')
            }).catch(error => {
                console.log(error)
            });
        }
    }

    private getGender(gender : string) : ComboItem{
        return <ComboItem>this.createGender().find(item => item.key === gender)
    }*/

}