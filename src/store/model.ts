import {ComboboxTopMenu} from "@/components/topMenu/topMenu/topMenuMapHelper";
import {GeocoderResult} from "@/structure/map/ymapsModel";

export interface State{
    loginModel : LoginInfoModel,
    mapInfo : MapInfo,
    currentMenuItem: ComboboxTopMenu | null,
    mask : MaskModel
    searchDto : SearchDto
}

export interface LoginInfoModel{
    accessToken: string | null,
    currentUser: UserInfoModel | null
}

export interface MaskModel {
    modalWindow : ModalWindow | null
    loadMask : LoadMask | null
}

export interface LoadMask{
    show: boolean
}

export interface ModalWindow{
    message: string | null,
    show: boolean
}

export interface UserInfoModel{
    id: Number,
    fullName: String,
    firstName: String,
    lastName: String,
    userpic: String,
    email: String,
    locale: String,
    login: String,
    gender: String,
    phoneNumber: String,
    birthDay:DateModel,
    lastVisit:DateTimeModel,
    verified: Boolean,
    status: String,
    provider: String,
    roleList: Array<Role>,
    employee : EmployeeModel
}

export interface Role{
    id: Number,
    name: String,
    permissionList: Array<PermissionModel> | Array<ComboboxModel>
}

export interface PermissionModel{
    id: Number,
    permission: String
    displayName: String
    admin:boolean,
    company:boolean,
    service:boolean,
    other:boolean
}

export interface ClaimCompanyRequestModel{
    id: Number;
    confirmed : boolean;
    company: CompanyModel | null;
    user : UserInfoModel;
}

export interface EmployeeModel extends TableData{
    name : string | null,
    company : CompanyModel | null,
    schedulesList : Array<ScheduleModel> | null,
    serviceList : Array<ServiceModel> | null,
    serviceTypeList : Array<ServiceTypeModel> | null,
    user : UserInfoModel | null,
    showClient : boolean,
    vacationFrom : string | null,
    vacationTo : string | null,
    isOwner : boolean | null
}

export interface NotificationModel{
    id: number,
    permission: string,
    name: string,
    fromUser:string,
    toUser:string,
    shown: boolean
}

export interface ServiceModel extends TableData{
    time : DateTimeModel,
    client : ClientDto,
    employee : EmployeeModel,
    serviceTypeDto : ServiceTypeModel
}

export interface MapInfo{
    settings : MapSettings,
    coords : GeolocationCoordinates | null
}

export interface ServiceTypeModel extends ComboboxModel{
    workClock:string,
    showClient:boolean
}

export interface MapSettings{
    apiKey: string,
    lang: string,
    coordorder: string,
    version: string
}

export interface DateModel{
    date: String,
    day: String
}

export interface DateTimeModel extends DateModel{
    time: String
}

export interface ComboboxModel{
    id: Number,
    name: String
}

export interface SelectBoxModel{
    item : Array<ComboboxModel>;
    currentItem : Array<ComboboxModel>;
}


export abstract class DefaultSelectBox implements SelectBoxModel{
    item : Array<ComboboxModel>;
    constructor(item : Array<ComboboxModel>) {
        this.item = item
    }
    currentItem : Array<ComboboxModel> = new Array<ComboboxModel>();
}

export interface TableData extends Object{
    id: Number | null;
}

export interface TableSettings {
    columns: TableColumnItem[],
    data: TableData[],
    paging : boolean,
    pagingSize : number,
    deleteButton : boolean,
    saveButton : boolean,
    addButton : boolean,
    saveFunc : Handler<undefined, undefined, void> | undefined,
    selectFunc : Handler<any, undefined, void> | undefined,
    deleteFunc : Handler<undefined, undefined, void> | undefined
}

export abstract class DefaultTableSettings implements TableSettings{
    deleteButton = true;
    saveButton = true;
    addButton = true;
    paging = false;
    pagingSize = 10;
    selectFunc = undefined;
    deleteFunc = undefined;
    abstract columns: TableColumnItem[];
    abstract data: Array<any>;
    abstract saveFunc: Handler<undefined, undefined, void> | undefined;

}

export abstract class Handler<F,S,R> {
    abstract function(val1?:F, val2?:S): R;
}

export abstract class DefaultTableColumnItem implements TableColumnItem{
    itemType : ColumnTypes = ColumnTypes.text;
    width : String | undefined =  undefined;
    restrictions : Array<Restriction> | undefined = undefined;
    comboData: Array<ComboboxModel> | undefined = undefined;
    abstract mandatory : boolean;
    abstract itemName: String;
    abstract title: String;
}

export abstract class Restriction{
    abstract restriction: Handler<any, TableData, boolean> | undefined
    abstract errorMessage: String
}

export interface TableColumnItem {
    title: String,
    itemName: String,
    itemType: ColumnTypes,
    mandatory: boolean,
    restrictions: Array<Restriction> | undefined,
    width: String | undefined,
    comboData: Array<ComboboxModel> | undefined,
}

