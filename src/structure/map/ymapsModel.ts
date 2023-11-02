export class GeocoderResultDefault implements GeocoderResult{
    geoObjects:Array<GeocoderObject>
    longitude : number
    latitude : number
    metaData:MetaData
    name:string
    constructor(response : any,coords : [number,number]) {
        this.geoObjects = <Array<GeocoderObject>>response.geoObjects.get(0).properties._data.metaDataProperty.GeocoderMetaData.Address.Components;
        this.longitude = <number>coords.pop();
        this.latitude = <number>coords.pop();
        this.metaData = response.metaData;
        this.name = new String(response.geoObjects.get(0).properties._data.text).toString();
    }
}

export interface GeocoderResult{
    geoObjects:Array<GeocoderObject>
    longitude : number
    latitude : number
    metaData:MetaData
    name:string
}

export interface GeocoderObject{
    kind : string;
    name : string;
}

export interface MetaData{
    geocoder : Geocoder
}

export interface Geocoder{
    request :string,
    found : number,
    results : number,
    skip : number,
    suggest : any
}