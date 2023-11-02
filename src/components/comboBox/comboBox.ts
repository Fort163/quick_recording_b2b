import { Vue, Component, Prop } from 'vue-property-decorator'
import {ComboboxModel,Handler} from "@/store/model";

@Component({
})
export default class ComboBox extends Vue {
    @Prop() readonly title: string | undefined;
    @Prop() readonly items: ComboboxModel[] | undefined;
    @Prop() func: Handler<ComboboxModel, undefined, void> | undefined;
    private enter: boolean = false;
    private comboItem: ComboboxModel[] = [];
    public setEnter(value: boolean){
        if(this.enter == value){
            return;
        }
        this.enter = value;
        this.updateItem();
    }

    public updateItem(){
        this.wait(300).then(() => {
            if(this.enter && this.comboItem.length == 0)
                this.addItems();
            else
                this.dropItems();
        })
    }

    public addItems(){
        this.items?.forEach(item=>{
            this.comboItem.push(item);
        })
    }

    public dropItems(){
        this.items?.forEach(item=>{
            this.comboItem.pop();
        })
    }

    public clickFunc(value : ComboboxModel){
        this.func?.function(value);
    }

    public wait(time : number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

}