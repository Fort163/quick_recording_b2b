import {Smart} from "@/models/main";
import {GeocoderResult} from "@/structure/map/ymapsModel";


export interface Company extends Smart {
    name : string | null
    activities : Array<Activity>
    schedules : Array<Schedule>
    geoPosition : GeocoderResult | null
}

export interface Schedule extends Smart {
    dayOfWeek : string,
    clockFrom : string,
    clockTo : string,
    work : boolean
}

export class NewSchedule implements Schedule{
    uuid = null
    clockFrom : string = '';
    clockTo : string = '';
    work : boolean = false;
    dayOfWeek: string;
    isActive: boolean = true;
    createdBy: string | undefined;
    createdWhen: string | undefined;
    updatedBy: string | undefined;
    updatedWhen: string | undefined;
    constructor(dayOfWeek: string) {
        this.dayOfWeek = dayOfWeek;
    }

}

export interface Activity extends Smart{
    name: string
    description: string
    isActive: boolean
}