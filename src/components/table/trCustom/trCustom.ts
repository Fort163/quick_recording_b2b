import {Component, Inject, Prop, Vue} from "vue-property-decorator";
import {Handler, TableColumnItem, TableData, TableSettings} from "@/store/model";
import TdCustom from "@/components/table/tdCustom/TdCustom.vue";

@Component({
    components:{
        TdCustom
    }
})
export default class TrCustom extends Vue{
    @Inject('settings') settings: TableSettings | undefined;
    @Prop() isTitle: Boolean | undefined;
    @Prop() index: number | undefined;

    get tableSettings():TableSettings | undefined{
        return <TableSettings>this.settings;
    }

    get columns(): TableColumnItem[] | undefined{
        return this.tableSettings?.columns;
    }

    get deleteFunc(): Handler<undefined, undefined, void> | undefined{
        return this.tableSettings?.deleteFunc;
    }

    get deleteButton(): Boolean | undefined{
        return this.tableSettings?.deleteButton;
    }

    get dataTable(): TableData[] | undefined{
        return this.tableSettings?.data;
    }

    set dataTable(data: TableData[] | undefined){
        // @ts-ignore
        this.tableSettings.data = data;
    }

    public deleteDefault(){
        this.dataTable?.splice(this.index!=undefined?this.index:-1,1);
    }

    public selectFunc(){
        if(this.deleteFunc){
            this.deleteFunc?.function();
        }
        else {
            this.deleteDefault();
        }
    }

}