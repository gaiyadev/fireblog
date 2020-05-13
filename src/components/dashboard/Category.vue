<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="3" sm="2" md="3"></v-col>
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="11" class="pt-10 pr-10 pl-10 pb-10">
          <h2 class="purple--text text-uppercase">{{ title }}</h2>
          <v-divider color="purple" class="mt-2"></v-divider>
          <v-data-table
            class="elevation-2 purple--text"
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
          ></v-data-table>
        </v-card>
      </v-col>
      <v-col cols="3" sm="2" md="3"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "Category",
      headers: [
        {
          text: "Id",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "category", value: "calories" },
        { text: "Time", value: "carbs" },
        { text: "Action", value: "protein" }
      ],
      desserts: [
        {
          name: "1",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        }
      ]
    };
  }
};
</script>
