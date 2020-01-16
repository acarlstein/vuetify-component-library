<template>
  <v-app id="app">
    <main>
      <router-view/>
    </main>
  </v-app>
</template>

<style lang="scss">
@import "./scss/App.scss";

#app {
  min-height: 100vh;
  height: 100%;
  width: 100vw;
}
</style>
