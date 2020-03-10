<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container fill-height fluid>
        <router-view />
      </v-container>
    </v-content>
    <FormModal />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FormModal from "@/components/FormModal.vue";

@Component({
  components: {
    Navbar: () =>
      import(/* webpackChunkName: "navbar" */ "@/components/Navbar.vue"),
    FormModal
  }
})
export default class App extends Vue {}
</script>
