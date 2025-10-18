import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {CheckComponent} from "@/store/component";

@Component({
    components: {
    }
})
export default class InputText extends CheckComponent {

    @Prop() private color : String | undefined;
    @Prop() private backColor : String | undefined;
    @Prop() private image : String | undefined;
    @Prop() private size : String | undefined;
    @Prop() private width : String | undefined;
    @Prop() private height : String | undefined;
    @Prop() private radius : String | undefined;
    @Prop() private label : String | undefined;

    private focus : Boolean = false;
    @Prop({default: ''}) private value : String | undefined;

    private currentValue : String = '';

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
        return this.currentValue;
    }



}