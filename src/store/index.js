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
        category: "webdev",
        time: "6:58pm",
        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore repudiandae delectus ipsum, modi amet harum provident nesciunt repellendus quas enim, expedita laborum dolores corporis aliquam placeat. Magni dolorum labore modi",
        date: "2019-05-06"
      },
      {
        imageURL: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        id: "fjgfjgfjfgjjgmn1",
        title: "Graphics design",
        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore repudiandae delectus ipsum, modi amet harum provident nesciunt repellendus quas enim, expedita laborum dolores corporis aliquam placeat. Magni dolorum labore modi",
        time: "6:58pm",
        category: "webdev",
        date: "2019-05-06"
      },
      {
        imageURL: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        id: "gtrgtrgrtrththt2",
        title: "Digital marketing",
        time: "6:58pm",
        category: "Graphics",
        content: " lohteeththththtrhrthrthrthrt3",
        date: "2019-05-06"
      },
      {
        imageURL: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        id: "bhdghgjgjhjhjh4",
        title: "Mobile App dev",
        time: "6:58pm",
        category: "Mobile",
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
    //..adding to the state objects
    setLoadeDbPost(state, payload) {
      state.loadedBlogPosts = payload;
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

  //.. Action for asyn operations
  actions: {
    //...Creating a new post
    createPost({ commit }, payload) {
      commit("isLoading", true);
      commit("clearError");
      const post = {
        title: payload.title,
        category: payload.category,
        description: payload.description,
        date: payload.date,
        imageURL: payload.imageURL,
        timestamp: Date.now(),
        //id: "rrwghwrhrhrehrhr"
      };
      let imageUrl;
      let key;
      //... Saving new blogpost to firebase db
      firebase.database().ref("postsNote").push(post).then((data) => {
        const key = data.key;
        console.log(data);
        // commit("createPost", {
        //   ...post,
        //   id: key
        // });
        return key;

      }).then(key => {
        const filename = payload.image.name;
        const ext = filename.slice(filename.lastIndexOf("."));
        //Store a new image in store folder
        return firebase.storage().ref("postsNote/" + key + "." + ext).put(payload.image);
      }).then(snapshot => {
        return new Promise((resolve) => {
          snapshot.ref.getDownloadURL().then(url => {
            snapshot.downloadURL = url
            resolve(snapshot);
          });
        });
      }).then((snapshot) => {
        imageUrl = snapshot.downloadURL;
        //Store a new image in store folder
        return firebase.database().ref("postsNote").child(key).update({ imageUrl: imageUrl });
      }).then(() => {
        commit("createPost", {
          ...post,
          imageUrl: imageUrl,
          id: key
        });
      }).catch((error) => {
        commit("isLoading", false);
        console.log(error);
      });
    },

    //..getting all blog post from firebase
    getDBLoadedPost({ commit }) {
      commit("isLoading", true);
      firebase.database().ref("postsNote").once("value").then(data => {
        const allPost = [];
        const obj = data.val();
        //..looping all through the post in the firebase database
        for (let key in obj) {
          allPost.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageURL: obj[key].imageURL,
            category: obj[key].category,
            date: obj[key].date,
          });
        }
        //..saving localy on mutation
        commit("setLoadeDbPost", allPost);
        commit("isLoading", false);
      }).catch(error => {
        console.log(error);
        commit("isLoading", false);
      });
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
