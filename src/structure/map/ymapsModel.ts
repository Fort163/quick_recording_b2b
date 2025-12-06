import {Base, Smart} from "@/models/main";

export interface Geocoder extends Smart {
    geoObjects: Array<GeocoderObject>
    company: Base | null
    longitude: number
    latitude: number
    name: string
}

export interface GeocoderObject extends Base {
    kind: string;
    name: string;
}