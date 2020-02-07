<template>
  <v-list dense rounded>
    <v-list-item-group>
      <v-list-item v-for="(item, i) in items"
                  :key="i"
                  align="left"
                  color="primary"
                  @click="openTab(item.url)">
        <v-list-item-icon class="ma-2">
          <v-icon v-if="item.icon.startsWith('mdi')">{{ item.icon }}</v-icon>
          <i v-else-if="item.icon.startsWith('fa')" :class="`fas ${ item.icon }`">${item.iconStack}</i>
          <font-awesome-icon v-else :icon="item.icon" />
        </v-list-item-icon>
        <v-list-item-content class="pl-0 pr-0">
          <v-list-item-title>
              <strong>{{item.title}}</strong>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'list-icon-links',
  props: ['items']
}
</script>

<style lang="scss" scoped>
@import '../scss/components/configuration/palette.scss';
.mdi-linkedin-box, .mdi-web {
  color: $primary;
}
.mdi-map-marker {
  color: $danger;
}
a {
  text-decoration: none;
}
</style>
