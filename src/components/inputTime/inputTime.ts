import Vue from 'vue'
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {Restriction, Schedule} from "@/store/model";
@Component({
    components: {
    }
})
export default class InputTime extends Vue {


    @Prop() private restrictions : Array<Function> | undefined

    private errors : Array<Restriction> = new Array<Restriction>();

    @Prop() private value : String | undefined;
    @Prop() private label : String | undefined;

    private currentValue : String = '';
    private focus : Boolean = false;

    created(){
        if(this.value) {
            this.currentValue = this.value
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
        this.$emit('input', this.currentValue)
        this.$emit('keyup', this.currentValue)
    }

}