import {UserRole} from '@/types'; import {UserRole} from '@/types';
<template>
  <div>
    <v-app-bar color="primary" dark height="60px" app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>Indemand</v-toolbar-title>
      <v-spacer />
      <v-btn v-if="!isLogin" to="/login" outlined>Login / Sign Up</v-btn>
      <v-btn v-if="isLogin" icon to="/profile/me">
        <v-icon large>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn v-if="isLogin" @click="logout" outlined>Log Out</v-btn>
    </v-app-bar>

    <v-navigation-drawer id="drawer" v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="primary--text text--accent-4">
          <v-list-item
            v-for="(menu, i) of menuList"
            :key="i"
            link
            :to="menu.link"
          >
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LoginActions, LoginGetters, User, UserRole } from "../types";
import { Action, Getter } from "vuex-class";

@Component
export default class Navbar extends Vue {
  @Getter(LoginGetters.getUser) private user!: User;
  @Getter(LoginGetters.isLogin) private isLogin!: () => boolean;
  @Action(LoginActions.logout) private logout!: () => void;
  private drawer = false;
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
      link: "/appointment",
      roles: [UserRole.Student,UserRole.Tutor]
    },
    {
      icon: "mdi-chat",
      title: "Chat",
      link: "/chat",
      roles: [UserRole.Admin,UserRole.Student,UserRole.Tutor]
    },
    {
      icon: "mdi-wrench",
      title: "Activate/Suspend",
      link: "/maintenance/suspend",
      roles: [UserRole.Admin]
    },
    {
      icon: "mdi-file-document-edit",
      title: "Verify",
      link: "/maintenance/verify",
      roles: [UserRole.Admin]
    }
  ];

  get menuList() {
    return this.menus.filter(menu => {
      if (menu.public) return true;
      if (!this.isLogin) return false;
      if (this.user && menu.roles) return menu.roles.includes(this.user.role);
      return false;
    });
  }
}
</script>

<style lang="scss" scoped>
#drawer {
  margin-top: 60px;
  margin-bottom: -60px;
}
</style>
