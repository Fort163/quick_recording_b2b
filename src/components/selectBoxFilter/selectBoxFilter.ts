import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {ComboboxModel} from "@/store/model";

export class EmptyCombobox implements ComboboxModel{
    id: number;
    name: string;
    constructor() {
        this.id = -1;
        this.name = '';
    }
}

@Component({
    components: {
    }
})
export default class SelectBoxFilter extends Vue {
    @Prop() value: ComboboxModel | undefined;
    @Prop() data:  Array<ComboboxModel> | undefined;
    @Prop() storeSize: number | undefined;
    @Prop() placeholder: string | undefined;
    private searchString : string = '';
    private storeRepository: Array<ComboboxModel> = new Array<ComboboxModel>();

    get search() : string{
        return this.searchString;
    }

    set search(value : string) {
        this.searchString = value;
        this.filterStore();
        if(this.value?.name != value){
            this.clear();
        }
    }

    get store(){
        return this.storeRepository;
    }

    get size() : number{
        if(this.storeSize){
            return <number>this.storeSize;
        }
        else {
            return 25;
        }
    }

    public select(value : ComboboxModel){
        (<ComboboxModel>this.value).id = value.id;
        (<ComboboxModel>this.value).name = value.name;
        if(this.search != (<ComboboxModel>this.value).name.toString()){
            this.search = (<ComboboxModel>this.value).name.toString();
        }
    }

    public clearStore(){
        /*this.storeRepository = new Array<ComboboxModel>();
        if((<ComboboxModel>this.value).id===-1){
            this.search = '';
        }*/
    }

    private clear(){
        (<ComboboxModel>this.value).id = -1;
        (<ComboboxModel>this.value).name = '';
    }

    private filterStore(){
        if(this.search.length>2){
            this.storeRepository = new Array<ComboboxModel>();
            this.data?.forEach(item=>{
                if(item.name.toUpperCase().indexOf(this.search.toUpperCase())>-1){
                    if(item.name.toUpperCase()!=this.search.toUpperCase()) {
                        if (this.storeRepository.length < this.size) {
                            this.storeRepository.push(item);
                        }
                    }
                    else {
                        this.select(item);
                    }
                }
                return
            });
        }
        else {
            this.storeRepository = new Array<ComboboxModel>();
        }
    }

}