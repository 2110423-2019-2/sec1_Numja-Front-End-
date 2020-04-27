<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="isOpen" :color="color">
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class SnackbarNotification extends Vue {
  @State(state => state.snackbar.isOpen) isOpen!: boolean;
  @State(state => state.snackbar.color) color!: string;
  @State(state => state.snackbar.message) message!: string;
}
</script>

<style scoped></style>
