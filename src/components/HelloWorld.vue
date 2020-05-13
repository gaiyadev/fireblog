<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12" md="12">
        <v-card elevation="7">
          <v-carousel>
            <v-carousel-item
              v-for="item in slideItems"
              :key="item.id"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <h3 class="title text-uppercase">{{ item.title }}</h3>
            </v-carousel-item>
          </v-carousel>
        </v-card>

        <!-- 
        <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">{{ slide }} Slide</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      slideItems: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
          id: "adfadsgmkjl,k",
          title: "static",
          time: "6:58pm",
          location: "Kaduna",
          date: "2019-05-06"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
          id: "fjgfjgfjfgjjgmn ",
          title: "static",
          time: "6:58pm",
          location: "Kaduna",
          date: "2019-05-06"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
          id: "gtrgtrgrtrththt",
          title: "static",
          time: "6:58pm",
          location: "Kaduna",
          date: "2019-05-06"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
          id: "bhdghgjgjhjhjh",
          title: "static",
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
  top: 367px;
  left: 700px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  padding: 20px;
}
</style>