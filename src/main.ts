import appComponent from './app/App.vue'
import  Vue from 'vue'
import VueRouter from "vue-router";
import WorkPlace from "@/components/workPlace/WorkPlace.vue";
import ModalMask from "@/components/modal/modal/mask/ModalMask.vue";

Vue.use(VueRouter);


const routes = [
  {
    path: "/login",
    component: ModalMask,
  },
  {
    path: "/home",
    component: WorkPlace,
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

new Vue({
  router,
  render: (h:any) => h(appComponent),
}).$mount('#mainDiv')



