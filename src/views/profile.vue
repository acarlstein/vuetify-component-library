<template>
  <navigationLayout>
    <h1>Alejandro Godofredo Carlstein - Ramos Mejia</h1>
    <v-row>
      <v-col cols="2">
        <v-card
          class="mx-auto"
          tile>
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
        </v-card>
      </v-col>
      <v-col cols="10">

      </v-col>
    </v-row>
  </navigationLayout>
</template>
<script>
import navigationLayout from '@/layouts/navigation-layout.vue'
export default {
  name: 'profile',
  components: {
    navigationLayout
  },
  data () {
    return {
      items: [
        {
          title: 'Website',
          url: 'http://www.acarlstein.com',
          icon: 'mdi-web'
        },
        {
          title: 'LinkedIn',
          url: 'https://www.linkedin.com/in/acarlstein/',
          icon: 'mdi-linkedin-box'
        },
        {
          title: 'Denver, CO',
          url: 'https://www.google.com/maps/place/Denver,+CO/@39.7642548,-104.995193,11z/data=!4m13!1m7!3m6!1s0x876b80aa231f17cf:0x118ef4f8278a36d6!2sDenver,+CO!3b1!8m2!3d39.7392358!4d-104.990251!3m4!1s0x876b80aa231f17cf:0x118ef4f8278a36d6!8m2!3d39.7392358!4d-104.990251',
          icon: 'mdi-map-marker'
        }
      ]
    }
  },
  methods: {
    openTab (url) {
      window.open(url)
    }
  }
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
