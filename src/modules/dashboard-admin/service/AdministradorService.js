import { useAuthStore } from "../../authentication/stores/authStore.js";


const baseUrl = import.meta.env.VITE_API_GETWAY;
const url = `${baseUrl}/administrators/`;


export const getAdministratorList = async (page = 1, amount = 15, objFilter = null) => {

    let endpoint = objFilter ? `${url}?page=${page}&amount=${amount}&${objFilter.filter}=${objFilter.value}` : `${url}?page=${page}&amount=${amount}`;
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



export const createNewAdministrator = async (formData) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useAuthStore().accessToken}`
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        return result
    } catch (error) {
        console.log(error);
    }
}




export const isEmailValid = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@correo\.uts\.edu\.co$/
    return regex.test(email);
}



export const deleteAdminById = async (id) => {
    try {

        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useAuthStore().accessToken}`
            }
        })
        const result = await response.json();
        return result
    } catch (error) {
        console.log();
    }
}