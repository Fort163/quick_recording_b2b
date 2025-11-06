import {Base, Smart} from "@/models/main";
import {Geocoder} from "@/structure/map/ymapsModel";


export interface Company extends Smart {
    name: string | null;
    description: string | null;
    geoPosition: Geocoder | null;
    schedules: Array<Schedule> | null;
    activities: Array<Activity> | null;
    services: Array<Service> | null;
}

export interface Schedule extends Smart {
    dayOfWeek: string;
    clockFrom: string;
    clockTo: string;
    work: boolean;
    company: Base | null;
    employee: Base | null;

}

export class NewSchedule implements Schedule {
    uuid = null
    clockFrom: string = '';
    clockTo: string = '';
    work: boolean = false;
    dayOfWeek: string;
    isActive: boolean = true;
    createdBy: string | undefined;
    createdWhen: string | undefined;
    updatedBy: string | undefined;
    updatedWhen: string | undefined;
    company = null;
    employee = null;

    constructor(dayOfWeek: string) {
        this.dayOfWeek = dayOfWeek;
    }

}

export interface Activity extends Smart {
    name: string;
    description: string;
}

export interface Profession extends Smart {
    name: string;
    description: string | null;
    company: Base | null;
    services: Array<Base> | null;
}

export interface Service extends Smart {
    name: string;
    workClock: string;
    countPartTime: Number | null;
    company: Base | null;
    employee: Base | null;
}

export interface Employee extends Smart {
    authId: string;
    profession: Profession | null;
    company: Base | null;
    permissions: Array<CompanyHierarchy> | null;
    services: Array<Base> | null;
}

export enum CompanyHierarchy {
    owner,
    manager,
    worker,
    assistant
}