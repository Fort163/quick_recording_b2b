import {AuthProvider} from "@/auth/AuthProvider";
import i18n from "@/i18n";
import uniqIdPlugin from "@/uniqId";
import router from '@/router'
import App from "@/app/App.vue";
import {createApp} from "vue";
import {createPinia} from "pinia";
import {VueCookieNext} from 'vue-cookie-next'
import {initAxios} from "@/axios";
import {useAppStore} from "@/store/qrAppState";
import {LocalePicker} from "@/components/topMenu/localePicker/LocalePicker.vue";
import CustomButton from "@/components/customButton/CustomButton.vue";
import ComboBox from "@/components/comboBox/ComboBox.vue";
import InputText from "@/components/inputText/InputText.vue";
import { createYmaps } from 'vue-yandex-maps';

const app = createApp(App);

//register component
app.component('ComboBox', ComboBox);
app.component('CustomButton', CustomButton);
app.component('InputText', InputText);

/*app.component('CompanyStep_2', CompanyStep_2);
app.component('CompanyStep_3', CompanyStep_3);
app.component('CompanyStep_4', CompanyStep_4);*/

//register library
app.use(createPinia())
app.use(router)
app.use(i18n);
app.use(uniqIdPlugin);
app.use(VueCookieNext);


router.isReady().then(value1 => {
    AuthProvider.init().getAuthorization().then(auth => {
        initAxios().then(isInit => {
            if (!isInit) {
                throw new Error("Axios not init!")
            }
            const store = useAppStore();
            store.uploadStore().then(value => {
                const settings = value.mapInfo.settings;
                app.use(createYmaps({
                    apikey: import.meta.env.VITE_YANDEX_MAP_API_KEY,
                    lang: settings.lang,
                    initializeOn: 'onPluginInit'
                }))
                if (router.currentRoute.value.path === '/login' && router.currentRoute.value.query.code != null) {
                    if (store.currentPath) {
                        router.push({name: value.currentPath})
                    } else {
                        router.push({name: 'home'});
                    }
                }
                router.beforeEach((to, from, next) => {
                    if (to.path === '/login' && to.query.code != null) {
                        if(store.currentPath){
                            next({name: store.currentPath})
                        }
                        else {
                            next({name: 'homePage'});
                        }
                    } else {
                        if(to.name && from.name){
                            store.setCurrentPath(to.name).then(isUpdateStore => {
                                if(isUpdateStore){
                                    console.debug("Store updated")
                                }
                                else {
                                    console.debug("Store not updated")
                                }
                            }).catch(reason => console.debug("Store error when update" + reason.toString()))
                        }
                        next()
                    }
                })
                window.onfocus = () => {
                    AuthProvider.init().refreshToken().then(refresh => console.info("Token refresh"));
                }
                app.mount('#app');
            });
        })
    }).catch(error => {
        console.error("Auth not access");
        console.error(error);
    })
})


/*AuthProvider.init().getAuthorization().then(auth =>{
  initAxios().then(isInit => {
    if(!isInit){
      throw new Error("Axios not init!")
    }
    initStore().then(
        store => {
          /!*router.beforeEach((to, from, next) => {
            if (to.path === '/login' && to.query.code != null) {
              if(store.getters.currentPath){
                next({name: store.getters.currentPath})
              }
              else {
                next({name: 'homePage'});
              }
            } else {
              if(to.name && from.name){
                store.dispatch("setCurrentPath",to.name)
              }
              next()
            }
          })
          window.onfocus = () => {
            AuthProvider.init().refreshToken()
          }*!/
          app.mount('#app');
        }
    )
  }).catch(error =>{
    console.error("Auth not access");
    console.error(error);
  })
})*/




