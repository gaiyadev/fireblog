<template>
  <v-container fluid>
    <v-row class="text-center mx-auto">
      <v-col cols="3" sm="2" md="3"></v-col>
      <v-col cols="12" sm="8" md="6">
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
              v-model="email"
              color="purple"
              outlined
              append-icon="mail_outline"
              error-count="2"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

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
              <span class="white--text">Sign up</span>
              <span style="display: none" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </v-form>
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
      title: "Update Profile",
      valid: true,
      show1: false,
      show2: false,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    onSignup() {
      console.log("register");
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
</style>
