import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {RestrictionFactory} from "@/store/restriction/RestrictionFactory";
import {CheckComponent} from "@/store/component";
import InputSchedule from "@/components/inputSchedule/InputSchedule.vue";
import CustomButton from "@/components/customButton/CustomButton.vue";
import {Schedule} from "@/models/company-service";

@Component({
    components: {
        InputSchedule,
        Button: CustomButton
    }
})
export default class ScheduleComponent extends CheckComponent {


    @Prop() private value : Array<Schedule> | undefined;

    @Prop() private needRepeat : boolean | undefined;

    private keyNumber : number = 0;

    private currentValue : Array<Schedule> | undefined;

    private restriction : RestrictionFactory = new RestrictionFactory();

    created(){
        if(this.value) {
            this.currentValue = this.value
        }
    }

    public scheduleCheck(){
        super.check();
    }

    public repeat(index : number){
        if(this.currentValue) {
            const fromItem = this.currentValue[index];
            this.currentValue?.forEach((item, i) => {
                if (index < i && this.currentValue){
                    this.currentValue[i].clockFrom = fromItem.clockFrom;
                    this.currentValue[i].clockTo = fromItem.clockTo;
                }
            })
        }
        this.keyNumber++
    }

    getValue(): any {
        return this.currentValue
    }


}