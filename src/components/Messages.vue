<template>
  <v-list width="100%" ref="list">
    <template v-for="(message, i) of messages">
      <v-list-item :key="i">
        <v-list-item-icon>
          <v-icon large>mdi-account-circle</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">{{
            message.senderId
          }}</v-list-item-title>
          <v-list-item-subtitle>{{
            getDateString(message.timestamp)
          }}</v-list-item-subtitle>
          <p class="my-2">{{ message.text }}</p>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-if="i < messages.length - 1" :key="i" />
    </template>
  </v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { ChatGetters, Message } from "@/types";

@Component
export default class Messages extends Vue {
  @Prop() private senderId!: string;
  @Getter(ChatGetters.messages) private messages!: Message[];

  private getDateString(timestamp: firebase.firestore.Timestamp) {
    const date = timestamp.toDate();
    return (
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() + 543} ` +
      `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`
    );
  }

  private isSender(userId: string) {
    return userId === this.senderId;
  }
}
</script>
