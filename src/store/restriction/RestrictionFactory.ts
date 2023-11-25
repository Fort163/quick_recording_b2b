import {Restriction} from "@/store/model";
import {RequestCombo} from "@/components/comboBox/comboBox";

export class RestrictionFactory {

    public checkNotNull(): Function {
        return function (value: any): Restriction {
            if (value) {
                if (value instanceof Array && value.length === 0) {
                    return new Restriction(false, "Поле обязательно для заполнения");
                }
                return new Restriction(true);
            }
            return new Restriction(false, "Поле обязательно для заполнения");
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

    public checkCharacterRus(): Function {
        return function (value: string): Restriction {
            if (/^[а-яА-ЯёЁ]+$/.test(value)) {
                return new Restriction(true);
            }
            return new Restriction(false, "Возможна только кириллица");
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

    public checkDate(from?: string, to?: string): Function {
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
                        return new Restriction(false, "Дата должна быть в промежутке от " + new Date(fromDate).toLocaleDateString() + ' до ' + new Date(toDate).toLocaleDateString());
                    }
                } else {
                    if (fromDate) {
                        if (fromDate < date) {
                            return new Restriction(true);
                        } else {
                            return new Restriction(false, "Дата должна быть позднее " + new Date(fromDate).toLocaleDateString());
                        }
                    } else {
                        if (toDate) {
                            if (date < toDate) {
                                return new Restriction(true);
                            } else {
                                return new Restriction(false, "Дата должна быть не позднее " + new Date(toDate).toLocaleDateString());
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

    public checkError(): PageError {
        const elementNodeListOf = document.querySelectorAll('[errors]');
        const errors = new Array<string>()
        elementNodeListOf.forEach(item => {
            const atrr: Attr | null = item.getAttributeNode("errors")
            if (atrr) {
                if(atrr.value.length > 0){
                    errors.push(atrr.value)
                }
            }

        })
        return new PageError(errors.length, errors, errors.length !== 0);
    }

}

class PageError {
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