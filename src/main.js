import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueResource from 'vue-resource'
import GLOBAL from './assets/GLOBAL.vue'
// var VueResource = require('vue-resource');
Vue.use(VueResource);

Vue.config.productionTip = false
Vue.use(iView);

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login') {
    if (GLOBAL.isLogin.isLogin === false) {
      next(false)
    } else
      next()
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')