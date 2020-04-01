<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="9" md="5">
      <v-card elevation="8">
        <v-toolbar color="primary" dark>
          <v-row class="px-5" justify="space-between" align="center">
            <v-toolbar-title class="px-2">Profile</v-toolbar-title>
            <v-row class="justify-end" v-if="editMode">
              <v-btn class="mr-3" @click="cancelEditMode">Cancel</v-btn>
              <Uploadportfolio v-if="user.role === UserRole.Tutor" />
              <v-btn class="ml-3" @click="toggleEditMode">Submit</v-btn>
            </v-row>
            <div v-else>
              <v-btn @click="toggleEditMode">Edit</v-btn>
            </div>
          </v-row>
        </v-toolbar>

        <v-form @submit.prevent="submit" ref="form" v-model="isValid">
          <v-card-text class="px-6">
            <v-text-field
              v-model="userInfo.username"
              type="text"
              label="Username"
              :rules="[rules.required]"
              prepend-icon="mdi-account"
              :disabled="!editMode"
              required
            />
            <v-text-field
              v-model="userInfo.email"
              type="email"
              label="Email"
              prepend-icon="mdi-email"
              :rules="[rules.email, rules.required]"
              :disabled="!editMode"
              required
            />
            <v-text-field
              v-model="userInfo.firstName"
              type="text"
              label="First Name"
              prepend-icon="mdi-account"
              :rules="[rules.required, rules.name]"
              :disabled="!editMode"
              required
            />
            <v-text-field
              v-model="userInfo.lastName"
              type="text"
              label="Last Name"
              prepend-icon="mdi-account"
              :rules="[rules.required, rules.name]"
              :disabled="!editMode"
              required
            />
            <v-label class="mt-0">Birthdate</v-label>
            <v-row align="center" justify="center" class="ma-1 mb-5">
              <v-date-picker
                v-model="userInfo.birthDate"
                :disabled="!editMode"
              ></v-date-picker>
            </v-row>
            <v-text-field
              v-model="userInfo.address"
              type="text"
              label="Address"
              prepend-icon="mdi-home"
              :rules="[rules.required]"
              :disabled="!editMode"
              required
            />
            <v-text-field
              v-model="userInfo.ssin"
              type="text"
              label="Ssn"
              prepend-icon="mdi-card-account-details"
              :rules="[rules.number, rules.length13]"
              :counter="13"
              :disabled="!editMode"
              required
            />
            <v-label>Gender</v-label>
            <v-radio-group v-model="userInfo.gender" :disabled="!editMode" row>
              <v-radio label="Male" value="male"></v-radio>
              <v-radio label="Female" value="female"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import {
  LoginActions,
  SignUpCredentials,
  UserGender,
  LoginGetters,
  UserRole
} from "@/types";
import { loginRules as rules, Rule } from "../rules";
import UploadPortfolio from "@/views/UploadPortfolio.vue";

const todayDate = new Date().toISOString().substr(0, 10);

@Component({
  components: { UploadPortfolio }
})
export default class Profile extends Vue {
  private UserRole = UserRole;
  private isValid = true;
  private editMode = false;
  private userInfo = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    birthDate: todayDate,
    address: "",
    ssin: "",
    gender: UserGender.Male
  };
  private rules: {} = rules;

  @Getter(LoginGetters.getUser) private user!: any;
  @Action(LoginActions.signUp)
  private signUp!: (credentials: SignUpCredentials) => void;

  validate() {
    (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  resetValidation() {
    (this.$refs.form as Vue & {
      resetValidation: () => boolean;
    }).resetValidation();
  }

  cancelEditMode() {
    this.renderUser();
    this.toggleEditMode();
  }

  toggleEditMode() {
    if (this.editMode) this.resetValidation();
    else this.validate();

    this.editMode = !this.editMode;
  }

  renderUser() {
    this.userInfo.username = this.user.username;
    this.userInfo.email = this.user.email;
    this.userInfo.firstName = this.user.firstName;
    this.userInfo.lastName = this.user.lastName;
    this.userInfo.address = this.user.address;
    this.userInfo.birthDate = this.user.birthDate.substr(0, 10);
    this.userInfo.ssin = this.user.ssin;
    this.userInfo.gender = this.user.gender;
  }

  mounted() {
    this.resetValidation();
    this.renderUser();
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
