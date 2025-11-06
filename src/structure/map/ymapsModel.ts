import {Base, Smart} from "@/models/main";

export class GeocoderDefault implements Geocoder {
    uuid: string | null;
    createdBy: string | undefined;
    createdWhen: string | undefined;
    updatedBy: string | undefined;
    updatedWhen: string | undefined;
    isActive: boolean;
    name: string;
    longitude: number;
    latitude: number;
    metaData: MetaData;
    geoObjects: Array<GeocoderObject>;
    company: Base | null;

    constructor(response: any, coords: [number, number]) {
        this.uuid = null;
        this.isActive = true;
        this.geoObjects = <Array<GeocoderObject>>response.geoObjects.get(0).properties._data.metaDataProperty.GeocoderMetaData.Address.Components;
        this.longitude = <number>coords.pop();
        this.latitude = <number>coords.pop();
        this.metaData = response.metaData;
        this.name = new String(response.geoObjects.get(0).properties._data.text).toString();
        this.company = null;
    }
}

export interface Geocoder extends Smart {
    geoObjects: Array<GeocoderObject>
    company: Base | null
    longitude: number
    latitude: number
    metaData: MetaData
    name: string
}

export interface GeocoderObject extends Base {
    kind: string;
    name: string;
}

export interface MetaData {
    geocoder: GeocoderRequest
}

export interface GeocoderRequest {
    request: string,
    found: number,
    results: number,
    skip: number,
    suggest: any
}