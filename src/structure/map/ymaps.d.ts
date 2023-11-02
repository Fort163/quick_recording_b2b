declare namespace ymaps {
    /*https://www.npmjs.com/package/@types/yandex-maps*/
    export function geocode(request: string, options?: { boundedBy?: number[][], results?: number, skip?: number, strictBounds?: boolean }): Promise<any>;


}
