<!-- html -->
<template>
    <div class="contenedor">
        <TablaHistorial/>
    </div>
</template>


<!-- Js -->
<script setup>
import TablaHistorial from '../components/TablaHistorial.vue';
</script>


<!-- CSS -->
<style scoped>
.contenedor {
    height: 100%;
    width: 100%;
    /* overflow-y: hidden; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 0px;
}
</style>