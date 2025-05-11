import axios from "axios";
import Cookies from "js-cookie";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "@/constants";
import { useAuthStore } from "@/store/store";
import { jwtDecode } from "jwt-decode";
import ApiStrings from "@/lib/api_strings";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const baseURLPhoto = (url: string): string => {
  return `http://127.0.0.1:8000/${url}`;
};


api.interceptors.request.use(async (config) => {
  const token = Cookies.get(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error.response?.data", error.response?.data)
    const originalRequest = error.config;
    if (error.response?.data?.error === "Invalid or missing token" || error.response?.data?.error === 'Invalid Token' ||  error.response?.data?.error === 'Token is invalid or expired') {
      try {
        const refreshToken = Cookies.get(REFRESH_TOKEN);
        if (!refreshToken) {
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }

        const { data } = await api.post(ApiStrings.REFRESH_TOKEN, {
          refresh_token:refreshToken,
        });

        Cookies.set(ACCESS_TOKEN, data.access_token, {
          secure: true,
          sameSite: "strict",
        });

        api.defaults.headers.Authorization = `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.error || error.message;

    let customMessage = "An error occurred";
    if (status === 401) {
      customMessage = message;
    } else if (status === 403) {
      customMessage = message;
    } else if (status === 404) {
      customMessage = message;
    } else if (status >= 500) {
      customMessage = message;
    } else {
      customMessage = message;
    }

    return Promise.reject(new Error(customMessage));
  }
);

export default api;
