import {Component, Vue} from "vue-property-decorator";
import {State} from "@/models/main";
import Button from "@/components/button/Button.vue";
import {LoadMask, MaskModel, ErrorWindow} from "@/models/modal";

@Component({
    components:{
        Button
    }
})
export default class ModalMask extends Vue {

    updated() {
        if(this.showErrorWindow){
            setTimeout(() => {
                this.$store.commit("setErrorWindow", null)
            }, 6000);
        }
    }

    get state() : State{
        return this.$store.state
    }

    get mask() : MaskModel {
        return this.state.mask;
    }

    get errorWindow() : ErrorWindow | null{
        return this.mask.errorWindow;
    }

    get showErrorWindow() : boolean | undefined{
        return this.errorWindow?.show;
    }

    get loadMask() : LoadMask | null{
        return this.mask.loadMask;
    }

    get showLoadMask() : boolean | undefined{
        return this.loadMask?.show;
    }

    public closeErrorWindow() : void {
        this.$store.commit("setErrorWindow", null)
    }

}