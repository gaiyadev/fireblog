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
import animateCss from "animate.css";
import wowJs from "wowjs";
import VueProgressBar from 'vue-progressbar';

Vue.config.productionTip = false;
Vue.use(VuePageTransition);
Vue.component("alert", alertComp);
Vue.use(Toast, options);
Vue.use(animateCss);
Vue.use(wowJs);

const barOptions = {
  color: '#2196F3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, barOptions);

const options = {
  // You can set your default options here
  timeout: 3500,
  draggable: true,
  closeOnClick: false
};

let firebaseConfig = {
  
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

    this.$store.dispatch("getDBLoadedPost").then(() => {

    }).catch(error => {
      console.log(error);
    });
  }
}).$mount("#app");
