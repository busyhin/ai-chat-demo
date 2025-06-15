import { apiClient } from "@/services/apiClient.ts";

export const sendMessage = async (question: string) => {
    const res = await apiClient.post("/chat", {
        question,
    });
    return res.data;
};
