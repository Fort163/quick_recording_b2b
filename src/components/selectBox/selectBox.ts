import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {ComboboxModel, SelectBoxModel, TableSettings} from "@/store/model";

@Component({
    components: {
    }
})
export default class SelectBox extends Vue {
    @Prop() model: Array<ComboboxModel> | undefined;
    @Prop() value: Array<ComboboxModel>| undefined;
    @Prop() singleValue: boolean | undefined;
    @Prop() needClear: boolean | undefined;
    private storeRepository: Array<ComboboxModel> = new Array<ComboboxModel>();
    private storeItem: Array<ComboboxModel> = new Array<ComboboxModel>();
    private show : boolean = false;

    mounted() {
        const valueId = new Array<Number>()
        if(this.value && this.value.length>0){
            this.value.forEach(itemValue =>{
                valueId.push(itemValue.id);
            })
        }
        this.comboModel?.forEach(item=>{
            if(valueId.indexOf(item.id)===-1){
                this.storeRepository.push(item);
            }
            return
        });
    }

    updated(){
        if(this.storeRepository.length==0) {
            const valueId = new Array<Number>()
            if(this.value && this.value.length>0){
                this.value.forEach(itemValue =>{
                    valueId.push(itemValue.id);
                })
            }
            this.comboModel?.forEach(item => {
                if (valueId.indexOf(item.id) === -1) {
                    this.storeRepository.push(item);
                }
                return
            });
        }
    }

    get clear() : boolean | undefined{
        if(this.needClear){
            this.clearValue();
        }
        return this.needClear;
    }

    get isSingleValue() : boolean{
        if(this.singleValue){
            return true;
        }
        else {
            return false;
        }
    }

    get comboModel() : Array<ComboboxModel> | undefined{
        return this.model;
    }

    get storeItems(): Array<ComboboxModel>{
        return this.storeItem;
    }

    get currentItems(): Array<ComboboxModel>{
        return <Array<ComboboxModel>>this.value;
    }

    get repository(): Array<ComboboxModel>{
        return this.storeRepository;
    }

    set repository(value:Array<ComboboxModel>){
        this.storeRepository=value;
    }

    public getShow() : boolean{
        return this.show;
    }

    public setShow(value : boolean){
        if(this.show===value)
            return;
        this.show = value;
        this.updateStore(value)
    }

    public updateStore(value : boolean){
        this.wait(300).then(() => {
            if(value && this.show){
                this.showStore();
            }
            else {
                this.closeStore();
            }
        })
    }

    get selectWidth() : string{
        let width = 100;
        width = width/this.currentItems?.length;
        return width+'%';
    }

    get arrowPosition() : string{
        if(this.currentItems.length===0)
            return 'relative';
        else
            return 'initial';
    }

    fillStore() : void{
        this.repository.forEach(item=>{
            this.storeItem.push(item);
        })
    }

    dropStore() : void{
        const slice = this.storeItems.splice(0,this.storeItems.length);
        this.repository=slice;
    }

    public showStore(){
        this.fillStore();
    }

    public closeStore(){
        this.dropStore();
    }

    public addCurrentItems(value:number){
        const slice = <ComboboxModel>this.storeItems.splice(value,1).pop();
        if(this.singleValue && <number>this.value?.length > 0){
            const deleteItem = <ComboboxModel>this.value?.splice(0,1).pop();
            this.storeItems?.push(deleteItem);
        }
        this.value?.push(slice);
    }

    public deleteCurrentItems(value:number){
        const slice = <ComboboxModel>this.value?.splice(value,1).pop();
        this.storeItems?.push(slice);
        this.show = true;
    }

    public clearValue(){
        this.fillStore();
        this.value?.splice(0).forEach(item => {
            this.storeItems?.push(item);
        })
        this.closeStore();
    }

    public wait(time : number) {
        return new Promise(resolve => {
            setTimeout(resolve, time)
        });
    }


}