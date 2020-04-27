import { StoreOptions } from "vuex";
import {
  ChatState,
  ChatGetters,
  ChatMutation,
  ChatAction,
  Message
} from "@/types";
import firebase from "firebase/app";
import "firebase/firestore";

let messageCol: firebase.firestore.CollectionReference;

const store: StoreOptions<ChatState> = {
  state: {
    fetchingChat: false,
    roomKey: undefined,
    messages: []
  },
  getters: {
    [ChatGetters.isFetchingChat]: state => state.fetchingChat,
    [ChatGetters.messages]: state =>
      state.messages.sort(
        (a, b) => a.timestamp?.toMillis()! - b.timestamp?.toMillis()!
      )
  },
  mutations: {
    [ChatMutation.setFetchingChat]: (state, payload: boolean) => {
      state.fetchingChat = payload;
    },
    [ChatMutation.setMessages]: (state, payload: Message[]) => {
      state.messages = payload;
    },
    [ChatMutation.addMessage]: (state, payload: Message) => {
      state.messages = [...state.messages, payload];
    }
  },
  actions: {
    [ChatAction.subscribe]: async ({ commit }, roomKey: string) => {
      if (!messageCol) {
        messageCol = firebase
          .firestore()
          .collection("chats")
          .doc(roomKey)
          .collection("messages");
      }

      commit(ChatMutation.setMessages, []);

      messageCol.onSnapshot(
        querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
            if (change.type === "added") {
              commit(
                ChatMutation.addMessage,
                change.doc.data({ serverTimestamps: "estimate" })
              );
            }
          });
        },
        err => {
          console.log(err);
        }
      );
    },
    [ChatAction.sendMessage]: (_, message: Message) => {
      messageCol.doc().set({
        ...message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    },
    [ChatAction.unsubscribe]: ({ commit }) => {
      commit(ChatMutation.setMessages, []);
      /* eslint-disable-next-line @typescript-eslint/no-empty-function */
      const unsub = messageCol.onSnapshot(() => {});
      unsub();
    }
  }
};

export default store;
