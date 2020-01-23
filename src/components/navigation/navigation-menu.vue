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
      <v-row justify="space-around">
          <v-col cols="12">
            <v-select v-model="color" :items="colors" label="Color"></v-select>
          </v-col>

          <v-switch v-model="drawer" class="ma-2" label="v-model"></v-switch>

          <v-switch v-model="miniVariant" class="ma-2" label="Mini variant"></v-switch>

          <v-switch v-model="expandOnHover" class="ma-2" label="Expand on hover"></v-switch>

          <v-switch v-model="background" class="ma-2" label="Background"></v-switch>

          <v-switch v-model="right" class="ma-2" label="Right"></v-switch>
        </v-row>
    </dialogCmp>

  </v-container>
</template>

<script>
import dialogCmp from '../dialog-cmp.vue'
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
      color: 'primary',
      colors: ['primary', 'blue', 'success', 'red', 'teal'],
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
        ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg'
        : undefined
    }
  },
  methods: {
    action (event, perform) {
      let str = perform.match(/show\(([^)]+)\)/)
      window.console.log('str: ' + str)
      if (str != null) {
        /* this.$data['menuConfigurationDialog'] = !this.$data['menuConfigurationDialog'] */
        /* this.$data['menuConfigurationDialog'] = true */
        this['menuConfigurationDialog'] = true
      }
      window.console.log(this.$data['menuConfigurationDialog'])
    },
    dialogSave (event) {
      window.console.log('DIALOG SAVED (CHANGED)')
      window.console.log(event)
      this['menuConfigurationDialog'] = false
    },
    dialogAbort (event) {
      window.console.log('DIALOG ABORTED')
      window.console.log(event)
      this['menuConfigurationDialog'] = false
    }
  }
}
</script>
