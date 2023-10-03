<!-- html -->
<template>
    <div class="form border rounded">
        <div class="logo">
            <div>
                <h2 class="text-center mt-3">Registrarse</h2>
            </div>
            <img src="../../../assets/logo.svg" class="logo_login" alt="" srcset="">
        </div>

        <form class="p-md-2 container" @submit.prevent="handleFormData">

            <!-- fila 1 -->
            <div class="row mb-1 mb-md-3 rowsSmalls">
                <div class="col-12 col-md-6 mb-1 mb-md-0">
                    <select class="form-select text-center inputs" v-model="sede" id="sede" @change="loadFacultades">
                        <option value="null" selected class="defaults">Seleccione la Sede</option>
                        <option class="text-start" v-for="item in sedes" :key="item.id" :value="item.id">{{ item.nombre }}
                        </option>
                    </select>
                </div>
                <div class="col-12 col-md-6">
                    <select class="form-select text-center inputs" v-model="facultad" :disabled="!sede || sede === 'null'"
                        @change="loadCoordinaciones">
                        <option value="null" selected class="defaults">Seleccione la Facultad</option>
                        <option class="text-start" v-for="item in facultades" :key="item.id" :value="item.id"> {{
                            item.codigo }}</option>
                    </select>
                </div>
            </div>
            <!-- fila 2 -->
            <div class="row mb-1 mb-md-3 rowsSmalls">
                <div class="col-12 col-md-6 mb-1 mb-md-0">
                    <select class="form-select text-center inputs" v-model="coordinacion"
                        :disabled="!facultad || facultad === 'null'" @change="loadCarreras">
                        <option value="null" selected class="defaults">Seleccione la Coordinación</option>
                        <option class="text-start" v-for="item in coordinaciones" :key="item.id" :value="item.id">{{
                            item.nombre }}</option>
                    </select>
                </div>
                <div class="col-12 col-md-6">
                    <select class="form-select text-center inputs" v-model="carrera"
                        :disabled="!coordinacion || coordinacion === 'null'">
                        <option value="null" selected class="defaults">Seleccione la carrera</option>
                        <option class="text-start" v-for="item in carreras" :key="item.id" :value="item.id">{{ item.nombre
                        }}</option>
                    </select>
                </div>
            </div>
            <!-- fila 3 -->
            <div class="row  mb-1 mb-md-3 rowsSmalls">
                <div class="col-12 col-md-6 mb-1 mb-md-0">
                    <input type="text" class="form-control text-center inputs" id="nombre" v-model="nombre"
                        placeholder="Nombres">
                </div>
                <div class="col-12 col-md-6 ">
                    <input type="text" class="form-control text-center inputs" id="apellido" v-model="apellido"
                        placeholder="Apellidos">
                </div>
            </div>
            <!-- fila 4 -->
            <div class="row mb-1 mb-md-3 rowsSmalls">
                <div class="col-12 col-md-6 mb-1 mb-md-0">
                    <input type="text" class="form-control text-center inputs" id="doc_id" v-model="doc_id"
                        placeholder="Documento de identidad">
                </div>
                <div class="col-12 col-md-6">
                    <input type="number" class="form-control text-center inputs" id="telefono" v-model="telefono"
                        placeholder="Numero celular">
                </div>
            </div>

            <!-- fila 5 -->
            <div class="row mb-1 mb-md-3 rowsSmalls">
                <div class="mb-1 mb-md-3">
                    <input type="email" class="form-control text-center inputs" id="correo" v-model="correo"
                        placeholder="Correo institucional">
                </div>
                <div class="mb-1 mb-md-3 caja">
                    <span class="icon-eye" :class="{ 'ojo': colorEye, 'ojoo': !colorEye }" @click="showKey"></span>
                    <input :type="showPass ? 'text' : 'password'" class="form-control text-center inputs" v-model="password"
                        placeholder="Contraseña" id="pass">
                </div>
            </div>
            <!-- fila 6 -->
            <div class="row">
                <div class="col-12 mb-2  d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary" style="width: 50%;">Registrarse</button>
                </div>
                <div id="emailHelp" class="m-0 mb-1 mt-md-3 form-text text-center ">¿ Ya tienes una cuenta ? <button
                        @click.prevent="handleComponent" type="button" class="myLink">Iniciar
                        sesión</button>
                </div>
                <div class="mt-md-4 w-100">
                    <div id="emailHelp" class="form-text text-center">aceptas nuestros terminos y condiciones de
                        uso al ingresar en este aplicativo</div>
                </div>

            </div>

        </form>
    </div>
    <AlertComponentVue />
