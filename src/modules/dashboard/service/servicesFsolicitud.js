import { useAuthStore } from "../../authentication/stores/authStore";

const baseUrl = 'http://localhost:5500/api/v1';





/**
 * @description esta funcion me retorna el listado de la materias que ve el estudiante en su carrera
*/
export const getSubjectAvailables = async () => {
    try {

        const request = await fetch(`${baseUrl}/student/student-subjects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useAuthStore().accessToken}`
            }
        });

        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

/**
 *  @description funcion para obtener los profesores que dictan las materias
*/
export const getTeachersForSubject = async (id_materia) => {
    try {
        const request = await fetch (`${baseUrl}/student//student-subjects/${id_materia}/teacher`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${useAuthStore().accessToken}`
            }
        });
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}


/**
 * @description  esta funcion envia el formulario de solicitud de habilitacion  
 * @param {FormData} formData 
 * @returns 
 */
export const sendFormData = async (formData) => {
    try {

        const request = await fetch(`${baseUrl}/student/make-request/`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${useAuthStore().accessToken}`
            }
        });
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}



