const state = {
  cart: [],
  count: 0
}

const getters = {
  getCart: state => state.cart,
  getCartLength: state => state.count
}

const actions = {
  setCart ({ commit }, value) {
    commit('SET_CURRENT_CART', value)
  },
  addToCart ({ commit, state }, value) {
    let product = state.cart.find(p => p.isbn === value.isbn)
    if (!product) {
      value.count = 1
      commit('ADD_TO_CART', value)
      commit('ITERATE_COUNT')
    } else {
      product.count++
      commit('ITERATE_COUNT')
    }
  }
}

const mutations = {
  SET_CURRENT_CART: (state, value) => (state.cart = value),
  ADD_TO_CART: (state, product) => (state.cart.push(product)),
  ITERATE_COUNT: state => (state.count++)
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
