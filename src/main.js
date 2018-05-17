// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import './assets/css/bootstrap.min.css';
import './assets/js/bootstrap.min';
import './assets/css/app.css';
import Loading from './components/Loading';

Vue.config.productionTip = false;
Vue.use (Loading);
axios.interceptors.request.use (
  config => {
    //配置发送请求的信息
    Vue.set (vm.$data, 'loading', true);
    return config;
  },
  function (error) {
    return Promise.reject (error);
  }
);

axios.interceptors.response.use (
  response => {
    //配置请求回来的信息
    Vue.set (vm.$data, 'loading', false);
    return response;
  },
  function (error) {
    return Promise.reject (error);
  }
);

/* eslint-disable no-new */
var vm = new Vue ({
  el: '#app',
  data: {
    loading: true,
  },
  router,
  template: '<App :child-msg="loading"/>',
  components: {App},
});
