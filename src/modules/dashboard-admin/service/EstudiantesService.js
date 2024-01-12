import { useAuthStore } from "../../authentication/stores/authStore.js";


const baseUrl = import.meta.env.VITE_API_GETWAY;
const url = `${baseUrl}/admins/student-list`;

// obtener lista principal
export const getStudentList = async (page = 1, amount = 15, objFilter = null) => {

    let endpoint = objFilter ? `${url}?amount=${amount}&page=${page}&${objFilter.filter}=${objFilter.value}` : `${url}?amount=${amount}&page=${page}`;
  
    try {
/*  */
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${useAuthStore().accessToken}`
            }
        });
        const results = await response.json();
        return results.response;
    } catch (error) {
        return error;
    }
}



// obtener registros filtrados
export const getStudentListFiltered = async (filtro, valor) => {
    try {
        const request = await fetch(`${url}?${filtro}=${valor}`);
        const response = await request.json();
        return response;
    } catch (error) {
        return error;
    }
}