<template>
  <v-content class="center-layout">
    <navigationMenu />
    <v-row row justify="center" align="center">
      <v-col cols="12" xsm="8" sm="8" md="10" lg="10">
        <slot></slot>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import navigationMenu from '@/components/navigation/navigation-menu.vue'
export default {
  name: 'navigation-layout',
  components: {
    navigationMenu
  }
}
</script>

<style lang="scss" scoped>
.center-layout {
  height: 100%;
  width: 100%;
}
</style>
