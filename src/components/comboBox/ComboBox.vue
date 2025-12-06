<template>
  <div :class="['main-combo', disabled ? 'main-combo-disabled' : '', this.errors.length > 0 ? 'errors-input' : '' ]"
       :errors="errors.map(item => item.error).toString().replaceAll(',',' ; ')"
       @mouseleave="mouseLeaveComponent()">
    <div :class="['combo-display' , disabled ? 'combo-display-disabled' : '']"
         @dblclick="openStore = true" @click="(!multi) ? openStore = true : openStore=true">
      <label v-if="showLabel" :class="['combo-label']">{{label}}</label>
      <input v-if="showSearch" type="search" :class="'combo-search'" :placeholder="this.$t('label.search')" autofocus v-model="search"
             @click="searchRequest()"
             @change="searchRequest()"
             @keyup="searchRequest()"
             @focusin="openStore = true" @focusout="openStore = false">
      <template v-if="hasValue && showItemValue">
        <transition-group v-for="item in this.value" :key="item[key]" :class="'combo-multi'" name="combo-value" tag="div" @click="(multi) ? openStore = true : openStore=openStore">
            <div :key="item[key]" :class="'combo-item'" :title="item[val]">
              <label :class="'combo-label-item'">{{ item[val] }}</label>
              <div style="width: 1%">
                <CustomButton :image="'close.png'" :size="'15px'" :backgroundSize="'100%'" :class="'combo-item-close'" @click="clearValue(item)"/>
              </div>
            </div>
        </transition-group>
      </template>
      <template v-else>
        <div v-if="hasValue && showItemValue" :class="'combo-item'" :title="this.value[val]">
          <label :class="'combo-label-item'">{{ value[val] }}</label>
          <div style="width: 1%">
            <CustomButton :image="'close.png'" :size="'15px'" :backgroundSize="'100%'" :class="'combo-item-close'" @click="clearValue(value)"/>
          </div>
        </div>
      </template>
    </div>
    <transition name="combo-store-animation">
      <div v-if="openStore" :class="'combo-store-position'" @mouseleave="changeOpenStore()">
        <div :class="'combo-store-size'" @mouseleave="inStore = false" @mousemove="inStore = true">
          <div :class="'combo-store'">
            <template v-for="item in filterStore()" :key="item[key]" >
              <div :class="'combo-store-item'" @click="select(item)" :title="item[val]">{{ item[val] }}</div>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script lang="ts">
import {Component, Emit, Inject, Prop, Watch} from "vue-facing-decorator";
import {ApiB2B} from "@/api/api";
import {CheckComponent} from "@/store/component";
import {Combo} from "@/models/component";

