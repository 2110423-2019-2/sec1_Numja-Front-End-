<template>
  <v-col>
    <v-data-table
      :headers="headers"
      :items="tutors"
      class="elevation-1"
      item-key="name"
      :search="search"
      dense
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title> <h2>Verify Tutor</h2></v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:item.verified="{ item }">
        <v-chip
          v-if="item.verified"
          class="ma-2"
          color="primary"
          dark
          outlined
          pill
        >
          Verified
          <v-icon right>mdi-account-outline</v-icon>
        </v-chip>
        <v-chip
          v-if="!item.verified"
          class="ma-2"
          color="error accent-4"
          outlined
          pill
        >
          Unverified
          <v-icon right>mdi-account-outline</v-icon>
        </v-chip>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn
          v-if="!item.verified"
          color="primary"
          small
          dark
          @click="verifyTutor(item)"
          >Verify</v-btn
        >
        <v-btn v-else color="secondary" small @click="unverifyTutor(item)"
          >Unverify</v-btn
        >
      </template>
      <template v-slot:item.downloadAction="{ item }">
        <v-btn
          small
          color="blue-grey"
          class="ma-2 white--text"
          fab
          @click="download(item)"
          v-if="fileList.includes(item._id)"
        >
          <v-icon dark>mdi-cloud-download</v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data> </template>
    </v-data-table>
  </v-col>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import { VerifyActions, User } from "@/types";
import { VerifyRowItem } from "@/types";
import { SnackbarActions } from "@/types/snackbar";
import axios from "axios";

@Component
export default class Verify extends Vue {
  @State(state => state.verify.isFetching) isFetching!: boolean;
  @State(state => state.verify.isSuccess) isSuccess!: boolean;
  @State(state => state.verify.isError) isError!: boolean;
  @State(state => state.verify.tutors) tutors!: Partial<User>[];
  @State(state => state.verify.fileList) fileList!: string[];

  @Action(VerifyActions.fetchTutors) fetchTutors!: Function;
  @Action(VerifyActions.fetchFileList) fetchFileList!: Function;
  @Action(SnackbarActions.push) pushNewNotification!: Function;

  private search = "";
  private isloading = false;
  private editedIndex = -1;
  private editedItem = null;
  private headers = [
    {
      text: "Status",
      value: "verified",
      align: "center",
      class: "success--text title"
    },
    { text: "Username", value: "username" },
    { text: "Firstname", value: "firstName" },
    { text: "Surname", value: "lastName" },
    {
      text: "Uploaded File",
      value: "downloadAction",
      sortable: false,
      align: "center"
    },
    { text: "Actions", value: "action", align: "center", sortable: false }
  ];

  mounted() {
    this.fetchTutors();
    this.fetchFileList();
  }

  async verifyTutor(item: VerifyRowItem) {
    this.isloading = true;
    const response = await Vue.axios.post(`admin/verifyTutor/${item._id}`);
    if (response.status === 201) {
      if (response.data.verified) {
        item.verified = true;
        this.pushNotification("success", "Verify Succeeded");
        this.save(item);
      } else {
        this.pushNotification("error", "could not verify right now");
      }
    } else {
      this.pushNotification("error", "error occured");
    }
    this.isloading = false;
  }

  async unverifyTutor(item: VerifyRowItem) {
    this.isloading = true;
    const response = await Vue.axios.post(`admin/unverifyTutor/${item._id}`);
    if (response.status === 201) {
      if (!response.data.verified) {
        item.verified = false;
        this.pushNotification("success", "Unverify Succeeded");
        this.save(item);
      } else {
        this.pushNotification("error", "could not unverify right now");
      }
    } else {
      this.pushNotification("error", "error occured");
    }
    this.isloading = false;
  }

  save(item: VerifyRowItem) {
    this.editedIndex = this.tutors.indexOf(item);
    if (this.editedIndex > -1) {
      Object.assign(this.tutors[this.editedIndex], item);
    }
  }

  pushNotification(color: string, messages: string) {
    this.pushNewNotification({ color: color, message: messages });
  }

  async download(item: VerifyRowItem) {
    try {
      const response = await Vue.axios.get(
        `admin/portfolio/download/${item._id}`
      );
      const link = document.createElement("a");
      link.href = response.data.signedUrl;
      link.target = "_blank";
      document.body.appendChild(link);
      this.pushNotification("success", "file load finished");
      setTimeout(() => link.click(), 300);
    } catch (e) {
      this.pushNotification("error", "file not exist");
    }
  }
}
</script>
<style lang="scss" scoped>
.container.fill-height {
  align-items: baseline;
}
</style>
