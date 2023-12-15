<!-- html -->
<template>
    <div class="container-fluid d-flex justify-content-center">
        <form class="border mx-0 p-2 p-md-4 form" @submit.prevent="handleFormData" id="formReq">
            <div class="row  mb-md-3">
                <div class="col">
                    <p class="fs-3 text">Formulario de solicitud</p>
                </div>
            </div>
            <div class="row ">
                <!-- columna 1 -->
                <div class="col-12 col-md-6 ">
                    <div class="mb-3">
                        <label for="selectMateria" class="form-label ps-1 fonts">Materia para habilitar:</label>
                        <select class="form-select inputss fonts" aria-label="Default select example" id="selectMateria" v-model="subject" @change="handlerLoadTeachers" name="materia" required>
                            <option value="null" selected>Seleccione</option>
                            <option :value="item.id_materia" v-for="item in arraySelectSubject" :key="item.id_materia">{{ item.nombre }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="selectprofe" class="form-label ps-1 fonts">Profesor de la materia:</label>
                        <select class="form-select inputss fonts" aria-label="Default select example" name="profesor" v-model="teachers" id="selectprofe" :disabled="!subject || subject === 'null'"  required>
                            <option value="null" selected>Seleccione</option>
                            <option :value="item.id" v-for="item,i in arrayTeachersForSubject" :key="i">{{ item.nombre }} </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label ps-1 fonts">Referencia del pecuniario:</label>
                        <input type="number" class="form-control inputss fonts" id="referencia" aria-describedby="emailHelp"
                            placeholder="example: 0301054437" name="referencia" ref="reference" @input="handlerInput">
                    </div>
                </div>

                <!-- columna 2 -->
                <div class="col-12 col-md-6 ">
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label ps-1 fonts">Documento PDF del pecuniario:</label>
                        <input type="file" class="form-control inputss fonts" id="pdf" accept=".pdf" name="pdf" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label ps-1 fonts">Imagen del recibo de pago:</label>
                        <input type="file" class="form-control inputss fonts" id="img" accept=".png, .jpg, .jpeg" name="imagen"
                            required>
                    </div>
                </div>
            </div>
            <div class="mt-2 d-flex  justify-content-center">
                <button type="submit" class="btn btn-success fonts">Solicitar habilitación</button>
            </div>
        </form>

    </div>
</template>


<!-- Js -->
<script setup>

import { invokeAlert } from '../../../shared/js/alertabase.js';
import { ref, onMounted, watch } from 'vue';
import { sendFormData, getSubjectAvailables, getTeachersForSubject } from '../service/servicesFsolicitud.js';


const arraySelectSubject = ref([]);
const subject = ref(null);
const arrayTeachersForSubject = ref([]);
const teachers = ref(null);


onMounted(() => {
    getSubjectsAvailables();
})



// funcion para cargar las materias que ve el estudiante en su respectiva carrera
async function getSubjectsAvailables() {
    try {
        const subjects = await getSubjectAvailables();
        arraySelectSubject.value = subjects.subjects;
    } catch (error) {
        console.log(error);
    }
}



// funcion para cargar los profesores al select 
const handlerLoadTeachers = () => {
    if (subject.value === 'null') {
        teachers.value = null;
    }
}



// observador para revisar la seleccion de la materia 
watch(subject, async (newSubject) => {
    const data = await getTeachersForSubject(newSubject);
    teachers.value = null;
    arrayTeachersForSubject.value = data.teachers;
})



// funcion para controlar la cantidad de digitos de  la refetencia
const handlerInput = (e) => {
    if (e.target.value > 10) {
        e.target.value = e.target.value.slice(0, 10)
    }
}



// ejemplo de formato : 0301097733 ->> funcion para el envio de la solicitud de habilitacion 
const handleFormData = async (e) => {
    const objectData = Object.fromEntries(new FormData(e.target));
    console.log(objectData);
    if (objectData.materia === 'null') {
        invokeAlert('Atención', 'Debe seleccionar la materia', 'warning', 'Aceptar', '#3FC3EE');
        return
    }

    if (objectData.profesor === 'null') {
        invokeAlert('Atención', 'Debe seleccionar el docente','warning','Aceptar','#3FC3EE');
        return
    }

    if (objectData.referencia === ''){
        invokeAlert('Atención', 'Debe ingresar la referencia','warning','Aceptar','#3FC3EE');
        return  
    }

    const res = await sendFormData(new FormData(e.target));

    if(!res.status){
        invokeAlert('Lo sentimos',`${res.error}`,'error','Entendido','#3FC3EE');
        return
    }


    invokeAlert('Felicidades', `${res.message}`,'success', 'Aceptar');
    const form = document.querySelector('#formReq');
    form.reset();
    return
}









</script>


<!-- CSS -->
<style scoped>
.form {
    border-radius: 10px;
    box-shadow: 5px 4px 50px rgba(0, 0, 0, 0.900);
}


.form {
    width: 100%;
    /* background-color: rgba(233, 239, 240, 0.863); */
    background-color: rgb(255, 255, 255);
}


.text {
    color: rgb(88, 156, 10);
}

.inputss {
    border-color: rgb(88, 156, 10);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}



.fonts{
    font-size: 18px;
}




@media (min-width: 1400px) {
    .form {
        width: 70%;
    }
}
</style>