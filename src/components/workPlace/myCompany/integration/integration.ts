import Component from "vue-class-component";
import Vue from "vue";
import TableCustom from "@/components/table/TableCustom.vue";
import {Inject} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi";

@Component({
    components: {
        TableCustom
    }
})
export default class Integration extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    private style : string = 'white';

    get currentStyle() :string{
        return this.style;
    }

    public setStyle(value :string){
        this.style = value;
    }

    get src(){
        return process.env.VUE_APP_BASE_URL_CALENDAR+"?companyId="+this.$store.getters.company?.id+"&style="+this.style;
    }

    get frame(){
        return '<iframe width="100%" height="60%" src="'+this.src+'"/>';
    }

}