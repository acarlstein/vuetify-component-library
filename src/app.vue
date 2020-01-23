<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    //
  })
}
</script>

<style lang="scss">
@import './scss/app.scss'
</style>
