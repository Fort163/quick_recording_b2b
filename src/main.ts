import appComponent from './app/App.vue'
import  Vue from 'vue'

Vue.config.productionTip = false
new Vue({
  render: (h:any) => h(appComponent),
}).$mount('#mainDiv')
