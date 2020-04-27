export interface ChatState {
  fetchingChat: boolean;
  roomKey?: string;
  messages: Message[];
}

export interface Message {
  senderId: string;
  text: string;
  timestamp?: firebase.firestore.Timestamp;
}

export enum ChatGetters {
  isFetchingChat = "isFetchingChat",
  messages = "messages"
}

export enum ChatMutation {
  setFetchingChat = "setFetchingChat",
  setMessages = "setMessages",
  addMessage = "addMessage"
}

export enum ChatAction {
  subscribe = "subscribe",
  sendMessage = "sendMessage",
  unsubscribe = "unsubscribe"
}
