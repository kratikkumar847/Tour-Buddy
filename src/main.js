import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
// import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
// import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import VueRouter from 'vue-router';
import router from './router';
import setAuthHeader from "./utils/setAuthHeader"
Vue.use(Vuelidate);
Vue.config.productionTip = false
Vue.use(VueRouter);



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
