import Component from "vue-class-component";
import Vue from "vue";
import {AnswerModel, ChangeUserDto, ClientDto, State, UserInfoModel} from "@/store/model";
import {Inject} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi";

@Component({
    components: {
    }

})
export default class ChangeUser extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    @Inject('state') state: State | undefined;

    private codeNumber : string = '';
    private answer : AnswerModel | null = null;
    private phoneNumber : string = '';
    private phoneOld : string = '';
    private firstName : string = '';
    private lastName : string = '';
    private showCode : boolean = false;
    private verifiedPhone : boolean = false;
    private message : string = '';

    private timerBool : boolean = true;

    mounted(){
        this.phoneNumber = this.$store.getters.user.phoneNumber;
        this.phoneOld = this.$store.getters.user.phoneNumber;
        if(this.phoneNumber){
            this.verifiedPhone = true;
        }
        this.firstName = this.$store.getters.user.firstName;
        this.lastName = this.$store.getters.user.lastName;
    }

    get phone() : string{
        return this.phoneNumber
    }

    get first() : string{
        return this.firstName
    }

    get last() : string{
        return this.lastName
    }

    set phone(value : string ) {
        this.verifiedPhone = value === this.phoneOld;
        this.phoneNumber = value
    }

    set first(value : string ) {
        this.firstName = value
    }

    set last(value : string ) {
        this.lastName = value
    }

    get code() : string{
        return this.codeNumber
    }

    set code(value : string ) {
        this.codeNumber = value;
    }

    get verified() : boolean{
        return this.verifiedPhone
    }

    get showCodeBloc() : boolean{
        return this.showCode;
    }

    get showPhoneButton() : boolean{
        if(!this.phoneNumber)
            return false;
        return this.phoneNumber.length === 11 && this.phoneNumber.indexOf('.') === -1 && !this.verifiedPhone && this.timerBool;
    }

    get messagePlaceholder() : string{
        return this.message;
    }

    public checkPhone(){
        this.showCode = true;
        const answer: Promise<AnswerModel> = <Promise<AnswerModel>>this.api?.postApi<AnswerModel>('/user/checkPhone',new ClientDto(this.$store.getters.user.fullName,this.phoneNumber));
        answer.then((item: AnswerModel) => {
            if(item && item.result){
                this.message = item.message;
                this.answer = item;
            }
        })
        this.timer();
    }

    public checkPhoneWithCode(){
        this.showCode = false;
        if(this.answer != null){
            this.answer.message = this.code;
        }
        const answer: Promise<ClientDto> = <Promise<ClientDto>>this.api?.postApi<ClientDto>('/user/checkPhoneWithCode',this.answer);
        answer.then((item: ClientDto) => {
            if(item && item.id){
                this.verifiedPhone = true;
                this.showCode = false;
            }
            else {
                this.showCode = true;
            }
        })
    }

    public save(){
        const data : ChangeUserDto = new ChangeUserDto(this.verifiedPhone? this.phoneNumber : null,
            this.firstName,this.lastName);
        const userPromise: Promise<UserInfoModel> = <Promise<UserInfoModel>>this.api?.postApi<UserInfoModel>('/user/change',data);
        userPromise?.then((user:UserInfoModel)=> {
            if(user) {
                this.$store.commit('setCurrentUser', user);
            }
        });
    }

    private timer(){
        this.timerBool = false;
        setTimeout(() => {
            this.timerBool = true;
        }, 65000)
    }

}