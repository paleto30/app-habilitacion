const baseUrl = 'http://localhost:5500/api/v1/authentication'



const sendCredentialsForLogin = async (usuario) => {
    try {
        const request = await fetch(`${baseUrl}/registrarse`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario)
            });

        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}




/* 
    funcion para obtener la lista de sedes disponibles en el select de sedes
*/
const getAvailablesSedes = async () => {
    try {
        const data = await fetch(`${baseUrl}/sedes`);
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
        const data = await fetch(`${baseUrl}/sede/${id_sede}/facultades`);
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

        const data = await fetch(`${baseUrl}/facultad/${id_facultad}/coordinaciones`)
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
const getAvailablesCarreras = async (id_coordinacion) =>{
    try {
        const data = await fetch(`${baseUrl}/coordinacion/${id_coordinacion}/carreras`)
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
    getAvailablesSedes,
    getAvailablesFacultades,
    getAvailablesCoordinaciones,
    getAvailablesCarreras,        
}