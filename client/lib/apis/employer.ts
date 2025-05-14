import api from "@/lib/axios";
import ApiStrings from "@/lib/api_strings";

export const invite_sent = async (payload: InviteBodyPayload) => {
  const response = await api.post(ApiStrings.SENT_INVITE, payload);
  return response.data;
}

export const get_invites = async (): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>(ApiStrings.GET_INVITES);
  return response.data;
}

export const delete_invite = async (id: string) => {
  const response = await api.delete(ApiStrings.DELETE_INVITE(id));
  return response.data;
}