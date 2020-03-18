<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container fill-height fluid id="app-container">
        <SnackbarNotification />
        <router-view />
      </v-container>
    </v-content>
    <ReportSystemButton />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ReportSystemButton from "@/components/ReportSystemButton.vue";
import SnackbarNotification from "@/components/SnackbarNotification.vue";

@Component({
  components: {
    Navbar: () =>
      import(/* webpackChunkName: "navbar" */ "@/components/Navbar.vue"),
    ReportSystemButton,
    SnackbarNotification
  }
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
#app-container {
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
