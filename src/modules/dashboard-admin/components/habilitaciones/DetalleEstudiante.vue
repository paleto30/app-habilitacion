<!-- html -->
<template>
    <div class="detalleEstudiante">
        <h3 class="ps-2">Estudiante</h3>
        <div class="p-2 ">
            <div class="row">
                <!-- col 1 -->
                <div class="col col-md-6">
                    <div class="mb-2">
                        <label for="" class="labels">Identificación</label>
                        <input type="text" class="inputs" disabled :value="estudiante.doc_id">
                    </div>
                    <div class="mb-2">
                        <label for="" class="labels">Nombre</label>
                        <input type="text" class="inputs" disabled :value="estudiante.nombre">
                    </div>
                    <div class="mb-2">
                        <label for="" class="labels">Telefono</label>
                        <input type="text" class="inputs" disabled :value="estudiante.telefono">
                    </div>
                </div>
                <!-- col2 -->
                <div class="col col col-md-6 derecha">
                    <div class="mb-2">
                        <label for="" class="labels">Apellidos</label>
                        <input type="text" class="inputs" disabled :value="estudiante.apellido">
                    </div>
                    <div class="mb-2">
                        <label for="" class="labels">Correo</label>
                        <input type="text" class="inputs" disabled :value="estudiante.correo">
                    </div>
                </div>
                <!-- col3 -->
                <div class="col col-md-12">
                    <div class="mb-2">
                        <label for="" class="labels">Carrera</label>
                        <input type="text" class="inputs" disabled :value="carrera">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<!-- Js -->
<script setup>

defineProps(['estudiante', 'carrera']);


</script>


<!-- CSS -->
<style scoped>
.detalleEstudiante {
    width: 50%;
    background-color: rgba(236, 236, 236, 0.986);
    border: 1px solid rgb(179, 179, 179);
    border-radius: 10px;
    padding: 10px;
    color: black;
}


.derecha {
    display: flex;
    flex-direction: column;
    justify-content: end;
}

.labels {
    font-weight: 400;
}


.inputs {
    border-radius: 6px;
    width: 100%;
    border: 1px solid rgb(173, 173, 173);
    height: 35px;
    padding-left: 5px;
    color: rgb(77, 124, 22);
}
</style>