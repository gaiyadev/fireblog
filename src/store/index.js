import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    user: {
      id: "ghthjhyjyhjyj"
    }
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    getLoadedBlogPosts(state) {
      return state.loadedBlogPosts.sort((postA, postB) => {
        return postA.date > postB.date;
      });
    },

    getFeatureBlogPost(state, getters) {
      return getters.getLoadedBlogPosts.slice(1, 4);
    },

    getLoadedBlogPost(state) {
      return postId => {
        return state.loadedBlogPosts.find(post => {
          return post.id === postId;
        });
      };
    }
  }
});
