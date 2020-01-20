<template>
  <v-card max-width="700" class="mx-auto">
    <v-toolbar color="indigo" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title v-if="title.length > 0">{{title}}</v-toolbar-title>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-autocomplete
        class="mt-6"
        label="Search color here..."
        v-model="searchValue"
        :items="searchOptions"
        :search-input.sync="search"
        dense
        filled
        outlined
      ></v-autocomplete>
    </v-toolbar>

    <v-list class="overflow-y-auto" max-height="400">
      <v-list-item>
        <v-list-item-content align="left">
          <strong>Color</strong>
        </v-list-item-content>
        <v-list-item-content align="left">
          <strong>Name</strong>
        </v-list-item-content>
        <v-list-item-content align="left">
          <strong>Variable Name</strong>
        </v-list-item-content>
        <v-list-item-content align="left">
          <strong>Variable Value</strong>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="color in colors" :key="color.value">
        <v-list-item-content>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <div class="color-box" :style="`background-color: ${color.mockValue}`" v-on="on"></div>
            </template>
            <span>{{color.mockValue}}</span>
          </v-tooltip>
        </v-list-item-content>

        <v-list-item-content align="left">
          <v-list-item-title v-text="color.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-content align="left">
          <v-list-item-title v-text="color.variableName"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-content align="left">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-list-item-title v-text="color.value" v-on="on"></v-list-item-title>
            </template>
            <span>{{color.value}}</span>
          </v-tooltip>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import palette from '../scss/configuration/palette.json'
let colors = palette.palette
let defaultSearchOptions = colors
  .map(color => color.name)
  .concat(colors.map(color => color.value))
  .concat(colors.map(color => color.variableName))
  .concat(colors.map(color => color.mockValue))
export default {
  name: 'palette-list',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      colors: colors,
      searchValue: null,
      searchOptions: defaultSearchOptions,
      search: null
    }
  },
  watch: {
    search (query) {
      this.querySearch(query)
    }
  },
  methods: {
    querySearch (queryString) {
      queryString = queryString.toLowerCase()
      this.colors = colors.filter(
        c =>
          c.name.toLowerCase().includes(queryString) ||
          c.variableName.toLowerCase().includes(queryString) ||
          c.value.toLowerCase().includes(queryString) ||
          c.mockValue.toLowerCase().includes(queryString)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/configuration/palette.scss';

.color-box {
  border: 4px solid black;
  max-width: 48px;
  width: 48px;
  height: 48px;
}
</style>
