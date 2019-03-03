<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Henri Potier Bookshop</v-toolbar-title>

      <v-toolbar-items class="hidden-sm-and-down ml-5">
        <v-btn flat>
          <router-link to="/">
            {{$lang.default.home}}
          </router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/shopping-cart">
            {{$lang.default.shopping_cart}}
          </router-link>
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-btn @click="cartShow = !cartShow" icon>
        <v-badge color="purple" left>
          <span slot="badge">{{count}}</span>
          <v-icon>shopping_cart</v-icon>
        </v-badge>
      </v-btn>

      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <span>{{lang}}</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>

        <v-list>
          <v-list-tile
           @click="$setLang(l)"
           v-for="(l, key) in langs"
           :key="key">
            <v-list-tile-title v-text="l" />
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <cart v-if="cartShow" />

    <fade-transition :duration="200" mode="out-in">
      <router-view></router-view>
    </fade-transition>
  </div>
</template>

<script>
import {FadeTransition} from 'vue2-transitions'
import {mapGetters} from 'vuex'
import Cart from './Cart'

export default {
  name: 'Navbar',

  components: {
    FadeTransition,
    Cart
  },

  computed: {
    ...mapGetters({
      count: 'ShoppingCart/getCartLength'
    })
  },

  data () {
    return {
      cartShow: false,
      lang: 'fr',
      langs: ['fr', 'en']
    }
  }
}
</script>
