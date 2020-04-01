<template>
  <v-list three-line width="100%" ref="list">
    <template v-for="(message, i) of getMessages">
      <v-list-item :key="'message_' + i">
        <v-list-item-avatar>
          <v-img :src="message.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">{{
            message.sender
          }}</v-list-item-title>
          <v-list-item-subtitle>{{
            message.date
          }}</v-list-item-subtitle>
          <p class="my-2">{{ message.text }}</p>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-if="i < messages.length - 1" :key="'div_' + i" />
    </template>
  </v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { ChatGetters, Message, UsersGetters } from "@/types";

@Component
export default class Messages extends Vue {
  @Getter(ChatGetters.messages) private messages!: Message[];
  @Getter(UsersGetters.getUserById) private getUserById!: Function;

  get getMessages() {
    return this.messages.map(message => {
      return {
        ...message,
        sender: this.getUserById(message.senderId).username,
        avatar: 'https://picsum.photos/200',
        date: this.getDateString(message.timestamp!)
      }
    })
  }

  private getDateString(timestamp: firebase.firestore.Timestamp) {
    const date = timestamp.toDate();
    return (
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() + 543} ` +
      `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`
    );
  }
}
</script>
