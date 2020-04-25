<template>
  <v-row justify="center" align="center" v-if="myUser.role !== 'admin'">
    <v-col cols="12" sm="9" md="5">
      <v-dialog v-model="dialog" width="600">
        <template v-slot:activator="{ on }">
          <v-card>
            <v-data-table
              :headers="headers"
              :items="tutors"
              :items-per-page="10"
              class="elevation-1"
              :search="search"
            >
              <template v-slot:top>
                <v-card-title v-if="!searchMode">
                  Tutors List
                  <v-spacer></v-spacer>
                  <v-icon class="mr-3" @click="setSearchMode(true)"
                    >mdi-magnify</v-icon
                  >
                  <v-icon @click="fetchUsers">mdi-refresh</v-icon>
                </v-card-title>
                <v-card-title v-else>
                  <v-text-field
                    v-model="search"
                    label="Search"
                    single-line
                    hide-details
                    append-icon="mdi-close-circle"
                    @click:append="setSearchMode(false)"
                  ></v-text-field>
                </v-card-title>
              </template>
              <template v-slot:item.verified="{ item }">
                <v-icon color="primary" v-if="item.verified"
                  >mdi-check-circle</v-icon
                >
              </template>
              <template
                v-if="myUser && myUser.role !== 'tutor'"
                v-slot:item.actions="{ item }"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-btn
                    class="ma-2"
                    color="primary"
                    :outlined="!hover"
                    @click="selectItem(item)"
                    v-on="on"
                  >
                    <v-icon left>mdi-plus-circle</v-icon>Reserve
                  </v-btn>
                </v-hover>
              </template>
            </v-data-table>
          </v-card>
        </template>
        <v-card elevation="8">
          <v-banner sticky color="primary" dark class="pa-2" elevation="6">{{
            `create appointment : ${selectedUserName}`
          }}</v-banner>

          <v-form @submit.prevent="submit" v-model="formIsValid" ref="form">
            <v-card-text class="px-6">
              <v-label class="mt-0">Date</v-label>
              <v-row align="center" justify="center" class="ma-1 mb-5">
                <v-date-picker
                  v-model="date"
                  :allowed-dates="allowedDates"
                ></v-date-picker>
              </v-row>
              <v-label class="mt-0">Start Time</v-label>
              <v-row align="center" justify="center" class="ma-1 mb-5">
                <v-time-picker
                  v-model="startTime"
                  class="mt-2"
                  landscape
                  format="ampm"
                ></v-time-picker>
              </v-row>
              <v-label class="mt-0">End Time</v-label>
              <v-row align="center" justify="center" class="ma-1 mb-5">
                <v-time-picker
                  v-model="endTime"
                  class="mt-2"
                  landscape
                  format="ampm"
                ></v-time-picker>
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
                v-model="price"
                type="number"
                label="Price"
                prepend-icon="mdi-cash"
                :rules="[rules.notNegative, rules.required, rules.limit200k]"
                suffix="baht"
                required
              />
            </v-card-text>

            <v-card-actions class="pa-6 pt-0">
              <v-spacer />
              <v-btn text @click="closeModal">cancel</v-btn>
              <v-btn color="primary" type="submit">create</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog v-model="timeErrorDialog" max-width="500px">
        <v-card>
          <v-card-title>Error</v-card-title>
          <v-card-text>{{ timeErrorMessage }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="timeErrorDialog = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { appointmentRules as rules } from "../rules";
import {
  LoginGetters,
  LoginActions,
  AppointmentGetters,
  UsersGetters,
  UsersActions,
  User
} from "../types";

@Component
export default class Home extends Vue {
  @Action(LoginActions.protectedRedirect)
  private protectedRedirect!: () => void;
  @Action(UsersActions.fetchUsers)
  private fetchUsers!: () => void;
  @Action(UsersActions.updateUser)
  private updateUser!: () => void;

  @Getter(UsersGetters.getTutors) private tutors!: User[];

  @Getter(LoginGetters.getUser) private myUser!: User;

  private allowedDates = (val: string) => {
    const todayDate = new Date();
    const targetDate = new Date(val);
    return targetDate > todayDate;
  };
  private headers = [
    {
      text: "first name",
      align: "start",
      value: "firstName"
    },
    {
      text: "last name",
      value: "lastName"
    },
    {
      text: "gender",
      value: "gender"
    },
    {
      text: "verified",
      value: "verified"
    },
    { text: "", value: "actions", sortable: false }
  ];

  private formIsValid = true;
  private search = "";
  private searchMode = false;
  private dialog = false;
  private timeErrorDialog = false;
  private timeErrorMessage = "";
  private selectedUserId = "";
  private selectedUserName = "";
  private rules = rules;

  private date: string = this.todayDate()
    .toISOString()
    .substr(0, 10);
  private startTime = "00:00";
  private endTime = "00:00";
  private address = "";
  private price = 0;

  mounted() {
    this.protectedRedirect();
    this.fetchUsers();
  }

  setSearchMode(searchMode: boolean) {
    this.searchMode = searchMode;
  }

  selectItem(item: User) {
    this.selectedUserName = `${item.firstName} ${item.lastName}`;
    this.selectedUserId = `${item._id}`;
  }

  private combineDateAndTime(date: string, time: string) {
    const generatedDate = new Date(date);
    const [hours, minutes] = time.split(":");
    generatedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return generatedDate.toUTCString();
  }

  closeModal() {
    this.dialog = false;
    this.resetForm();
  }

  async submit() {
    this.validate();
    if (this.formIsValid && this.validateTime()) {
      try {
        const response = await Vue.axios.post("/appointment/create", {
          startTime: this.combineDateAndTime(this.date, this.startTime),
          endTime: this.combineDateAndTime(this.date, this.endTime),
          location: this.address,
          price: this.price,
          tutorId: this.selectedUserId
        });
        await this.updateUser();
        this.closeModal();
      } catch (error) {
        this.timeErrorDialog = true;
        if (error.toString().includes("400")) {
          this.timeErrorMessage =
            "overlapped appointment on your or tutor schedule or insufficient credit";
        } else {
          this.timeErrorMessage = "something is wrong with the server";
        }
      }
    }
  }

  validateTime() {
    if (new Date(this.date) < this.todayDate()) {
      this.timeErrorDialog = true;
      this.timeErrorMessage = "cannot make appointment on selected date";
      return false;
    } else if (this.endTime <= this.startTime) {
      this.timeErrorDialog = true;
      this.timeErrorMessage = "end time must be after start time";
      return false;
    } else {
      return true;
    }
  }

  validate() {
    (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  resetForm() {
    (this.$refs.form as Vue & { reset: () => void }).reset();
    this.startTime = "00:00";
    this.endTime = "00:00";
    this.date = this.todayDate()
      .toISOString()
      .substring(0, 10);
  }

  todayDate() {
    return new Date();
  }
}
</script>
