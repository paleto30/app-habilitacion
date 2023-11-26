<!-- html -->
<template>
    <!-- Default dropup button -->
    <div class="btn-group dropup w-100">
        <button type="button" class="btn dropdown-toggle w-100 boton" data-bs-toggle="dropdown" aria-expanded="false">
            <div><span class="icon-user me-3"></span>{{ nameUser }}</div>
        </button>
        <ul class="dropdown-menu w-100">
            <!-- Dropdown menu links -->
            <li class="nav-link text-center caja">
                <button type="button" @click="handlerLogout" class="btn botonExit"> 
                    <span class="icon-left-open me-3"></span>Cerrar Sesión</button>
            </li>
        </ul>
    </div>
</template>


<!-- Js -->
<script setup>

import { onMounted, ref } from 'vue';
import { useAuthStore } from '../../modules/authentication/stores/authStore';
import { useRouter } from 'vue-router';

const nameUser = ref('');
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
    const { nombre, apellido } = authStore.authUser;
    nameUser.value = formatNames(nombre, apellido);
})

// funcion para manejar el logout
const handlerLogout = () => {
    authStore.setStoreAuthNull();
    setTimeout(()=>{
        sessionStorage.removeItem('auth');
        sessionStorage.clear();
        router.push({ name: 'login' });
    },500);
}


// formato del nombre de usuario 
function formatNames(names, lastName) {
    const getName = names.split(' ')[0];
    const getLast = lastName.split(' ')[0];
    const name = getName.charAt(0).toUpperCase() + getName.slice(1).toLowerCase();
    const last = getLast.charAt(0).toUpperCase() + getLast.slice(1).toLowerCase();
    const full = name + " " + last;
    return full
}


</script>


<!-- CSS -->
<style scoped>
.boton {
    background-color: rgba(0, 0, 0, 0.281);
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: start;
}

.caja {
    width: 100%;
    display: flex;
    justify-content: center;
}

.caja:hover {
    background-color: rgb(206, 205, 205);
    border-radius: 5px;
}


.botonExit {
    /* border: .1px solid rgb(126, 125, 125); */
    width: 100%;
    text-decoration: none;
    color: black;
    text-align: start;
    font-size: 15px;
}
</style>