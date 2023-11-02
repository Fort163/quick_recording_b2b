import {Component, Prop, Provide, Vue} from 'vue-property-decorator';
import {ColumnTypes, ComboboxModel, TableColumnItem, TableData, TableSettings} from "@/store/model";
import TrCustom from "@/components/table/trCustom/TrCustom.vue";
import TdCustom from "@/components/table/tdCustom/tdCustom";


@Component({
    components: {TrCustom}
})
export default class TableCustom extends Vue{
    @Prop() tableSettings: TableSettings | undefined;
    @Provide( 'settings' ) setting: TableSettings | undefined = this.settings;
    private errorMap = new Map<String,String>();
    private isError = false;

    get settings(): TableSettings | undefined{
        return this.tableSettings
    }

    get tableData() : TableData[]| undefined{
        return this.settings?.data
    }

    get tableColumn() : TableColumnItem[]| undefined {
        return this.settings?.columns
    }

    get showError() : boolean{
        return this.isError;
    }

    get errors() :Array<String>{
        return Array.from(this.errorMap.values());
    }

    get addButton() : boolean| undefined{
        return this.settings?.addButton;
    }

    get saveButton() : boolean| undefined{
        return this.settings?.saveButton;
    }

    public addItem() : void{
        const obj = new Object();
        this.tableColumn?.forEach(item =>{
            // @ts-ignore
            obj[item.itemName.toString()] = null;
            if(item.itemType===ColumnTypes.combo){
                // @ts-ignore
                obj[item.itemName.toString()] = new Array<ComboboxModel>()
            }
        });
        this.tableData?.push(<TableData>obj);
    }

    public save(){
        this.checkValue();
        if(this.errorMap.size===0) {
            this.settings?.saveFunc?.function();
        }
        else {
            this.isError = true;
        }
    }

    public checkValue() : void{
        this.errorMap = new Map<String,String>();
        this.isError = false;
        this.$children.forEach(elem =>{
            if(elem.$el.className==="dataTable") {
                elem.$children.forEach(tr =>{
                    tr.$children.forEach(td => {
                        const value = (<TdCustom>td);
                        if (!value.check) {
                            const name = <String>value.column?.itemName;
                            const title = <String>value.column?.title;
                            const error = <String>value.errorMessage;
                            this.errorMap.set(name,'Колонка '+'"'+title+'"'+' : '+error);
                        }
                    });
                })
            }
        });
    }

}