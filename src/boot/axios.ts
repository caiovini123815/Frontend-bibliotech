import axios, { type AxiosInstance } from "axios";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({ baseURL: "/api" });

export default ({ app }: { app: any }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
};

export { api };
