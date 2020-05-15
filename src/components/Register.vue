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
              shaped
              append-icon="mail_outline"
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
              outlined
              :type="show1 ? 'text' : 'password'"
              label="Password"
              error-count="4"
              required
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              error-count="2"
              :rules="confirmPasswordRules "
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
              :type="show2 ? 'text' : 'password'"
              color="purple"
              outlined
              label="Confirm Password"
              required
            ></v-text-field>

            <v-btn
              shaped
              block
              x-large
              type="submit"
              :disabled="!valid"
              :loading="loading"
              color="purple darken-4"
              class="mr-4"
              @click="validate"
            >
              <span class="white--text animate__animated animate__backInLeft">Sign up</span>
              <span style="display: none;" class="custom-loader">
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
      title: "Register",
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
        v => (v && v.length >= 8) || "Password must be less than 8 characters",
        v => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
        v => /(?=.*\d)/.test(v) || "Must have one number"
        // v => /([!@$%<>*''])/.test(v) || "Must have one special character [!@#$%]"
      ],
      confirmPassword: "",
      confirmPasswordRules: [
        v => !!v || "Confirm Password is required",
        v =>
          (v && v.length >= 8) ||
          "Confirm Password must be less than 8 characters",
        v => !!v || "Confirm password",
        v => v === this.password || "Passwords do not match"
      ]
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$toast.success("Account created succesfully");

        this.$router.push("/dashboard");
      }
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    onSignup() {
      this.$Progress.start();
      this.$store
        .dispatch("signUpUsers", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$Progress.finish();
        })
        .catch(error => {
          this.$Progress.fail();

          console.log(error);
        });
    },
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
