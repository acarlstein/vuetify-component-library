<template>
  <v-card max-width="700" class="mx-auto">
    <v-toolbar color="indigo" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title v-if="title.length > 0">{{title}}</v-toolbar-title>

      <v-icon class="ml-4 mr-2">mdi-magnify</v-icon>

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

      <v-btn icon @click="resetSearch">
        <v-icon>mdi-eraser</v-icon>
      </v-btn>
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
      <v-list-item v-for="color in paletteArray" :key="color.value" @click="selectedColor(color)">
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
import paletteSource from '../../scss/configuration/palette.json'
export default {
  name: 'palette-list',
  props: {
    title: {
      type: String,
      default: ''
    },
    palette: {
      type: Array,
      default: function () {
        return paletteSource.palette
      }
    }
  },
  data: function () {
    return {
      colorArray: this.palette,
      searchOptions: [],
      paletteArray: [],
      search: '',
      searchValue: ''
    }
  },
  watch: {
    search (query) {
      this.querySearch(query)
    }
  },
  methods: {
    querySearch (queryString) {
      if (queryString == null) {
        this.paletteArray = this.$props.palette
      } else {
        queryString = queryString.toLowerCase()
        this.paletteArray = this.$props.palette.filter(
          c =>
            c.name.toLowerCase().includes(queryString) ||
            c.variableName.toLowerCase().includes(queryString) ||
            c.value.toLowerCase().includes(queryString) ||
            c.mockValue.toLowerCase().includes(queryString)
        )
      }
    },
    buildSearchOptions () {
      return this.$props.palette
        .map(color => color.name)
        .concat(this.palette.map(color => color.value))
        .concat(this.palette.map(color => color.variableName))
        .concat(this.palette.map(color => color.mockValue))
    },
    selectedColor (color) {
      this.$emit('selectedColor', color)
    },
    resetSearch () {
      this.paletteArray = this.$props.palette
      this.searchValue = null
    }
  },
  mounted () {
    this.$data.searchOptions = this.buildSearchOptions()
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/configuration/palette.scss';

.color-box {
  border: 4px solid black;
  max-width: 48px;
  width: 48px;
  height: 48px;
}
</style>
