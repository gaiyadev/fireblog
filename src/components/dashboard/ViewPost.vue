<template>
  <v-container fluid>
    <v-row wrap align="end" v-for="post in allPost" :key="post.id">
      <v-col cols="3" sm="2" md="3"></v-col>
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto" elevation="7">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="headline mb-4 purple--text">{{ post.title }}</div>
              <v-list-item-title class="overline mb-1">{{post.date }} 5</v-list-item-title>
              <v-list-item-subtitle>{{ post.description }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <img :src="post.imageURL" alt="John" />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn class="error darken-4 white--text" text>
              <v-icon color="white">clear</v-icon>
            </v-btn>
            <v-btn class="primary darken-4 white--text">
              <v-icon color="white">edit</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3" sm="2" md="3"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    allPost() {
      return this.$store.getters.getLoadedBlogPosts;
    }
  }
};
</script>