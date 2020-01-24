<template>
  <v-dialog v-model="dialog"
            width="unset"
            persistent
            hide-overlay>
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>

      <v-card-text>
        <slot></slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="save()">
          <i class="fas fa-save"></i>
        </v-btn>

        <v-btn color="green darken-1" text @click="abort()">
          <i class="fas fa-times"></i>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'dialog-cmp',
  props: ['show', 'title'],
  data () {
    return {
      dialog: this.show
    }
  },
  watch: {
    show: function () {
      this.dialog = this.show
    }
  },
  methods: {
    abort () {
      this.$emit('abort')
      this.dialog = false
    },
    save () {
      this.$emit('change')
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/configuration/palette.scss';
.fa-save {
  color: $success;
}
.fa-times {
  color: $danger;
}
</style>
