import axios from "axios";
import Cookies from "js-cookie";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "@/constants";
import { useAuthStore } from "@/store/store";
import { jwtDecode } from 'jwt-decode'

interface DecodeResponse {
  _id: string,
  role: string
  exp: number
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const baseURLPhoto = (url: string): string => {
  return url ? `${process.env.NEXT_PUBLIC_API_URL}/${url}` : `/placeholder.svg`;
};


const refreshAuthToken = async () => {
  const refreshToken = Cookies.get(REFRESH_TOKEN);
  if (!refreshToken) {
    useAuthStore.getState().logout();
    return
  }

  const response = await axios.post(`${baseURL}/auth/refresh`, { refresh_token: refreshToken });
  const data = response?.data;

  if (!data?.access_token) {
    useAuthStore.getState().logout();
  }

  Cookies.set(ACCESS_TOKEN, data.access_token);
  Cookies.set(REFRESH_TOKEN, data.refresh_token);

  useAuthStore.setState({
    user: data?.user,
    accessToken: data?.access_token,
    refreshToken: data?.refresh_token,
  });
  return data.access_token;
};

api.interceptors.request.use(async (config) => {
  const token = Cookies.get(ACCESS_TOKEN);
  if (!token) {
    return config;
  }

  try {
    const decodedToken = jwtDecode(token) as DecodeResponse;
    const currentTime = Math.floor(Date.now() / 1000);
    const bufferTime = 900;

    if (decodedToken?.exp - currentTime < bufferTime) {
      const newToken = await refreshAuthToken();
      config.headers.Authorization = `Bearer ${newToken}`;
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Failed to decode or refresh token:", error);
  }

  return config;
});



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
