<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="9" md="5">
      <v-card elevation="8" v-if="userInfo">
        <v-toolbar color="primary" dark>
          <v-row class="px-5" justify="space-between" align="center">
            <v-toolbar-title class="px-2">Profile</v-toolbar-title>
            <ReportUserButton />
          </v-row>
        </v-toolbar>
        <v-form>
          <v-card-text class="px-6">
            <v-text-field
              v-model="userInfo.username"
              type="text"
              label="Username"
              prepend-icon="mdi-account"
              readonly
            />
            <v-text-field
              v-model="userInfo.role"
              type="text"
              label="Role"
              prepend-icon="mdi-account"
              readonly
            />
            <v-text-field
              v-model="userInfo.email"
              type="email"
              label="Email"
              prepend-icon="mdi-email"
              readonly
            />
            <v-text-field
              v-model="userInfo.firstName"
              type="text"
              label="First Name"
              prepend-icon="mdi-account"
              readonly
            />
            <v-text-field
              v-model="userInfo.lastName"
              type="text"
              label="Last Name"
              prepend-icon="mdi-account"
              readonly
            />
            <v-label class="mt-0">Birthdate</v-label>
            <v-row align="center" justify="center" class="ma-1 mb-5">
              <v-date-picker :value="userInfo.birthDate.substr(0, 10)" readonly></v-date-picker>
            </v-row>
            <v-text-field
              v-model="userInfo.address"
              type="text"
              label="Address"
              prepend-icon="mdi-home"
              readonly
            />
            <v-text-field
              v-model="userInfo.ssin"
              type="text"
              label="Ssn"
              prepend-icon="mdi-card-account-details"
              readonly
            />
            <v-label>Gender</v-label>
            <v-radio-group v-model="userInfo.gender" readonly row>
              <v-radio label="Male" value="male"></v-radio>
              <v-radio label="Female" value="female"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-form>
      </v-card>
      <v-card v-else>
        <v-toolbar color="primary" dark>
          <v-row class="px-5" justify="space-between" align="center">
            <v-toolbar-title class="px-2">Error</v-toolbar-title>
            <v-btn @click="assignUser">retry</v-btn>
          </v-row>
        </v-toolbar>
        <v-card-text>
          there might be some problems or the user you are looking for might be
          suspended, removed or not existed
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { UsersGetters, UsersActions, LoginGetters, User } from "../types";
import ReportUserButton from "@/components/ReportUserButton.vue";
import router from "../router";

const todayDate = new Date().toISOString().substr(0, 10);

@Component({
  components: { ReportUserButton }
})
export default class Profile extends Vue {
  @Getter(UsersGetters.getUserById) private getUserById!: (id: string) => User;

  @Getter(LoginGetters.getUser) private myUser!: User;
  private userInfo: User | null = null;

  @Action(UsersActions.fetchUsers)
  private fetchUsers!: () => void;

  mounted() {
    this.fetchUsers();
    this.assignUser();
    if (this.userInfo && this.myUser._id === this.userInfo._id)
      router.push("/profile/me");
  }

  assignUser() {
    this.userInfo = this.getUserById(this.$route.params.id);
  }
}
</script>

<style lang="scss" scoped>
p > a {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
