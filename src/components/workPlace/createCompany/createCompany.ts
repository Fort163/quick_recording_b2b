import Component from "vue-class-component";
// @ts-ignore
import {loadYmap, yandexMap, ymapMarker} from 'vue-yandex-maps'
import Vue from "vue";
import {Inject} from "vue-property-decorator";
import {
    ColumnTypes,
    ComboboxModel,
    CompanyModel,
    DayOfWeek,
    DefaultSchedule, DefaultTableColumnItem,
    DefaultTableSettings,
    Handler, ModalWindow, Restriction,
    ScheduleModel,
    State,
    TableColumnItem,
    TableData,
    TableSettings, TransientValue, UserInfoModel
} from "@/store/model";
import {GeocoderResult, GeocoderResultDefault} from "@/structure/map/ymapsModel";
import {FastWebApi} from "@/components/api/fastWebApi";
import SelectBox from "@/components/selectBox/SelectBox.vue";
import TableCustom from "@/components/table/TableCustom.vue";
import ButtonFooter from "@/components/buttonFooter/ButtonFooter.vue";
import {Store} from "vuex";

class Company implements CompanyModel{
    id : number | null = null;
    name : string | null = null;
    activityList : Array<ComboboxModel> | null = new Array<ComboboxModel>();
    schedulesList : Array<ScheduleModel> | null = new Array<ScheduleModel>();
    geoPosition : GeocoderResult | null = null;
    constructor() {}
}

class ScheduleColumnItem extends DefaultTableColumnItem{
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

class ScheduleTable extends DefaultTableSettings{
    columns: Array<TableColumnItem>;
    data: Array<ScheduleModel>;
    saveFunc : undefined;
    constructor(columns: Array<TableColumnItem>,data: Array<ScheduleModel>) {
        super();
        this.columns = columns;
        this.data = data;
        this.saveFunc = undefined;
        super.deleteButton = false;
        super.addButton = false;
        super.saveButton = false;
    }
}

class SaveCompany extends Handler<undefined, undefined, void> {
    private api: FastWebApi;
    private store: Store<any>;
    private company : CompanyModel;
    constructor(api: FastWebApi,store: Store<any>,company : CompanyModel) {
        super();
        this.api = api;
        this.store = store;
        this.company = company;
    }
    function(val1: undefined, val2: undefined): void {
        const flag : Promise<boolean> = <Promise<boolean>>this.api?.postApi<boolean>("/company/create/company",this.company);
        flag.then((item : boolean)=> {
            if(item){
                this.store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = 'Компания успешно сохранена.';
                    show : boolean = true;
                });
                this.store.commit('setCurrentMenuItem',null);
                const userPromise = this.api?.getApi<UserInfoModel>('/user/me');
                userPromise?.then((user:UserInfoModel)=> {
                    this.store.commit('setCurrentUser',user);
                });
            }
        });
    }
}

class DisableStep extends Handler<string, undefined, boolean> {
    private company : CompanyModel = new Company();
    constructor(company : CompanyModel) {
        super();
        this.company = company;
    }
    function(value: String | undefined, val2: undefined): boolean {
        const step = value?.toString();
        if(step === 'Step_1'){
            if((<Array<ComboboxModel>>this.company.activityList).length > 0 && this.company.name){
                return false;
            }
        }
        if (step === 'Step_2' && this.company.schedulesList) {
            const workArray = this.company.schedulesList.filter(item => item.work);
            const workArrayWithError = this.company.schedulesList.filter(item => item.work && !this.checkClock(item.clockFrom, item.clockTo));
            return workArray.length == 0 || workArrayWithError.length > 0;
        }
        if(step === 'Step_3'){
            if(this.company.geoPosition){
                return false;
            }
        }
        return true;
    }
    checkClock(from : string,to : string):boolean{
        if(!from && !to){
            return false;
        }
        return from < to;
    }
}

@Component({
    components: {
        yandexMap,
        ymapMarker,
        loadYmap,
        SelectBox,
        TableCustom,
        ButtonFooter
    }
})
export default class CreateCompany extends Vue {
    @Inject('state') state: State | undefined;
    @Inject('api') api: FastWebApi | undefined;

    private activityData : Array<ComboboxModel> = new Array<ComboboxModel>();
    private currentCompany : CompanyModel = new Company();
    public currentStep : TransientValue<string> = new TransientValue<string>("Step_1");
    private scheduleColumn : Array<TableColumnItem> = new Array<TableColumnItem>();

    created(){
        this.initScheduleColumn();
        this.initScheduleData();
        const activities : Promise<Array<ComboboxModel>> = <Promise<Array<ComboboxModel>>>this.api?.getApi<Array<ComboboxModel>>("/admin/get/activity");
        activities.then((items:Array<ComboboxModel>)=> {
            items.forEach(item =>{
                this.activityData.push(item);
            })
        });

    }

