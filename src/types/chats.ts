import { Message } from "./chat";

export interface ChatRoom {
  roomKey: string;
  members: string[];
  messages: Message[];
}

export interface ChatsState {
  fetchingChats: boolean;
  rooms: ChatRoom[];
}

export enum ChatsGetters {
  isFetchingChats = "isFetchingChats",
  rooms = "rooms"
}

export enum ChatsMutations {
  setFetchingChats = "setFetchingChats",
  clearRooms = "clearRooms",
  addRoom = "addRoom"
}

export enum ChatsActions {
  subscribe = "subscribe",
  unsubscribe = "unsubscribe",
  addRoom = "addRoom"
}
