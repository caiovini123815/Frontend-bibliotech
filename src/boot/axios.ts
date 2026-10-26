import axios, { type AxiosInstance } from "axios";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  config => {
    const isLoginRequest = config.url?.includes("/login");
    const token = localStorage.getItem("token");

    if (token && !isLoginRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

export default ({ app }: { app: any }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
};

export { api };
