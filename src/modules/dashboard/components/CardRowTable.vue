<!-- html -->
<template>
    <div class="card" style="width: 100%">
        <div class="card-header bg-dark text-light">
            Informacion de solicitud
        </div>
        <div class="container-fluid">
            <table class="w-100 table miTabla">
                <tr>
                    <th>Referencia:</th>
                    <td>{{ props.datos.referencia_pago }}</td>
                </tr>
                <tr>
                    <th>Materia:</th>
                    <td>{{ props.datos.materia }}</td>
                </tr>
                <tr>
                    <th>Docente:</th>
                    <td>{{ props.datos.profesor }}</td>
                </tr>
                <tr>
                    <th>Correo docente:</th>
                    <td style="word-break: break-all;">{{ props.datos.correo_profesor }}</td>
                </tr>
                <tr>
                    <th>Fecha aprovación:</th>
                    <td>{{ new Date(props.datos.fecha_aprobacion).toLocaleDateString('es-ES') }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>


<!-- Js -->
<script setup>

const props = defineProps(['datos', 'num']);
</script>


<!-- CSS -->
<style scoped>
.miTabla {
    /* color */
    font-size: smaller;
}
</style>