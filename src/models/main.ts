import {MaskModel} from "@/models/modal";
import {Company} from "@/models/company-service";
import {NotificationMessage} from "@/models/notification-service";

export interface State{
    currentPath : string
    createCompany : Company | null
    myCompany : Company | null
    mapInfo : MapInfo
    mask : MaskModel
    locale : LocaleItem
    notifications: Array<NotificationMessage>
}

export interface Base{
    uuid : string | null
}

export interface Audit extends Base{
    createdBy : string | undefined
    createdWhen : string | undefined
    updatedBy : string | undefined
    updatedWhen : string | undefined
}

export interface Smart extends Audit{
    isActive: boolean
}

export interface MapInfo{
    settings : MapSettings,
    coords : GeolocationCoordinates | null
}

export interface MapSettings{
    apiKey: string,
    lang: string,
    coordorder: string,
    version: string
}

export enum TemplateEnum{
    REGISTRATION = "REGISTRATION",
    QR_B2B_CODE = "QR_B2B_CODE",
    QR_B2B_NOTIFICATION = "QR_B2B_NOTIFICATION"
}

export enum Result{
    SUCCESS = "SUCCESS",
    ERROR = "ERROR"
}

export enum DayOfWeek{
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
}

export class LocaleItem {
    /*
        Ссылка на картинку флага
     */
    public imageName: string
    /*
        Строка локали
     */
    public locale: string
    /*
        Строка локали для cookie
     */
    public localeCookie: string
    /*
        Строка локали для карт яндекс
     */
    public localeForMap: string

    constructor(imageName : string, locale : string, localeCookie : string, localeForMap: string) {
        this.imageName = imageName
        this.locale = locale
        this.localeCookie = localeCookie
        this.localeForMap = localeForMap
    }
}