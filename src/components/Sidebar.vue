<template>
  <v-navigation-drawer id="drawer" v-model="drawer" absolute temporary>
    <v-list nav dense>
      <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
        <v-list-item v-for="(menu, i) of menuList" :key="i" link :to="menu.link">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";
import { Getter, Action } from 'vuex-class';
import { LoginGetters, LoginActions } from '@/types';

@Component
export default class Sidebar extends Vue {
  
  @Model() private drawer = false;
  @Getter(LoginGetters.isLogin) private isLogin!: boolean;
  @Action(LoginActions.logout) private logout!: () => void;

  private menus = [
    {
      icon: "mdi-home",
      title: "Home",
      link: "/",
      public: true
    },
    {
      icon: "mdi-calendar-month",
      title: "Appointment",
      link: "/appointment"
    },
    {
      icon: "mdi-chat",
      title: "Chat",
      link: "/chat"
    }
  ];

  get menuList() {
    return this.menus.filter(menu => menu.public || this.isLogin);
  }
}
</script>

<style lang="scss" scoped>
#drawer {
  margin-top: 60px;
}
</style>
