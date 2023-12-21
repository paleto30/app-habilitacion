<!-- html -->
<template>
    <div class="container-fluid">
        <div class="row text-start">
            <div class="col-6 py-2"> <strong>Referencia:</strong> </div>
            <div class="col-6 py-2">{{ props.detalle.referencia_pago }}</div>
        </div>
        <div class="row text-start">
            <div class="col-6 py-2"><strong>Materia:</strong></div>
            <div class="col-6 py-2">{{ props.detalle.materia }}</div>
        </div>
        <div class="row text-start">
            <div class="col-6 py-2"><strong>Docente:</strong></div>
            <div class="col-6 py-2">{{ props.detalle.profesor }}</div>
        </div>
        <div class="row text-start">
            <div class="col-6 py-2"><strong>Correo de docente:</strong></div>
            <div class="col-6 py-2 overflow-x-auto">{{ props.detalle.correo_profesor }}</div>
        </div>
        <div class="row text-start">
            <div class="col-6 py-2"><strong>Fecha de aprovación:</strong></div>
            <div class="col-6 py-2">{{ new Date(props.detalle.fecha_aprobacion).toLocaleDateString('es-ES') }}</div>
        </div>
    </div>
</template>


<!-- Js -->
<script setup>

const props = defineProps(['detalle']);

</script>


<!-- CSS -->
<style scoped>
.clase {
    /* color */
    color: rgb(38, 85, 28);
}
</style>