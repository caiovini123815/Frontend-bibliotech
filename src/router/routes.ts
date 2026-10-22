import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("@/pages/IndexPage.vue") },
      {
        path: "dashboard",
        component: () => import("@/pages/DashboardPage.vue")
      },
      { path: "books", component: () => import("@/pages/BookPage.vue") },
      { path: "rents", component: () => import("@/pages/RentPage.vue") },
      {
        path: "publishers",
        component: () => import("@/pages/PublisherPage.vue")
      },
      { path: "profile", component: () => import("@/pages/ProfilePage.vue") },
      { path: "users", component: () => import("@/pages/UserPage.vue") },
      { path: "settings", component: () => import("@/pages/SettingPage.vue") }
    ]
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("@/pages/ErrorNotFound.vue")
  }
];

export default routes;
