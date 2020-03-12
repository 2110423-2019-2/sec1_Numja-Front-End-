export interface ChatState {
  fetchingChat: boolean;
  messages: Message[];
}

export interface ChatUsers {
  senderId: string;
  receiverId: string;
}

export interface Message extends ChatUsers {
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
