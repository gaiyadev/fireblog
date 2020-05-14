<template>
  <v-container fluid>
    <v-row wrap class="mt-n7 ml-n10 mr-n11">
      <v-col cols="12" sm="12" md="12">
        <v-card elevation="7">
          <v-carousel
            cycle
            height="500"
            hide-delimiter-background
            show-arrows-on-hover
            style="cursor: pointer;"
          >
            <v-carousel-item
              v-for="item in slideItems"
              :key="item.id"
              @click="OnLoadPost(item.id)"
              :src="item.imageURL"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <v-sheet>
                <h3
                  class="subtitle-2 float-sm-left text-center title white--text text-uppercase font-weight-bold"
                >{{ item.title }}</h3>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
    </v-row>

    <v-row wrap>
      <v-col cols="4" sm="8" md="3"></v-col>
      <v-col cols="12" sm="8" md="6">
        <h2 class="text-center text-uppercase purple--text pt-7 pb-7">{{ latest }}</h2>
        <v-divider color="purple"></v-divider>
      </v-col>
      <v-col cols="4" sm="8" md="3"></v-col>
      <!-- end of title -->

      <v-col
        cols="12"
        sm="12"
        md="4"
        v-for="post in smallColumnPost"
        :key="post.id"
        class="animate__animated animate__backInDown"
      >
        <v-img :src="post.imageURL" height="300">
          <v-row align="end" wrap class="lightbox white--text pa-2 fill-height">
            <v-col>
              <div class="subheading float-left">
                {{ post.title }}
                <br />
                <span>{{post.date}}</span>
                <br />
              </div>
              <br />
              <br />
              <div class="body-1">{{ post.content }}</div>
              <v-btn :to="'/readPost/' + post.id" class="white--text" color="purple darken-4">
                Read More
                <v-icon>arrow_forward</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      latest: "Latest blog Post"
    };
  },
  computed: {
    slideItems() {
      return this.$store.getters.getLoadedBlogPosts;
    },
    smallColumnPost() {
      return this.$store.getters.getFeatureBlogPost;
    }
  },
  methods: {
    OnLoadPost(id) {
      this.$router.push("/readPost/" + id);
    }
  }
};
</script>

<style scoped>
.title {
  position: absolute;
  top: 257px;
  left: 690px;
  background-color: purple;
  color: #ffffff;
  padding: 20px;
  opacity: 0.7;
}
@media only screen and (max-width: 600px) {
  .title {
    position: absolute;
    top: 257px;
    left: 65px;
    padding: 20px;
  }
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .title {
    position: absolute;
    top: 257px;
    left: 65px;
    padding: 20px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .title {
    position: absolute;
    top: 257px;
    left: 195px;
    padding: 20px;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .title {
    position: absolute;
    top: 257px;
    left: 465px;
    padding: 20px;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .title {
    position: absolute;
    top: 257px;
    left: 690px;
    background-color: purple;
    color: #ffffff;
    padding: 20px;
    opacity: 0.7;
  }
}
</style>