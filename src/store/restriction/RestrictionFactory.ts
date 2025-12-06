
import Vue from "vue";
import {CheckComponent} from "@/store/component";
import {Errors, Restriction} from "@/models/error";
import {Schedule} from "@/models/company-service";
import {useI18n} from "vue-i18n";

export class RestrictionFactory {

    private i18n = useI18n();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    public checkNotNull(fieldName? : string): Function {
        const error = fieldName ?
            this.i18n.t("restriction.default.checkNotNull.withField", {fieldName:fieldName}).toString() :
            this.i18n.t("restriction.default.checkNotNull.noField").toString()
        return function (value: Object): Restriction {
            if (value) {
                if (value instanceof Array && value.length === 0) {
                    return new Restriction(false, error);
                }
                return new Restriction(true);
            }
            return new Restriction(false, error);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    public checkCharacterLength(countMin?: number, countMax?: number): Function {
        const messageMin = this.i18n.t("restriction.default.checkCharacterLength.min", {countMin:countMin});
        const messageMax = this.i18n.t("restriction.default.checkCharacterLength.max", {countMax:countMax});
        return function (value: string): Restriction {
            if (countMin && countMax) {
                if (countMin <= value.length && value.length <= countMax) {
                    return new Restriction(true);
                } else {
                    if (countMin > value.length) {
                        return new Restriction(false, messageMin);
                    } else {
                        return new Restriction(false, messageMax);
                    }
                }

            } else {
                if (countMin) {
                    if (countMin > value.length) {
                        return new Restriction(false, messageMin);
                    } else {
                        return new Restriction(true);
                    }
                }
                if (countMax) {
                    if (value.length > countMax) {
                        return new Restriction(false, messageMax);
                    } else {
                        return new Restriction(true);
                    }
                }
            }
            return new Restriction(true);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    public checkCharacterLetters(errorCustom? : string): Function {
        const error = errorCustom ? errorCustom : this.i18n.t("restriction.default.checkCharacterLetters")
        return function (value: string): Restriction {
            if (/^[а-яА-ЯёЁa-zA-Z]+$/.test(value)) {
                return new Restriction(true);
            }
            return new Restriction(false, errorCustom);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    public checkEmail(): Function {
        return function (value: string): Restriction {
            if (/^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z_-]+)$/.test(value)) {
                return new Restriction(true);
            }
            return new Restriction(false, this.i18n.t("restriction.default.checkEmail").toString());
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    public checkPhone(): Function {
        return function (value: string): Restriction {
            if (/^(8|\+7)[\d]{10}$/.test(value)) {
                return new Restriction(true);
            }
            return new Restriction(false, this.i18n.t("restriction.default.checkPhone").toString());
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    public checkDate(from?: string, to?: string,fieldName? : string,errorCustom? : string): Function {
        const field = fieldName ? fieldName : this.i18n.t("restriction.default.checkDate.field")
        return function (value: string): Restriction {
            let fromDate: number | null = null;
            let toDate: number | null = null;
            if (from) {
                fromDate = Date.parse(from);
            }
            if (to) {
                toDate = Date.parse(to);
            }
            if (!fromDate && !toDate) {
                return new Restriction(true);
            } else {
                const date = Date.parse(value);
                if (fromDate && toDate) {
                    if ((fromDate < date) && (date < toDate)) {
                        return new Restriction(true);
                    } else {
                        const error = errorCustom ? errorCustom : field +
                            this.i18n.t("restriction.default.checkDate.between").toString() +
                            new Date(fromDate).toLocaleDateString() +
                            this.i18n.t("restriction.default.checkDate.to").toString() +
                            new Date(toDate).toLocaleDateString();
                        return new Restriction(false, error )
                    }
                } else {
                    if (fromDate) {
                        if (fromDate < date) {
                            return new Restriction(true);
                        } else {
                            const error = errorCustom ? errorCustom : field +
                                this.i18n.t("restriction.default.checkDate.later").toString() +
                                new Date(fromDate).toLocaleDateString();
                            return new Restriction(false, error);
                        }
                    } else {
                        if (toDate) {
                            if (date < toDate) {
                                return new Restriction(true);
                            } else {
                                const error = errorCustom ? errorCustom : field +
                                    this.i18n.t("restriction.default.checkDate.noLater").toString() +
                                    new Date(toDate).toLocaleDateString();
                                return new Restriction(false, error);
                            }
                        }
                    }
                }
            }
            return new Restriction(true);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    public checkArrayCount(countMin?: number, countMax?: number): Function {
        return function (value: Object): Restriction {
            if (value instanceof Array) {
                if (countMin && countMax) {
                    if (countMin <= value.length && value.length <= countMax) {
                        return new Restriction(true);
                    } else {
                        if (countMin > value.length) {
                            return new Restriction(false, this.i18n.t("restriction.default.checkArrayCount.min",
                                {countMin:countMin}).toString());
                        } else {
                            return new Restriction(false, this.i18n.t("restriction.default.checkArrayCount.max",
                                {countMax:countMax}).toString());
                        }
                    }

                } else {
                    if (countMin) {
                        if (countMin > value.length) {
                            return new Restriction(false, this.i18n.t("restriction.default.checkArrayCount.min",
                                {countMin:countMin}).toString());
                        } else {
                            return new Restriction(true);
                        }
                    }
                    if (countMax) {
                        if (value.length > countMax) {
                            return new Restriction(false, this.i18n.t("restriction.default.checkArrayCount.min",
                                {countMin:countMin}).toString());
                        } else {
                            return new Restriction(true);
                        }
                    }
                }
                return new Restriction(true);
            } else {
                return new Restriction(true);
            }

        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    public checkSchedule(): Function {
        return function (value: Schedule): Restriction {
            if(value.work){
                const day = <string>this.i18n.t("enums.dayOfWeek."+value.dayOfWeek)
                if(value.clockFrom && value.clockTo){
                    if(value.clockFrom > value.clockTo){
                        return new Restriction(false, this.i18n.t("restriction.default.checkSchedule.interval",
                            {dayOfWeek:day}).toString())
                    }
                    else {
                        return new Restriction(true);
                    }
                }
                else {
                    if(!value.clockFrom){
                        return new Restriction(false, this.i18n.t("restriction.default.checkSchedule.start",
                            {dayOfWeek:day}).toString())
                    }
                    if(!value.clockTo){
                        return new Restriction(false, this.i18n.t("restriction.default.checkSchedule.end",
                            {dayOfWeek:day}).toString())
                    }
                }
            }
            return new Restriction(true);
        }
    }

    public checkError(component): PageError {
        const result : Array<Restriction> = this.findRestriction(component);
        return new PageError(result);
    }

    private findRestriction(component) : Array<Restriction> {
        const result : Array<Restriction> = new Array<Restriction>();
        const listKey = Object.keys(component.$refs);
        listKey.forEach(key => {
            const item = component.$refs[key]
            console.error(item instanceof CheckComponent)
            if(typeof item.check  === 'function'){
                item.check().forEach(restriction => {
                    if(!restriction.valid){
                        result.push(restriction);
                    }
                })
            }
            this.findRestriction(item).forEach(restriction => {
                result.push(restriction);
            })
        })
        return result;
    }

}

class PageError implements Errors {
    private _count: number
    private _errors: Array<Restriction>
    private _hasError: boolean

    constructor(errors: Array<Restriction>) {
        this._count = errors.length;
        this._errors = errors;
        this._hasError = errors.length > 0;
    }


    get count(): number {
        return this._count;
    }

    get errors(): Array<Restriction> {
        return this._errors;
    }

    get hasError(): boolean {
        return this._hasError;
    }

    get messages(): Array<string> {
        return this.errors.map<string>(item => {
            if(item.error){
                return item.error;
            }
            else {
                return '';
            }
        })
    }

}