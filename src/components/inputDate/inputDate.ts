import Vue from 'vue'
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {Restriction} from "@/store/model";
import {DateUtil} from "@/store/util/DateUtil";
@Component({
    components: {
    }
})
export default class InputDate extends Vue {

    @Prop() private color : String | undefined;
    @Prop() private backColor : String | undefined;
    @Prop() private image : String | undefined;
    @Prop() private size : String | undefined;
    @Prop() private width : String | undefined;
    @Prop() private height : String | undefined;
    @Prop() private radius : String | undefined;
    @Prop() private label : String | undefined;
    @Prop() private restrictions : Array<Function> | undefined

    private errors : Array<Restriction> = new Array<Restriction>();
    private util : DateUtil = new DateUtil();
    private focus : Boolean = false;
    @Prop({default: ''}) private value : String | undefined;

    private currentValue : String = '';

    created(){
        if(this.value) {
            const date = this.util.dateParse(this.value.toString(),DateUtil.SERVER_FORMAT);
            if(date) {
                this.currentValue = this.util.dateFormat(date, DateUtil.WEB_FORMAT)
            }
        }
        if(this.restrictions?.length){
            this.errors = new Array<Restriction>();
            this.restrictions?.forEach(func => {
                const rest : Restriction = func.call(this.currentValue,this.currentValue);
                if(!rest.valid){
                    this.errors.push(rest);
                }
            })
        }
    }

    mounted(){
        //this.currentValue = this.value
    }

    public change(){
        this.errors = new Array<Restriction>();
        this.restrictions?.forEach(func => {
            const rest : Restriction = func.call(this.currentValue,this.currentValue);
            if(!rest.valid){
                this.errors.push(rest);
            }
        })
        if(this.currentValue) {
            const date = this.util.dateParse(this.currentValue.toString(),DateUtil.WEB_FORMAT);
            if(date) {
                this.$emit('input', this.util.dateFormat(date, DateUtil.SERVER_FORMAT))
                this.$emit('keyup', this.util.dateFormat(date, DateUtil.SERVER_FORMAT))
            }
        }

    }

}