@Component({
  components: {
  }
})
export default class ComboBox extends CheckComponent {

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
      Массив статических эелементов
   */
  @Prop() private values: Array<Object> | undefined;
  /*
      Параметр v-model
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
          if (this.value instanceof Array) {
            this.value = new Array<Object>()
          } else {
            this.value = null
          }
        }
      } else {
        this.sendRequest(value);
      }
    } else {
      this.store = new Array<Combo>()
      if (this.value instanceof Array) {
        this.value = new Array<Combo>()
      } else {
        this.value = null
      }
    }
  }

//top: -350px
  private isRequestSended = false;
  private openStore: boolean = false;
  private focus: boolean = false;
  private inStore: boolean = false;
  private show: boolean = false;
  private multi: boolean = false;
  private search: string = '';
  private store: Array<Object> = new Array<Object>();

  created() {
    if (this.value) {
      this.multi = this.value instanceof Array;
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

  public clearValue(value: Combo) {
    if (this.multi) {
      const index = (<Array<Combo>>this.value).indexOf(value);
      (<Array<Combo>>this.value).splice(index, 1);
      this.openStore = true
    } else {
      this.value = null
      this.openStore = false
    }
    this.submit()
  }

  public filterStore(): Array<Object> {
    if (this.request?.needQuery) {
      return this.store.filter((item : Object) => {
        if (this.value) {
          if (this.multi) {
            return !(<Array<Object>>this.value).map((value : Object) => value[this.key]).includes(item[this.key]) && (this.search === '' || item[this.val].toUpperCase().includes(this.search.toUpperCase()))
          } else {
            return ((<Object>this.value)[this.key] !== item[this.key]) && (this.search === '' || item[this.val].toUpperCase().includes(this.search.toUpperCase()))
          }
        } else {
          return (this.search === '' || item[this.val].toUpperCase().includes(this.search.toUpperCase()))
        }
      });
    } else {
      return this.store.filter((item : Object) => {
        if (this.value) {
          if (this.multi) {
            return !(<Array<Object>>this.value).map((value : Object) => value[this.key]).includes(item[this.key]) && (this.search === '' || item[this.val].toUpperCase().includes(this.search.toUpperCase()))
          } else {
            return ((<Object>this.value)[this.key] !== item[this.key]) && (this.search === '' || item[this.val].toUpperCase().includes(this.search.toUpperCase()))
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
        (<Array<Combo>>this.value).push(item);
      }
    } else {
      this.value = item;
    }
    this.openStore = false
    this.submit()
  }

  public searchRequest() {
    if(!this.isRequestSended) {
      if (this.request && this.request.needQuery) {
        this.isRequestSended = true;
        this.requestSended()
        this.sendRequest(this.request)
        this.openStore = true
        this.inStore = true
      }
    }
  }

  private requestSended(){
    setTimeout(() => {
      this.isRequestSended = false;
    }, 500)
  }

  @Emit('input')
  private submit() {
    setTimeout(() => {
      super.check();
      return this.value;
    }, 50)
  }

  private sendRequest(request: RequestCombo) {
    let responsePromise: Promise<Object> | undefined;
    switch (request.method) {
      case "GET" : {
        if (request.needQuery && request.paramQuery) {
          const param = this.createQueryParam<URLSearchParams>(request);
          responsePromise = this.api?.getApi<Object>(request.uri, param, true)
        } else {
          responsePromise = this.api?.getApi<Object>(request.uri, undefined, true)
        }
        break;
      }
      case "POST" : {
        if (request.param) {
          const param = this.createQueryParam<Object>(request);
          responsePromise = this.api?.postApi<Object>(request.uri, param, true)
        } else {
          responsePromise = this.api?.postApi<Object>(request.uri, undefined, true)
        }
        break;
      }
      case "PUT" : {
        if (request.param) {
          const param = this.createQueryParam<FormData>(request);
          responsePromise = this.api?.putApi<Object>(request.uri, param, true)
        } else {
          responsePromise = this.api?.putApi<Object>(request.uri, undefined, true)
        }
        break;
      }
      case "PATCH" : {
        if (request.param) {
          const param = this.createQueryParam<FormData>(request);
          responsePromise = this.api?.patchApi<Object>(request.uri, param, true)
        } else {
          responsePromise = this.api?.patchApi<Object>(request.uri, undefined, true)
        }
        break;
      }
    }
    if (responsePromise) {
      this.handleResponse(request, responsePromise)
    }

  }

  private handleResponse(request: RequestCombo, promise: Promise<Object>): void {
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
          response.content.forEach((item : Object)=> {
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

  getValue(): Object {
    return this.value;
  }

  get hasValue() : boolean{
    if(this.multi){
      return this.multi && this.value && this.value.length > 0
    }
    else {
      return this.value && !this.multi
    }
  }

  get showItemValue() : boolean | undefined {
    return this.searchOn && !this.openStore || !this.searchOn
  }

  get showSearch() : boolean | undefined{
    return this.openStore && this.searchOn && !this.disabled
  }

  get showLabel() : boolean | undefined {
    if(this.showSearch){
      return false;
    }
    if(this.multi){
      return this.label && !this.openStore && this.value?.length === 0
    }
    else {
      return this.label && !this.value
    }
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
  private _param: URLSearchParams | Object | null
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

  get param(): URLSearchParams | Object | null {
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


  constructor(uri: string, method: String, param: URLSearchParams | Object | null, value: string, key: string, needQuery?: boolean, paramQuery?: string) {
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
</script>
<style src="./comboBox.css"></style>
