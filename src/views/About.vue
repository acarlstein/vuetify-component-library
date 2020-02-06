<template>
   <navigationLayout>
    <h1>About Vuetify Component Library</h1>
    <p>This Vuetify Component Library is made with the purpose of provide a base for future projects</p>
    <p>What we are trying to accomplish here is to build a web app that can be setup and then build on top</p>
    <p>For example:</p>
    <ul>
      <li>We should be able to configurate all the colors, fonts and other elements from different configuration panels.</li>
      <li>We should be able to access a component library that provides examples of the components that can be used plus code example of how to apply them</li>
    </ul>
   </navigationLayout>
</template>

<script>
import navigationLayout from '@/layouts/navigation-layout.vue'
export default {
  name: 'about-view',
  components: {
    navigationLayout
  }
}
</script>
