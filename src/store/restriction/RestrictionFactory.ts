import {Errors, Restriction, Schedule} from "@/store/model";
import {RequestCombo} from "@/components/comboBox/comboBox";

export class RestrictionFactory {

    public checkNotNull(fieldName? : string): Function {
        const error = fieldName ? "Поле "+fieldName+" обязательно для заполнения" : 'Поле обязательно для заполнения'
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
                        return new Restriction(false, "Минимальное кол-во символов - " + countMin);
                    } else {
                        return new Restriction(false, "Максимальное кол-во символов - " + countMax);
                    }
                }

            } else {
                if (countMin) {
                    if (countMin > value.length) {
                        return new Restriction(false, "Минимальное кол-во символов - " + countMin);
                    } else {
                        return new Restriction(true);
                    }
                }
                if (countMax) {
                    if (value.length > countMax) {
                        return new Restriction(false, "Минимальное кол-во символов - " + countMin);
                    } else {
                        return new Restriction(true);
                    }
                }
            }
            return new Restriction(true);
        }
    }

    public checkCharacterRus(errorCustom? : string): Function {
        const error = errorCustom ? errorCustom : 'Здесь возможны только русские символы'
        return function (value: string): Restriction {
            if (/^[а-яА-ЯёЁ]+$/.test(value)) {
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
            return new Restriction(false, "Не верный формат почты");
        }
    }

    public checkPhone(): Function {
        return function (value: string): Restriction {
            if (/^(8|\+7)[\d]{10}$/.test(value)) {
                return new Restriction(true);
            }
            return new Restriction(false, "Не верный формат телефона");
        }
    }

    public checkDate(from?: string, to?: string,fieldName? : string,errorCustom? : string): Function {
        const field = fieldName ? fieldName : 'Дата'
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
                        const error = errorCustom ? errorCustom : field + ' должна быть в промежутке от ' + new Date(fromDate).toLocaleDateString() + ' до ' + new Date(toDate).toLocaleDateString();
                        return new Restriction(false, error )
                    }
                } else {
                    if (fromDate) {
                        if (fromDate < date) {
                            return new Restriction(true);
                        } else {
                            const error = errorCustom ? errorCustom : field + ' должна быть позднее ' + new Date(fromDate).toLocaleDateString();
                            return new Restriction(false, error);
                        }
                    } else {
                        if (toDate) {
                            if (date < toDate) {
                                return new Restriction(true);
                            } else {
                                const error = errorCustom ? errorCustom : field + ' должна быть не позднее ' + new Date(toDate).toLocaleDateString();
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
                            return new Restriction(false, "Минимальное кол-во элементов - " + countMin);
                        } else {
                            return new Restriction(false, "Максимальное кол-во элементов - " + countMax);
                        }
                    }

                } else {
                    if (countMin) {
                        if (countMin > value.length) {
                            return new Restriction(false, "Минимальное кол-во элементов - " + countMin);
                        } else {
                            return new Restriction(true);
                        }
                    }
                    if (countMax) {
                        if (value.length > countMax) {
                            return new Restriction(false, "Минимальное кол-во элементов - " + countMin);
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
                        return new Restriction(false, "Неверный интервал времени в " + value.dayOfWeek);
                    }
                    else {
                        return new Restriction(true);
                    }
                }
                else {
                    if(!value.clockFrom){
                        return new Restriction(false, "Заполните время начала рабочего дня в " + value.dayOfWeek);
                    }
                    if(!value.clockTo){
                        return new Restriction(false, "Заполните время окончания рабочего дня в " + value.dayOfWeek);
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