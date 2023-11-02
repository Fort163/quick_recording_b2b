import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {Handler, TransientValue} from "@/store/model";


@Component({
    components: {
    }
})
export default class ButtonFooter extends Vue {
    @Prop() maxStep : string  | undefined;
    @Prop() lastButtonText : string  | undefined;
    @Prop() lastFunc : Handler<undefined, undefined, void> | undefined
    @Prop() disabled : Handler<string, undefined, boolean> | undefined
    @Prop() startStep : TransientValue<string> | undefined;

    get step() : TransientValue<string> | undefined{
        return this.startStep;
    }

    set step(value : TransientValue<string> | undefined) {
        this.startStep = value;
    }

    get max() : string | undefined{
        return this.maxStep;
    }

    get buttonText(){
        return this.lastButtonText;
    }

    get disabledFunc(){
        return this.disabled
    }

    public isDisabled(value : string) : boolean{
        if(this.disabledFunc){
            return  this.disabledFunc.function(value);
        }
        else {
            return false;
        }
    }

    public funcLast(){
        this.lastFunc?.function();
    }

    public next() : void{
        const current = <string>this.step?.value;
        const strings = current.split('_');
        const number = Number.parseInt(strings[1])+1;
        (<TransientValue<string>>this.step).value = strings[0]+'_'+number;
    }

    public previous() : void{
        const current = <string>this.step?.value;
        const strings = current.split('_');
        const number = Number.parseInt(strings[1])-1;
        (<TransientValue<string>>this.step).value = strings[0]+'_'+number;
    }

}