    async mounted() {
        // @ts-ignore
        await loadYmap(this.settings);
    }

    get step() : string{
        return this.currentStep.value;
    }

    get comboData() : Array<ComboboxModel>{
        return this.activityData;
    }

    get company() : CompanyModel{
        return this.currentCompany;
    }

    get companyName() : string | null{
        return this.company.name;
    }

    set companyName(value : string | null){
        this.company.name = value;
    }

    get companyActivity() : Array<ComboboxModel>{
        return <Array<ComboboxModel>>this.company.activityList;
    }

    get companyActivityString() : string{
        let value = ''
        this.company.activityList?.forEach((item ,index)=>{
            value += item.name
            if(index === (<Array<ComboboxModel>>this.company.activityList).length-2){
                value += ' и '
            }
            else{
                if(index !== (<Array<ComboboxModel>>this.company.activityList).length-1){
                    value += ', '
                }
            }
        })
        return value;
    }


    get schedulesList() : Array<ScheduleModel>{
        return <Array<ScheduleModel>>this.company.schedulesList;
    }

    get scheduleTable() : TableSettings {
        return new ScheduleTable(this.scheduleColumn,this.schedulesList);
    }


    get settings(){
        return this.state?.mapInfo.settings;
    }

    get coords(){
        const coords = this.state?.mapInfo.coords;
        if(coords){
            return [coords.latitude,coords.longitude]
        }
        return [55.749346930602925,37.611106671875];
    }

    get companyCoords() : [number,number] | undefined{
        const geocoderResult = this.geocoderResult;
        if(geocoderResult) {
            return [geocoderResult.latitude,geocoderResult.longitude];
        }
        return undefined;
    }

    get address(){
        return this.geocoderResult?.name;
    }


    get geocoderResult(): GeocoderResult | null{
        return this.company.geoPosition;
    }

    set geocoderResult(geocoderResult: GeocoderResult | null){
        this.company.geoPosition = geocoderResult;
    }

    get markerCompany(){
        return {
            layout: 'default#imageWithContent',
            imageSize: [43, 43],
            imageOffset: [-15, -43],
            content: 'Моя компания',
            contentOffset: [0, 45],
            contentLayout: '<div style="background: #1E98FF; width: 65px; color: #000000; font-weight: bold; border-radius: 10px">$[properties.iconContent]</div>'
        }
    }

    public onClick(event: any) {
        ymaps.geocode(event.get('coords')).then(
            (res : any) => {
                this.geocoderResult = new GeocoderResultDefault(res,event.get('coords'));
            },
            (err : any) => {
                alert(err);
            }
        )
    }

    public save() : Handler<undefined, undefined, void>{
        return new SaveCompany(<FastWebApi>this.api,this.$store,this.company);
    }

    public isDisabled() : Handler<string, undefined, boolean>{
        return new DisableStep(this.company);
    }

    initScheduleData(){
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.monday))
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.tuesday))
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.wednesday))
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.thursday))
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.friday))
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.saturday))
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.sunday))
    }

    private initScheduleColumn() : void{
        const dayOfWeek = new ScheduleColumnItem("dayOfWeek","День",true,ColumnTypes.noEditable,'25%' );
        const clockFrom = new ScheduleColumnItem("clockFrom","С",true,ColumnTypes.time,'10%' );
        clockFrom.restrictions = new Array<Restriction>()
        const messageTimeFrom = 'Неверный диапазон времени'
        const checkTimeFrom = new class extends Handler<any, TableData, boolean> {
            function(val: any,dataItem : ScheduleModel): boolean {
                const clockFrom = val;
                const clockTo = dataItem.clockTo;
                if(!clockFrom){
                    return false;
                }
                return clockFrom < clockTo;
            }
        }
        clockFrom.restrictions.push(
            new class extends Restriction {
                restriction = checkTimeFrom
                errorMessage = messageTimeFrom
            }
        )
        const clockTo = new ScheduleColumnItem("clockTo","По",true,ColumnTypes.time,'10%' );
        clockTo.restrictions = new Array<Restriction>()
        const messageTimeTo = 'Неверный диапазон времени'
        const checkTimeTo : Handler<any, TableData, boolean> = new class extends Handler<any, TableData, boolean> {
            function(val: any,dataItem : ScheduleModel): boolean {
                const clockFrom = dataItem.clockFrom;
                const clockTo = val;
                if(!clockTo){
                    return false;
                }
                return clockFrom < clockTo;
            }
        };
        clockTo.restrictions.push(
            new class extends Restriction {
                restriction = checkTimeTo
                errorMessage = messageTimeTo
            }
        )
        const work = new ScheduleColumnItem("work","Рабочий день",true,ColumnTypes.checkbox,'15%' );
        this.scheduleColumn.push(dayOfWeek,clockFrom,clockTo,work);
    }



}