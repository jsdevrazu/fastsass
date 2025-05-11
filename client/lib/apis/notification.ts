import api from "@/lib/axios";
import ApiStrings from "@/lib/api_strings";


export const update_notification = async (payload:unknown) => {
  const response = await api.put(ApiStrings.UPDATE_NOTIFICATION, payload);
  return response.data;
}
