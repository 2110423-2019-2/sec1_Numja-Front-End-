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
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import ReportSystemButton from '@/components/ReportSystemButton.vue';
import SnackbarNotification from '@/components/SnackbarNotification.vue';
import { LoginGetters, LoginActions } from './types';

@Component({
  components: {
    Navbar: () =>
      import(/* webpackChunkName: "navbar" */ '@/components/Navbar.vue'),
    ReportSystemButton,
    SnackbarNotification
  }
})
export default class App extends Vue {
  @Action(LoginActions.setAxiosHeader) private setAxiosHeader!: () => void;

  mounted() {
    this.setAxiosHeader();
  }
}
</script>

<style lang="scss" scoped>
#app-container {
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
