<template>
  <div>
    <v-app-bar color="primary" dark height="60px" app>
      <v-app-bar-nav-icon @click="drawer = true" />

      <v-toolbar-title>Indemand</v-toolbar-title>
      <v-spacer />
      <v-btn v-if="!isLogin" to="/login" outlined>Login / Sign Up</v-btn>
      <v-btn v-else icon @click.prevent="logout">
        <v-icon large>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <Sidebar :drawer="drawer" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { LoginGetters, LoginActions } from "../types";
import { Getter, Action } from "vuex-class";

@Component({
  components: {
    Sidebar: () => import(/* webpackChunkName: "sidebar" */ '@/components/Sidebar.vue')
  }
})
export default class Navbar extends Vue {
  @Prop() private drawer = false;
}
</script>
