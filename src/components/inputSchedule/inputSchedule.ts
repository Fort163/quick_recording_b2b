import Vue from 'vue'
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {Restriction, Schedule} from "@/store/model";
import InputTime from "@/components/inputTime/InputTime.vue";
import InputText from "@/components/inputText/InputText.vue";
import CheckBox from "@/components/checkBox/CheckBox.vue";
import {RestrictionFactory} from "@/store/restriction/RestrictionFactory";
@Component({
    components: {
        InputTime,
        InputText,
        CheckBox
    }
})
export default class InputSchedule extends Vue {


    @Prop() private restrictions : Array<Function> | undefined

    private errors : Array<Restriction> = new Array<Restriction>();

    @Prop() private value : Schedule | undefined;

    private currentValue : Schedule | undefined;

    private stringValue : string | undefined;

    private restriction : RestrictionFactory = new RestrictionFactory();

    created(){
        if(this.value) {
            this.currentValue = this.value
            this.stringValue = this.getValue(this.value.dayOfWeek)
        }
    }

    mounted(){
        //this.currentValue = this.value
    }

    getValue(dayOfWeek : string | undefined) : string | undefined{
        return this.$t('enums.dayOfWeek.'+dayOfWeek).toString();
    }

    public check(){
        this.errors = new Array<Restriction>();
        this.restrictions?.forEach(func => {
            const rest : Restriction = func.call(this.currentValue,this.currentValue);
            if(!rest.valid){
                this.errors.push(rest);
            }
        })
    }

}