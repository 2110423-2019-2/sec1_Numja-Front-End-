<template>
  <div id="container">
    <v-layout id="chat-container">
      <Messages :senderId="senderId" />
    </v-layout>
    <v-form @submit.prevent="submit" id="message-input">
      <v-text-field
        v-model="text"
        placeholder="Enter message here"
        outlined
        rounded
        clearable
        append-icon="mdi-send"
        @click:append="submit"
      />
    </v-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { ChatAction, ChatUsers, ChatGetters, Message } from "@/types";

@Component({
  components: {
    Messages: () =>
      import(/* webpackChunkName: "messages" */ "@/components/Messages.vue")
  }
})
export default class Chat extends Vue {
  @Getter(ChatGetters.messages) private messages!: Message[];
  @Action(ChatAction.subscribe) private subscribe!: (
    payload: ChatUsers
  ) => Promise<void>;
  @Action(ChatAction.sendMessage) private sendMessage!: (
    payload: Message
  ) => void;
  @Action(ChatAction.unsubscribe) private unsubscribe!: () => void;

  private text: string | undefined = "";
  private user = { _id: "test1" };
  private senderId = this.user._id;

  private mounted() {
    this.subscribe({ senderId: this.senderId, receiverId: "test2" });
  }

  private destroyed() {
    this.unsubscribe();
  }

  private submit() {
    this.sendMessage({
      senderId: this.senderId,
      receiverId: "test3",
      text: this.text!
    });
    this.text = undefined;
  }

  @Watch("messages")
  scrollToEnd() {
    this.$nextTick(() => {
      const container = this.$el.querySelector("#chat-container");
      container!.scrollTop = container!.scrollHeight;
    });
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
