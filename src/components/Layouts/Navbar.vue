<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Henri Potier Bookshop</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-badge color="purple" left>
          <span slot="badge">6</span>
          <v-icon>shopping_cart</v-icon>
        </v-badge>
      </v-btn>
    </v-toolbar>

    <fade-transition :duration="200" mode="out-in">
      <router-view></router-view>
    </fade-transition>
  </div>
</template>

<script>
import {FadeTransition} from 'vue2-transitions'

export default {
  name: 'Navbar',

  components: {
    FadeTransition
  }
}
</script>
