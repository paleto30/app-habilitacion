<!-- html -->
<template>
    <div class="caja">
        <table class="table text-center table-hover tabla">
            <thead class="table-dark">
                <tr>
                    <th scope="col" class="celTopLeft">#ID</th>
                    <th scope="col">REFERENCIA</th>
                    <th scope="col">MATERIA</th>
                    <th scope="col">FECHA APROBACION</th>
                    <th scope="col" class="celTopRigth">ACCIONES</th>
                </tr>
            </thead>
            <tbody class="bodyTable">
                <tr v-for="(item, i) in arrayHistory" :key="i" :data-row="item.id">
                    <th scope="col">{{ i + 1 }}</th>
                    <td scope="col">{{ item.referencia_pago }}</td>
                    <td scope="col">{{ item.materia }}</td>
                    <td scope="col">{{ item.fecha_aprobacion }}</td>
                    <td scope="col">
                        <ModalDetalles />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <PaginacionTablaHistorial/>
   
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-dark text-light">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Detalles de solicitud</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row text-start">
                            <div class="col-6 py-2">Referencia:</div>
                            <div class="col-6 py-2">{{ obj.referencia }}</div>
                        </div>
                        <div class="row text-start">
                            <div class="col-6 py-2">Materia:</div>
                            <div class="col-6 py-2">{{ obj.materia }}</div>
                        </div>
                        <div class="row text-start">
                            <div class="col-6 py-2">Docente:</div>
                            <div class="col-6 py-2">{{ obj.profesor }}</div>
                        </div>
                        <div class="row text-start">
                            <div class="col-6 py-2">Correo de docente:</div>
                            <div class="col-6 py-2 overflow-x-auto">{{ obj.correo_profe }}</div>
                        </div>
                        <div class="row text-start">
                            <div class="col-6 py-2">Fecha de aprovación:</div>
                            <div class="col-6 py-2">{{ obj.fecha }}</div>
                        </div>
                        <div class="row text-start">
                            <div class="col-6 py-2"></div>
                            <div class="col-6 py-2"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<!-- Js -->
<script setup>
import ModalDetalles from '../components/ModalDetalles.vue';
import { onMounted, ref } from 'vue';
import { getRequestHistory } from '../service/servicesFhistorial.js';
import PaginacionTablaHistorial from './PaginacionTablaHistorial.vue';

const arrayHistory = ref([]);


onMounted(() => {
    listRequestHistory();
})



const listRequestHistory = async () => {
    try {
        const data = await getRequestHistory();
        arrayHistory.value = data.history;
        console.log(arrayHistory.value);
    } catch (error) {
        console.log(error);
    }
}

const obj = {
    id: 1,
    referencia: 1313123,
    materia: 'Calculo Diferencial',
    profesor: 'Vermen Reiner Ayala',
    correo_profe: 'correo@correoprofe',
    fecha: '1233/12/2'
}



</script>


<!-- CSS -->
<style scoped>
.caja {
    width: 90%;
}

.tabla {
    font-size: 16px;
    margin-bottom: 2px;
    margin-top: 20px;
}


.celTopLeft {
    border-top-left-radius: 10px;
}

.celTopRigth {
    border-top-right-radius: 10px;
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


.modal-dialog{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 100px);
}



@media (max-width: 740px) {
    .tabla {
        display: none;
    }
}



@media (min-width: 1370px) {
    .tabla {
        font-size: 20px;
    }
}
</style>