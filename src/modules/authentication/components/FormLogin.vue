<!-- html -->
<template>
    <div class="form border rounded">
        <div class="logo">
            <img src="../../../assets/logo.svg" class="logo_login" alt="" srcset="">
        </div>
        <div>
            <h2 class="text-center mt-3">Iniciar Sesión</h2>
        </div>
        <form class="p-3">
            <div class="mb-3">

                <input type="email" class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model="email" placeholder="Correo electrónico">
            </div>
            <div class="mb-3">
                <input type="password" class="form-control text-center" id="exampleInputPassword1" v-model="password"
                    placeholder="Contraseña">
            </div>
            <div class="mt-4 d-flex justify-content-center">
                <button @click.prevent="handleCredentials" type="submit" class="btn btn-primary" style="width: 65%;">Submit</button>
            </div>

            <div class="mt-5">
                <div id="emailHelp" class="form-text text-center">aceptas nuestros terminos y condiciones de
                    uso<br> al ingresar en este aplicativo</div>
            </div>
        </form>
    </div>
</template>


<!-- Js -->
<script setup>

import { ref, defineEmits } from 'vue';


const email = ref('');
const password = ref('');

const emit = defineEmits(['sendCredentials']);

const handleCredentials = () =>{
    emit('sendCredentials', {email: email.value, password: password.value})
}



</script>


<!-- CSS -->
<style scoped>


.form {
    width: 550px;
    height: 550px;
    box-shadow: 5px 4px 50px rgba(0, 0, 0, 0.171);
}







.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
}

.logo_login {
    width: 25%;
}



</style>