import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("@/pages/LoginPage.vue")
  },

  {
    path: "/forgotpassword",
    component: () => import("@/pages/ForgotpasswordPage.vue")
  },

  {
    path: "/register",
    component: () => import("@/pages/RegisterPage.vue")
  },

  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "index",
        component: () => import("@/pages/IndexPage.vue")
      },
      {
        path: "dashboard",
        component: () => import("@/pages/DashboardPage.vue")
      },
      {
        path: "books",
        component: () => import("@/pages/BookPage.vue")
      },
      {
        path: "rents",
        component: () => import("@/pages/RentPage.vue")
      },
      {
        path: "publishers",
        component: () => import("@/pages/PublisherPage.vue")
      },
      {
        path: "profile",
        component: () => import("@/pages/ProfilePage.vue")
      },
      {
        path: "users",
        component: () => import("@/pages/UserPage.vue")
      },
      {
        path: "settings",
        component: () => import("@/pages/SettingPage.vue")
      }
    ]
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("@/pages/ErrorNotFound.vue")
  }
];

export default routes;
