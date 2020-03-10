<template>
  <div>
    <v-app-bar color="primary" dark height="60px" app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Indemand</v-toolbar-title>
      <v-spacer />
      <v-btn v-if="!isLogin" to="/login" outlined>Login / Sign Up</v-btn>
    </v-app-bar>

    <v-navigation-drawer id="drawer" v-model="drawer" absolute temporary>
      <v-list nav>
        <v-list-item-group
          v-model="group"
          active-class="primary--text text--accent-4"
        >
          <v-list-item v-for="(menu, i) of menus" :key="i" link :to="menu.link">
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
import { Vue, Component, Model } from "vue-property-decorator";
import { LoginGetters } from "../types";
import { mapGetters } from "vuex";

@Component({
  ...mapGetters({
    isLogin: LoginGetters.isLogin
  })
})
export default class Navbar extends Vue {
  @Model() private drawer = false;

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
  ].filter(menu => menu.public || this.$store.getters[LoginGetters.isLogin]);
}
</script>

<style lang="scss" scoped>
#drawer {
  margin-top: 60px;
}
</style>
