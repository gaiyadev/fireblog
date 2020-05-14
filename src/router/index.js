import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { transition: "zoom" }

  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/Register.vue"),
    meta: { transition: "zoom" }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue"),
    meta: { transition: "zoom" }
  },
  {
    path: "/readPost/:id",
    name: "ReadPost",
    component: () =>
      import("../views/ReadPost.vue"),
    //props: true,
    meta: { transition: "zoom" }
  },
  // Dashboard Routes
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
          import("../views/dashboard/Profile"),
        meta: { transition: "zoom" }

      },
      {
        path: "/change_password",
        name: "ChangePassword",
        component: () =>
          import("../views/dashboard/ChangePassword"),
        meta: { transition: "zoom" }

      },
      {
        path: "/create_post",
        name: "CreatePost",
        component: () =>
          import("../views/dashboard/CreatePost"),
        meta: { transition: "zoom" }

      },
      {
        path: "/view_post",
        name: "ViewPost",
        component: () =>
          import("../views/dashboard/ViewPost"),
        meta: { transition: "zoom" }

      },
      {
        path: "/category",
        name: "Category",
        component: () =>
          import("../views/dashboard/Category"),
        meta: { transition: "zoom" }

      },
      {
        path: "",
        component: () =>
          import("../views/dashboard/CreatePost"),
        meta: { transition: "zoom" }

      },

    ],
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
