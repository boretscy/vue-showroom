import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import vmodal from 'vue-js-modal'
import VueMask from 'v-mask'
import vueHeadful from 'vue-headful'
import VueCustomTooltip from '@adamdehaven/vue-custom-tooltip'

Vue.component('vue-headful', vueHeadful);

Vue.use(VueMask);
Vue.use(vmodal)
Vue.use(VueAxios, axios)
Vue.use(VueCookies, { expire: ''})
Vue.use(VueCustomTooltip, {
  name: 'VueCustomTooltip',
  color: '#fff',
  background: '#000',
  borderRadius: 5,
  fontWeight: 400,
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#YAppsShowroom')
