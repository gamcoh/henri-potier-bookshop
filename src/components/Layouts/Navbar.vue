<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Henri Potier Bookshop</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-badge color="purple" left>
          <span slot="badge">{{count}}</span>
          <v-icon>shopping_cart</v-icon>
        </v-badge>
      </v-btn>
    </v-toolbar>

    <v-card color="cyan darken-2" class="white--text">
      <v-container>
        <v-list three-line class="cyan darken-2 white--text">
          <v-layout column>
            <div v-for="(book, key) in books" :key="book.isbn">
              <v-divider v-if="key > 0" inset></v-divider>

              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img :src="book.cover">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>
                    <v-layout row>
                      <v-flex xs4>
                        {{book.title}}
                      </v-flex>
                      <v-flex xs1>
                        <v-text-field box type="number" :value="book.count" height="20" />
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-btn depressed small>{{$lang.default.remove}}</v-btn>
                    </v-layout>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </div>
          </v-layout>
        </v-list>
      </v-container>
      <v-divider light></v-divider>
      <v-card-actions class="pa-3">
        {{$lang.default.basket}}
        <v-spacer></v-spacer>
        <v-btn
          color="primary">
          {{$lang.default.emptyBasket}}
        </v-btn>
      </v-card-actions>
    </v-card>

    <fade-transition :duration="200" mode="out-in">
      <router-view></router-view>
    </fade-transition>
  </div>
</template>

<script>
import {FadeTransition} from 'vue2-transitions'
import {mapGetters} from 'vuex'

export default {
  name: 'Navbar',

  components: {
    FadeTransition
  },

  computed: {
    ...mapGetters({
      count: 'ShoppingCart/getCartLength',
      books: 'ShoppingCart/getCart'
    })
  }
}
</script>
