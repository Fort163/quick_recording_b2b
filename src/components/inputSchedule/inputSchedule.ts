import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import InputTime from "@/components/inputTime/InputTime.vue";
import InputText from "@/components/inputText/InputText.vue";
import CheckBox from "@/components/checkBox/CheckBox.vue";
import {RestrictionFactory} from "@/store/restriction/RestrictionFactory";
import {CheckComponent} from "@/store/component";
import {Schedule} from "@/models/company-service";

@Component({
    components: {
        InputTime,
        InputText,
        CheckBox
    }
})
export default class InputSchedule extends CheckComponent {


    @Prop() private value : Schedule | undefined;

    @Prop() private needRepeat : boolean | undefined;

    private currentValue : Schedule | undefined;

    private stringValue : string | undefined;

    private restriction : RestrictionFactory = new RestrictionFactory();

    created(){
        if(this.value) {
            this.currentValue = this.value
            this.stringValue = this.getDayOfWeek(this.value.dayOfWeek)
        }
    }

    mounted(){
        //this.currentValue = this.value
    }

    getDayOfWeek(dayOfWeek : string | undefined) : string | undefined{
        return this.$t('enums.dayOfWeek.'+dayOfWeek).toString();
    }

    public scheduleCheck(){
        super.check();
    }

    getValue(): any {
        return this.currentValue
    }


}