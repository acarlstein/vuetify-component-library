<template>
  <v-card max-width="700" class="mx-auto">
    <v-toolbar color="indigo" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title v-if="title.length > 0">{{title}}</v-toolbar-title>

      <v-autocomplete
        class="mt-6"
        label="Search color here..."
        v-model="searchValue"
        :items="searchOptions"
        dense
        filled
        outlined
      ></v-autocomplete>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <v-list-item>
        <v-list-item-content align="left">
          <strong>Value</strong>
        </v-list-item-content>
        <v-list-item-content align="left">
          <strong>Name</strong>
        </v-list-item-content>
        <v-list-item-content align="left">
          <strong>Variable Name</strong>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="color in colors" :key="color.value">
        <v-list-item-content>
          <div class="color-box" :style="`background-color: ${color.value}`"></div>
        </v-list-item-content>

        <v-list-item-content align="left">
          <v-list-item-title v-text="color.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-content align="left">
          <v-list-item-title v-text="color.variableName"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'palette-list',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data: () => {
    let colors = [
      {
        name: 'Red',
        variableName: '$red',
        value: 'red'
      },
      {
        name: 'Blue',
        variableName: '$blue',
        value: '#0000FF'
      }
    ]
    let searchOptions = colors
      .map(color => color.name)
      .concat(colors.map(color => color.value))
      .concat(colors.map(color => color.variableName))
    return {
      colors: colors,
      searchValue: null,
      searchOptions: searchOptions
    }
  }
}
</script>

<style scoped>
.color-box {
  border: 4px solid black;
  max-width: 48px;
  width: 48px;
  height: 48px;
}
</style>
