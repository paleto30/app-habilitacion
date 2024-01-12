<!-- html -->
<template>
    <div class="contenedor">
        <div class="seleccion-f">
            <select name="filters" id="filters" class="item-select" v-model="filter" >
                <option value="null">seleccione-filtro</option>
                <option v-for="(v, i) in props.filters" :key="i" :value="v.value">{{ v.name }}</option>
            </select>
        </div>
        <div class="caja">
            <div>
                <input type="text" v-model="textSearch" :disabled="!filter || filter === 'null'">
            </div>
            <div class="boton">
                <button class="my-btn btn-s" @click="animateBtn" id="btnS"  :disabled="!filter || filter === 'null'">
                    <span class="icon-search" style="color: black;"></span>
                </button>
                <button class="my-btn btn-r" @click="removeFilter" id="btnR">
                    <span class="icon-cancel" style="color: black;"></span>
                </button>
            </div>
        </div>
    </div>
</template>

<!-- Js -->
<script setup>
import { ref, defineEmits, defineProps } from 'vue';


const props = defineProps(['filters']);
const emits = defineEmits(['searchRecord', 'removeFilters']);

const textSearch = ref('');
const filter = ref(null);


// funcion para animar el boton de buscar
function animateBtn() {
    const btns = document.querySelector('#btnS');
    btns.classList.add('clicked');
    
    setTimeout(() => {
        btns.classList.remove('clicked')
       
    }, 500)

    emits("searchRecord", filter.value, textSearch.value)
}



function removeFilter() {
    const btnr = document.querySelector('#btnR');
    btnr.classList.add('clicked');
    setTimeout(() => {
        btnr.classList.remove('clicked')
    }, 500)

    filter.value = null
    textSearch.value = ''
    
    emits("removeFilters");
}
</script>


<!-- CSS -->
<style scoped>
.contenedor {
    display: flex;
    flex-direction: row;
}

.seleccion-f {
    margin-right: 5px;
}

.item-select {
    height: 28px;
    padding: 0px 10px;

}

.caja {
    display: flex;
}

.boton {
    margin-left: 5px;
}

.my-btn {
    border: transparent;
    height: 28px;
    width: 3rem;
    border-radius: 5px;
}

.my-btn {
    transition: background-color 0.2s ease-in-out;
}

.btn-s {
    background: rgb(43, 167, 99);
}
.btn-r{
    margin-left: 4px;
    background-color: rgb(204, 96, 96);
}
.clicked {
    transform: scale(1.1);
    /* Escala el botón al hacer clic */
    transition: transform 0.1s ease-in-out;
}
</style>