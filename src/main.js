import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase";
import VuePageTransition from 'vue-page-transition';
import alertComp from "./components/Alert.vue";
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";


Vue.config.productionTip = false;
Vue.use(VuePageTransition);
Vue.component("alert", alertComp);
Vue.use(Toast, options);

const options = {
  // You can set your default options here
  timeout: 3500,
  draggable: true,
  closeOnClick: false
};

let firebaseConfig = {
  apiKey: "AIzaSyDGCtobydCVNFazi7A4jYjqWmXopPp-a4w",
  authDomain: "fireblog-b75a0.firebaseapp.com",
  databaseURL: "https://fireblog-b75a0.firebaseio.com",
  projectId: "fireblog-b75a0",
  storageBucket: "fireblog-b75a0.appspot.com",
  messagingSenderId: "467737114388",
  appId: "1:467737114388:web:cec14dd5f1d4adbe3a7401"
};
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user);
      }
    });
  }
}).$mount("#app");
