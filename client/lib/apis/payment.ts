import api from "@/lib/axios";
import ApiStrings from "@/lib/api_strings";


export const create_payment_link = async ({ email, price_id }: { email: string, price_id: string }) => {
    const response = await api.post<PaymentResponse>(ApiStrings.CREATE_PAYMENT_URL, { email, price_id });
    return response.data;
}