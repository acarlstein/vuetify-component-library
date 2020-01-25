<template>
  <v-container>
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      :src="bg"
      absolute
      dark
      hide-overlay
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'" :to="userProfileTo">
          <v-list-item-avatar>
            <img src="images/my-avatar.jpg" />
          </v-list-item-avatar>

          <v-list-item-content align="left">
            <v-list-item-title><strong>Vuetify UI Library</strong></v-list-item-title>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-list-item-subtitle v-on="on">{{userName}}</v-list-item-subtitle>
              </template>
              <span>{{userName}}</span>
            </v-tooltip>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items"
                    :key="item.title"
                    @click.stop="action($event, item.click)"
                    :to="item.to">
          <v-list-item-icon>
            <v-icon v-if="item.icon.startsWith('mdi')">{{ item.icon }}</v-icon>
            <i v-else-if="item.icon.startsWith('fa')" :class="`fas ${ item.icon }`">${item.iconStack}</i>
            <font-awesome-icon v-else :icon="item.icon" />
          </v-list-item-icon>

          <v-list-item-content align="left">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <dialogCmp id="menu-configuration-dialog"
              :show="menuConfigurationDialog"
              @change="dialogSave($event)"
              @abort="dialogAbort($event)">
      <v-row>
          <v-col cols="11">
            <v-switch v-model="background" class="ma-2" label="Use Background Image"></v-switch>
            <div v-if="!background" >
              <v-select v-model="color" :items="colors" label="Background Color" class="ml-4 ma-2"></v-select>
            </div>
            <div>
              <v-select v-if="background" v-model="image" :items="images" label="Background Image" class="ml-4 ma-2"></v-select>
            </div>
            <v-switch v-model="drawer" class="ma-2" label="show (v-model)"></v-switch>
            <v-switch v-model="miniVariant" class="ma-2" label="Mini variant"></v-switch>
            <v-switch v-model="expandOnHover" class="ma-2" label="Expand on hover"></v-switch>
            <v-switch v-model="right" class="ma-2" label="Right"></v-switch>
          </v-col>
        </v-row>
    </dialogCmp>

  </v-container>
</template>

<script>
import paletteSource from '../../scss/components/configuration/palette.json'
import dialogCmp from '../dialog-cmp.vue'
const backgroundImages = require.context('../../../public/images/menu-backgrounds', true, /^.*\.(jpg|svg)$/).keys().map(s => s.slice(2))
const backgroundColors = paletteSource.palette.map(color => color.variableName.slice(1))
window.console.log(backgroundColors)
export default {
  name: 'navigation-menu',
  components: {
    dialogCmp
  },
  data () {
    return getDefaultData()
  },
  computed: {
    bg () {
      return this.background
        ? 'images/menu-backgrounds/' + this.image
        : undefined
    }
  },
  methods: {
    action (event, perform) {
      let str = perform.match(/show\(([^)]+)\)/)
      if (str != null) {
        this['menuConfigurationDialog'] = true
      }
    },
    dialogSave (event) {
      this['menuConfigurationDialog'] = false
    },
    dialogAbort (event) {
      this['menuConfigurationDialog'] = false
      Object.assign(this.$data, getDefaultData())
    }
  }
}

function getDefaultData () {
  return {
    drawer: true,
    items: [
      { title: 'Home', icon: 'mdi-home', to: '/' },
      { title: 'About', icon: 'mdi-help-box', to: '/about' },
      { title: 'Site Settings', icon: 'mdi-file-settings-variant', to: '/configuration' },
      {
        title: 'Menu Settings',
        icon: 'mdi-settings-transfer',
        click: 'show(menuConfigurationDialog)'
      }
    ],
    color: 'primary',
    colors: backgroundColors,
    image: backgroundImages[0],
    images: backgroundImages,
    right: false,
    miniVariant: true,
    expandOnHover: true,
    background: false,
    userName: 'Alejandro G. Carlstein Ramos Mejia',
    userProfileTo: '/profile',
    menuConfigurationDialog: false
  }
}
</script>

<style lang="scss">
@import '../../scss/components/navigation-menu.scss';
.v-label{
  word-break: keep-all;
  white-space: nowrap
}
.color-box {
  border: 2px solid black;
  max-width: 16px;
  width: 16px;
  height: 16px;
}
</style>
