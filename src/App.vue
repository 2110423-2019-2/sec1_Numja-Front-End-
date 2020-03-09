<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container fill-height fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    Navbar: () =>
      import(/* webpackChunkName: "navbar" */ "@/components/Navbar.vue")
  }
})
export default class App extends Vue {}
</script>
