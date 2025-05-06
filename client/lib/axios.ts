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

const isTokenExpiringSoon = () => {
  const accessToken = Cookies.get(ACCESS_TOKEN);
  if (!accessToken) return true;

  try {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    const bufferTime = 30;

    return decodedToken.exp
      ? decodedToken.exp - currentTime < bufferTime
      : false;
  } catch (e) {
    return true;
  }
};

const refreshAuthToken = async () => {
  const refreshToken = Cookies.get(REFRESH_TOKEN);
  if (!refreshToken) {
    useAuthStore.getState().logout();
    return;
  }

  try {
    const response = await axios.post(ApiStrings.REFRESH_TOKEN, {
      refreshToken,
    });
    const data = response?.data?.data;

    if (!data?.access_token) {
      useAuthStore.getState().logout();
    }

    Cookies.set(ACCESS_TOKEN, data.accessToken);
    Cookies.set(REFRESH_TOKEN, data.refreshToken);

    useAuthStore.setState({
      user: data?.user,
      accessToken: data?.access_token,
      refreshToken: data?.access_token,
    });

    api.defaults.headers.Authorization = `Bearer ${data.access_token}`;
    return data.access_token;
  } catch (error) {
    useAuthStore.getState().logout();
    throw new Error("Token refresh failed");
  }
};

api.interceptors.request.use(async (config) => {
  if (await isTokenExpiringSoon()) {
    try {
      const newToken = await refreshAuthToken();
      config.headers.Authorization = `Bearer ${newToken}`;
    } catch (error) {
      console.error("Failed to refresh token before request", error);
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error", error)
    const originalRequest = error.config;
    if (error.response?.data?.message === "jwt expired" || error.response?.data?.message === 'jwt malformed') {
      try {
        const refreshToken = Cookies.get(REFRESH_TOKEN);
        if (!refreshToken) {
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }

        const { data } = await axios.post(ApiStrings.REFRESH_TOKEN, {
          refreshToken,
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
