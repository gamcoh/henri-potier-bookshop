import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import ShoppingCart from './modules/ShoppingCart'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ShoppingCart
  },
  plugins: [vuexLocal.plugin]
})
