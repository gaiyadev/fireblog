<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col col="12" md></v-col>
      <v-col cols="12" md="8" sm="12">
        <!-- <v-card v-if="error" elevation="11">
          <alert @dismissed="onDismissed" :text="error.message"></alert>
        </v-card>-->
        <v-card elevation="11" class="pt-10">
          <h2 class="purple--text text-uppercase">{{ title }}</h2>
          <v-divider color="purple" class="mt-2"></v-divider>
          <v-form
            @submit.prevent="onSignup"
            ref="form"
            class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="post"
              color="purple"
              outlined
              append-icon="subject"
              error-count="2"
              :rules="titleRules"
              :counter="10000"
              label="Post Title"
              required
            ></v-text-field>
            <v-select
              :items="items"
              label="Category"
              error-count="2"
              append-icon="keyboard_arrow_down"
              outlined
              color="purple"
              :rules="menuRules"
              required
            ></v-select>

            <v-menu
              ref="menu"
              v-model="category"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Date"
                  color="purple"
                  append-icon="event"
                  outlined
                  v-on="on"
                  :rules="DateRules"
                  required
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>

            <v-btn
              color="purple darken-4"
              class="white--text ml-n12 mb-4 mr-3"
              fab
              x-large
              @click="pickFile"
            >
              <v-icon dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
              type="file"
              style="display:  none;"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked"
            />
            <img :src="imageURL" class="avatar" alt height="200" />
            <br />
            <v-textarea
              append-icon="comment"
              v-model="description"
              outlined
              color="purple"
              error-count="5"
              :counter="100000"
              :rules="descriptionRules"
              label="Content"
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
              <span class="white--text">Create Post</span>
              <span style="display: none" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" md></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "Create Post",
      date: new Date().toISOString().substr(0, 10),
      category: false,
      modal: false,
      menu2: false,
      valid: true,
      show1: false,
      show2: false,
      image: null,
      post: "",
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      titleRules: [
        v => !!v || "Title is required",
        v => (v && v.length >= 4) || "Title must be less than 10 characters"
      ],
      menuRules: [v => !!v || "Category is required"],
      DateRules: [v => !!v || "Date is required"],
      description: "",
      descriptionRules: [
        v => !!v || "Content is required",
        v => (v && v.length > 50) || "Content must be less than 100 characters"
      ],
      imageURL: [],
      imageRules: [
        v => !!v || "Image is required",
        v =>
          !v ||
          (v && v.size < 2000000) ||
          "Image size should be less than 2 MB!"
      ]
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    onSignup() {
      console.log("register");
    },
    pickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("please add a valid image");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageURL = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>

<style scoped>
.custom-loader {
  /* animation: loader 1s infinite; */
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.avatar {
  vertical-align: middle;
  width: 200px;
  /* height: 50px; */
  border-radius: 50%;
}
</style>
