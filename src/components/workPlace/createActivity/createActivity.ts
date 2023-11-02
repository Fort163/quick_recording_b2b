import {
    ColumnTypes, ComboboxModel,
    DefaultTableColumnItem,
    DefaultTableSettings,
    Handler, ModalWindow, PermissionModel, Restriction, State,
    TableColumnItem,
    TableData, TableSettings
} from "@/store/model";
import {FastWebApi} from "@/components/api/fastWebApi";
import {Store} from "vuex";
import Component from "vue-class-component";
import TableCustom from "@/components/table/TableCustom.vue";
import Vue from "vue";
import {Inject} from "vue-property-decorator";

class ActivityColumnItem extends DefaultTableColumnItem{
    itemName: String;
    title: String;
    mandatory: boolean;
    constructor(itemName : String,title : String,mandatory: boolean,type : ColumnTypes,width : String) {
        super();
        this.itemName = itemName;
        this.title = title;
        this.mandatory = mandatory;
        super.itemType = type;
        super.width = width;
    }
}

class ActivityTable extends DefaultTableSettings{
    columns: TableColumnItem[];
    data: TableData[];
    saveFunc : Handler<undefined, undefined, void>;
    constructor(columns: TableColumnItem[],data: any[],save: Handler<undefined, undefined, void> ) {
        super();
        this.columns = columns;
        this.data = data;
        this.saveFunc = save;
        super.deleteButton = false;
    }
}

class ActivitySave extends Handler<undefined, undefined, void>{
    private api: FastWebApi;
    private settings : TableSettings;
    private store : Store<any>;
    constructor(api: FastWebApi,settings : TableSettings,store : Store<any>) {
        super();
        this.api = api;
        this.settings = settings;
        this.store = store;
    }
    function(): void {
        const result : Promise<boolean> = this.api.postApi<boolean>("/admin/create/activity",this.settings.data);
        result.then(res =>{
            if(res) {
                this.store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = 'Разрешения успешно сохранены';
                    show : boolean = true;
                });
            }
            else{
                this.store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = 'Произошла ошибка';
                    show : boolean = true;
                });
            }
        })
    }
}

@Component({
    components: {
        TableCustom
    }
})
export default class CreateActivity extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    @Inject('state') state: State | undefined;

    private activityData : Array<ComboboxModel> = new Array<ComboboxModel>();
    private columns : Array<TableColumnItem> = new Array<TableColumnItem>();
    // @ts-ignore
    private saveHandler : ActivitySave = new ActivitySave(this.api,this.settings,this.$store);

    mounted(){
        this.initColumn();
        const activities : Promise<Array<ComboboxModel>> = <Promise<Array<ComboboxModel>>>this.api?.getApi<Array<ComboboxModel>>("/admin/get/activity");
        activities.then((items:Array<ComboboxModel>)=> {
            items.forEach(item =>{
                this.activityData.push(item);
            })
        });
    }

    get settings() : TableSettings{
        return new ActivityTable(this.columns,this.activityData,this.saveHandler);
    }

    private initColumn() : void{
        const activity = new ActivityColumnItem("name","Название",true,ColumnTypes.text,'80%' );
        activity.restrictions = new Array<Restriction>()
        activity.restrictions.push(
            new class extends Restriction {
                restriction = undefined
                errorMessage = 'Название обязательно для заполнения';
            }
        )
        this.columns.push(activity);
    }

}