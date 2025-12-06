import {Component, toNative, Vue} from "vue-facing-decorator";
import {VueCons} from "vue-facing-decorator/dist/esm/class";

@Component({
    components: {
        /*JoinStep_1,
        JoinStep_2,*/
    }

})
export default class JoinCompany extends Vue {

    /*created() {
        this.setStep()
    }

    updated() {
        if (this.$route.name === 'joinCompany') {
            this.setStep()
        }
    }

    private setStep() {
        if (!this.$store.getters.joinCompany) {
            this.$store.commit("setJoinCompany", new JoinCompanyNew());
            this.$router.push('join_step_1')
        }
        else {
            this.$router.push('join_step_1')

        }

    }*/

}

/*
class JoinCompanyNew implements JoinCompanyInterface {

    coords: GeolocationCoordinates | null = null;
    editCoords: boolean = false;
    joined: boolean = false;
    selectActivity: Activity | null = null;
    selectCompany: Company | null = null;


}*/
