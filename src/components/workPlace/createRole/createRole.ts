import Component from "vue-class-component";
import Vue from "vue";
import {
    ColumnTypes,
    ComboboxModel,
    DefaultSelectBox, DefaultTableColumnItem, DefaultTableSettings, Handler, ModalWindow,
    PermissionModel,
    Role,
    SelectBoxModel,
    State,
    TableColumnItem, TableData, TableSettings
} from "@/store/model";
import TableCustom from "@/components/table/TableCustom.vue";
import SelectBox from "@/components/selectBox/SelectBox.vue";
import {Inject} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi";
import {Store} from "vuex";




class RoleTable extends DefaultTableSettings{
    columns: TableColumnItem[];
    data: TableData[];
    saveFunc : Handler<undefined, undefined, void>;
    constructor(columns: TableColumnItem[],data: any[],save: Handler<undefined, undefined, void> ) {
        super();
        this.columns = columns;
        this.data = data;
        this.saveFunc = save;
    }
}

class RoleColumnItem extends DefaultTableColumnItem{
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

class RoleSave extends Handler<undefined, undefined, void>{
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
        const roles : Array<Role> = new Array<Role>();
        (<Array<Role>>this.settings.data).forEach(role =>{
            const permissions : Array<PermissionModel> = new Array<PermissionModel>();
            role.permissionList.forEach((comboItem : ComboboxModel | PermissionModel) =>{
                permissions.push(this.wrap(<ComboboxModel>comboItem));
            })
            roles.push(this.createRole(role,permissions));
        })
        const result : Promise<boolean> = this.api.postApi<boolean>("/admin/create/role",roles);
        result.then(res =>{
            if(res) {
                this.store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = 'Роли успешно сохранены';
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

    private createRole(role : Role,permissions : Array<PermissionModel>) : Role{
        return new class implements Role {
            id: Number = role.id;
            name: String = role.name;
            permissionList: Array<PermissionModel> | Array<ComboboxModel> = permissions;
        }
    }

    private wrap(wraped : ComboboxModel): PermissionModel{
        return new class implements PermissionModel {
            id: Number = wraped.id;
            admin: boolean = false;
            company: boolean = false;
            displayName: String = '';
            other: boolean = false;
            permission: String = wraped.name;
            service: boolean = false;

        }
    }

}

@Component({
    components: {
        SelectBox,
        TableCustom
    }
})
export default class CreateRole extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    @Inject('state') state: State | undefined;

    private permissionData : Array<ComboboxModel> = new Array<ComboboxModel>();
    private roleData : Array<Role> = new Array<Role>();
    private columns : Array<TableColumnItem> = new Array<TableColumnItem>();
    // @ts-ignore
    private saveHandler : RoleSave = new RoleSave(this.api,this.settings,this.$store);

    mounted(){
        const permissions : Promise<Array<PermissionModel>> = <Promise<Array<PermissionModel>>>this.api?.getApi<Array<PermissionModel>>("/admin/get/permission");
        permissions.then((items:Array<PermissionModel>)=> {
            items.forEach(item =>{
                this.permissionData.push(this.wrap(item));
            })
        });
        /*
        const permissions : Promise<Array<PermissionModel>> = <Promise<Array<PermissionModel>>>this.api?.getApi<Array<PermissionModel>>("/admin/get/permission");
        permissions.then((items:Array<PermissionModel>)=> {
            items.forEach(item =>{
                this.permissionData.push(item);
            })
        });
         */
        const roles : Promise<Array<Role>> = <Promise<Array<Role>>>this.api?.getApi<Array<Role>>("/admin/get/role");
        roles.then((items:Array<Role>)=> {
            items.forEach((item : Role) =>{
                const listCombo = new Array<ComboboxModel>();
                item.permissionList.forEach((permission : PermissionModel | ComboboxModel) =>{
                    listCombo.push(this.wrap(<PermissionModel>permission));
                })
                item.permissionList = listCombo;
                this.roleData.push(item);
            })
        });
        this.initColumn();
    }

    get settings() : TableSettings{
        return new RoleTable(this.columns,this.roleData,this.saveHandler);
    }

    private initColumn() : void{
        const name = new RoleColumnItem("name","Название",true,ColumnTypes.text,'20%' );
        const permissionList = new RoleColumnItem("permissionList","Список разрешений",true,ColumnTypes.combo,'75%');
        /*permission.restriction = new class extends Handler<any, undefined, boolean> {
            function(val: any): boolean {
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
        }*/
        //permission.errorMessage = 'Разрешение не должно быть пустым и должно начинаться с "ROLE_"'
        permissionList.comboData = this.permissionData;
        this.columns.push(name,permissionList);
    }

    private wrap(wraped : PermissionModel): ComboboxModel{
        return new class implements ComboboxModel {
            id: Number = wraped.id
            name: String = wraped.permission;
        }
    }

}