<template>
  <div id="app">
    <v-app>
      <notifications position="bottom right" group="notifs" />
      <router-view/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style src="./styles/_custom.scss" lang="scss"></style>
