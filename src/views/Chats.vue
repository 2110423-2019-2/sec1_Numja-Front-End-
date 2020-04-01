<template>
  <v-row>
    <v-col class="pa-0" cols="3">
      <v-progress-linear v-if="fetching" indeterminate color="pink" />
      <v-card v-else class="container" outlined height="100%" tile>
        <v-card-title>Chats</v-card-title>
        <v-list>
          <template v-for="(room, i) of getRooms">
            <v-divider v-if="i > 0" :key="'div_' + room.roomKey" />
            <v-list-item
              :key="room.roomKey"
              @click="enterChatRoom(room.roomKey)"
            >
              <v-list-item-avatar>
                <v-img :src="room.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="room.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item class="mt-3">
            <v-btn width="100%" color="primary">
              <v-icon>mdi-plus</v-icon>Add chat
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>

    <v-col cols="9">
      <Chat :roomKey="roomKey" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Chat from "@/components/Chat.vue";
import { Getter, Action } from "vuex-class";
import {
  UsersActions,
  ChatsGetters,
  ChatRoom,
  ChatsActions,
  UsersGetters,
  LoginGetters,
  User
} from "@/types";

@Component({
  components: {
    Chat
  }
})
export default class Chats extends Vue {
  private roomKey = "";
  @Getter(ChatsGetters.isFetchingChats) private fetching!: boolean;
  @Getter(ChatsGetters.rooms) private rooms!: ChatRoom[];
  @Getter(UsersGetters.getUserById) private getUserById!: Function;
  @Getter(LoginGetters.getUser) private user!: User;
  @Action(UsersActions.fetchUsers) private fetchUsers!: Function;
  @Action(ChatsActions.subscribe) private subscribe!: Function;
  @Action(ChatsActions.unsubscribe) private unsubscribe!: Function;

  async mounted() {
    await this.fetchUsers();
    await this.subscribe();
  }

  destroyed() {
    this.unsubscribe();
  }

  get getRooms() {
    return this.rooms.map(room => {
      const other = room.members.find(member => member !== this.user._id);
      return {
        roomKey: room.roomKey,
        avatar: "https://picsum.photos/200",
        name: this.getUserById(other).username
      };
    });
  }

  private enterChatRoom(roomKey: string) {
    this.roomKey = roomKey;
  }
}
</script>
