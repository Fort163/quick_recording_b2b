import {ComboboxModel, PermissionModel, Role } from "@/store/model";

export interface TopMenuModel {
    admin: ComboboxTopMenu[],
    company: ComboboxTopMenu[],
    service: ComboboxTopMenu[],
    other: ComboboxTopMenu[]
}

export class ComboboxTopMenu implements ComboboxModel{
    id: Number;
    name: String;
    permission: String | null;
    constructor(item:PermissionModel) {
        this.id = item.id;
        this.name = item.displayName;
        this.permission = item.permission;
    }
}

class TopMenuClass implements TopMenuModel{
    admin: ComboboxTopMenu[] = [];
    company: ComboboxTopMenu[] = [];
    other: ComboboxTopMenu[] = [];
    service: ComboboxTopMenu[] = [];
    constructor(items: PermissionModel[]) {
        items.forEach(item =>{
            if(item.admin){
                this.admin.push(new ComboboxTopMenu(item));
            }
            if(item.company){
                this.company.push(new ComboboxTopMenu(item));
            }
            if(item.service){
                this.service.push(new ComboboxTopMenu(item));
            }
            if(item.other){
                this.other.push(new ComboboxTopMenu(item));
            }
        })
    }
}

export function getTopMenu(roles : Array<Role> | undefined): TopMenuModel|null{
    if(!roles){
        return null;
    }
    const listItems: Array<PermissionModel> = new Array<PermissionModel>();
    roles.forEach(role => {
        role.permissionList.forEach((permission:PermissionModel | ComboboxModel)=>{
            listItems.push(<PermissionModel>permission)
        });
    });
    return new TopMenuClass(listItems);
}

