import Vue from 'vue'
import Component from "vue-class-component";
import Button from "@/components/button/Button.vue";
import {Inject, Prop, Watch} from "vue-property-decorator";
import {Combo, ComboItem, Restriction} from "@/store/model";
import {ApiB2B} from "@/api/api";

@Component({
    components: {
        Button
    }
})
export default class ComboBox extends Vue {

    /*
        Не реализован
     */
    @Prop() private color: String | undefined;
    /*
        Не реализован
     */
    @Prop() private backColor: String | undefined;
    /*
        Не реализован
     */
    @Prop() private width: String | undefined;
    /*
        Не реализован
     */
    @Prop() private height: String | undefined;
    /*
        Значение в placeholder
     */
    @Prop() private label: String | undefined;
    /*
        Запрос на сервер выполняется при постройке элемента
        и при каждом изменении параметра если установлен параметр : needQuery = true
     */
    @Prop() private request: RequestCombo | undefined;
    /*
        Отключение контроллеров элемента
     */
    @Prop() private disabled: boolean | undefined;
    /*
        Ограничения срабатывают при выборе значения
     */
    @Prop() private restrictions: Array<Function> | undefined
    /*
        Массив статических эелементов
     */
    @Prop() private values: Array<Object> | undefined;
    /*
        Проставляется автоматически параметром v-model
     */
    @Prop() private value: Object | Array<Object> | undefined;
    /*
        Включение поисковой строки
     */
    @Prop() private searchOn: boolean | undefined;
    @Inject('api') api: ApiB2B | undefined;
    @Watch('request')
    private onPropertyChanged(value: RequestCombo | undefined, oldValue: RequestCombo | undefined) {
        if (value) {
            if (oldValue) {
                if (JSON.stringify(oldValue) !== JSON.stringify(value)) {
                    this.sendRequest(value);
                    this.store = new Array<Object>()
                    if (this.currentValue instanceof Array) {
                        this.currentValue = new Array<Object>()
                    } else {
                        this.currentValue = null
                    }
                }
            } else {
                this.sendRequest(value);
            }
        } else {
            this.store = new Array<Combo>()
            if (this.currentValue instanceof Array) {
                this.currentValue = new Array<Combo>()
            } else {
                this.currentValue = null
            }
        }
    }

//top: -350px
    private openStore: boolean = false;
    private focus: boolean = false;
    private inStore: boolean = false;
    private show: boolean = false;
    private multi: boolean = false;
    private search: string = '';
    private currentValue: Object | Array<Object> | null = null;
    private store: Array<Object> = new Array<Object>();
    private errors: Array<Restriction> = new Array<Restriction>();

    created() {
        if (this.value) {
            this.currentValue = this.value
            if (this.value instanceof Array) {
                this.multi = true;
            } else {
                this.multi = false;
            }
        }
        if (this.values) {
            this.values.forEach(item => {
                this.store.push(item);
            })
        }

        if (this.request) {
            this.sendRequest(this.request)
        }
    }


    public changeFocus(value: boolean) {
        this.search = ''
        this.focus = value
        if (this.openStore) {
            this.changeOpenStore();
        }
    }

    public clearCurrentValue(value: Combo) {
        if (this.multi) {
            const index = (<Array<Combo>>this.currentValue).indexOf(value);
            (<Array<Combo>>this.currentValue).splice(index, 1);
            this.openStore = true
        } else {
            this.currentValue = null
            this.openStore = false
        }
        this.submit()
    }

    public filterStore(): Array<Object> {
        if (this.request?.needQuery) {
            return this.store.filter((item : any) => {
                if (this.currentValue) {
                    if (this.multi) {
                        return !(<Array<Object>>this.currentValue).map((value : any) => value[this.key]).includes(item[this.key]) && (this.search === '' || item[this.val].toUpperCase().includes(this.search.toUpperCase()))
                    } else {
                        return ((<any>this.currentValue)[this.key] !== item[this.key]) && (this.search === '' || item[this.val].toUpperCase().includes(this.search.toUpperCase()))
                    }
                } else {
                    return (this.search === '' || item[this.val].toUpperCase().includes(this.search.toUpperCase()))
                }
            });
        } else {
            return this.store.filter((item : any) => {
                if (this.currentValue) {
                    if (this.multi) {
                        return !(<Array<Object>>this.currentValue).map((value : any) => value[this.key]).includes(item[this.key]) && (this.search === '' || item[this.val].toUpperCase().includes(this.search.toUpperCase()))
                    } else {
                        return ((<any>this.currentValue)[this.key] !== item[this.key]) && (this.search === '' || item[this.val].toUpperCase().includes(this.search.toUpperCase()))
                    }
                } else {
                    return (this.search === '' || item[this.val].toUpperCase().includes(this.search.toUpperCase()))
                }

            });
        }
    }

    public mouseLeaveComponent() {
        setTimeout(() => {
            if (this.openStore) {
                this.changeOpenStore()
            }
        }, 500)
    }

    public changeOpenStore() {
        if (this.focus) {
            this.openStore = true;
        } else {
            if (!this.inStore) {
                this.openStore = !this.openStore;
            }
        }
    }

