<!-- html -->
<template>
    <div class="contenedor">
        <section class="section_rigth">
            <div class="flecha_left">
                <span class="icon-angle-circled-left fle colorpage" @click="clicmenos"></span>
            </div>
            <div class="center_box">
                <div>
                    <label for="" class="ms-1 colorpage">pagina</label>
                    <input type="number" class="input_page colorpage" :value="current_page" @change="sentInput"
                        @blur="emitNumPage" >
                    <label for="" class="ms-1 colorpage"> de {{ total_page }} </label>
                </div>
            </div>
            <div class="flecha_right">
                <span class="icon-angle-circled-right fle colorpage" @click="clicMas"></span>
            </div>
        </section>
        <section class="recordss">
            <label for="" class="colorpage">{{ total_r_f }} de {{ total_r }}</label>
        </section>
        <section class="seccion2">
            <label class="colorpage">filas por pagina</label>
            <select name="amountRows" id="" class="colorpage" @change="emitAmount" :v-model="currentAmount">
                <option v-for="item, i in amount" :key="i" :value="item">{{ item }}</option>
            </select>
        </section>
    </div>
</template>


<!-- Js -->
<script setup>

import { ref } from 'vue';
const props = defineProps(['current_page', 'total_page', 'total_r', 'total_r_f']);
const emits = defineEmits(['changePage', 'changeNumPage', 'getAmount']);


let currentPageInput = ref(props.current_page);
const amount = [15, 20, 30, 50, 100];

const currentAmount = ref(amount[0]);



const clicmenos = () => {
    emits('changePage', 'previous');
}


const clicMas = () => {
    emits('changePage', 'next')
}

const sentInput = (event) => {
    currentPageInput.value = event.target.value;
    emits("changeNumPage", currentPageInput.value);
}


const emitAmount = (event) => {
    currentAmount.value = event.target.value;
    emits('getAmount', currentAmount.value)
}

</script>


<!-- CSS -->
<style scoped>
.contenedor {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;
    width: 98%;
}



.center_box {
    display: flex;
    justify-content: center;
    align-items: center;
}


.center_box {
    width: 10rem;
    border-radius: 7px;
    background-color: rgba(203, 207, 203, 0.74);
}


.section_rigth {
    display: flex;
    gap: 1px;
}

.seccion2 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.flecha_left,
.flecha_right {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
}

.fle {
    font-size: 20px;
    text-align: center;
}


.colorpage {
    color: rgb(57, 100, 8);
}


.recordss{
    display: flex;
    justify-content: center;
    align-items: center;
}

.input_page {
    width: 3rem;
    margin-left: 5px;
    border-radius: 8px;
    background-color: rgba(88, 156, 10, 0.363);
    border: none;
    text-align: center;

}
</style>