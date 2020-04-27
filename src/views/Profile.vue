<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="9" md="5">
      <v-card elevation="8">
        <v-toolbar color="primary" dark>
          <v-row class="px-5" justify="space-between" align="center">
            <v-toolbar-title class="px-2">Profile</v-toolbar-title>
            <v-row class="justify-end">
              <UploadPortfolio v-if="user.role === UserRole.Tutor" />
            </v-row>
          </v-row>
        </v-toolbar>

        <v-form @submit.prevent="submit" ref="form">
          <v-card-text class="px-6">
            <v-text-field
              v-model="userInfo.username"
              type="text"
              label="Username"
              :rules="[rules.required]"
              prepend-icon="mdi-account"
              readonly
              required
            />
            <v-text-field
              v-model="userInfo.role"
              type="text"
              label="Role"
              prepend-icon="mdi-account"
              readonly
            />
            <v-text-field
              v-model="userInfo.credit"
              type="number"
              label="Credit"
              prepend-icon="mdi-cash"
              readonly
              required
            >
              <template v-slot:append-outer>
                <v-btn
                  color="secondary"
                  @click="
                    () => {
                      showCreditWindow = true;
                    }
                  "
                  >Handle</v-btn
                >
              </template>
            </v-text-field>
            <v-text-field
              v-model="userInfo.email"
              type="email"
              label="Email"
              prepend-icon="mdi-email"
              :rules="[rules.email, rules.required]"
              readonly
              required
            />
            <v-text-field
              v-model="userInfo.firstName"
              type="text"
              label="First Name"
              prepend-icon="mdi-account"
              :rules="[rules.required, rules.name]"
              readonly
              required
            />
            <v-text-field
              v-model="userInfo.lastName"
              type="text"
              label="Last Name"
              prepend-icon="mdi-account"
              :rules="[rules.required, rules.name]"
              readonly
              required
            />
            <v-label class="mt-0">Birthdate</v-label>
            <v-row align="center" justify="center" class="ma-1 mb-5">
              <v-date-picker
                v-model="userInfo.birthDate"
                readonly
              ></v-date-picker>
            </v-row>
            <v-text-field
              v-model="userInfo.address"
              type="text"
              label="Address"
              prepend-icon="mdi-home"
              :rules="[rules.required]"
              readonly
              required
            />
            <v-text-field
              v-model="userInfo.ssin"
              type="text"
              label="Ssn"
              prepend-icon="mdi-card-account-details"
              :rules="[rules.number, rules.length13]"
              :counter="13"
              readonly
              required
            />
            <v-label>Gender</v-label>
            <v-radio-group v-model="userInfo.gender" readonly row>
              <v-radio label="Male" value="male"></v-radio>
              <v-radio label="Female" value="female"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-form>
      </v-card>
      <v-dialog v-model="showCreditWindow" max-width="600px">
        <v-card>
          <v-form
            @submit.prevent="handleCreditSubmit"
            ref="credit-form"
            v-model="creditFormValid"
          >
            <v-banner
              class="pa-2"
              sticky
              single-line
              color="primary"
              dark
              elevation="6"
            >
              My Credit
              <template v-slot:actions>
                <v-btn
                  color="secondary"
                  :loading="userStoreFetching"
                  type="submit"
                  :disabled="!creditFormValid"
                  >Submit</v-btn
                >
              </template>
            </v-banner>
            <v-card-text class="pa-6">
              <v-row class="d-flex flex-row mx-6">
                <v-col>
                  <v-text-field
                    type="number"
                    v-model="amount"
                    label="amount"
                    :prefix="`${currentHandleMode} : `"
                    suffix="baht"
                    :rules="[creditRules.positiveNumber]"
                    :error="userInfo.credit + amount * multiplier < 0"
                    :error-messages="
                      userInfo.credit + amount * multiplier < 0
                        ? 'new total must be atleast 0 baht'
                        : ''
                    "
                  />
                </v-col>
              </v-row>
              <v-row class="d-flex flex-row justify-center">
                {{
                  `Your total credit is ${
                    user.credit
                  } baht and new total will be ${user.credit +
                    amount * multiplier} baht`
                }}
              </v-row>
            </v-card-text>
          </v-form>
        </v-card>
      </v-dialog>
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
  UserRole,
  UsersGetters,
  UsersActions
} from "@/types";
import { loginRules as rules, Rule, creditRules } from "../rules";
import UploadPortfolio from "@/views/UploadPortfolio.vue";

const todayDate = new Date().toISOString().substr(0, 10);

@Component({
  components: { UploadPortfolio }
})
export default class Profile extends Vue {
  private UserRole = UserRole;
  private userInfo = {
    username: "",
    credit: 0,
    email: "",
    firstName: "",
    lastName: "",
    birthDate: todayDate,
    address: "",
    ssin: "",
    gender: UserGender.Male,
    role: ""
  };
  private rules: {} = rules;
  private creditRules: {} = creditRules;

  @Getter(LoginGetters.getUser) private user!: any;

  private creditFormValid = true;
  private showCreditWindow = false;
  private creditHandleMode: string[] = ["top up", "withdraw"];
  private currentHandleMode: string = this.creditHandleMode[0];
  private amount = 1;
  private multiplier = 1;
  @Getter(UsersGetters.getFetching) private userStoreFetching!: boolean;
  @Action(UsersActions.topup) private topup!: (amount: number) => void;
  @Action(UsersActions.withdraw) private withdraw!: (amount: number) => void;
  @Action(UsersActions.updateUser) private updateUser!: () => void;

  async handleCreditSubmit() {
    if (this.userInfo.credit + this.amount * this.multiplier >= 0) {
      if (this.multiplier < 0) {
        await this.withdraw(parseInt(this.amount.toString()));
      } else {
        await this.topup(parseInt(this.amount.toString()));
      }
      this.renderUser();
      this.showCreditWindow = false;
    }
  }

  renderUser() {
    this.userInfo.username = this.user.username;
    this.userInfo.credit = this.user.credit;
    this.userInfo.email = this.user.email;
    this.userInfo.firstName = this.user.firstName;
    this.userInfo.lastName = this.user.lastName;
    this.userInfo.address = this.user.address;
    this.userInfo.birthDate = this.user.birthDate.substr(0, 10);
    this.userInfo.ssin = this.user.ssin;
    this.userInfo.gender = this.user.gender;
    this.userInfo.role = this.user.role;

    if (this.user.role === "student") {
      this.multiplier = 1;
      this.currentHandleMode = this.creditHandleMode[0];
    } else if (this.user.role === "tutor") {
      this.multiplier = -1;
      this.currentHandleMode = this.creditHandleMode[1];
    }
  }

  async refresh() {
    await this.updateUser();
    this.renderUser();
  }

  mounted() {
    this.refresh();
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
