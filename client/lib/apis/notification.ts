import api from "@/lib/axios";
import ApiStrings from "@/lib/api_strings";


export const update_notification = async (payload:unknown) => {
  const response = await api.put(ApiStrings.UPDATE_NOTIFICATION, payload);
  return response.data;
}

export const get_notifications = async (): Promise<NotificationResponse> => {
  const response = await api.get(ApiStrings.GET_NOTIFICATIONS);
  return response.data;
}

export const mark_as_read = async (id:string)=> {
  const response = await api.post(ApiStrings.MARK_READ(id));
  return response.data;
}

export const mark_all_read = async () => {
  const response = await api.post(ApiStrings.ALL_MARK_READ);
  return response.data;
}
