<template>
  <v-container fluid>
    <v-row wrap>
      <v-col cols="12" sm="12" md="12">
        <v-card elevation="7">
          <v-carousel cycle height="500" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item
              v-for="item in slideItems"
              :key="item.id"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <v-sheet>
                <h3
                  class="subtitle-2 float-xs-left text-center title white--text text-uppercase font-weight-bold"
                >{{ item.title }}</h3>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
    </v-row>

    <v-row wrap>
      <v-col cols="4"></v-col>
      <v-col cols="4">
        <h2 class="text-center text-uppercase purple--text pt-7 pb-7">{{ latest }}</h2>
      </v-col>
      <v-col cols="4"></v-col>
      <!-- end of title -->

      <v-col cols="12" sm="4" md="4">
        <v-img src="https://picsum.photos/510/300?random">
          <v-row align="end" class="lightbox white--text pa-2 fill-height">
            <v-col>
              <div class="subheading">Digital Marketting Lee</div>
              <div class="body-1">heyfromjonathan@gmail.com</div>
            </v-col>
          </v-row>
        </v-img>
      </v-col>

      <v-col cols="12" sm="4" md="4">
        <v-img src="https://picsum.photos/510/300?random"></v-img>
      </v-col>

      <v-col cols="12" sm="4" md="4">
        <v-img src="https://picsum.photos/510/300?random"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      latest: "Latest blog Post",
      slideItems: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
          id: "adfadsgmkjl,k",
          title: "Web Development",
          time: "6:58pm",
          location: "Kaduna",
          date: "2019-05-06"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
          id: "fjgfjgfjfgjjgmn ",
          title: "Graphics design",
          time: "6:58pm",
          location: "Kaduna",
          date: "2019-05-06"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
          id: "gtrgtrgrtrththt",
          title: "Digital marketing",
          time: "6:58pm",
          location: "Kaduna",
          date: "2019-05-06"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
          id: "bhdghgjgjhjhjh",
          title: "Mobile App dev",
          time: "6:58pm",
          location: "Kaduna",
          date: "2019-05-06"
        }
      ]
    };
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
</style>