
export class DateUtil{

    public dateMinusYear(year : number) : Date {
        return new Date(new Date().setFullYear(new Date().getFullYear() - year))
    }

    public datePlusYear(year : number) : Date {
        return new Date(new Date().setFullYear(new Date().getFullYear() + year))
    }

}