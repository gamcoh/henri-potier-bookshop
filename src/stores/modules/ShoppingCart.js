const state = {
  cart: [],
  count: 0
}

const getters = {
  getCart: state => state.cart,
  getCartLength: state => state.count
}

const actions = {
  removeBook ({ commit }, book) {
    commit('REMOVE_BOOK', book)
    commit('UPDATE_COUNT')
  },
  updateBookCount ({ commit }, { book, count }) {
    if (count < 1) {
      commit('REMOVE_BOOK', book)
    } else {
      commit('SET_BOOK_COUNT', {book, count})
    }
    commit('UPDATE_COUNT')
  },
  emptyBasket ({ commit }) {
    commit('RESET_CART')
  },
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
  REMOVE_BOOK: (state, book) => {
    state.cart = state.cart.filter(product => product.isbn !== book.isbn)
  },
  UPDATE_COUNT: state => {
    state.count = state.cart.reduce((total, product) => product.count + total, 0)
  },
  SET_BOOK_COUNT: (state, {book, count}) => {
    let b = state.cart.find(b => b.isbn === book.isbn)
    b.count = parseInt(count)
  },
  RESET_CART: state => {
    state.cart = []
    state.count = 0
  },
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
