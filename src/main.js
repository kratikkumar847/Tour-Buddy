import Vue from 'vue'
import App from './App.vue'
import './input.css'
import VueRouter from 'vue-router';
import router from './router';
import setAuthHeader from "./utils/setAuthHeader"
import './assets/tailwind.css'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueToast, {
  position: 'bottom-right',
});


if(localStorage.ACCESS_TOKEN) {
  console.log("access token",localStorage.ACCESS_TOKEN);
  setAuthHeader(localStorage.ACCESS_TOKEN)
}else {
  setAuthHeader(false);
}


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
