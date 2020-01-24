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
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="images/my-avatar.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Vuetify UI Library {{menuConfigurationDialog}}</v-list-item-title>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-list-item-subtitle v-on="on">{{userName}}</v-list-item-subtitle>
              </template>
              <span>{{userName}}</span>
            </v-tooltip>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items" :key="item.title" @click.stop="action($event, item.click)" >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
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
            <div>
              <v-select v-if="!background" v-model="color" :items="colors" label="Background Color" class="ml-4 ma-2"></v-select>
            </div>
            <div>
              <v-select v-if="background" v-model="image" :items="images" label="Background Image" class="ml-4 ma-2"></v-select>
            </div>
            <v-switch v-model="drawer" class="ma-2" label="v-model"></v-switch>
            <v-switch v-model="miniVariant" class="ma-2" label="Mini variant"></v-switch>
            <v-switch v-model="expandOnHover" class="ma-2" label="Expand on hover"></v-switch>
            <v-switch v-model="right" class="ma-2" label="Right"></v-switch>
          </v-col>
        </v-row>
    </dialogCmp>

  </v-container>
</template>

<script>
import dialogCmp from '../dialog-cmp.vue'
const backgroundImages = require.context('../../../public/images/menu-backgrounds', true, /^.*\.jpg$/).keys().map(s => s.slice(2))
const backgroundColors = ['primary', 'blue', 'success', 'danger', 'teal']
export default {
  name: 'navigation-menu',
  components: {
    dialogCmp
  },
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home', click: '' },
        { title: 'About', icon: 'mdi-help-box', click: '' },
        { title: 'Configuration', icon: 'mdi-settings', click: '' },
        {
          title: 'Menu Configuration',
          icon: 'mdi-settings-transfer',
          click: 'show(menuConfigurationDialog)'
        }
      ],
      color: backgroundColors[0],
      colors: backgroundColors,
      image: backgroundImages[0],
      images: backgroundImages,
      right: true,
      miniVariant: false,
      expandOnHover: false,
      background: false,
      userName: 'Alejandro G. Carlstein Ramos Mejia',
      menuConfigurationDialog: false
    }
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
      window.console.log('str: ' + str)
      if (str != null) {
        this['menuConfigurationDialog'] = true
      }
    },
    dialogSave (event) {
      this['menuConfigurationDialog'] = false
    },
    dialogAbort (event) {
      window.console.log('DIALOG ABORT CALLED')
      this['menuConfigurationDialog'] = false
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/configuration/palette.scss';
.v-label{
  word-break: keep-all;
  white-space: nowrap
}
</style>
