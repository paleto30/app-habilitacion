import { useAuthStore } from "../../authentication/stores/authStore.js";
const baseUrl = import.meta.env.VITE_API_GETWAY;




export const getRequestHistory = async () => {
    try {
        const request = await fetch(`${baseUrl}/student/request-history/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useAuthStore().accessToken}`
            }
        });
        const response = await request.json();
        return response
    } catch (error) {
        console.log(error);
    }
}