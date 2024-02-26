<!-- html -->
<template>
    <!-- superior -->
    <div class="superior">
        <h3>Estudiantes</h3>
        <FiltrosTablaEstudiantes :filters="filtros" @searchRecord="sendFilters" @removeFilters="delFilters" />
    </div>

    <!-- tabla  -->
    <div class="centro">
        <table class="tabla">
            <thead class="cabeza-t sticky-top">
                <tr>
                    <!-- <th class="titles p-2">ID</th> -->
                    <th class="titles p-2">IDENTIFICACION</th>
                    <th class="titles">APELLIDO</th>
                    <th class="titles">NOMBRE</th>
                    <th class="titles">TELEFONO</th>
                    <th class="titles">CORREO</th>
                    <th class="titles">CARRERA</th>
                    <th class="titles">ACCIONES</th>
                </tr>
            </thead>
            <tbody class="cuerpo-t overflow-auto">
                <tr v-for="v in estudiantes" :key="v.id" :data-register="v.id" class="focus-row">
                    <!-- <td class="rows p-2 ">{{ v.id }}</td> -->
                    <td class="rows p-2">{{ v.identificacion }}</td>
                    <td class="rows">{{ v.apellido }}</td>
                    <td class="rows">{{ v.nombre }}</td>
                    <td class="rows">{{ v.telefono }}</td>
                    <td class="rows">{{ v.correo }}</td>
                    <td class="rows">{{ v.carrera }}</td>
                    <td class="rows">ACCIONES</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- inferior -->
    <div class="inferior">
        <PaginacionTabla v-if="current_page" :current_page="current_page" :total_page="total_page" :total_r="total_rec" :total_r_f="total_found"
            @changePage="getNewSetOfRecords" @changeNumPage="getDataForNumPage" @getAmount="setAmountRows" />
    </div>
</template>


<!-- Js -->
<script setup>

import { onMounted, ref } from 'vue';
import { getStudentList } from '../../service/EstudiantesService.js';
import FiltrosTablaEstudiantes from '../estudiantes/FiltrosTablaEstudiantes.vue';
import PaginacionTabla from '../estudiantes/PaginacionTabla.vue';
import { invokeAlert } from '../../../../shared/js/alertabase';

const estudiantes = ref([]);

const current_page = ref(1);
const amount = ref(15);
const total_page = ref();
const total_rec = ref();
const total_found = ref();


onMounted(() => {
    getStudentListToTable(current_page.value, amount.value);
})



// obtener el primer listado 
const getStudentListToTable = async (page, amount , objFilte = null) => {
    try {
        const info = await getStudentList(page, amount, objFilte);
        const response = info.response; 
        if(!info.status){
            invokeAlert('Aviso',`${info.error}`, 'warning', 'Entendido');
        }

        if(response.total_records_found == 0 ){
            invokeAlert(null,`No se encontraron registros`, 'info', 'Entendido')
        }

        estudiantes.value = response.studentList;
        current_page.value = response.current_page;
        total_page.value = response.total_page;
        total_rec.value = response.total_records;
        total_found.value = response.total_records_found;
    } catch (error) {
        console.log(error);
    }
}


const filtros = [
    {
        value: 'doc_id',
        name: 'Identificación'
    },
    {
        value: 'last_name',
        name: 'Apellido'
    },
    {
        value: 'first_name',
        name: 'Nombre'
    },
    {
        value: 'phone',
        name: 'Telefono'
    },
    {
        value: 'email',
        name: 'Correo'
    }
]


// evento cuando el componente de filtros nos envia un filtro
const sendFilters = async (filter, textSearch) => {
    try {
        getStudentListToTable(current_page.value, amount.value, { filter, value: textSearch });
    } catch (error) {
        console.log(error);
    }
}



// eventos cuando el componente de filtros quita los filtros
const delFilters = () => {
    try {
        getStudentListToTable(current_page.value, amount.value);
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
                    getStudentListToTable(current_page.value, amount.value);
                }
                break;
            case 'next':
                if (current_page.value < total_page.value) {
                    current_page.value++;
                    getStudentListToTable(current_page.value, amount.value);
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
        getStudentListToTable(current_page.value, amount.value);
    } catch (error) {
        console.log(error);
    }
}

const setAmountRows = async (cantidad) => {
    try {
        amount.value = cantidad;
        getStudentListToTable(current_page.value,amount.value);
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

.focus-row:hover{
    background-color: rgb(231, 231, 231);
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