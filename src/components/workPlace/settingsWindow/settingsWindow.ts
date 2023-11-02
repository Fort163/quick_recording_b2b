import Component from "vue-class-component";
import Vue from "vue";
import {State} from "@/store/model";
import {Inject} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi";
import ChangeUser from "@/components/workPlace/settingsWindow/changeUser/ChangeUser.vue";
import WarningWindow from "@/components/workPlace/settingsWindow/warningWindow/WarningWindow.vue";

@Component({
    components: {
        ChangeUser,
        WarningWindow
    }

})
export default class SettingsWindow extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    @Inject('state') state: State | undefined;

    public static WARNINGS = 'WARNINGS';
    public static CHANGE_USER = 'CHANGE_USER';

    private frame : String = SettingsWindow.WARNINGS;

    get currentFrame() : String {
        return this.frame;
    }

    public setFrame(frame : String){
        this.frame = frame;
    }

}