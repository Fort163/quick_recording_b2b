import {Errors, Restriction, Schedule} from "@/store/model";
import i18n from "@/locales/i18n";

export class RestrictionFactory {

    public checkNotNull(fieldName? : string): Function {
        const error = fieldName ?
            i18n.t("restriction.default.checkNotNull.withField", {fieldName:fieldName}).toString() :
            i18n.t("restriction.default.checkNotNull.noField").toString()
        return function (value: any): Restriction {
            if (value) {
                if (value instanceof Array && value.length === 0) {
                    return new Restriction(false, error);
                }
                return new Restriction(true);
            }
            return new Restriction(false, error);
        }
    }

    public checkCharacterLength(countMin?: number, countMax?: number): Function {
        return function (value: string): Restriction {
            if (countMin && countMax) {
                if (countMin <= value.length && value.length <= countMax) {
                    return new Restriction(true);
                } else {
                    if (countMin > value.length) {
                        return new Restriction(false, i18n.t("restriction.default.checkCharacterLength.min",
                            {countMin:countMin}).toString());
                    } else {
                        return new Restriction(false, i18n.t("restriction.default.checkCharacterLength.max",
                            {countMax:countMax}).toString());
                    }
                }

            } else {
                if (countMin) {
                    if (countMin > value.length) {
                        return new Restriction(false, i18n.t("restriction.default.checkCharacterLength.min",
                            {countMin:countMin}).toString());
                    } else {
                        return new Restriction(true);
                    }
                }
                if (countMax) {
                    if (value.length > countMax) {
                        return new Restriction(false, i18n.t("restriction.default.checkCharacterLength.min",
                            {countMin:countMin}).toString());
                    } else {
                        return new Restriction(true);
                    }
                }
            }
            return new Restriction(true);
        }
    }

    public checkCharacterLetters(errorCustom? : string): Function {
        const error = errorCustom ? errorCustom : i18n.t("restriction.default.checkCharacterLetters")
        return function (value: string): Restriction {
            if (/^[а-яА-ЯёЁa-zA-Z]+$/.test(value)) {
                return new Restriction(true);
            }
            return new Restriction(false, errorCustom);
        }
    }

    public checkEmail(): Function {
        return function (value: string): Restriction {
            if (/^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z_-]+)$/.test(value)) {
                return new Restriction(true);
            }
            return new Restriction(false, i18n.t("restriction.default.checkEmail").toString());
        }
    }

    public checkPhone(): Function {
        return function (value: string): Restriction {
            if (/^(8|\+7)[\d]{10}$/.test(value)) {
                return new Restriction(true);
            }
            return new Restriction(false, i18n.t("restriction.default.checkPhone").toString());
        }
    }

    public checkDate(from?: string, to?: string,fieldName? : string,errorCustom? : string): Function {
        const field = fieldName ? fieldName : i18n.t("restriction.default.checkDate.field")
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
                            i18n.t("restriction.default.checkDate.between").toString() +
                            new Date(fromDate).toLocaleDateString() +
                            i18n.t("restriction.default.checkDate.to").toString() +
                            new Date(toDate).toLocaleDateString();
                        return new Restriction(false, error )
                    }
                } else {
                    if (fromDate) {
                        if (fromDate < date) {
                            return new Restriction(true);
                        } else {
                            const error = errorCustom ? errorCustom : field +
                                i18n.t("restriction.default.checkDate.later").toString() +
                                new Date(fromDate).toLocaleDateString();
                            return new Restriction(false, error);
                        }
                    } else {
                        if (toDate) {
                            if (date < toDate) {
                                return new Restriction(true);
                            } else {
                                const error = errorCustom ? errorCustom : field +
                                    i18n.t("restriction.default.checkDate.noLater").toString() +
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

    public checkArrayCount(countMin?: number, countMax?: number): Function {
        return function (value: any): Restriction {
            if (value instanceof Array) {
                if (countMin && countMax) {
                    if (countMin <= value.length && value.length <= countMax) {
                        return new Restriction(true);
                    } else {
                        if (countMin > value.length) {
                            return new Restriction(false, i18n.t("restriction.default.checkArrayCount.min",
                                {countMin:countMin}).toString());
                        } else {
                            return new Restriction(false, i18n.t("restriction.default.checkArrayCount.max",
                                {countMax:countMax}).toString());
                        }
                    }

                } else {
                    if (countMin) {
                        if (countMin > value.length) {
                            return new Restriction(false, i18n.t("restriction.default.checkArrayCount.min",
                                {countMin:countMin}).toString());
                        } else {
                            return new Restriction(true);
                        }
                    }
                    if (countMax) {
                        if (value.length > countMax) {
                            return new Restriction(false, i18n.t("restriction.default.checkArrayCount.min",
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

    public checkSchedule(): Function {
        return function (value: Schedule): Restriction {
            if(value.work){
                if(value.clockFrom && value.clockTo){
                    if(value.clockFrom > value.clockTo){
                        return new Restriction(false, i18n.t("restriction.default.checkSchedule.interval",
                            {dayOfWeek:value.dayOfWeek}).toString())
                    }
                    else {
                        return new Restriction(true);
                    }
                }
                else {
                    if(!value.clockFrom){
                        return new Restriction(false, i18n.t("restriction.default.checkSchedule.start",
                            {dayOfWeek:value.dayOfWeek}).toString())
                    }
                    if(!value.clockTo){
                        return new Restriction(false, i18n.t("restriction.default.checkSchedule.end",
                            {dayOfWeek:value.dayOfWeek}).toString())
                    }
                }
            }
            return new Restriction(true);
        }
    }

    public checkError(): PageError {
        const elementNodeListOf = document.querySelectorAll('[errors]');
        const errors = new Array<string>()
        elementNodeListOf.forEach(item => {
            if(item.tagName !== 'BUTTON') {
                const atrr: Attr | null = item.getAttributeNode("errors")
                if (atrr) {
                    if (atrr.value.length > 0) {
                        errors.push(atrr.value)
                    }
                }
            }
        })
        return new PageError(errors.length, errors, errors.length !== 0);
    }

}

class PageError implements Errors{
    private _count: number
    private _errors: Array<string>
    private _hasError: boolean

    constructor(count: number, errors: Array<string>, hasError: boolean) {
        this._count = count;
        this._errors = errors;
        this._hasError = hasError;
    }


    get count(): number {
        return this._count;
    }

    get errors(): Array<string> {
        return this._errors;
    }

    get hasError(): boolean {
        return this._hasError;
    }
}