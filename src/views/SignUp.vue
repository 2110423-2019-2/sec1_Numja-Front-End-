<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="9" md="5">
      <v-card elevation="8">
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="px-2">Sign Up</v-toolbar-title>
        </v-toolbar>

        <v-form @submit.prevent="submit" ref="form" v-model="isValid">
          <v-card-text class="px-6">
            <v-text-field
              v-model="username"
              type="text"
              label="Username"
              :rules="[rules.required]"
              prepend-icon="mdi-account"
              required
            />
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              prepend-icon="mdi-lock"
              :rules="[rules.required, rules.length8]"
              required
            />
            <v-text-field
              v-model="email"
              type="email"
              label="Email"
              prepend-icon="mdi-email"
              :rules="[rules.email, rules.required]"
              required
            />
            <v-text-field
              v-model="firstName"
              type="text"
              label="First Name"
              prepend-icon="mdi-account"
              :rules="[rules.required, rules.name]"
              required
            />
            <v-text-field
              v-model="lastName"
              type="text"
              label="Last Name"
              prepend-icon="mdi-account"
              :rules="[rules.required, rules.name]"
              required
            />
            <v-label class="mt-0">Birthdate</v-label>
            <v-row align="center" justify="center" class="ma-1 mb-5">
              <v-date-picker v-model="birthDate"></v-date-picker>
            </v-row>
            <v-text-field
              v-model="address"
              type="text"
              label="Address"
              prepend-icon="mdi-home"
              :rules="[rules.required]"
              required
            />
            <v-text-field
              v-model="ssin"
              type="text"
              label="Ssn"
              prepend-icon="mdi-card-account-details"
              :rules="[rules.number, rules.length13]"
              :counter="13"
              required
            />
            <v-label>Gender</v-label>
            <v-radio-group v-model="gender" row>
              <v-radio label="Male" value="male"></v-radio>
              <v-radio label="Female" value="female"></v-radio>
            </v-radio-group>
            <v-label>Role</v-label>
            <v-radio-group v-model="role" row>
              <v-radio label="Student" value="student"></v-radio>
              <v-radio label="Tutor" value="tutor"></v-radio>
            </v-radio-group>
          </v-card-text>

          <v-card-actions class="pa-6 pt-0">
            <v-spacer />
            <v-btn color="primary" type="submit">Sign up</v-btn>
            <v-btn color="primary" to="/login" text>Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";
import { Action } from "vuex-class";
import { LoginActions, SignUpCredentials, UserGender, UserRole } from "@/types";
import { loginRules as rules, Rule } from "../rules";
import vuetify from "../plugins/vuetify";

const todayDate = new Date().toISOString().substr(0, 10);

@Component
export default class SignUp extends Vue {
  private isValid = true;
  private username = "";
  private password = "";
  private email = "";
  private firstName = "";
  private lastName = "";
  private birthDate: string = todayDate;
  private address = "";
  private ssin = "";
  private gender: UserGender = UserGender.Male;
  private role: UserRole = UserRole.Student;

  private rules: any = rules;
  @Action(LoginActions.signUp) private signUp!: (
    credentials: SignUpCredentials
  ) => void;

  submit() {
    this.validate();
    if (this.isValid) {
      this.signUp({
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.birthDate,
        email: this.email,
        address: this.address,
        gender: this.gender,
        ssin: this.ssin,
        role: this.role
      });
    } else {
      console.log("invalid");
      this.$vuetify.goTo(0, {
        duration: 500,
        offset: 0,
        easing: "easeOutQuad"
      });
    }
  }

  validate() {
    (this.$refs.form as Vue & { validate: () => boolean }).validate();
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
