// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Lang from 'vue-lang'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'vuetify/dist/vuetify.min.css'

let locales = {
  'en': require('@/locales/en.js'),
  'fr': require('@/locales/fr.js')
}

Vue.use(VueAxios, axios)
Vue.use(Lang, {lang: 'fr', locales})
Vue.config.productionTip = false
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
