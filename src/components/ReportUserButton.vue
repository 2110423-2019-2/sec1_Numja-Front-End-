<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">
          Report User
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Report User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Title*"
                  required
                  v-model="title"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-textarea
                  label="Description*"
                  rows="1"
                  auto-grow
                  required
                  v-model="description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" dark @click="submitReport">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";
import { SnackbarActions } from "@/types";

@Component
export default class ReportUserButton extends Vue {
  @Action(SnackbarActions.push) pushNewNotification!: Function;
  @Action(SnackbarActions.reset) resetNotification!: Function;
  private dialog = false;
  private title = "";
  private description = "";

  async submitReport() {
    const reportData = {
      title: this.title,
      description: this.description,
      reportedUserId: this.$route.params.id
    };
    try {
      await Vue.axios.post("/report/user", reportData);
      this.pushNewNotification({
        color: "success",
        message: "Report Submitted"
      });
    } catch {
      this.pushNewNotification({
        color: "error",
        message: "Report Submission Failed"
      });
    }
    this.dismissAndClearInput();
  }

  dismissAndClearInput() {
    this.title = "";
    this.description = "";
    this.dialog = false;
  }
}
</script>

<style scoped></style>
