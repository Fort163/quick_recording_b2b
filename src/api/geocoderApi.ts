import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {Geocoder, GeocoderObject} from "@/structure/map/ymapsModel";

export default class GeocoderApi {

    private apiKey: string = import.meta.env.VITE_YANDEX_MAP_API_KEY
    private api: AxiosInstance = axios.create({
        baseURL: 'https://geocode-maps.yandex.ru/v1'
    })

    public geocode(geocodeObject: string | Array<number>,
                   target: Array<Kind>,
                   lang: string = 'ru_RU',
                   kind: Kind | null = null,
                   rspn: boolean = false,
                   ll: Array<number> | null = null,
                   spn: Array<number> | null = null,
                   bbox: Array<number> | null = null,
                   results: number = 10,
                   skip: number = 0,
                   uri: string | null = null,
                   format: string = 'json',
    ): Promise<Geocoder> {
        const requestParams = new URLSearchParams({
            apikey: this.apiKey,
            geocode: geocodeObject,
            results: results,
            skip: skip,
            format: format
        });
        if (kind) {
            requestParams.append('kind', kind);
        }
        if (uri) {
            requestParams.append('uri', uri);
        }
        if (rspn) {
            requestParams.append('rspn', rspn);
            if (ll) {
                requestParams.append('ll', ll);
            }
            if (spn) {
                requestParams.append('spn', spn);
            }
            if (bbox) {
                requestParams.append('rspn', bbox);
            }
        }
        return new Promise<Geocoder | null>(((resolve, reject) => {
            this.api.get('?' + requestParams).then((value: AxiosResponse<ResultResponse>) => {
                    const collection: CollectionResult = value.data.response
                    resolve(this.convertGeoObjectCollection(collection, target))
                }
            ).catch(reason => reject(reason))
        }))
    }

    private convertGeoObjectCollection(collection: CollectionResult, target: Array<Kind>): Geocoder {
        let result = null;
        collection.GeoObjectCollection.featureMember.forEach(object => {
            console.error(object.GeoObject.metaDataProperty.GeocoderMetaData.kind);
            if (object.GeoObject.metaDataProperty.GeocoderMetaData.kind === target) {
                result = this.convertGeoObject(object);
            }
        })
        return result;
    }

    private convertGeoObject(object: GeoObject): Geocoder {
        const posArray = object.GeoObject.Point.pos.split(' ')
        return {
            geoObjects: object.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components,
            company: null,
            longitude: posArray[0],
            latitude: posArray[1],
            name: object.GeoObject.metaDataProperty.GeocoderMetaData.text
        };
    }

}

interface ResultResponse {
    response: CollectionResult
}

interface CollectionResult {
    GeoObjectCollection: {
        featureMember: Array<GeoObject>
    }

}

interface GeoObject {
    GeoObject: {
        Point: {
            pos: string
        }
        metaDataProperty: GeocoderMetaData
    }
}

interface GeocoderMetaData {
    GeocoderMetaData: {
        kind: Kind
        text: string
        Address: Address
    }

}

interface Address {
    Components: Array<GeocoderObject>
    country_code: string
    formatted: string
    postal_code: string
}

export enum Kind {
    house = 'house',
    street = 'street',
    metro = 'metro',
    district = 'district',
    locality = 'locality',
    province = 'province',
    country = 'country',
    hydronym = 'hydronym',
    road = 'road',
    railway = 'railway',
    poi = 'poi',
    vegetation = 'vegetation',
    mountain = 'mountain',
    border = 'border'
}