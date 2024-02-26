<!-- html -->
<template>
    <div class="form border rounded">
        <div class="logo">
            <img src="../../../assets/Manzanavector.svg" class="logo_login" alt="" srcset="">
        </div>
        <div>
            <h2 class="text-center mt-3">Iniciar Sesión</h2>
        </div>
        <form class="p-3" @submit.prevent="handleFormData">
            <div class="row mb-1 mb-md-3">
                <div class="mb-1 mb-md-3">
                    <input type="email" class="form-control text-center inputs" id="correo" v-model="correo"
                        placeholder="Correo institucional" required>
                </div>
                <div class="mb-1 mb-md-3 caja">
                    <span class="icon-eye" :class="{ 'ojo': colorEye, 'ojoo': !colorEye }" @click="showKey"></span>
                    <input :type="showPass ? 'text' : 'password'" class="form-control text-center inputs" v-model="password"
                        placeholder="Contraseña" id="pass" required>
                </div>
            </div>
            <div class="mt-4 d-flex justify-content-center">
                <button type="submit" class="btn btn-primary" style="width: 50%;">Iniciar
                    Sesion</button>
            </div>

            <div id="emailHelp" class="form-text text-center ">¿ No tienes una cuenta ? <button
                    @click.prevent="handleComponent" type="button" class="myLink">Registrate</button>
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

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authServices from '../service/authServices.js';
import { invokeAlert, alertProccessSuccess } from '../../../shared/js/alertabase.js';
import { useAuthStore } from '../stores/authStore.js';


const authStore = useAuthStore();


// atributos del componente
const correo = ref('');
const password = ref('');


const handleFormData = async () => {

    if (!correo.value || !password.value || !correo.value.trim() || !password.value.trim()) {
        invokeAlert('', 'Ingrese las credenciales de accesso', 'warning', 'Entendido', '#2280E5')
        return
    }

    const user = {
        correo: correo.value,
        clave: password.value
    }
    try {

        const response = await authServices.sendCredentialsForLogin(user);
        if (!response.status) {
            invokeAlert('Error!', response.error, 'info', 'Entendido', '#2280E5');
        } else {
            authStore.setAuthUser(response.user);
            authStore.setAccessToken(response.accessToken);

            alertProccessSuccess(response.message)

            correo.value = undefined
            password.value = undefined

            setTimeout(() => {
                if (authStore.authUser.rol === 3) {
                    router.push({ name: 'dashboard-estudiante' })
                }


                if (authStore.authUser.rol === 2) {
                    router.push({ name: 'dashboard-admin' })
                }


                if (authStore.authUser.rol === 1) {
                    router.push({ name: 'dashboard-admin-all-access' })
                }
            }, 1500)
        }
    } catch (error) {
        console.error(error);
    }
}



// router -> enviar al formulario de registro 
const router = useRouter();
const handleComponent = () => {
    router.push({ name: 'register' })
}




// variables para manejar el ojo de el input clave
const showPass = ref(false);
let colorEye = ref(true);
// funcion para manejar el ojo de ver la contraseña
const showKey = () => {
    showPass.value = !showPass.value;
    colorEye.value = !colorEye.value;
}

</script>


<!-- CSS -->
<style scoped>
.form {
    width: 510px;
    height: 550px;
    box-shadow: 5px 4px 50px rgba(0, 0, 0, 0.300);
}


.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
}

.logo_login {
    width: 15%;
}

.myLink {
    text-decoration: underline;
    color: #008000;
    border: none;
    background: none;
}

.myLink:hover {
    color: var(--colorfocus-link);
}

::placeholder {
    color: rgb(162, 167, 170);
}

.inputs {
    border-color: #3b3b3b4f;
}

.caja {
    position: relative;
}

.ojo {
    position: absolute;
    z-index: 10;
    right: 0;
    bottom: 0;
    font-size: 18px;
    margin-right: 18px;
    margin-bottom: 6px;
    color: #808380;
    border-radius: 50%;
    text-align: center;
}

.ojoo {
    position: absolute;
    z-index: 10;
    right: 0;
    bottom: 0;
    font-size: 18px;
    margin-right: 18px;
    margin-bottom: 6px;
    color: var(--maincolor-green);
    border-radius: 50%;
    text-align: center;
}

.ojo:hover {
    color: var(--maincolor-green);
}
</style>