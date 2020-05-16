<template>
  <v-container fluid>
    <v-row wrap align="end" v-for="post in allPost" :key="post.id">
      <v-col cols="3" sm="2" md="3"></v-col>
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto" elevation="7">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="headline mb-4 purple--text">{{ post.title }}</div>
              <v-list-item-title class="overline mb-1">{{ post.date }}</v-list-item-title>
              <v-list-item-subtitle>{{ post.description }}</v-list-item-subtitle>
              <input type="text" name="test" :value="post.id" ref="myTestField" />
              <p v-text="post.id"></p>
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <img :src="post.imageURL" alt="John" />
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn large class="error darken-4 white--text" @click="deletePost(post.id)" text>
              <v-icon color="white">clear</v-icon>
            </v-btn>
            <editPostDialog class="ml-n12" :editPost="post"></editPostDialog>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3" sm="2" md="3"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import editPostDialog from "@/components/dashboard/EditPostDialog";
import * as firebase from "firebase";

export default {
  props: ["value"],
  components: {
    editPostDialog
  },
  data() {
    return {};
  },
  computed: {
    allPost() {
      return this.$store.getters.getLoadedBlogPosts;
    },

    getPostId() {
      return this.$store.getters.getLoadedBlogPost(this.id);
    },
    //checking if user ia authenticated
    isUserAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    //..creator of post
    userCreatedPost() {
      if (!this.isUserAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.getPostId.createdBy;
    }
  },
  methods: {
    deletePost(id) {
      firebase
        .database()
        .ref("postsNote")
        .child(id)
        .remove()
        .then(() => {
          console.log("deletePost successfully");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getPostId;
    console.log(this.$refs.myTestField[0].value);
  }
};
</script>