<!-- html -->
<template>
    <!-- superior -->
    <div class="superior">
        <h3>Habilitaciones</h3>
        <FiltrosTablaHabilitaciones :filters="filtros" @searchRecord="sendFilters" @removeFilters="delFilters" />
    </div>

    <!-- centro -->
    <div class="centro">
        <table class="tabla">
            <thead class="cabeza-t sticky-top">
                <tr>
                    <!-- <th class="titles p-2">ID</th> -->
                    <th class="titles p-2"># REFERENCIA</th>
                    <th class="titles">ESTUDIANTE</th>
                    <th class="titles">MATERIA</th>
                    <th class="titles">PROFESOR</th>
                    <th class="titles">FECHA APROBACION</th>
                    <th class="titles">ACCIONES</th>
                </tr>
            </thead>
            <tbody class="cuerpo-t overflow-auto ">
                <tr v-for="v in habilitaciones" :key="v.id" class="focus-row">
                    <!-- <td class="rows p-2">{{ v.id }}</td> -->
                    <td class="rows p-2">{{ v.referencia_pago }}</td>
                    <td class="rows">{{ v.estudiante }}</td>
                    <td class="rows">{{ v.materia }}</td>
                    <td class="rows">{{ v.profesor }}</td>
                    <td class="rows">{{ v.fecha_aprovacion }}</td>
                    <td class="rows">
                        <span @click="getStudentInfo(v.id)" class="icon-info-circled fs-5 btnInfo" title="información"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop"></span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- inferior -->
    <div class="inferior">
        <PaginacionTablaHabilitacion v-if="current_page" :current_page="current_page" :total_page="total_page"
            :total_r="total_rec" :total_r_f="total_found" @changePage="getNewSetOfRecords"
            @changeNumPage="getDataForNumPage" @getAmount="setAmountRows" />
    </div>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div class="modal-content ">
                <div class="modal-header bg-dark">
                    <h5 class="modal-title " id="staticBackdropLabel">Detalles de habilitación</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body cuerpoModal">
                    <!-- aqui va el componente -->
                   
                    <section class="seccion1 mb-2">
                        <DetalleEstudiante :estudiante="estudiante" :carrera="carrera" />
                        <DetalleProfesor :profesor="profesor" :materia="materia" />
                    </section>
                    <section class="seccion2 mb-2">
                        <DetalleHabilitacion :habilitacion="habilitacion" />
                    </section>
                    <section class="seccion3">
                        <DetalleArchivos :docs="docs" />
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>


<!-- Js -->
<script setup>

import { onMounted, ref } from 'vue';
import { getRecoveryList, getRecoveryDetails } from '../../service/HabilitacionService.js';
import { invokeAlert } from '../../../../shared/js/alertabase.js';
import FiltrosTablaHabilitaciones from './FiltrosTablaHabilitaciones.vue';
import PaginacionTablaHabilitacion from './PaginacionTablaHabilitacion.vue'
import DetalleEstudiante from './DetalleEstudiante.vue';
import DetalleProfesor from './DetalleProfesor.vue';
import DetalleHabilitacion from './DetalleHabilitacion.vue';
import DetalleArchivos from './DetalleArchivos.vue';


const habilitaciones = ref([]);
const estudiante = ref({});
const profesor = ref({});
const carrera = ref('');
const materia = ref('');
const habilitacion = ref({});
const docs = ref({});
const current_page = ref(1);
const amount = ref(15);
const total_page = ref();
const total_rec = ref();
const total_found = ref();


onMounted(() => {
    getRecoveryListToTable(current_page.value, amount.value)
})


// funcion para cargar los datos de detalles de la habilitacion
const getStudentInfo = async (id_recovery) => {
    try {
        const results = await getRecoveryDetails(id_recovery);
        estudiante.value = results.response.estudiante;
        const carrer = results.response.estudiante.carrera;
        carrera.value = `(${carrer.codigo}) ${carrer.nombre} `;
        profesor.value = results.response.profesor;
        const subject = results.response.materia;
        materia.value = `(${subject.codigo}) ${subject.nombre}   [${subject.creditos} creditos]`;
        const recovery = {
            referencia: results.response.referencia_pago,
            fecha: new Date(results.response.created_at).toISOString().slice(0, 16)
        }
        habilitacion.value = recovery;
        const doc = {
            pdf: `${import.meta.env.VITE_API_GETWAY}/recoveries/view-pdf/${results.response.img_factura}`,
            img: `${import.meta.env.VITE_API_GETWAY}/recoveries/view-image/${results.response.img_recibo_pago}`      
        }
        docs.value = doc;
    } catch (error) {
        console.log(error);
    }
}

