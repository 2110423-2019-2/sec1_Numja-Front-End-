<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="4">
      <v-card elevation="8">
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="px-2">Login</v-toolbar-title>
        </v-toolbar>

        <v-form @submit.prevent="submit">
          <v-card-text class="px-6">
            <v-text-field
              v-model="username"
              type="text"
              label="Username"
              prepend-icon="mdi-account"
              required
            />
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              prepend-icon="mdi-lock"
              required
            />
            <p class="text-right primary--text" text>
              <a href="#">Forgot password?</a>
            </p>
          </v-card-text>

          <v-card-actions class="pa-6 pt-0">
            <v-spacer />
            <v-btn color="primary" to="/sign-up" text>Sign up</v-btn>
            <v-btn color="primary" type="submit">Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";
import { Action } from "vuex-class";
import { LoginActions, LoginCredentials } from "../types";

@Component
export default class Login extends Vue {
  @Model() private username!: string;
  @Model() private password!: string;
  @Action(LoginActions.login) private login!: (
    credentials: LoginCredentials
  ) => void;
yarn 
  submit()
    this.login({
      username: this.username,
      password: this.password
    });
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
