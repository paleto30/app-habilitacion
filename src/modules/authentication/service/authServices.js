
const baseUrl = 'http://localhost:5500/api/v1/authentication';
//const baseUrl = 'https://sqfb9lfn-5500.use2.devtunnels.ms/api/v1/authentication'
import { useAuthStore } from "../stores/authStore.js";



/*
    funcion para realizar la accion de iniciar sesion en eel sistema
*/
const sendCredentialsForLogin = async (usuario) => {
    try {

        const request = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        const response = await request.json();
        return response;
    } catch (error) {
        console.error(error);
    }
}


/* 
    funcion para hacer el registro de estudiantes (este servicio esta en el formulario de registro)
*/
const sendCredentialsForRegister = async (formData) => {
    try {
        const request = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}



/*
    funcion para hacer el registro de administradores
*/
const sendFormDataForAdminRegister = async (formData) => {
    try {
        const request = await fetch(`${baseUrl}/register/user-admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useAuthStore().accessToken}`
            },
            body: JSON.stringify(formData)
        });

        const response = await request.json();
        return response;
    } catch (error) {
        console.error(error);
    }
}




/* 
    funcion para obtener la lista de sedes disponibles en el select de sedes
*/
const getAvailablesSedes = async () => {
    try {
        const data = await fetch(`${baseUrl}/campus`);
        const result = await data.json();

        if (!result.status) {
            return []
        }

        return result.sedes;
    } catch (error) {
        console.log(error);
    }
}


/* 
    funcion para obtener la lista de sedes disponibles en el select de sedes
*/
const getAvailablesFacultades = async (id_sede) => {
    try {
        const data = await fetch(`${baseUrl}/campus/${id_sede}/faculties`);
        const result = await data.json();

        if (!result.status) {
            return []
        }

        return result.facultades;
    } catch (error) {
        console.log(error);
    }
}




/* 
    funcion para obtener la lista de coordinaciones disponibles en la facultad
*/
const getAvailablesCoordinaciones = async (id_facultad) => {
    try {

        const data = await fetch(`${baseUrl}/faculties/${id_facultad}/coordinations`)
        const result = await data.json();

        if (!result.status) {
            return []
        }

        return result.coordinaciones;

    } catch (error) {
        console.log(error);
    }
}


/*
    funcion para obtener las carreras en funcion de la coordinacion
*/
const getAvailablesCarreras = async (id_coordinacion) => {
    try {
        const data = await fetch(`${baseUrl}/coordinations/${id_coordinacion}/careers`)
        const result = await data.json();

        if (!result.status) {
            return []
        }

        return result.carreras;

    } catch (error) {
        console.log(error);
    }
}







export default {
    sendCredentialsForLogin,
    sendCredentialsForRegister,
    getAvailablesSedes,
    getAvailablesFacultades,
    getAvailablesCoordinaciones,
    getAvailablesCarreras,
    sendFormDataForAdminRegister
}