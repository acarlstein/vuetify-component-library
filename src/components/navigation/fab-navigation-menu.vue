<template>
  <v-container id="create">
    <v-speed-dial
      v-model="fab"
      :top="(vertical == 'top')"
      :left="(horizontal == 'left')"
      :bottom="(vertical == 'bottom')"
      :right="(horizontal == 'right')"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition.value"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-tooltip
        :top="tooltipDirection === 'top'"
        :left="tooltipDirection === 'left'"
        :bottom="tooltipDirection === 'bottom'"
        :right="tooltipDirection === 'right'"
        v-for="(button, i) in buttons"
        :key="i"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            :color="button.color"
            @click.stop="action($event, button.click)"
            :to="button.to"
            fab
            dark
            small
          >
            <v-avatar v-if="button.img" size="36px">
              <v-img :src="button.img"></v-img>
            </v-avatar>
            <v-icon v-else-if="button.icon.startsWith('mdi')">{{button.icon}}</v-icon>
            <i v-else-if="button.icon.startsWith('fa')" :class="`fas ${ button.icon }`"></i>
            <font-awesome-icon v-else :icon="button.icon" />
          </v-btn>
        </template>
        <span>{{button.tooltip}}</span>
      </v-tooltip>
    </v-speed-dial>

    <dialogCmp
      id="menu-configuration-dialog"
      :show="menuConfigurationDialog"
      @change="dialogSave($event)"
      @abort="dialogAbort($event)"
    >
      <v-row>
        <v-col cols="11">
          <v-container fluid>
            <v-row class="child-flex">
              <v-col cols="12" sm="6" md="4">
                <v-card class="pb-4">
                  <v-card-subtitle>
                    <strong>Menu Location</strong>
                  </v-card-subtitle>
                  <v-btn-toggle v-model="horizontal" borderless mandatory>
                    <v-btn value="left">
                      <v-icon center>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-btn value="right">
                      <v-icon center>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                  <v-divider class="ma-4" horizontal></v-divider>
                  <v-btn-toggle v-model="vertical" borderless mandatory>
                    <v-btn value="top">
                      <v-icon center>mdi-arrow-up</v-icon>
                    </v-btn>
                    <v-btn value="bottom">
                      <v-icon center>mdi-arrow-down</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-card class="pb-4">
                  <v-card-subtitle>
                    <strong>Menu Direction</strong>
                  </v-card-subtitle>
                  <v-btn-toggle v-model="direction" borderless mandatory>
                    <v-btn v-if="vertical == 'bottom'" value="top">
                      <v-icon center>mdi-arrow-up</v-icon>
                    </v-btn>
                    <v-btn v-if="vertical == 'top'" value="bottom">
                      <v-icon center>mdi-arrow-down</v-icon>
                    </v-btn>
                    <v-btn v-if="horizontal == 'right'" value="left">
                      <v-icon center>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-btn v-if="horizontal == 'left'" value="right">
                      <v-icon center>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-card class="pb-4">
                  <v-card-subtitle>
                    <strong>Transition</strong>
                  </v-card-subtitle>
                  <v-select
                    :items="transitions"
                    v-model="transition"
                    item-text="img"
                    item-value="value"
                    return-object
                    single-line
                    class="ma-2">
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
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-subheader>Options</v-subheader>
                <v-switch v-model="hover" class="ma-2" label="Open on hover"></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </dialogCmp>
  </v-container>
</template>

<script>
import dialogCmp from '../dialog-cmp.vue'
export default {
  name: 'fab-navigation-menu',
  components: {
    dialogCmp
  },
  data: () => ({
    direction: 'right',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    vertical: 'top',
    horizontal: 'left',
    transition: {
      img: 'images/components/fab-navigation-menu-transition-slide-y.gif',
      value: 'slide-y-transition'
    },
    menuConfigurationDialog: false,
    tooltipDirection: 'bottom',
    buttons: [
      {
        color: 'primary',
        icon: 'mdi-home',
        tooltip: 'Home',
        to: '/'
      },
      {
        color: '',
        icon: '',
        img: 'images/my-avatar.jpg',
        tooltip: 'Profile',
        to: '/profile'
      },
      {
        color: 'green',
        icon: 'mdi-help',
        tooltip: 'About',
        to: '/about'
      },
      {
        color: 'indigo',
        icon: 'mdi-file-settings-variant',
        tooltip: 'Site Settings',
        to: '/configuration'
      },
      {
        color: 'red',
        icon: 'mdi-settings-transfer',
        tooltip: 'Menu Settings',
        click: 'show(menuConfigurationDialog)'
      }
    ],
    transitions: [
      {
        img: 'images/components/fab-navigation-menu-transition-slide-y.gif',
        value: 'slide-y-transition',
        title: 'Slide Y'
      },
      {
        img: 'images/components/fab-navigation-menu-transition-slide-y-reverse.gif',
        value: 'slide-y-reverse-transition',
        title: 'Slide Y Reverse'
      },
      {
        img: 'images/components/fab-navigation-menu-transition-slide-x.gif',
        value: 'slide-x-transition',
        title: 'Slide X'
      },
      {
        img: 'images/components/fab-navigation-menu-transition-slide-y-reverse.gif',
        value: 'slide-x-reverse-transition',
        title: 'Slide X Reverse'
      },
      {
        img: 'images/components/fab-navigation-menu-transition-slide-scale.gif',
        value: 'scale-transition',
        title: 'Scale'
      }
    ]
  }),
  computed: {
    activeFab () {
      switch (this.tabs) {
        case 'one':
          return { class: 'purple', icon: 'account_circle' }
        case 'two':
          return { class: 'red', icon: 'edit' }
        case 'three':
          return { class: 'green', icon: 'keyboard_arrow_up' }
        default:
          return {}
      }
    }
  },
  watch: {
    horizontal (val) {
      this.horizontal = val
      if (this.direction === 'left' || this.direction === 'right') {
        this.direction = this.horizontal === 'left' ? 'right' : 'left'
      }
      this.changeTooltipDirection()
    },
    vertical (val) {
      this.vertical = val
      if (this.direction === 'top' || this.direction === 'bottom') {
        this.direction = this.vertical === 'top' ? 'bottom' : 'top'
      }
      this.changeTooltipDirection()
    },
    direction (val) {
      this.direction = val
      this.changeTooltipDirection()
    }
  },
  methods: {
    changeTooltipDirection () {
      if (this.direction === 'bottom' || this.direction === 'top') {
        this.tooltipDirection = this.horizontal === 'left' ? 'right' : 'left'
      } else if (this.direction === 'left' || this.direction === 'right') {
        this.tooltipDirection = this.vertical === 'top' ? 'bottom' : 'top'
      }
    },
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
    }
  }
}
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}

.transition {
  height: 40px;
  width: 200px;
}
</style>
