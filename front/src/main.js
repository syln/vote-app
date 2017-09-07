import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import router from './routers/router';
import App from './app'

Vue.use(VueRouter);
Vue.use(VueResource);

new Vue({
  el:"#app",
  router,
  render:h => h(App)
})
