<template>
  <v-container>
    <v-text-field
      :label="$lang.default.search"
      v-model="search"
      prepend-icon="search" />

    <v-layout row wrap align-center>
      <v-flex
       xs12
       sm3
       pa-2
       v-for="book in filteredBooks"
       :key="book.isbn">
        <v-card>
          <v-img
           aspect-ratio="0.9"
           :src="book.cover" />

          <v-card-title primary-title>
            <div>
              <h3 class="headline blue--text mb-10">{{book.title}}</h3>
              <span class="title">{{book.price}}€</span>
            </div>
          </v-card-title>

          <v-card-text>
            {{book.synopsis | formatDesc}}
          </v-card-text>

          <v-card-actions>
            <v-btn @click="showDesc(book)" depressed color="info">{{$lang.default.seeMore}}</v-btn>
            <v-spacer></v-spacer>
            <v-btn depressed color="success" @click="addToCartHook(book)">{{$lang.default.buy}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-dialog
        v-model="currentDialogDesc"
        width="500">

        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title>
            {{currentBook.title}}
          </v-card-title>

          <v-card-text>
            <p
              v-for="(desc, key) in currentBook.synopsis"
              :key="key">
              {{desc}}
            </p>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="currentDialogDesc = false">
              {{$lang.default.close}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import {HTTP} from '@/globals/HTTP'
import {mapActions} from 'vuex'

export default {
  name: 'Home',

  data () {
    return {
      currentDialogDesc: false,
      currentBook: {},
      books: [],
      filteredBooks: [],
      search: ''
    }
  },

  watch: {
    search (val) {
      this.filteredBooks = this.books.filter(book => book.title.toLowerCase().indexOf(val.toLowerCase()) !== -1)
    }
  },

  mounted () {
    this.getBooks()
  },

  methods: {
    ...mapActions({
      addToCart: 'ShoppingCart/addToCart'
    }),

    async addToCartHook (book) {
      await this.addToCart(book)
      this.$notify({
        group: 'notifs',
        title: this.$lang.default.info,
        text: this.$lang.default.addedToCart
      })
    },

    showDesc (book) {
      this.currentBook = book
      this.currentDialogDesc = true
    },

    getBooks () {
      HTTP.get()
        .then(res => {
          this.filteredBooks = this.books = res.data
        })
    }
  },

  filters: {
    formatDesc (val) {
      if (Array.isArray(val)) {
        return val[0].substr(0, 80) + ' ...'
      }
      return val.substr(0, 80) + ' ...'
    }
  }
}
</script>