</template>


<!-- Js -->
<script setup>

import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import authServices from '../service/authServices.js';
import AlertComponentVue from '../../../shared/components/AlertComponent.vue';



// sedes
const sede = ref(null);
const sedes = ref([]);

// facultades
const facultad = ref(null);
const facultades = ref([]);

// coordinaciones
const coordinacion = ref(null);
const coordinaciones = ref([]);

// carreras
const carreras = ref([]);



// atributos para el registro
const carrera = ref(null);
const nombre = ref();
const apellido = ref();
const doc_id = ref();
const telefono = ref();
const correo = ref();
const password = ref();



// funcion para cargar los datos en el select de facultades
const loadFacultades = async () => {
    if (sede.value === 'null') {
        facultad.value = null;
        coordinacion.value = null;
        carrera.value = null;
    }
}

// funcion para cargar los datos en el select de coordinaciones
const loadCoordinaciones = async () => {
    if (facultad.value) {
        coordinacion.value = null
    }
}

// funcion para cargar los datos en el select de carreras
const loadCarreras = async () => {
    if (coordinacion.value) {
        carrera.value = null
    }
}



// watch para revisar los cambios en el select de sede
watch(sede, async (newSede) => {
    const data = await authServices.getAvailablesFacultades(newSede);
    facultad.value = null;
    facultades.value = data;
});

// watch para revisar los cambios en el select de facultad
watch(facultad, async (newFacultad) => {
    const data = await authServices.getAvailablesCoordinaciones(newFacultad);
    coordinacion.value = null;
    coordinaciones.value = data;
})

// watch para revisar los cambios en el select de coordinacion
watch(coordinacion, async (newCoordinacion) => {
    const data = await authServices.getAvailablesCarreras(newCoordinacion);
    carrera.value = null;
    carreras.value = data;
});

// ONMOUNTED
onMounted(async () => {

    // obtenemos las sedes disponibles
    const dataSedes = await authServices.getAvailablesSedes();
    sedes.value = dataSedes;

});




// router para cambiar a l
const router = useRouter();
const handleComponent = () => {
    router.push({ name: 'login' })
}


// variables para manejar el icono de ver contraseña
const showPass = ref(false);
let colorEye = ref(true);
// funcion para manejar el ojo de ver la contraseña
const showKey = () => {
    showPass.value = !showPass.value;
    colorEye.value = !colorEye.value;
}



/* limpiar formulario */
function restartForm() {
    sede.value = null
    facultad.value = null
    coordinacion.value = null
    carrera.value = null
    nombre.value = null
    apellido.value = null
    doc_id.value = null
    telefono.value = null
    correo.value = null
    password.value = null
}



// funcion para manejar el envio del formulario
const handleFormData = async () => {

    const dataToSend = {
        doc_id: doc_id.value,
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: String(telefono.value),
        correo: correo.value,
        clave: password.value,
        id_carrera: Number(carrera.value)
    }

    //console.log(dataToSend);

    const results = await authServices.sendCredentialsForLogin(dataToSend);

    restartForm()
    console.log("desde el componente: ", results);


}



</script>


<!-- CSS -->
<style scoped>
.form {
    width: 550px;
    height: 620px;
    box-shadow: 5px 4px 50px rgba(0, 0, 0, 0.300);
}



.a-rigth {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0;
    padding-right: 0;
}



.rowsSmalls {
    margin-right: 0 !important;
    margin-left: 0 !important;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
}

.logo_login {
    width: 18%;
}

.myLink {
    text-decoration: underline;
    color: #008000;
    border: none;
    background: none;
}

.myLink:hover {
    color: var(--colorfocus-link);
}


input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

::placeholder {
    color: rgb(162, 167, 170);
}

.inputs {
    border-color: #3b3b3b4f;
}

.caja {
    position: relative;
}

.ojo {
    position: absolute;
    z-index: 10;
    right: 0;
    bottom: 0;
    font-size: 18px;
    margin-right: 18px;
    margin-bottom: 6px;
    color: #808380;
    border-radius: 50%;
    text-align: center;
}

.ojoo {
    position: absolute;
    z-index: 10;
    right: 0;
    bottom: 0;
    font-size: 18px;
    margin-right: 18px;
    margin-bottom: 6px;
    color: var(--maincolor-green);
    border-radius: 50%;
    text-align: center;
}

.ojo:hover {
    color: var(--maincolor-green);
}



.defaults {
    font-weight: bold;
}
</style>