<!-- html -->
<template>
    <div class="caja">
        <table class="table text-center table-hover tabla custom-scrollbar">
            <thead class="table-dark">
                <tr class="cabeza-tabla">
                    <th scope="col" class="celTopLeft">#</th>
                    <th scope="col">REFERENCIA</th>
                    <th scope="col">MATERIA</th>
                    <th scope="col">FECHA APROBACION</th>
                    <th scope="col" class="celTopRigth">ACCIONES</th>
                </tr>
            </thead>
            <tbody class="bodyTable">
                <tr v-for="(item, i) in dataPaginate" :key="i" :data-row="item.id">
                    <th scope="col">{{ item.id }}</th>
                    <td scope="col">{{ item.referencia_pago }}</td>
                    <td scope="col">{{ item.materia }}</td>
                    <td scope="col">{{ new Date(item.fecha_aprobacion).toLocaleDateString('es-ES') }}</td>
                    <td scope="col">
                        <ModalDetalles @click="renderItem(item)" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="cards">
        <CardRowTable v-for="(item, i) in dataPaginate" :key="i" class="cajitas" :datos="item" :num="i" />
    </div>

    <nav aria-label="Page navigation example">
        <ul class="pagination mb-1 mt-1 justify-content-center">
            <li class="page-item" @click="getPreviousPage()">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li v-for="(page, i) in totalPaginas()" @click="getDataPage(page)" :key="i" class="page-item"
                :class="isActive(page)">
                <a class="page-link" href="#">{{ page }}</a>
            </li>
            <li class="page-item" @click="getNextPage()">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-dark text-light">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Detalles de solicitud</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <CardDetails v-if="detalle" :detalle="detalle" />
                </div>
            </div>
        </div>
    </div>
</template>


<!-- Js -->
<script setup>

import { onMounted, ref } from 'vue';
import ModalDetalles from '../components/ModalDetalles.vue';
import CardRowTable from './CardRowTable.vue'
import CardDetails from './CardDetails.vue';
import { getRequestHistory } from '../service/servicesFhistorial.js';
import { invokeAlert } from '../../../shared/js/alertabase';



const lista = ref([]);


onMounted(async () => {
    await loadInitData();
    getDataPage(1);
})


async function loadInitData() {
    try {
        const data = await getRequestHistory();

        if (data.history.length < 1) {
            invokeAlert(null, `No se encontraron registros`, 'info', 'Entendido')
        }
        lista.value = data.history;
        console.log(lista.value);
    } catch (error) {
        console.log(error);
    }
}

//const lista = props.lista;
const dataPaginate = ref([]);
const itemsPerPage = 10;
const currentPage = ref(1);
const detalle = ref();


// funcion para obtener el total de paginas segun la cantidad de registros del hostirial
const totalPaginas = () => {
    return Math.ceil(lista.value.length / itemsPerPage);
}


// obtener datos por pagina
function getDataPage(nroPage) {
    currentPage.value = nroPage;
    dataPaginate.value = [];
    let init = (nroPage * itemsPerPage) - itemsPerPage;
    let end = (nroPage * itemsPerPage);
    dataPaginate.value = lista.value.slice(init, end);
}

// pagina anterior
const getPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
    getDataPage(currentPage.value);
}

// pagina sigueinte
const getNextPage = () => {
    if (currentPage.value < totalPaginas()) {
        currentPage.value++;
    }
    getDataPage(currentPage.value);
}


// pagina activa
const isActive = (nroPage) => {
    return nroPage == currentPage.value ? 'active' : '';
}



// objeto para pintar en modal
const renderItem = (item) => {
    detalle.value = item;
}



</script> 


<!-- CSS -->
<style scoped>
.caja {
    width: 90%;
    max-height: 26.6rem;
    overflow-y: auto;
    margin-bottom: 1rem;
}

.tabla {
    font-size: 16px;
    width: 100%;
}

.cards {
    display: none;
    width: 95%;
    margin-bottom: 1rem;

}

.cajitas {
    margin-bottom: .5rem;
}

.cabeza-tabla {
    position: sticky;
    top: 0;
    height: 47px;
    z-index: 100;
}



th,
td {
    vertical-align: middle;
}



/* clases para tabla del modal */
.tablaM {
    background-color: rgb(224, 222, 231);
    width: 100%;
    border-radius: 10px;
}

.cellsM {
    border: solid;
    border-radius: 10px;
}


.modal-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 100px);
}












@media (min-width: 1370px) {
    .tabla {
        font-size: 20px;
    }
}

@media (max-width: 740px) {
    .caja {
        display: none;
    }

    .cards {
        display: block;
        height: 28rem;
        overflow-y: auto;
    }
}

@media (min-width: 390px) {

    .cards {
        height: 45rem;
        margin-top: 2rem;
    }
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