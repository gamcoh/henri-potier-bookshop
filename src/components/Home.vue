
<template>
  <v-container>
    <v-layout row wrap justify-space-around>
      <v-flex
       xs12
       sm3
       v-for="book in books"
       :key="book.isbn">
        <v-card>
          <v-img
           aspect-ratio="0.9"
           :src="book.cover" />

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{book.title}}</h3>
              <div> {{book.synopsis[0].substring(0, 100)}} ... </div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
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
