import api from "@/lib/axios";
import ApiStrings from "@/lib/api_strings";

export const loginUser = async (credentials: {
    email: string;
    password: string;
}): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(ApiStrings.LOGIN, credentials);
    return response.data;
};

export const change_password = async (credentials: {
    current_password: string;
    new_password: string;
}) => {
    const response = await api.post(ApiStrings.CHANGE_PASSWORD, credentials);
    return response.data;
};

export const forgot_password = async (email:string) => {
    const response = await api.post(ApiStrings.FORGOT_PASSWORD, {email});
    return response.data;
};

export const reset_password = async (payload: ResetPasswordPayload) => {
    const response = await api.post(ApiStrings.RESET_PASSWORD, payload);
    return response.data;
};

export const get_me = async (): Promise<CurrentUserResponse> =>{
    const response = await api.get<CurrentUserResponse>(ApiStrings.ME);
    return response.data;
}

export const delete_me = async () =>{
    const response = await api.delete(ApiStrings.ME);
    return response.data;
}

export const logout_api = async () =>{
    const response = await api.get(ApiStrings.LOGOUT);
    return response.data; 
}


export const register_user = async (payload: FormData) => {
    const response = await api.post(ApiStrings.REGISTER, payload, {
      headers: {
        ...(payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}),
      }
    });
    return response.data;
  }

export const update_current_user = async (payload: FormData) => {
    const response = await api.patch(ApiStrings.ME, payload, {
      headers: {
        ...(payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}),
      }
    });
    return response.data;
  }

export const update_employer_information = async (payload: FormData) => {
    const response = await api.post(ApiStrings.COMPANY_PROFILE, payload, {
      headers: {
        ...(payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}),
      }
    });
    return response.data;
  }