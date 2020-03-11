<template>
  <div>
    <h1>Activate/Suspend User</h1>
    <v-simple-table class="elevation-2" fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Username</th>
            <th class="text-left">Firstname</th>
            <th class="text-left">Lastname</th>
            <th class="text-left">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.status }}</td>
            <td>
              <v-btn
                v-if="user.status === UserStatus.Active"
                color="error"
                @click="suspend(user.id)"
                >Suspend</v-btn
              >
              <v-btn v-else color="success" @click="activate(user.id)"
                >Activate</v-btn
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn @click="fetchUsers" class="ma-2">fetch</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";
import { SuspendActions, SuspendGetters, User } from "@/types";
import { UserStatus } from "@/types";

@Component
export default class AdminSuspendUser extends Vue {
  @State(state => state.suspendUser.isFetching) isFetching!: boolean;
  @State(state => state.suspendUser.isSuccess) isSuccess!: boolean;
  @State(state => state.suspendUser.isError) isError!: boolean;
  @Getter(SuspendGetters.getUsers) users!: Partial<User>[];
  @Action(SuspendActions.fetchUsers) fetchUsers!: Function;
  @Action(SuspendActions.suspend) suspendAction!: Function;
  @Action(SuspendActions.activate) activateAction!: Function;

  private UserStatus = UserStatus;

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

<style scoped></style>
