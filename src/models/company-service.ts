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
    description: string;
    company: Base;
    services: Array<Base> | null;
}

export interface Service extends Smart {
    name: string;
    workClock: string;
    countPartTime: Number | null;
    company: Base;
    employee: Base | null;
}

export interface Employee extends Smart {
    authId: string;
    profession: Profession;
    company: Base;
    permissions: Array<CompanyHierarchy>;
    services: Array<Base> | null;
}

export enum CompanyHierarchy {
    owner = "OWNER",
    manager = "MANAGER",
    worker = "WORKER",
    assistant = "ASSISTANT"
}

export class SimpleService implements Service{
    company: Base;
    countPartTime: Number | null = null;
    createdBy: string | undefined;
    createdWhen: string | undefined;
    employee: Base | null;
    isActive: boolean;
    name: string;
    updatedBy: string | undefined;
    updatedWhen: string | undefined;
    uuid: string | null;
    workClock: string;


    constructor(company: Base, name: string, workClock: string,
                isActive: boolean = true, employee: Base | null = null, uuid: string | null = null) {
        this.company = company;
        this.employee = employee;
        this.isActive = isActive;
        this.name = name;
        this.uuid = uuid;
        this.workClock = workClock;
    }
}

export class SimpleProfession implements Profession{
    name: string;
    description: string;
    isActive: boolean;
    company: Base;
    services: Array<Base> | null;
    uuid: string | null;
    createdBy: string | undefined;
    createdWhen: string | undefined;
    updatedBy: string | undefined;
    updatedWhen: string | undefined;


    constructor(name: string, description: string, company: Base, isActive: boolean = true,
                services: Array<Base> | null = null, uuid: string | null = null) {
        this.name = name;
        this.description = description;
        this.isActive = isActive;
        this.company = company;
        this.services = services;
        this.uuid = uuid;
    }
}

export class SimpleEmployee implements Employee{
    authId: string;
    company: Base;
    isActive: boolean;
    permissions: Array<CompanyHierarchy>;
    profession: Profession;
    services: Array<Base> | null;
    uuid: string | null;
    createdBy: string | undefined;
    createdWhen: string | undefined;
    updatedBy: string | undefined;
    updatedWhen: string | undefined;

    constructor(authId: string, company: Base, profession: Profession, permissions: Array<CompanyHierarchy>,
                services: Array<Base> | null = null, isActive: boolean = true, uuid: string | null = null) {
        this.authId = authId;
        this.company = company;
        this.isActive = isActive;
        this.permissions = permissions;
        this.profession = profession;
        this.services = services;
        this.uuid = uuid;
    }
}