
<template>
  <v-container>
    <v-layout row wrap align-center>
      <v-flex
       xs12
       sm3
       pa-2
       v-for="book in books"
       :key="book.isbn">
        <v-card>
          <v-img
           aspect-ratio="0.9"
           :src="book.cover" />

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{book.title}}</h3>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="showDesc[book.isbn] = !showDesc[book.isbn]">
              <v-icon>{{showDesc[book.isbn] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="showDesc[book.isbn]">
              <p v-for="(text, key) in book.synopsis" :key="key">{{text}}</p>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {HTTP} from '@/globals/HTTP'

export default {
  name: 'Home',

  data () {
    return {
      showDesc: {},
      books: []
    }
  },

  mounted () {
    this.getBooks()
  },

  methods: {
    getBooks () {
      HTTP.get()
        .then(res => {
          this.books = res.data
        })
    }
  }
}
</script>
