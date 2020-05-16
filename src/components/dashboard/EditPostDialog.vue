<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn large color="primary" dark v-on="on">
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="post"
                  color="purple"
                  outlined
                  append-icon="subject"
                  error-count="2"
                  :counter="10000"
                  label="Post Title"
                  required
                ></v-text-field>
                <v-select
                  :items="items"
                  label="Category"
                  v-model="category"
                  error-count="2"
                  append-icon="keyboard_arrow_down"
                  outlined
                  color="purple"
                  required
                ></v-select>
                <v-menu
                  ref="menu"
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
                  color="purple darken-4  ml-12 mb-4 mr-3"
                  class="white--text"
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
                  label="Content"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn large class="error darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn large class="purple darken-4 white--text" @click="saveChanges" text>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: ["editPost"],
  data() {
    return {
      dialog: false,
      title: "Edit Post",
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      menu2: false,
      valid: true,
      show1: false,
      show2: false,
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      image: null,
      post: "",
      category: "",
      description: "",
      imageURL: []
    };
  },
  methods: {
    saveChanges() {
      if (
        this.post === "" ||
        this.category === "" ||
        this.description === "" ||
        // this.imageURL === "" ||
        this.date === ""
      ) {
        return false;
      }
      //action
      this.dialog = false;
      console.log("ffd");
    },
    //.. fir picking a file
    pickFile() {
      this.$refs.fileInput.click();
    },
    //.. for imaage preview
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
  },
  created() {
    this.post = this.editPost.title;
    this.category = this.editPost.title;
    this.description = this.editPost.description;
    this.date = this.editPost.date;
  }
};
</script>

<style scoped>
.card {
  padding: 10px, 30px;
}
.avatar {
  vertical-align: middle;
  width: 200px;
  /* height: 50px; */
  border-radius: 50%;
}
</style>
