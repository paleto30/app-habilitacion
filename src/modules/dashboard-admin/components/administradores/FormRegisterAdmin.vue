<!-- html -->
<template>
    <div class="form border rounded">
        <form class="p-md-2  container" @submit.prevent="handleFormData">
            <!-- fila 1 -->
            <div class="row pt-3 mb-1 mb-md-3 rowsSmalls">
                <div class="col-12 col-md-6 mb-1 mb-md-0">
                    <select class="form-select text-center inputs" v-model="sede" id="sede" @change="loadFacultades">
                        <option value="null" selected class="defaults">Seleccione la Sede</option>
                        <option class="text-center" v-for="item in sedes" :key="item.id" :value="item.id">{{ item.nombre }}
                        </option>
                    </select>
                </div>
                <div class="col-12 col-md-6">
                    <select class="form-select text-center inputs" v-model="facultad" :disabled="!sede || sede === 'null'"
                        @change="loadCoordinaciones">
                        <option value="null" selected class="defaults">Seleccione la Facultad</option>
                        <option class="text-center" v-for="item in facultades" :key="item.id" :value="item.id"> {{
                            item.codigo }}</option>
                    </select>
                </div>
            </div>
            <!-- fila 2 -->
            <div class="row mb-1 mb-md-3 rowsSmalls">
                <div class="col-12 col-md-12 mb-1 mb-md-0">
                    <select class="form-select text-center inputs" v-model="coordinacion"
                        :disabled="!facultad || facultad === 'null'">
                        <option value="null" selected class="defaults">Seleccione la Coordinación</option>
                        <option class="text-center" v-for="item in coordinaciones" :key="item.id" :value="item.id">{{
                            item.nombre }}</option>
                    </select>
                </div>
            </div>
            <!-- fila 3 -->
            <div class="row mb-1 mb-md-3 rowsSmalls">
                <div class="col-12 col-md-12 mb-1 mb-md-0">
                    <select class="form-select text-center inputs" v-model="rol"
                        :disabled="!coordinacion || coordinacion === 'null'">
                        <option value="null" selected class="defaults">Seleccione un rol</option>
                        <option class="text-center" v-for="(rol, i) in roles" :key="i" :value="rol.value">{{ rol.name }}
                        </option>
                    </select>
                </div>
            </div>
            <!-- fila 4 -->
            <div class="row  mb-1 mb-md-3 rowsSmalls">
                <div class="col-12 col-md-6 mb-1 mb-md-0">
                    <input type="text" class="form-control text-center inputs" id="nombre" v-model="nombre"
                        placeholder="Nombres" required>
                </div>
                <div class="col-12 col-md-6 ">
                    <input type="text" class="form-control text-center inputs" id="apellido" v-model="apellido"
                        placeholder="Apellidos" required>
                </div>
            </div>
            <!-- fila 5 -->
            <div class="row mb-1 mb-md-3 rowsSmalls">
                <div class="col-12 col-md-6 mb-1 mb-md-0">
                    <input type="number" class="form-control text-center inputs" id="doc_id" v-model="doc_id"
                        placeholder="Documento de identidad" ref="">
                </div>
                <div class="col-12 col-md-6">
                    <input type="number" class="form-control text-center inputs" id="telefono" v-model="telefono"
                        placeholder="Numero celular" required>
                </div>
            </div>

            <!-- fila 6 -->
            <div class="row mb-1 mb-md-3 rowsSmalls">
                <div class="mb-1 mb-md-3">
                    <input type="email" class="form-control text-center inputs" id="correo" v-model="correo"
                        placeholder="Correo institucional" required>
                </div>
                <div class="mb-1 mb-md-3 caja">
                    <span class="icon-eye" :class="{ 'ojo': colorEye, 'ojoo': !colorEye }" @click="showKey"></span>
                    <input :type="showPass ? 'text' : 'password'" class="form-control text-center inputs" v-model="password"
                        placeholder="Contraseña" id="pass" required>
                </div>
            </div>
            <!-- fila 7 -->
            <div class="row">
                <div class="col-12 mb-2  d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary" style="width: 50%;">Registrar Administrador</button>
                    <button type="button" class="btn btn-secondary" style="margin-left: 10px"
                        @click="cerrarModal">Cancelar</button>
                </div>
            </div>
        </form>
    </div>
</template>


<!-- Js -->
<script setup>

import { ref, onMounted, watch } from 'vue';
import authServices from '../../../authentication/service/authServices.js';
import { invokeAlert } from '../../../../shared/js/alertabase';
import { createNewAdministrator, isEmailValid } from '../../service/AdministradorService.js';

const emits = defineEmits(['reloadTable', 'cleanForm']);


// sedes
const sede = ref(null);
const sedes = ref([]);

// facultades
const facultad = ref(null);
const facultades = ref([]);

// coordinaciones
const coordinaciones = ref([]);




const coordinacion = ref(null);
const nombre = ref();
const apellido = ref();
const doc_id = ref();
const telefono = ref();
const correo = ref();
const password = ref();
const rol = ref(null);

const roles = [
    {
        name: 'SUPER_ADMIN',
        value: 1,
    },
    {
        name: 'ADMIN',
        value: 2,
    },
]


// funcion para cargar los datos en el select de facultades
const loadFacultades = async () => {
    if (sede.value === null) {
        facultad.value = null;
        coordinacion.value = null;

    }
}

// funcion para cargar los datos en el select de coordinaciones
const loadCoordinaciones = async () => {
    if (facultad.value) {
        coordinacion.value = null
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



// ONMOUNTED
onMounted(async () => {
    // obtenemos las sedes disponibles
    const dataSedes = await authServices.getAvailablesSedes();
    sedes.value = dataSedes;

});





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
    nombre.value = null
    apellido.value = null
    doc_id.value = null
    telefono.value = null
    correo.value = null
    password.value = null
    rol.value = null
}



// funcion para manejar el envio del formulario
const handleFormData = async () => {

    const dataToSend = {
        doc_id: String(doc_id.value),
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: String(telefono.value),
        correo: correo.value,
        clave: password.value,
        id_coordinacion: Number(coordinacion.value),
        rol: rol.value
    }

    if (!isEmailValid(dataToSend.correo)) {
        invokeAlert('Error!', 'Dominio de correo invalido, verifique.', 'error', 'Entendido', '#2280E5');
        return;
    }

    const results = await createNewAdministrator(dataToSend);

    if (!results.success) {
        // alerta de error
        invokeAlert('Error!', results.error, 'error', 'Entendido', '#2280E5');
        return;
    }

    // alerta de success
    invokeAlert('Excelente!', results.message, 'success', 'Entendido', '#2280E5');
    restartForm()
    emits('reloadTable', true);
}

const cerrarModal = () => {
    restartForm()
    emits('cleanForm')
}


</script>


<!-- CSS -->
<style scoped>
.form {
    width: 580px;
    height: 480px;
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



.logo_login {
    width: 13%;
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