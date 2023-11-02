import {Component, Inject, Prop, Vue} from "vue-property-decorator";
import {ColumnTypes, ComboboxModel, SelectBoxModel, TableColumnItem, TableSettings} from "@/store/model";
import SelectBox from "@/components/selectBox/SelectBox.vue";

@Component({
    components: {
        SelectBox
    }
})
export default class TdCustom extends Vue {
    @Inject('settings') settings: TableSettings | undefined;
    @Prop() index: Number | undefined;
    @Prop() column: TableColumnItem | undefined;
    @Prop() isTitle: Boolean | undefined;
    private isOk: boolean = true;
    private errorsMessages : Set<String> = new Set<String>();
    private errors : String = '';

    get dataItem(): any {
        // @ts-ignore
        return this.settings?.data[this.index];
    }

    get value(): any {
        if (this.isTitle)
            return this.column?.title;
        else {
            let name: String = '';
            let val = null;
            if (this.column) {
                name = this.column.itemName;
            }
            const result = Object.prototype.hasOwnProperty.call(this.dataItem, name.toString());

            if (result) {
                val = this.dataItem[name.toString()];
            }
            this.checkValue(val);
            if (this.type === ColumnTypes.checkbox) {
                if (val === null) {
                    this.dataItem[name.toString()] = !!val;
                }
            }
            return val;
        }
    }

    set value(val: any | undefined) {
        let name: String = '';
        if (this.column) {
            name = this.column.itemName;
        }
        const result = Object.prototype.hasOwnProperty.call(this.dataItem, name.toString());
        this.checkValue(val);
        if (result)
            this.dataItem[name.toString()] = val;
    }

    set errorMessage(value : String){
        this.errors = value
    }

    get errorMessage(): String{
        //const errorMessage = this.errorsMessages;
        if (this.errorsMessages.size > 0) {
            return this.errors
        }
        return 'Ошибка заполнения';
    }

    public createMessageResult() : void {
        let result = ''
        this.errorsMessages.forEach(item => result += item+'\n');
        this.errorMessage = result
    }

    get width(): String | undefined {
        const width = this.column?.width;
        if (width) {
            return width;
        } else {
            return '10%'
        }
    }

    get type(): ColumnTypes | undefined {
        return this.column?.itemType;
    }

    get check(): boolean {
        return this.isOk;
    }

    get mandatory(): boolean | undefined {
        return this.column?.mandatory;
    }

    get comboData(): Array<ComboboxModel> | undefined {
        return this.column?.comboData;
    }

    public checkValue(val: any): void {
        if (this.column?.restrictions) {
            let result = true
            this.column?.restrictions.forEach(item => {
                    const s = this.errorsMessages
                    let checkVal
                    if(item.restriction) {
                        checkVal = item.restriction.function(val, this.dataItem);
                    }
                    else {
                        checkVal = this.defaultCheckValue(val)
                    }
                    if (!checkVal) {
                        this.errorsMessages.add(<String>item?.errorMessage)
                        result = false;
                        this.createMessageResult()
                    } else {
                        this.errorsMessages.delete(<String>item?.errorMessage)
                        this.createMessageResult()
                    }
                }
            )
            this.isOk = result;
        } else {
            this.isOk = this.defaultCheckValue(val)
        }
    }

    public defaultCheckValue(val: any): boolean {
        if (this.type === ColumnTypes.checkbox || !this.mandatory) {
            return true;
        }
        if (this.type === ColumnTypes.combo) {
            return val.length > 0;
        }
        return !!val;
    }

}