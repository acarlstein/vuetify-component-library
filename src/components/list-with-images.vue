<template>
  <v-select
    :items="items"
    item-text="img"
    item-value="value"
    return-object
    single-line
    class="ma-2"
    v-model="selectionValue">
    <template slot="selection" slot-scope="data">
      <v-flex xs12>
        <v-img :src="data.item.img" width="200px" height="40px">
          <template v-slot:placeholder >
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
          <v-row class="lightbox black--text fill-height">
            <v-col align="center">
              <div class="subheading"><strong>{{data.item.title}}</strong></div>
            </v-col>
          </v-row>
        </v-img>
      </v-flex>
    </template>
    <template slot="item" slot-scope="data">
      <v-flex xs12>
        <v-img :src="data.item.img" width="200px" height="40px">
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
          <v-row class="lightbox black--text fill-height">
            <v-col align="center">
              <div class="subheading"><strong>{{data.item.title}}</strong></div>
            </v-col>
          </v-row>
        </v-img>
      </v-flex>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'list-with-images',
  props: ['items', 'value'],
  computed: {
    selectionValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
