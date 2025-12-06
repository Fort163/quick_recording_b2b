import {Restriction} from "@/models/error";
import {Component, Prop, Vue} from "vue-facing-decorator";

@Component({

})
export abstract class ValueComponent extends Vue {
    /*
        Возвращает текущее значение компонента
     */
    abstract getValue();

}

@Component({

})
export abstract class CheckComponent extends ValueComponent {

    /*
        Ограничения срабатывают при выборе значения
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    @Prop() private restrictions: Array<Function> | undefined

    private errors: Array<Restriction> = new Array<Restriction>();

    check(): Array<Restriction> {
        this.errors = new Array<Restriction>()
        this.restrictions?.forEach(func => {
            const rest: Restriction = func.call(this.getValue(), this.getValue());
            if (!rest.valid) {
                this.errors.push(rest);
            }
        })
        return this.errors;
    }

}