<template>
  <v-container fluid>
    <v-row>
      <!-- <v-col cols="12" md="2" sm="12">
        <h2>Read post</h2>
      </v-col>-->
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
        <v-form
          @submit.prevent="onSignup"
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
export default {
  //props: ["id"],
  data() {
    return {
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
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    }
  },

  mounted() {
    //console.log(this.blogPost);
  }
};
</script>