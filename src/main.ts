import appComponent from './app/App.vue'
import  Vue from 'vue'
import VueRouter from "vue-router";
import Home from "@/components/workPlace/home/Home.vue";
import EditUser from "@/components/workPlace/editUser/EditUser.vue";
import {AuthProvider} from "@/auth/AuthProvider";

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
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && to.query.code != null) {
    next({name: 'home'});
  } else {
    next()
  }
})


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
  window.onfocus = () => {
    AuthProvider.init().refreshToken()
  }
  new Vue({
    router,
    render: (h:any) => h(appComponent),
  }).$mount('#mainDiv')
}).catch(error =>{
  console.error("Auth not access");
  console.error(error);
})




