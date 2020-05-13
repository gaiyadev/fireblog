import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/Register.vue"),
    meta: { transition: 'zoom' }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue"),
    meta: { transition: 'zoom' }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import("../views/dashboard/Index"),
    children: [
      {
        path: "/profile",
        name: "Profile",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/dashboard/Profile"),
        meta: { transition: 'zoom' }

      },
      {
        path: "/change_password",
        name: "ChangePassword",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/dashboard/ChangePassword"),
        meta: { transition: 'zoom' }

      },
      {
        path: "/create_post",
        name: "CreatePost",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/dashboard/CreatePost"),
        meta: { transition: 'zoom' }

      },
      {
        path: "/view_post",
        name: "ViewPost",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/dashboard/ViewPost"),
        meta: { transition: 'zoom' }

      },

    ],
  },
  {
    path: "",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/dashboard/Index")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
