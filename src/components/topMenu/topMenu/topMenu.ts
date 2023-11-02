import Component from "vue-class-component";
import Vue from "vue";
import ComboBox from "@/components/comboBox/ComboBox.vue";
import {ComboboxModel, Role, State,Handler} from "@/store/model";
import {getTopMenu, TopMenuModel} from "@/components/topMenu/topMenu/topMenuMapHelper";
import {Store} from "vuex";

@Component({
    components: {
        ComboBox
    }
})
export default class TopMenu extends Vue {

    get state():State{
        return this.$store.state
    }

    get roleList() : Role[] | undefined{
        return this.state.loginModel.currentUser?.roleList
    }

    get topMenu() : TopMenuModel | null{
        return getTopMenu(this.roleList);
    }

    get showAdmin(): boolean{
        return this.topMenu ? this.topMenu.admin.length>0 : false;
    }

    get showCompany(): boolean{
        return this.topMenu ? this.topMenu.company.length>0 : false;
    }

    get showOther(): boolean{
        return this.topMenu ? this.topMenu.other.length>0 : false;
    }

    get showService(): boolean{
        return this.topMenu ? this.topMenu.service.length>0 : false;
    }

    get sizeCombo() : number{
        let count : number = 0;
        if(this.showOther)
            count+=1;
        if(this.showAdmin)
            count+=1;
        if(this.showService)
            count+=1;
        if(this.showCompany)
            count+=1;
        return 100/count;
    }

    public item(): String | undefined{
        return this.state.currentMenuItem?.name;
    }

    get handler(){
        return new HandlerMenuItem(this.$store);
    }
}

class HandlerMenuItem extends Handler<ComboboxModel,undefined,void>{
    private store : Store<any>;
    constructor(store : Store<any>) {
        super();
        this.store = store;
    }
    function(val1: ComboboxModel | undefined, val2: undefined): void {
        this.store.commit('setCurrentMenuItem',val1);
    }
}