import Component from "vue-class-component";
import Vue from "vue";
import {Inject} from "vue-property-decorator";
import {
    ColumnTypes, DateModel,
    DefaultTableColumnItem,
    DefaultTableSettings,
    Handler, ServiceModel,
    State,
    TableColumnItem,
    TableData, TableSettings
} from "@/store/model";
import SearchService from "@/components/searchService/SearchService.vue";
import {FastWebApi} from "@/components/api/fastWebApi";
import TableCustom from "@/components/table/TableCustom.vue";

class ServiceColumnItem extends DefaultTableColumnItem{
    itemName: String;
    title: String;
    mandatory: boolean;
    constructor(itemName : String,title : String,width : String) {
        super();
        this.itemName = itemName;
        this.title = title;
        this.mandatory = false;
        super.itemType = ColumnTypes.noEditable;
        super.width = width;
    }
}

class ServiceTable extends DefaultTableSettings{
    columns: TableColumnItem[];
    data: TableData[];
    saveFunc: Handler<undefined, undefined, void> | undefined;
    constructor(columns: TableColumnItem[],data: any[]) {
        super();
        this.columns = columns;
        this.data = data;
        super.deleteButton = false;
        this.saveFunc = undefined;
        super.addButton = false;
        super.saveButton = false;
    }
}

class SeeClaimServiceModel implements TableData{
    id : Number | null;
    time : string;
    serviceType : String;
    clientName : string;
    clientPhone : string;
    constructor(value : ServiceModel) {
        this.id = value.id;
        this.time = value.time.date + ' ' + value.time.time;
        this.serviceType = value.serviceTypeDto.name;
        this.clientName = value.client.name;
        this.clientPhone = value.client.phone;
    }
}

@Component({
    components: {
        SearchService,
        TableCustom
    }
})
export default class SeeClaimService extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    @Inject('state') state: State | undefined;

    private columns : Array<TableColumnItem> = new Array<TableColumnItem>();
    private serviceData : Array<SeeClaimServiceModel> = new Array<SeeClaimServiceModel>();
    private currentSearch = this.$store.getters.searchService.id;

    mounted(){
        this.initColumn();
    }

    get settings() : TableSettings{
        if(this.currentSearch != this.$store.getters.searchService.id) {
            this.serviceData.splice(0);
            const services: Promise<Array<ServiceModel>> = <Promise<Array<ServiceModel>>>this.api?.postApi<Array<ServiceModel>>("/employee/service",this.$store.getters.searchService);
            services.then((items: Array<ServiceModel>) => {
                items.forEach(item => {
                    this.serviceData.push(new SeeClaimServiceModel(item));
                })
            });
            this.currentSearch = this.$store.getters.searchService.id;
            return new ServiceTable(this.columns, this.serviceData);
        }
        return new ServiceTable(this.columns, this.serviceData);
    }

    private initColumn() : void{
        const time = new ServiceColumnItem("time","Дата/время",'20%' );
        const serviceType = new ServiceColumnItem("serviceType","Услуга",'30%' );
        const clientName = new ServiceColumnItem("clientName","Имя клиента",'25%' );
        const clientPhone = new ServiceColumnItem("clientPhone","Телефон клиента",'25%' );
        this.columns.push(time);
        this.columns.push(serviceType);
        this.columns.push(clientName);
        this.columns.push(clientPhone);
    }

}