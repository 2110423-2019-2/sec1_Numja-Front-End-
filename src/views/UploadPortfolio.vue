<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="50%">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">
          Upload Portfolio
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline lighten-2" primary-title>
          Upload Portfolio
        </v-card-title>

        <v-file-input
          outlined
          label="Select file (PDF)"
          accept=".pdf"
          prepend-icon=""
          prepend-inner-icon="mdi-file"
          class="mx-3 mt-5"
          v-model="file"
        ></v-file-input>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="cancel">
            Cancel
          </v-btn>
          <v-btn color="primary" text @click="submit" :disabled="!file">
            Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";
import { UserActions } from "@/types";

@Component
export default class UploadPortfolio extends Vue {
  @Action(UserActions.uploadPortfolio) uploadPortfolio!: Function;

  private dialog = false;
  private file: any = null;

  submit() {
    const formData = new FormData();
    formData.append("file", this.file);
    this.uploadPortfolio(formData);
    this.dialog = false;
  }

  cancel() {
    this.file = null;
    this.dialog = false;
  }
}
</script>

<style scoped></style>
