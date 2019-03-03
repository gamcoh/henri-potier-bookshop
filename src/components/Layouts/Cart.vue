<template>
  <div>
    <v-card color="cyan darken-2" class="white--text">
      <v-container>
        <v-list three-line class="cyan darken-2 white--text">
          <v-layout column v-if="books.length > 0">
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
                        <v-text-field
                         box
                         type="number"
                         :value="book.count"
                         @change.native="updateBookCount({book, count: $event.target.value})"
                         height="20" />
                      </v-flex>
                      <v-flex offset-xs2 xs1>
                        {{book.price}}€
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-btn @click="removeBook(book)" depressed small>{{$lang.default.remove}}</v-btn>
                    </v-layout>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </div>
          </v-layout>
          <v-layout column v-else>
            <v-alert
              :value="true"
              type="info">
              {{$lang.default.basketEmpty}}
            </v-alert>
          </v-layout>
        </v-list>
      </v-container>
      <v-divider light></v-divider>
      <v-card-actions class="pa-3">
        {{$lang.default.basket}} - <span class="totalPrice"><del>{{totalPrice}}€</del></span> <span class="discount">{{discount}}€</span>
        <v-spacer></v-spacer>
        <v-btn
          v-if="books.length > 0"
          @click="confirmEmptyBasket = true"
          color="primary">
          {{$lang.default.emptyBasket}}
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog
      v-model="confirmEmptyBasket"
      max-width="290">
      <v-card>
        <v-card-title class="headline">{{$lang.default.confirmEmptyBasket}}</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="confirmEmptyBasket = false">
            {{$lang.default.cancel}}
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="emptyBasketConfirm">
            {{$lang.default.confirm}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {HTTP} from '@/globals/HTTP'

export default {
  name: 'Cart',

  data () {
    return {
      confirmEmptyBasket: false,
      totalPrice: 0,
      discount: 0
    }
  },

  computed: {
    ...mapGetters({
      count: 'ShoppingCart/getCartLength',
      books: 'ShoppingCart/getCart'
    })
  },

  watch: {
    count: {
      handler (val) {
        if (val === 0) {
          this.totalPrice = this.discount = 0
          return
        }

        let url = this.books.reduce((isbns, book) => (book.isbn + ',').repeat(book.count) + isbns, '')
        url = url.substring(0, url.length - 1)

        this.totalPrice = this.books.reduce((total, book) => book.price * book.count + total, 0)

        HTTP.get(`/${url}/commercialOffers`)
          .then(res => {
            this.discount = this.totalPrice - res.data.offers[1].value
          })
      },
      immediate: true
    }
  },

  methods: {
    emptyBasketConfirm () {
      this.confirmEmptyBasket = false
      this.emptyBasket()
    },

    ...mapActions({
      removeBook: 'ShoppingCart/removeBook',
      emptyBasket: 'ShoppingCart/emptyBasket',
      updateBookCount: 'ShoppingCart/updateBookCount'
    })
  }
}
</script>
