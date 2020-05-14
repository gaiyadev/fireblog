<template>
  <v-app>
    <v-navigation-drawer color="purple darken-4" v-model="drawer" absolute temporary elevation="9">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="white--text text-uppercase">
            <router-link to="/">FireBlog</router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider color="white"></v-divider>

      <v-list dense>
        <v-list-item v-for="item in menuItems" :key="item.title" link router :to="item.href">
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="purple darken-4" dark elevation="9">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <h2>
          <router-link style="text-decoration:none;" class="white--text" id="log" to="/">FireBlog</router-link>
        </h2>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        text
        class="hidden-sm-and-down"
        v-for="link in menuItems"
        :key="link.title"
        router
        :to="link.href"
      >
        <span class="mr-2">{{ link.title }}</span>
        <v-icon>{{ link.icon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <!-- <HelloWorld /> -->
        <vue-page-transition name="fade-in-right">
          <router-view></router-view>
        </vue-page-transition>
      </v-container>
    </v-content>
    <v-footer color="purple darken-3" padless>
      <v-row justify="center" no-gutters>
        <v-col class="purple darken-4 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>
            FireBlog
            <span class="white--text">
              Designed With
              <v-icon color="white">favorite</v-icon>&nbsp; By
              <a
                class="white--text"
                target="_blank"
                href="https://gaiyaobed.com.ng"
              >Gaiya M. Obed</a>
            </span>
          </strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},

  data: () => ({
    drawer: false,
    links: ["Proudly powered by Vuetify + firebase"],
    menuItems: [
      {
        title: "Home",
        icon: "home",
        href: "/"
      },
      {
        title: "Login",
        icon: "perm_identity",
        href: "/login"
      },
      {
        title: "Register",
        icon: "supervisor_account",
        href: "/register"
      }
    ]
  })
};
</script>
