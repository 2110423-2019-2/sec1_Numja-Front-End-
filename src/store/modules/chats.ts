import { StoreOptions } from "vuex";
import {
  ChatsState,
  ChatsGetters,
  ChatsMutations,
  ChatsActions,
  ChatRoom
} from "@/types/chats";
import loginStore from "@/store";
import firebase from "firebase/app";
import "firebase/firestore";
import { LoginGetters } from "@/types";

let chatsCol: firebase.firestore.CollectionReference;

const store: StoreOptions<ChatsState> = {
  state: {
    fetchingChats: false,
    rooms: []
  },
  getters: {
    [ChatsGetters.isFetchingChats]: state => state.fetchingChats,
    [ChatsGetters.rooms]: state => state.rooms
  },
  mutations: {
    [ChatsMutations.setFetchingChats]: (state, payload: boolean) => {
      state.fetchingChats = payload;
    },
    [ChatsMutations.clearRooms]: state => {
      state.rooms = [];
    },
    [ChatsMutations.addRoom]: (state, payload: ChatRoom) => {
      state.rooms = [...state.rooms, payload];
    }
  },
  actions: {
    [ChatsActions.subscribe]: ({ commit }) => {
      if (!chatsCol) {
        chatsCol = firebase.firestore().collection("chats");
      }

      commit(ChatsMutations.clearRooms);
      commit(ChatsMutations.setFetchingChats, true);

      chatsCol
        .where(
          "members",
          "array-contains",
          loginStore.getters[LoginGetters.getUser]._id
        )
        .onSnapshot(
          query => {
            query.docChanges().forEach(change => {
              const room = {
                roomKey: change.doc.id,
                ...(change.doc.data() as ChatRoom)
              };
              commit(ChatsMutations.addRoom, room);
            });
            commit(ChatsMutations.setFetchingChats, false);
          },
          err => {
            console.log(err);
          }
        );
    },
    [ChatsActions.unsubscribe]: ({ commit }) => {
      commit(ChatsMutations.clearRooms);
      /* eslint-disable-next-line @typescript-eslint/no-empty-function */
      const unsub = chatsCol.onSnapshot(() => {});
      unsub();
    },
    [ChatsActions.addRoom]: (_, payload) => {
      chatsCol.doc().set(payload);
    }
  }
};

export default store;
