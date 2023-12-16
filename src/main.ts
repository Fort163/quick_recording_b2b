import appComponent from './app/App.vue'
import  Vue from 'vue'
import VueRouter from "vue-router";
import Home from "@/components/workPlace/home/Home.vue";
import EditUser from "@/components/workPlace/editUser/EditUser.vue";
import {AuthProvider} from "@/auth/AuthProvider";
import {initStore} from "@/store/store";
import {Store} from "vuex";
import {State} from "@/store/model";
import CreateCompany from "@/components/workPlace/createCompany/СreateCompany.vue";

Vue.use(VueRouter);


const routes = [
  {
    path: "/",
    name: 'home',
    component: Home,
  },
  {
    path: "/editUser",
    name: 'editUser',
    component: EditUser,
  },
  {
    path: "/createCompany",
    name: 'createCompany',
    component: CreateCompany,
  },
  {
    path: "/step_1",
    name: 'step_1',
    component: CreateCompany,
  },
  {
    path: "/step_2",
    name: 'step_2',
    component: CreateCompany,
  },
  {
    path: "/step_3",
    name: 'step_3',
    component: CreateCompany,
  },
  {
    path: "/step_4",
    name: 'step_4',
    component: CreateCompany,
  },
  {
    path: "/joinCompany",
    name: 'joinCompany',
    component: Home,
  },
  {
    path: "/myCompany",
    name: 'myCompany',
    component: Home,
  },
  {
    path: "/myRecord",
    name: 'myRecord',
    component: Home,
  },
  {
    path: "/companyRecord",
    name: 'companyRecord',
    component: Home,
  },
  {
    path: "/addEmployee",
    name: 'addEmployee',
    component: Home,
  },
  {
    path: "/editEmployee",
    name: 'editEmployee',
    component: Home,
  },
  {
    path: "/settingsCompany",
    name: 'settingsCompany',
    component: Home,
  },
  {
    path: "/settingsService",
    name: 'settingsService',
    component: Home,
  },
  {
    path: "/settingsSchedule",
    name: 'settingsSchedule',
    component: Home,
  },
  {
    path: "/statisticCompany",
    name: 'statisticCompany',
    component: Home,
  },
  {
    path: "/statisticEmployee",
    name: 'statisticEmployee',
    component: Home,
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});




Vue.config.productionTip = false

Vue.use({
  install: function(Vue, options) {
    Object.defineProperty(Vue.prototype, "uniqId", {
      get: function uniqId() {
        if ('_uid' in this) {
          return this._uid;
        }
        throw new Error("_uid property does not exist");
      }
    });
  }
});



AuthProvider.init().getAuthorization().then(auth =>{
  initStore().then(
      store => {
        router.beforeEach((to, from, next) => {
          if (to.path === '/login' && to.query.code != null) {
            if(store.getters.currentPath){
              next({name: store.getters.currentPath})
            }
            else {
              next({name: 'home'});
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
        }
        new Vue({
          router,
          store,
          render: (h:any) => h(appComponent),
        }).$mount('#mainDiv')
      }
  )
}).catch(error =>{
  console.error("Auth not access");
  console.error(error);
})