    public select(item: Combo | null): void {
        if (this.multi) {
            if (item) {
                (<Array<Combo>>this.currentValue).push(item);
            }
        } else {
            this.currentValue = item;
        }
        this.openStore = false
        this.submit()
    }

    public searchRequest() {
        if(this.search.length > 2) {
            if (this.request && this.request.needQuery) {
                this.sendRequest(this.request)
            }
        }
    }

    private submit() {
        setTimeout(() => {
            this.errors = new Array<Restriction>()
            this.restrictions?.forEach(func => {
                const rest: Restriction = func.call(this.currentValue, this.currentValue);
                if (!rest.valid) {
                    this.errors.push(rest);
                }
            })
            this.$emit('input', this.currentValue);
        }, 50)
    }

    private sendRequest(request: RequestCombo) {
        let responsePromise: Promise<any> | undefined;
        switch (request.method) {
            case "GET" : {
                if (request.needQuery && request.paramQuery) {
                    const param = this.createQueryParam<URLSearchParams>(request);
                    responsePromise = this.api?.getApi<any>(request.uri, param)
                } else {
                    responsePromise = this.api?.getApi<any>(request.uri)
                }
                break;
            }
            case "POST" : {
                if (request.param) {
                    const param = this.createQueryParam<any>(request);
                    responsePromise = this.api?.postApi<any>(request.uri, param)
                } else {
                    responsePromise = this.api?.postApi<any>(request.uri)
                }
                break;
            }
            case "PUT" : {
                if (request.param) {
                    const param = this.createQueryParam<FormData>(request);
                    responsePromise = this.api?.putApi<any>(request.uri, param)
                } else {
                    responsePromise = this.api?.putApi<any>(request.uri)
                }
                break;
            }
            case "PATCH" : {
                if (request.param) {
                    const param = this.createQueryParam<FormData>(request);
                    responsePromise = this.api?.patchApi<any>(request.uri, param)
                } else {
                    responsePromise = this.api?.patchApi<any>(request.uri)
                }
                break;
            }
        }
        if (responsePromise) {
            this.handleResponse(request, responsePromise)
        }

    }

    private handleResponse(request: RequestCombo, promise: Promise<any>): void {
        promise.then(response => {
            if (response instanceof Array) {
                this.store = new Array<Combo>();
                response.forEach(item => {
                    this.store.push(item);
                    //this.openStore = true
                })
            }
            else {
                if(response.content && response.content instanceof Array){
                    this.store = new Array<Combo>();
                    response.content.forEach((item : any)=> {
                        this.store.push(item);
                        //this.openStore = true
                    })
                }
            }
        })
    }

    get key() : string{
        if(this.request){
            return this.request.key
        }
        else {
            return 'key'
        }
    }

    get val() : string{
        if(this.request){
            return this.request.value
        }
        else {
            return 'value'
        }
    }

    private createQueryParam<T>(request: RequestCombo): T {
        let result = request.param
        if (result && request.paramQuery) {
            if (result instanceof URLSearchParams) {
                result.append(request.paramQuery, this.search);
            } else {
                result[request.paramQuery] = this.search;
            }
        } else {
            if (request.method === 'GET') {
                result = new URLSearchParams()
                if (request.paramQuery) {
                    result.append(request.paramQuery, this.search);
                }
            } else {
                result = new Object()
                if (request.paramQuery) {
                    result[request.paramQuery] = this.search;
                }
            }
        }
        return <T>result;
    }

}

export class RequestCombo {
    /*
        Uri запроса к серверу
     */
    private _uri: string;
    /*
        Метод GET, POST, PATCH, PUT
     */
    private _method: String;
    /*
        Параметры для запроса для метода GET необходим объект URLSearchParams
        для остальных любой объект Json
     */
    private _param: URLSearchParams | any | null
    /*
       Включает запросы на сервер при изменении поиска или изменении объекта RequestCombo
     */
    private _needQuery: boolean
    /*
        Параметр в запросе для значения поисковой строки
     */
    private _paramQuery: string | undefined
    /*
        Параметр из response которое будет установлено как значение для отображения
     */
    private _value: string
    /*
        Параметр из response которое будет установлено как ключ
     */
    private _key: string

    get uri(): string {
        return this._uri;
    }

    get method(): String {
        return this._method;
    }

    get param(): URLSearchParams | any | null {
        return this._param;
    }

    get needQuery(): boolean {
        return this._needQuery;
    }

    get paramQuery(): string | undefined {
        return this._paramQuery;
    }

    get value(): string {
        return this._value;
    }

    get key(): string {
        return this._key;
    }


    constructor(uri: string, method: String, param: URLSearchParams | any | null, value: string, key: string, needQuery?: boolean, paramQuery?: string) {
        this._uri = uri;
        this._method = method;
        this._param = param;
        if (!needQuery) {
            this._needQuery = false;
        } else {
            this._needQuery = needQuery;
        }
        this._paramQuery = paramQuery;
        this._key = key
        this._value = value
    }
}