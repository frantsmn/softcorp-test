import Vue from 'vue'
import Vuex from 'vuex'

import currency from './currency'
import catalog from './catalog'
import cart from './cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    currency,
    catalog,
    cart
  }
})
