<!-- html -->
<template>
    <!-- superior -->
    <div class="superior">
        <FiltrosTablaEstudiantes :filters="filtros" @searchRecord="sendFilters" @removeFilters="delFilters"/>
    </div>

    <!-- tabla  -->
    <div class="centro">
        <table class="tabla">
            <thead class="cabeza-t sticky-top">
                <tr>
                    <th class="titles p-2">ID</th>
                    <th class="titles">IDENTIFICACION</th>
                    <th class="titles">APELLIDO</th>
                    <th class="titles">NOMBRE</th>
                    <th class="titles">TELEFONO</th>
                    <th class="titles">CORREO</th>
                    <th class="titles">CARRERA</th>
                    <th class="titles">ACCIONES</th>
                </tr>
            </thead>
            <tbody class="cuerpo-t overflow-auto">
                <tr v-for="(v, i) in estudiantes" :key="i">
                    <td class="rows">{{ v.id }}</td>
                    <td class="rows">{{ v.identificacion }}</td>
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
        <PaginacionTabla  :current_page="current_page" :total_page="total_page"/>
    </div>
</template>


<!-- Js -->
<script setup>

import { onMounted, ref } from 'vue';
import { getStudentList } from '../../service/EstudiantesService.js';
import FiltrosTablaEstudiantes from '../estudiantes/FiltrosTablaEstudiantes.vue';
import PaginacionTabla from '../estudiantes/PaginacionTabla.vue';

const estudiantes = ref([]);

const current_page = ref();
const total_page = ref();



onMounted(() => {
    getStudentListToTable();
})

// obtener el primer listado 
const getStudentListToTable = async () => {
    try {
        const date = await getStudentList();
        console.log(date);
        estudiantes.value = date.studentList;
        current_page.value = date.current_page;
        total_page.value = date.total_page;
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
        const found = await getStudentList( undefined , undefined, {filter, value: textSearch});
        estudiantes.value = found.studentList;
        current_page.value = found.current_page;
        total_page.value = found.total_page;
    } catch (error) {
        console.log(error);
    }
}



// eventos cuando el componente de filtros quita los filtros
const delFilters = () =>{
    try {
        getStudentListToTable();
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
    justify-content: center;
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
    text-align: center;
}

.rows {
    border-bottom: 1px solid;
    text-align: center;
    height: 40px;
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