export interface ScheduleModel extends TableData{
    dayOfWeek : string,
    clockFrom : string,
    clockTo : string,
    work : boolean
}

export class DefaultSchedule implements ScheduleModel{
    id = null
    clockFrom : string = '00:00';
    clockTo : string = '00:00';
    work : boolean = false;
    dayOfWeek: string;
    constructor(dayOfWeek: DayOfWeek) {
        this.dayOfWeek = dayOfWeek.toString();
    }
}

export interface CompanyModel {
    id : number | null
    name : string | null
    activityList : Array<ComboboxModel> | null
    schedulesList : Array<ScheduleModel> | null
    geoPosition : GeocoderResult | null
}

export enum ColumnTypes{
    noEditable = "noEditable",
    text = "text",
    textarea = "textarea",
    date = "date",
    time = "time",
    email = "email",
    number = "number",
    checkbox = "checkbox",
    file = "file",
    radio = "radio",
    combo = "combobox"
}

export enum DayOfWeek{
    monday = "Понедельник",
    tuesday = "Вторник",
    wednesday = "Среда",
    thursday = "Четверг",
    friday = "Пятница",
    saturday = "Суббота",
    sunday = "Воскресенье"
}

export class TransientValue<T>{
    private _value : T;
    constructor(value : T) {
        this._value = value;
    }

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
    }
}

export class SimpleValue{
    private longValue : number | null = null;
    private stringValue : string | null = null;
    private doubleValue : number | null = null;
    private booleanValue : boolean | null = null;

    constructor() {
    }

    get valueLong(): number | null {
        return this.longValue;
    }

    set valueLong(value: number | null) {
        this.longValue = value;
    }

    get valueString(): string | null {
        return this.stringValue;
    }

    set valueString(value: string | null) {
        this.stringValue = value;
    }

    get valueDouble(): number | null {
        return this.doubleValue;
    }

    set valueDouble(value: number | null) {
        this.doubleValue = value;
    }

    get valueBoolean(): boolean | null {
        return this.booleanValue;
    }

    set valueBoolean(value: boolean | null) {
        this.booleanValue = value;
    }
}

export class ListWhitLong{
    private data: Array<TableData>;
    private id : number;

    constructor(data: Array<TableData>, id: number) {
        this.data = data;
        this.id = id;
    }

    get getData(): Array<TableData> {
        return this.data;
    }

    set setData(value: Array<TableData>) {
        this.data = value;
    }

    get getId(): number {
        return this.id;
    }

    set setId(value: number) {
        this.id = value;
    }
}

export class DtoWhitLong{
    private data: TableData;
    private id : number;

    constructor(data: TableData, id: number) {
        this.data = data;
        this.id = id;
    }

    get getData(): TableData {
        return this.data;
    }

    set setData(value: TableData) {
        this.data = value;
    }

    get getId(): number {
        return this.id;
    }

    set setId(value: number) {
        this.id = value;
    }
}

export class MapDto{
    private data : Map<string, any> = new Map<string, any>();

    public add(str : string,val: any){
        this.data.set(str,val)
    }

    get getData(): Map<string, any> {
        return this.data;
    }

    set setData(value: Map<string, any>) {
        this.data = value;
    }

    public getJSON() : String {
        let json : String = '';
        json += JSON.stringify(this.data.entries().next())
        return json;
    }

}

export class ChangeUserDto {
    phoneNumber : string | null;
    firstName : string | null;
    lastName : string | null;
    constructor(phoneNumber : string | null,firstName : string | null,lastName : string | null) {
        this.phoneNumber = phoneNumber;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export interface AnswerModel{
    result : boolean,
    message : string,
    code : number
}

export class ClientDto{
    id : number | null = null;
    name : string;
    phone : string;
    constructor(name : string,phone : string) {
        this.name = name;
        this.phone = phone;
    }
}

export class SearchServiceDto{
    id = 1;
    companyId : Number | null = null;
    employeeId : Number | null = null;
    serviceTypeId : Number | null = null;
    periodFrom : string | null = null;
    periodTo : string | null = null;
    clientPhone : string | null = null;
    isNew : boolean = true;
}

export class SearchDto{
    searchService : SearchServiceDto = new SearchServiceDto();
}

export class Employee implements EmployeeModel{
    id : number | null = null;
    name : string | null = null;
    serviceList: Array<ServiceModel> | null = null;
    showClient: boolean = true;
    company: CompanyModel | null = null;
    vacationFrom: string | null = null;
    vacationTo: string | null = null;
    isOwner: boolean = false;
    schedulesList : Array<ScheduleModel> = new Array<ScheduleModel>();
    serviceTypeList : Array<ServiceTypeModel> = new Array<ServiceTypeModel>();
    user : UserInfoModel | null = null;
    constructor() {}
}

export class PeriodDto{
    from : string | null = null;
    to : string | null = null;
}