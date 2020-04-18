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
            <v-btn color="primary" type="submit" :loading="loading">Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <v-dialog v-model="pageError" max-width="290">
        <v-card>
          <v-card-title class="headline">Error</v-card-title>
          <v-card-text>{{pageErrorMessage}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="setPageError(false)">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";
import { Action, Getter, Mutation } from "vuex-class";
import {
  LoginActions,
  LoginMutations,
  LoginGetters,
  LoginCredentials
} from "../types";

@Component
export default class Login extends Vue {
  @Action(LoginActions.login) private login!: (
    credentials: LoginCredentials
  ) => void;

  @Getter(LoginGetters.isFetchingLogin) private loading!: boolean;
  @Getter(LoginGetters.getErrorMessage) private pageErrorMessage!: string;
  @Getter(LoginGetters.getError) private pageError!: boolean;
  @Mutation(LoginMutations.setError) private setPageError!: () => void;

  private username = "";
  private password = "";

  submit() {
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
