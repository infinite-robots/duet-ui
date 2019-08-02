import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loader from './components/Loader';
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

Vue.config.productionTip = false

Vue.component('loader', Loader);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


