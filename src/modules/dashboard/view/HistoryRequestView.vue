<!-- html -->
<template>
    <div class="contenedor">
        <TablaHistorial v-if="listRequest.length > 0" :lista="listRequest" />
    </div>
</template>


<!-- Js -->
<script setup>

import { onMounted, ref } from 'vue';
import TablaHistorial from '../components/TablaHistorial.vue';
import { getRequestHistory } from '../service/servicesFhistorial.js';


const listRequest = ref([]);


onMounted(async () => {
    await getRequestList();
})


async function getRequestList() {
    try {
        const data = await getRequestHistory();
        listRequest.value = await data.history;
    } catch (error) {
        console.log(error);
    }
}


</script>


<!-- CSS -->
<style scoped>
.contenedor {
    height: 100%;
    width: 100%;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 0px;
}
</style>