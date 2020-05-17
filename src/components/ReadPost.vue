<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12" sm="12" md="12">
        <div v-if="loading" class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="!loading">
      <v-col cols="12" md="10" sm="12">
        <h2 class="mb-3 purple--text text-uppercase" color="purple--text">{{ blogPost.title }}</h2>
        <v-img :src="blogPost.imageURL" elevation="4" class="ml-n6 mr-n12"></v-img>
        <h4 class="font-weight-black mt-4">
          {{ blogPost.date }}
          <span class="primary--text">Admin</span>
        </h4>

        <p style=" font-size: 18px;" class="mt-4">{{blogPost.content }}</p>
      </v-col>
      <v-col cols="12" md="2" sm="12">
        <v-card class="mx-auto mt-12 hidden-sm-and-down">
          <v-list disabled>
            <v-subheader>REPORTS</v-subheader>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8" sm="12">
        <v-card class="mx-auto" max-width="400" tile>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>{{ comment.name }}</v-list-item-title>
              <v-list-item-subtitle>Secondary line text Lorem ipsum dolor sit amet,</v-list-item-subtitle>
              <v-list-item-subtitle>consectetur adipiscing elit.</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8" sm="12">
        <v-form
          @submit.prevent="onComment"
          ref="form"
          class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            color="purple"
            outlined
            append-icon="perm_identity"
            error-count="2"
            :rules="nameRules"
            label="Your Name"
            required
          ></v-text-field>
          <v-textarea
            append-icon="comment"
            v-model="comment"
            outlined
            color="purple"
            error-count="5"
            :counter="100"
            :rules="commentRules"
            label="Comment"
            required
          ></v-textarea>

          <v-btn
            shaped
            block
            x-large
            type="submit"
            :disabled="!valid"
            color="purple darken-4"
            class="mr-4"
            @click="validate"
          >
            <span class="white--text">Submit</span>
            <span style="display: none" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </v-btn>
        </v-form>
      </v-col>
      <v-col cols="12" md="2" sm="12" class="hidden-sm-and-down"></v-col>
      <v-col cols="12" md="2" sm="12" class="hidden-sm-and-down"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as firebase from "firebase";

export default {
  //props: ["id"],
  data() {
    return {
      lists: [],
      id: this.$route.params.id,
      item: 1,
      valid: true,
      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" }
      ],
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 4) || "Name must be less than 4 characters"
      ],
      comment: "",
      commentRules: [
        v => !!v || "Comment is required",
        v => (v && v.length >= 4) || "Comment must be less than 4 characters"
      ]
    };
  },
  computed: {
    blogPost() {
      return this.$store.getters.getLoadedBlogPost(this.id);
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    onComment() {
      const comment = {
        name: this.name,
        comment: this.comment,
        timestamp: Date.now()
      };
      firebase
        .database()
        .ref("comments")
        .push(comment)
        .then(() => {
          // console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllComments() {
      firebase
        .database()
        .ref("comments")
        .on("value", data => {
          const allComments = [];
          const obj = data.val();
          //..looping all through the post in the firebase database
          for (let key in obj) {
            allComments.push({
              id: key,
              name: obj[key].name,
              comment: obj[key].comment
              // timestamp: obj[key].timestamp
            });
            this.lists.push(allComments);
          }
          //console.log(comment);
        });
    }
  },

  created() {
    this.getAllComments();
    console.log("list" + this.lists);
  }
};
</script>
<style scoped>
.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: purple;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>