import Vue from 'vue'
import App from './App.vue'
/** cookie*/
import Cookies from 'js-cookie'
/** element-ui*/
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/** 路由*/
import router from './router'
/** 网络请求*/
import * as api from './api'
import './permission'

Vue.config.productionTip = false;
Vue.prototype.$http = api;

Vue.use(Element, {size: Cookies.get('size') || 'medium'});

new Vue({
  el:'#app',
  router,
  render: h => h(App),
}).$mount('#app');
