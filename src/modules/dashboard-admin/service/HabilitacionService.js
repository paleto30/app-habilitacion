import { useAuthStore } from "../../authentication/stores/authStore.js";

const baseUrl = import.meta.env.VITE_API_GETWAY;
const url = `${baseUrl}/admins`


export const getRecoveryList = async (page = 1, amount = 15, objFilter = null) => {

    let endpoint = objFilter ? `${url}/recovery-list?page=${page}&amount=${amount}&${objFilter.filter}=${objFilter.value}` : `${url}/recovery-list?amount=${amount}&page=${page}`;
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useAuthStore().accessToken}`
            }
        });
        const results = await response.json();
        return results;
    } catch (error) {
        console.log(error);
    }
}




export const getRecoveryDetails = async (id_recovery) => {
    let endpoint = `${url}/recovery-details/${id_recovery}`;
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useAuthStore().accessToken}`
            }
        });

        const results = await response.json();
        return results;
    } catch (error) {
        console.log(error);
    }
}