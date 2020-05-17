<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="3" sm="2" md="3"></v-col>
      <v-col cols="12" sm="8" md="6">
        <CategoryDialog></CategoryDialog>
        <v-card elevation="7">
          <v-card-title>
            Nutrition
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            color="purple"
            class="purple--text"
            :items="desserts"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
      <v-col cols="3" sm="2" md="3"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import CategoryDialog from "@/components/dashboard/CategoryDialog";
export default {
  components: {
    CategoryDialog
  },
  data() {
    return {
      title: "Category",
      search: "",
      headers: [
        {
          text: "Id",
          align: "start",
          sortable: false,
          value: "name"
        },
        // { text: "Post", value: "post" },
        { text: "Category", value: "category" },
        { text: "Time ", value: "time" }
      ],
      desserts: [
        {
          name: "1",
          //   post: "a web dev",
          category: "web dev",
          time: "6pm"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        }
      ]
    };
  }
};
</script>
