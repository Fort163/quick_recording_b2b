import {Component, Vue} from "vue-property-decorator";
import {LoadMask, MaskModel, ModalWindow, State} from "@/store/model";

@Component({
    components:{

    }
})
export default class ModalMask extends Vue {

    get state() : State{
        return this.$store.state
    }

    get mask() : MaskModel {
        return this.state.mask;
    }

    get modalWindow() : ModalWindow | null{
        return this.mask.modalWindow;
    }

    get message() : string | undefined | null{
        return this.modalWindow?.message;
    }

    get showInfoWindow() : boolean | undefined{
        return this.modalWindow?.show;
    }

    get loadMask() : LoadMask | null{
        return this.mask.loadMask;
    }

    get showLoadMask() : boolean | undefined{
        return this.loadMask?.show;
    }

    public close(){
        this.$store.commit('setModalWindow',new class implements ModalWindow{
            message: string | null = null
            show: boolean = false;
        });
    }

}