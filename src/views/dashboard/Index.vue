<template>
  <v-app id="inspire">
    <v-navigation-drawer
      expand-on-hover
      :mini-variant.sync="mini"
      color="purple darken-4"
      clipped
      elevation="6"
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="white">dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              <span class="title ml-3 mr-5 white--text">
                <router-link
                  to="/dashboard"
                  class="white--text text-uppercase"
                  style="text-decoration: none;"
                >Dashboard</router-link>&nbsp;
                <!-- <span class="font-weight-light">Keep</span> -->
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="item in items" :key="item.title" router :to="item.link">
          <v-list-item-icon>
            <v-icon color="white" v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="font-size: 16px;" class="white--text" v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append v-if="userIsAuthenticated">
        <div class="pa-2" v-if="userIsAuthenticated" @click="logout">
          <v-btn block>
            <v-icon color="purple">exit_to_app</v-icon>Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="purple darken-4" elevation="7" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">FireBLog</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <vue-page-transition name="fade-in-right">
          <router-view></router-view>
        </vue-page-transition>
      </v-container>
    </v-content>

    <!-- <v-footer padless color="grey lighten-4" app>
      <span class="white--text">
        &copy; 2019 Designed With
        <v-icon color="white">favorite</v-icon>&nbsp; By
        <a
          class="white--text"
          target="_blank"
          href="https://gaiyaobed.com.ng"
        >Gaiya M. Obed</a>
      </span>
    </v-footer>-->
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    mini: true,
    items: [
      {
        title: "Home",
        icon: "home",
        link: "/"
      },
      {
        title: "Create Post",
        icon: "create",
        link: "/create_post"
      },
      {
        title: "View Post",
        icon: "visibility",
        link: "/view_post"
      },
      {
        title: "Add Category",
        icon: "add",
        link: "/category"
      },
      {
        title: "Profile",
        icon: "account_circle",
        link: "/profile"
      },
      {
        title: "Change Password",
        icon: "lock",
        link: "/change_password"
      }
    ]
  }),
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
      this.$toast.success("Logout successfully");
    }
  }
};
</script>