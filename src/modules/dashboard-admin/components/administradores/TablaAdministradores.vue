<!-- html -->
<template>
    <!-- superior -->
    <div class="superior">
        <button id="addN" type="button" class="botonCrear icon-user-add btnInfo" title="información" data-bs-toggle="modal"
            data-bs-target="#staticBackdrop" @click="showCreateAdminForm">Crear administrador</button>
        <FiltrosTablaAdmins :filters="filtros" @searchRecord="sendFilters" @removeFilters="delFilters" />
    </div>
    <!-- tabla  -->
    <div class="centro">
        <table class="tabla">
            <thead class="cabeza-t sticky-top">
                <tr>
                    <th class="titles p-2">ID</th>
                    <th class="titles">IDENTIFICACION</th>
                    <th class="titles">NOMBRE</th>
                    <th class="titles">ROL</th>
                    <th class="titles">TELEFONO</th>
                    <th class="titles">CORREO</th>
                    <th class="titles">COORDINACIÓN</th>
                    <th class="titles">ACCIONES</th>
                </tr>
            </thead>
            <tbody class="cuerpo-t overflow-auto">
                <tr v-for="v in admins" :key="v.id" :data-register="v.id" class="focus-row">
                    <td class="rows p-2 ">{{ v.id }}</td>
                    <td class="rows">{{ v.doc_id }}</td>
                    <td class="rows">{{ v.nombre }}</td>
                    <td class="rows">{{ v.rol }}</td>
                    <td class="rows">{{ v.telefono }}</td>
                    <td class="rows">{{ v.correo }}</td>
                    <td class="rows">{{ v.name_coo }}</td>
                    <td class="rows">
                        <div class="d-flex justify-content-evenly">
                            <span class="icon-trash" @click="removalInsurance(v.id)"></span>
                            <span class="icon-spin3" title="información" data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop" @click="showUpdateAdminForm(v)"></span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- inferior -->
    <div class="inferior">
        <PaginacionTablaAdmins v-if="current_page" :current_page="current_page" :total_page="total_page"
            :total_r="total_rec" :total_r_f="total_found" @changePage="getNewSetOfRecords"
            @changeNumPage="getDataForNumPage" @getAmount="setAmountRows" />
    </div>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content ">
                <div class="modal-header bg-dark">
                    <h5 class="modal-title " id="staticBackdropLabel">{{ modalTitle }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body cuerpoModal">
                    <!-- aqui va el componente -->
                    <section class="seccion1 mb-2">
                        <component :is="currentFormInModal" @reloadTable="reloadRecorsd" />
                        <!-- <FormRegisterAdmin @reloadTable="reloadRecorsd" /> -->
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>


<!-- Js -->
<script setup>
import { onMounted, ref } from 'vue'
import FiltrosTablaAdmins from '../administradores/FiltrosTablaAdmins.vue';
import PaginacionTablaAdmins from '../administradores/PaginacionTablaAdmins.vue';
import { getAdministratorList, deleteAdminById } from '../../service/AdministradorService.js';
import { invokeAlert, alertAreYouSure } from '../../../../shared/js/alertabase.js';
import FormRegisterAdmin from './FormRegisterAdmin.vue';
import FormUpdateAdmin from './FormUpdateAdmin.vue';

const admins = ref([]);
const current_page = ref(1);
const amount = ref(15);
const total_page = ref();
const total_rec = ref();
const total_found = ref();


const currentFormInModal = ref(null);
const modalTitle = ref('');


onMounted(() => {
    getAdminListToTable(current_page.value, amount.value)
})



async function getAdminListToTable(page, amount, objFilte = null) {
    try {
        const resInfo = await getAdministratorList(page, amount, objFilte);

        if (!resInfo.success) {
            invokeAlert('Aviso', `${resInfo.error}`, 'warning', 'Entendido')
        }

        const response = resInfo.data;

        if (response.total_records_found == 0) {
            invokeAlert(null, `No se encontraron registros`, 'info', 'Entendido')
        }

        admins.value = response.admins;
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
        value: 'name',
        name: 'Nombre'
    },
    {
        value: 'email',
        name: 'Correo'
    }
];


// evento cuando el componente de filtros nos envia un filtro
const sendFilters = async (filter, textSearch) => {
    try {
        getAdminListToTable(current_page.value, amount.value, { filter, value: textSearch });
    } catch (error) {
        console.log(error);
    }
}



// eventos cuando el componente de filtros quita los filtros
const delFilters = () => {
    try {
        getAdminListToTable(current_page.value, amount.value);
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
                    getAdminListToTable(current_page.value, amount.value);
                }
                break;
            case 'next':
                if (current_page.value < total_page.value) {
                    current_page.value++;
                    getAdminListToTable(current_page.value, amount.value);
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
        getAdminListToTable(current_page.value, amount.value);
    } catch (error) {
        console.log(error);
    }
}

const setAmountRows = async (cantidad) => {
    try {
        amount.value = cantidad;
        getAdminListToTable(current_page.value, amount.value);
    } catch (error) {
        console.log(error);
    }
}


const animationBtn = (e) => {
    if (e.target) {

        const btn = document.querySelector('#addN');
        btn.classList.add('clicked')

        setTimeout(() => {
            btn.classList.remove('clicked');
        }, 100)
    }
}

// ejecutar el emit del form de registro admin
const reloadRecorsd = (success) => {
    try {
        if (success) {
            getAdminListToTable(current_page.value, amount.value);
        }
    } catch (error) {
        console.log();
    }
}

// cargar el componente dinamico en el modal 
const showCreateAdminForm = (e) => {
    animationBtn(e)
    currentFormInModal.value = FormRegisterAdmin
    modalTitle.value = 'Formulario de registro'
}

// cargar componente de update
const showUpdateAdminForm = (data) => {
    console.log(data);
    currentFormInModal.value = FormUpdateAdmin
    modalTitle.value = 'Editar registro'
}

// funcion para eliminar un item 
const removalInsurance = async (id) => {
    try {
        const deleted = await alertAreYouSure('Esta seguro?', 'No se podran recuperar los datos!', 'Si, Eliminar!', 'Calcelar', 'Eliminado', 'El administrador a sido eliminado.', 'Entendido');
        if (deleted) {
            await deleteAdminById(id);
            getAdminListToTable(current_page.value, amount.value);
        }
        return;
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

.botonCrear {
    background-color: rgb(255, 255, 255);
    color: rgb(88, 156, 10);
    height: 30px;
    text-align: center;
    font-size: 14px;
    border: .5px solid;
    border-radius: 6px;
    padding: 0px 8px;
}

.clicked {
    border: #000000;
    color: #000000;
    border: .5px solid #000000;
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


.seccion1 {
    display: flex;
    justify-content: center;
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