<template>
  <v-content class="center-layout">
    <v-row row justify="center" align="center">
      <v-col cols="12" xsm="8" sm="8" md="10" lg="10">
        <slot></slot>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: 'center-layout'
}
</script>

<style lang="scss" scoped>
  .center-layout {
    border: 1px solid red;
    & > v-row {
      border: 1px solid black;
      min-height: cal(100 - 54px);
    }
  }

  *, ::after, ::before {
    box-sizing: border-box;
}
</style>
