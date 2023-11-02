import Component from "vue-class-component";
import Vue from "vue";

@Component({
    components: {
    }
})
export default class TopMenu extends Vue {

    get userpic() : String | undefined{
        return this.$store.getters.user?.userpic;
    }

    get welcome() : String | undefined{
        return this.$store.getters.user?.fullName;
    }

    get companyName(){
        return this.$store.getters.company?.name;
    }

    get employeeName(){
        return this.$store.getters.employee?.name;
    }

    public logout() {
        this.$store.commit('login',null);
        this.$store.commit('setCurrentUser',null);
    }

    public settings() {
        this.$store.commit('setCurrentMenuItem',null);
    }

}