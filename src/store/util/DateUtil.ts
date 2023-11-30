
export class DateUtil{

    public static SERVER_FORMAT = 'dd.MM.yyyy'
    public static WEB_FORMAT = 'yyyy-MM-dd'

    public dateMinusYear(year : number) : Date {
        return new Date(new Date().setFullYear(new Date().getFullYear() - year))
    }

    public datePlusYear(year : number) : Date {
        return new Date(new Date().setFullYear(new Date().getFullYear() + year))
    }

    public dateParse(date : string,format : string) : Date | null{
        if(date.length === 10 && format.length === 10) {
            if (format.includes("yyyy") && format.includes("MM") && format.includes("dd")) {
                const year = Number(date.substr(format.indexOf('yyyy'), 4))
                const month = Number(date.substr(format.indexOf('MM'), 2))-1
                const day = Number(date.substr(format.indexOf('dd'), 2))
                return new Date(year,month,day,0,0,0)
            }
        }
        return null;
    }

    public dateFormat(date : Date,format : string) : string {
        if (format.includes("yyyy") && format.includes("MM") && format.includes("dd")) {
            let day = date.getDate()+'';
            let month = date.getMonth()+1+'';
            const year = date.getFullYear()+'';
            day = day.length < 2 ? '0'+day : day
            month = month.length < 2 ? '0'+month : month
            let result = format
            result = result.replace("dd",day)
            result = result.replace("MM",month)
            result = result.replace("yyyy",year)
            return result
        }
        return ""
    }

}