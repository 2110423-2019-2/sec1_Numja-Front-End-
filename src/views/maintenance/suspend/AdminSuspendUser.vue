<template>
  <v-col>
    <h1>Activate/Suspend User</h1>
    <div class="d-flex my-2 justify-space-around">
      <div
        v-for="(iconInfo, i) in iconDescription"
        :key="'icon_' + i"
        :style="{ color: iconInfo.color }"
      >
        <v-icon :color="iconInfo.color">{{ iconInfo.icon }}</v-icon>
        {{ iconInfo.meaning }}
      </div>
    </div>
    <template>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item.role="{ item }">
          <div v-if="item.role === UserRole.Tutor" class="d-flex">
            <v-icon color="#4DD0E1">mdi-teach</v-icon>
          </div>
          <div v-else class="d-flex user-role">
            <v-icon color="#AED581">mdi-face-outline</v-icon>
          </div>
        </template>
        <template v-slot:item.status="{ item }">
          <div v-if="item.status === UserStatus.Active" class="d-flex">
            <v-icon color="#42A5F5">mdi-account-check</v-icon>
          </div>
          <div v-else class="d-flex">
            <v-icon color="#E64A19">mdi-account-off</v-icon>
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <v-chip
            v-if="item.status === UserStatus.Active"
            color="#E64A19"
            outlined
            class="v-chip--clickable"
            @click="suspend(item._id)"
          >
            <div class="ma-1">Suspend</div>
            <v-icon>mdi-close-thick</v-icon>
          </v-chip>
          <v-chip
            v-else
            color="#42A5F5"
            outlined
            class="v-chip--clickable"
            @click="activate(item._id)"
          >
            <div class="ma-1">Activate</div>
            <v-icon>mdi-check-bold</v-icon>
          </v-chip>
        </template>
      </v-data-table>
    </template>
    <v-btn @click="fetchUsers" class="ma-2">fetch</v-btn>
    <UploadPortfolio />
  </v-col>
</template>

<script lang="ts">
import UploadPortfolio from "@/views/UploadPortfolio.vue";
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";
import {
  SuspendActions,
  SuspendGetters,
  User,
  UserActions,
  UserGetters
} from "@/types";
import { UserStatus, UserRole } from "@/types";

@Component({
  components: { UploadPortfolio }
})
export default class AdminSuspendUser extends Vue {
  @State(state => state.suspendUser.isFetching) isFetching!: boolean;
  @State(state => state.suspendUser.isSuccess) isSuccess!: boolean;
  @State(state => state.suspendUser.isError) isError!: boolean;
  @Getter(UserGetters.getNonAdminUsers) users!: Partial<User>[];
  @Action(UserActions.fetchUsers) fetchUsers!: Function;
  @Action(SuspendActions.suspend) suspendAction!: Function;
  @Action(SuspendActions.activate) activateAction!: Function;

  private UserStatus = UserStatus;
  private UserRole = UserRole;

  private headers = [
    { text: "Username", value: "username" },
    { text: "Firstname", value: "firstName" },
    { text: "Lastname", value: "lastName" },
    { text: "Role", value: "role" },
    { text: "Status", value: "status" },
    { text: "Action", value: "action", sortable: false, align: "center" }
  ];

  private iconDescription = [
    { icon: "mdi-face-outline", meaning: "Student", color: "#AED581" },
    { icon: "mdi-teach", meaning: "Tutor", color: "#4DD0E1" },
    { icon: "mdi-account-check", meaning: "Active", color: "#42A5F5" },
    { icon: "mdi-account-off", meaning: "Suspended", color: "#E64A19" }
  ];
  mounted() {
    this.fetchUsers();
  }

  suspend(id: string) {
    this.suspendAction({ id });
  }

  activate(id: string) {
    this.activateAction({ id });
  }
}
</script>
