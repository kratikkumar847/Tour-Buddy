import Vue from 'vue'
import App from './App.vue'
// import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
// import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import VueRouter from 'vue-router';
import router from './router';
Vue.config.productionTip = false
Vue.use(VueRouter);




new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