const getRecoveryListToTable = async (page, amount, objFilter = null) => {
    try {

        const info = await getRecoveryList(page, amount, objFilter);
        const response = info.response;

        if (!info.status) {
            invokeAlert('Aviso', `${info.error}`, 'warning', 'Entendido');
        }

        if (response.total_records_found == 0) {
            invokeAlert(null, `No se encontraron registros`, 'info', 'Entendido');
        }

        habilitaciones.value = response.ratingList
        current_page.value = response.current_page;
        total_page.value = response.total_page;
        total_rec.value = response.total_records
        total_found.value = response.total_records_found;
    } catch (error) {
        console.log(error);
    }
}


const filtros = [
    {
        value: 'reference',
        name: '# Referencia'
    },
    {
        value: 'student',
        name: 'Estudiante'
    },
]


// evento cuando el componente de filtros nos envia un filtro
const sendFilters = async (filter, textSearch) => {
    try {
        getRecoveryListToTable(current_page.value, amount.value, { filter, value: textSearch });
    } catch (error) {
        console.log(error);
    }
}

// eventos cuando el componente de filtros quita los filtros
const delFilters = () => {
    try {
        getRecoveryListToTable(current_page.value, amount.value);
    } catch (error) {
        console.log(error);
    }
}


const getNewSetOfRecords = async (page) => {
    try {
        switch (page) {
            case 'previous':
                if (current_page.value > 1) {
                    current_page.value--;
                    getRecoveryListToTable(current_page.value, amount.value);
                }
                break;
            case 'next':
                if (current_page.value < total_page.value) {
                    current_page.value++;
                    getRecoveryListToTable(current_page.value, amount.value);
                }
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
}


const getDataForNumPage = async (numPage) => {
    try {
        current_page.value = numPage;
        getRecoveryListToTable(current_page.value, amount.value);
    } catch (error) {
        console.log(error);
    }
}

const setAmountRows = async (cantidad) => {
    try {
        amount.value = cantidad;
        getRecoveryListToTable(current_page.value, amount.value);
    } catch (error) {
        console.log(error);
    }
}


</script>


<!-- CSS -->
<style scoped>
.superior {
    width: 100%;
    height: 15%;
    background-color: rgba(255, 255, 255);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: rgb(88, 156, 10);
}


.centro {
    width: 100%;
    height: 70%;
    background-color: rgba(185, 185, 185, 0.527);
    overflow-y: auto;
}


.inferior {
    width: 100%;
    height: 15%;
    background-color: rgba(255, 255, 255);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: 0.1px solid rgb(204, 204, 204);
    display: flex;
    justify-content: center;
    align-items: center;
}

.tabla {
    width: 100%;
}


.cabeza-t {
    background-color: black;
    font-size: 14px;
    width: 100%;
    height: 40px;
}

.cuerpo-t {
    font-size: 12px;
    color: black;
    background-color: white;
}

.titles {
    text-align: start;
    color: white;
}

.rows {
    border-bottom: 1px solid;
    text-align: start;
    height: 40px;
    font-size: 13px;
}


.focus-row:hover {
    background-color: rgb(231, 231, 231);
}


.btnInfo {
    color: rgb(55, 185, 87);
}

.btnInfo:hover {
    color: rgb(40, 150, 223);
}

.cuerpoModal {}



.seccion1 {
    display: flex;
    flex-direction: row;
    gap: 10px;
}





/*  scroll barr */

/* ===== Scrollbar CSS ===== */
/* Firefox */

/* Chrome, Edge, and Safari */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #ffffff7a;
}

::-webkit-scrollbar-thumb {
    background-color: #000000;
    border-radius: 10px;
    border: 1px solid #fdfdfd56;
}
</style>