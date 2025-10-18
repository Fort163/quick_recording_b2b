import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {CheckComponent} from "@/store/component";

@Component({
    components: {
    }
})
export default class InputTime extends CheckComponent {

    @Prop() private value : String | undefined;
    @Prop() private label : String | undefined;

    private currentValue : String = '';
    private focus : Boolean = false;

    created(){
        if(this.value) {
            this.currentValue = this.value
        }
    }

    public change(){
        super.check()
        this.$emit('input', this.currentValue)
        this.$emit('keyup', this.currentValue)
    }

    getValue(): any {
        return this.currentValue
    }



}