<template>
  <v-row justify="center" v-if="isLogin">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn fixed dark fab bottom right color="pink" v-on="on">
          <v-icon>mdi-alert-circle</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Report Problems</span>
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
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { LoginGetters } from "@/types";

@Component
export default class ReportSystemButton extends Vue {
  @Getter(LoginGetters.isLogin) isLogin!: boolean;
  private dialog = false;
  private title = "";
  private description = "";

  submitReport() {
    const reportData = { title: this.title, description: this.description };
    Vue.axios
      .post("/report/system", reportData)
      .then(res => {
        //alert user create report success
      })
      .catch(err => {
        //alert user report fail
      });
  }
}
</script>

<style scoped></style>
