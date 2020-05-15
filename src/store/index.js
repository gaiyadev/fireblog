import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //... Initial state of all blogpost
    loadedBlogPosts: [
      {
        imageURL: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        id: "adfadsgmkjlk11",
        title: "Web Development",
        time: "6:58pm",
        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore repudiandae delectus ipsum, modi amet harum provident nesciunt repellendus quas enim, expedita laborum dolores corporis aliquam placeat. Magni dolorum labore modi",
        location: "Kaduna",
        date: "2019-05-06"
      },
      {
        imageURL: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        id: "fjgfjgfjfgjjgmn1",
        title: "Graphics design",
        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore repudiandae delectus ipsum, modi amet harum provident nesciunt repellendus quas enim, expedita laborum dolores corporis aliquam placeat. Magni dolorum labore modi",
        time: "6:58pm",
        location: "Kaduna",
        date: "2019-05-06"
      },
      {
        imageURL: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        id: "gtrgtrgrtrththt2",
        title: "Digital marketing",
        time: "6:58pm",
        content: " lohteeththththtrhrthrthrthrt3",
        location: "Kaduna",
        date: "2019-05-06"
      },
      {
        imageURL: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        id: "bhdghgjgjhjhjh4",
        title: "Mobile App dev",
        time: "6:58pm",
        location: "Kaduna",
        content: " lohteeththththtrhrthrthrthrt",
        date: "2019-05-06"
      }
    ],
    //...Initial state for user, loading, error and postCreated
    user: null,
    loading: false,
    error: null,
    postCreated: []
  },

  //...Mutations to change the initial state above i.euser, loading, error etc
  mutations: {
    createPost(state, payload) {
      state.loadedBlogPosts.push(payload);
    },
    isError(state, payload) {
      state.error = payload;
    },
    isLoading(state, payload) {
      state.loading = payload;
    },
    clearError(state, payload) {
      state.error = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },

  //.. action for asyn operations
  actions: {
    //...Creating a new post
    createPost({ commit }, payload) {
      commit("isLoading", true);
      commit("clearError");
      const post = {
        title: payload.post,
        category: payload.category,
        description: payload.description,
        date: payload.date,
        imageURL: payload.imageURL,
      }
      //Store a new post in firebase database
      commit("createPost", post);
    },

    //...Registering a new user
    signUpUsers({ commit }, payload) {
      commit("isLoading", true);
      commit("clearError");
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(user => {
        commit("isLoading", false);
        const newUser = {
          id: user.user.uid
        };
        commit("setUser", newUser);
      }).catch(error => {
        commit("isLoading", false);
        commit("isError", error);
        console.log(error);
      });
    },

    //...Logging a new User in
    signInUser({ commit }, payload) {
      commit("isLoading", true);
      commit("clearError");
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(user => {
        commit("isLoading", false);
        const newUser = {
          id: user.user.uid
        };
        commit("setUser", newUser);
      }).catch(error => {
        commit("isLoading", false);
        commit("isError", error);
        console.log(error);
      });
    },

    //...Auto sign in user when already login
    autoLoginUser({ commit }, payload) {
      commit("setUser", {
        id: payload.uid
      });
    },

    //...Logging out login users
    logoutUser({ commit }) {
      firebase.auth().signOut().then(() => {
        commit("setUser", null);
      }).catch(error => console.log(error));
    },

    //... clear all state errors
    clearError({ commit }) {
      commit("clearError");
    }
  },
  modules: {},

  //..Getters, to get the current state of the "STATE"
  getters: {
    //...get all post from the initial state by date created to be user in carousal
    getLoadedBlogPosts(state) {
      return state.loadedBlogPosts.sort((postA, postB) => {
        return postA.date > postB.date;
      });
    },

    //... getting post from a given index array to be user in the frontend in column grid
    getFeatureBlogPost(state, getters) {
      return getters.getLoadedBlogPosts.slice(1, 4);
    },

    //...Get aparticular post by ID and display to the it
    getLoadedBlogPost(state) {
      return postId => {
        return state.loadedBlogPosts.find(post => {
          return post.id === postId;
        });
      };
    },

    //..getting the user state (login Or not login)
    user(state) {
      return state.user;
    },

    //... getting the error state
    error(state) {
      return state.error;
    },

    //...getting the loading(spinner) state
    loading(state) {
      return state.loading;
    },
  }
});
