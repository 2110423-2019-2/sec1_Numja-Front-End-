<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container fill-height fluid>
        <router-view />
      </v-container>
    </v-content>
    <ReportSystemButton/>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ReportSystemButton from "@/components/ReportSystemButton.vue";

@Component({
  components: {
    Navbar: () =>
      import(/* webpackChunkName: "navbar" */ "@/components/Navbar.vue"),
    ReportSystemButton: ReportSystemButton
  }
})
export default class App extends Vue {}
</script>
