import { useAuthStore } from "../../authentication/stores/authStore.js";



const baseUrl = 'http://localhost:5500';



export const getRequestHistory = async () => {
    try {
        const request = await fetch(`${baseUrl}/api/v1/student/request-history/`,{
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