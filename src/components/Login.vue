<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="3" sm="2" md="3"></v-col>
      <v-col cols="12" sm="8" md="6">
        <v-card v-if="error" elevation="11">
          <alert @dismissed="onDismissed" :text="error.message"></alert>
        </v-card>
        <v-card elevation="11" class="pt-10">
          <h2 class="purple--text text-uppercase animate__animated animate__flash">{{ title }}</h2>
          <v-divider color="purple" class="mt-2"></v-divider>
          <v-form
            @submit.prevent="onLogin"
            ref="form"
            v-model="valid"
            lazy-validation
            class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
          >
            <v-text-field
              v-model="email"
              append-icon="mail_outline"
              outlined
              color="purple"
              error-count="2"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              color="purple"
              :rules="passwordRules"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              outlined
              required
            ></v-text-field>

            <v-btn
              x-large
              type="submit"
              block
              :disabled="!valid"
              :loading="loading"
              color="purple darken-4"
              class="mr-4 text"
              @click="validate"
            >
              <span class="white--text animate__animated animate__backInLeft">Login</span>
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
  data: () => ({
    title: "Login",
    valid: true,
    show1: false,
    show2: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 8) || "Password must be less than 8 characters"
    ]
  }),
  computed: {
    error() {
      //..getting the error state from Vuex
      return this.$store.getters.error;
    },
    loading() {
      //...gettingg the loading state from Vuex
      return this.$store.getters.loading;
    },
    user() {
      //...getting the user state from Veux
      return this.$store.getters.user;
    }
  },
  watch: {
    //.. to keep watch of any changes that will occur during authentication
    user(value) {
      if (value !== null && value !== undefined) {
        this.$toast.success("Welcome back");
        this.$router.push("/dashboard");
      }
    }
  },
  methods: {
    //..validate inputs
    validate() {
      this.$refs.form.validate();
    },
    //... Login a user to the app
    onLogin() {
      this.$Progress.start();
      this.$store
        .dispatch("signInUser", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$Progress.finish();
        })
        .catch(() => {
          this.$Progress.fail();
        });
    },
    //... to close the error when the cancel icon is click
    onDismissed() {
      this.$store.dispatch("clearError");
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
