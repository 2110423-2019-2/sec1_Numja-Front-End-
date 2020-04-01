<template>
  <div id="container">
    <template v-if="roomKey">
      <v-layout id="chat-container">
        <Messages />
      </v-layout>
      <v-form @submit.prevent="submit" id="message-input">
        <v-text-field
          v-model="text"
          :disabled="!roomKey"
          placeholder="Enter message here"
          outlined
          rounded
          clearable
          append-icon="mdi-send"
          @click:append="submit"
        />
      </v-form>
    </template>
    <div v-else>No selected chat</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { ChatAction, ChatGetters, Message, LoginGetters, User } from "@/types";

@Component({
  components: {
    Messages: () =>
      import(/* webpackChunkName: "messages" */ "@/components/Messages.vue")
  }
})
export default class Chat extends Vue {
  private text = "";
  @Prop() private roomKey!: string;
  @Getter(ChatGetters.messages) private messages!: Message[];
  @Getter(LoginGetters.getUser) private user!: User;
  @Action(ChatAction.subscribe) private subscribe!: (
    roomKey: string
  ) => Promise<void>;
  @Action(ChatAction.sendMessage) private sendMessage!: (
    payload: Message
  ) => void;
  @Action(ChatAction.unsubscribe) private unsubscribe!: () => void;

  private destroyed() {
    this.unsubscribe();
  }

  private submit() {
    this.sendMessage({
      senderId: this.user._id,
      text: this.text!
    });
    this.text = "";
  }

  @Watch("roomKey")
  subscribeToRoom() {
    console.log(this.roomKey);
    if (this.roomKey) {
      this.subscribe(this.roomKey);
    }
  }

  @Watch("messages")
  scrollToEnd() {
    if (this.roomKey) {
      this.$nextTick(() => {
        const container = this.$el.querySelector("#chat-container");
        container!.scrollTop = container!.scrollHeight;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: calc(100vh - 64px);
  position: relative;
}

#chat-container {
  height: calc(100% - 100px);
  overflow-y: auto;
}

#message-input {
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
