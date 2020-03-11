import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/analytics";
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
