import {PeriodDto, State} from "@/store/model";
import {FastWebApi} from "@/components/api/fastWebApi";
import Component from "vue-class-component";
import TableCustom from "@/components/table/TableCustom.vue";
import Vue from "vue";
import {Inject} from "vue-property-decorator";


@Component({
    components: {
        TableCustom
    }
})
export default class FixPartTime extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    @Inject('state') state: State | undefined;
    private dto: PeriodDto = new PeriodDto();

    get from(): string | null {
        return this.dto.from
    }

    set from(from: string | null) {
        this.dto.from = from
    }

    get to(): string | null {
        return this.dto.to
    }

    set to(to: string | null) {
        this.dto.to = to
    }

    private fix(): void {
        this.api?.postApi("/admin/fix/partTime", this.dto)
    }

}