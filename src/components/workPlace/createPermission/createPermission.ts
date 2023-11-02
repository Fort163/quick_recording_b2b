import Component from "vue-class-component";
import Vue from "vue";
import {
    ColumnTypes,
    DefaultTableColumnItem,
    DefaultTableSettings,
    Handler, ModalWindow,
    PermissionModel, Restriction,
    State,
    TableColumnItem,
    TableData, TableSettings
} from "@/store/model";
import TableCustom from "@/components/table/TableCustom.vue";
import {Inject, Provide} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi";
import InfoWindow from "@/components/modal/mask/ModalMask.vue";
import {Store} from "vuex";

/*item3.errorMessage = 'Возраст должен быть указан в диапазоне от 18 до 60 лет'
item3.restriction = new class extends Handler<any, undefined, boolean> {
    function(val1: any): boolean {
        if(val1) {
            const number = Number.parseFloat(val1.toString());
            return number >= 18 && number < 60;
        }
        else{
            return false;
        }
    }
}
item6.restriction = new class extends Handler<any, undefined, boolean> {
    function(val1: any): boolean {
        if(val1) {
            const value : Array<ComboboxModel> = <Array<ComboboxModel>>val1;
            const valueId = new Array<Number>();
            value.forEach(itemValue =>{
                valueId.push(itemValue.id);
            })

            return value.length > 2 && valueId.indexOf(2) > -1;
        }
        else{
            return false;
        }
    }
}*/

class PermissionColumnItem extends DefaultTableColumnItem{
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

class PermissionTable extends DefaultTableSettings{
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

class PermissionSave extends Handler<undefined, undefined, void>{
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
        const result : Promise<boolean> = this.api.postApi<boolean>("/admin/create/permission",this.settings.data);
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
export default class CreatePermission extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    @Inject('state') state: State | undefined;

    private permissionData : Array<PermissionModel> = new Array<PermissionModel>();
    private columns : Array<TableColumnItem> = new Array<TableColumnItem>();
    // @ts-ignore
    private saveHandler : PermissionSave = new PermissionSave(this.api,this.settings,this.$store);

    mounted(){
        this.initColumn();
        const permissions : Promise<Array<PermissionModel>> = <Promise<Array<PermissionModel>>>this.api?.getApi<Array<PermissionModel>>("/admin/get/permission");
        permissions.then((items:Array<PermissionModel>)=> {
            items.forEach(item =>{
                this.permissionData.push(item);
            })
        });
    }

    get settings() : TableSettings{
        return new PermissionTable(this.columns,this.permissionData,this.saveHandler);
    }

    private initColumn() : void{
        const permission = new PermissionColumnItem("permission","Разрешение",true,ColumnTypes.text,'20%' );
        const displayName = new PermissionColumnItem("displayName","Название на экране",false,ColumnTypes.text,'20%');
        const admin = new PermissionColumnItem("admin","Администрирование",false,ColumnTypes.checkbox,'12%');
        const company = new PermissionColumnItem("company","Моя компания",false,ColumnTypes.checkbox,'12%');
        const service = new PermissionColumnItem("service","Мои заказы",false,ColumnTypes.checkbox,'12%');
        const other = new PermissionColumnItem('other','Разное',false,ColumnTypes.checkbox,'12%');
        permission.restrictions = new Array<Restriction>()
        const message = 'Разрешение не должно быть пустым и должно начинаться с "ROLE_"'
        const restriction : Handler<any, TableData, boolean> = new class extends Handler<any, TableData, boolean> {
            function(val: any,dataItem : TableData): boolean {
                const value = <String>val;
                if(!value || value.length === 0){
                    return false;
                }
                if(value.indexOf("ROLE_")===-1) {
                    return false;
                }
                else{
                    return true;
                }
            }
        };
        permission.restrictions.push(
            new class extends Restriction {
                restriction = restriction
                errorMessage = message
            }
        )
        this.columns.push(permission,displayName,admin,company,service,other);
    }

}
