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
        <!-- <v-progress-circular :size="70" v-if="loading" :width="7" color="primary" indeterminate></v-progress-circular> -->
      </v-col>
    </v-row>
    <v-row wrap class="mt-n7 ml-n10 mr-n11">
      <v-col cols="12" sm="12" md="12">
        <v-card elevation="7" v-if="!loading">
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
        <v-img :src="post.imageURL" height="300" elevation="5" class="mb-4">
          <v-row align="end" wrap class="lightbox white--text pa-2 fill-height">
            <v-col>
              <!-- <div class="subheading float-left">
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
              </v-btn>-->
            </v-col>
          </v-row>
        </v-img>

        <div class="subheading purple--text text-uppercase float-left">
          {{ post.title }} &nbsp; &nbsp; /
          <span class="primary--text">{{ post.category }}</span>
          <br />
          <span class="primary--text">{{post.date}}</span>
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
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    OnLoadPost(id) {
      this.$router.push("/readPost/" + id).catch(err => {
        console.log(err);
      });
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