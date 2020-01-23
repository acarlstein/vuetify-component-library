<template>
  <centerLayout id="configuration-pallete">
    <paletteList />
  </centerLayout>
</template>

<script>
import centerLayout from '../../layouts/center-layout.vue'
import paletteList from '../../components/configuration/palette-list'

export default {
  name: 'palette-configuration-view',
  components: {
    centerLayout,
    paletteList
  },
  data: () => {
    return {
      items: [
        {
          icon: true,
          title: 'Jason Oner',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
        },
        {
          title: 'Travis Howard',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
        },
        {
          title: 'Ali Connors',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
        },
        {
          title: 'Cindy Baker',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
