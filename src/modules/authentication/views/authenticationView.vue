<!-- html -->
<template>
    
    <div class="container-fluid ">
        <section class="row seccion">

            <!-- seccion 1 -->
            <aside class="a-left m-0 p-0 col-12 col-sm-12 col-md-5 bg-success">
                <img src="../../../assets/images/manzana.png" class="poster" alt="" srcset="">
            </aside>

            <aside class="a-rigth m-0 col-12 col-sm-12 col-md-7 derecha">
                <div class="tema">
                    <button class="btn teme" @click="changeTheme">
                        <img class="" alt="" srcset="">
                    </button>
                </div>

                
                <FormLogin  @sendCredentials="handleGetCredentials"/>
                
            </aside>
        </section>

    </div>
</template>


<!-- Js -->
<script setup>

import FormLogin from '../components/FormLogin.vue';
import { useAuthStore } from '../stores/authStore.js';

// store
const store = useAuthStore();




const handleGetCredentials = (credentials) =>{
    // optengo la data
    console.log(credentials.email, credentials.password);
}





const changeTheme = () => {

    const arigth = document.querySelector('.derecha');
    const form = document.querySelector('.form');
    const miniText = document.querySelector('#emailHelp');
    const btnTheme = document.querySelector('.teme');
    
    if (store.getCurrentTheme) {
        btnTheme.style.backgroundColor = "white"
        form.style.color = "white";
        form.classList.remove('border');
        form.classList.add('borderBlack')
        miniText.style.color = "white"
        arigth.style.backgroundColor = "#090C09";
        
        store.setCurrentTheme(false);
    } else {
        btnTheme.style.backgroundColor = "black"
        form.style.color = 'black';
        form.classList.remove('borderBlack');
        form.classList.add('border');
        arigth.style.backgroundColor = "white"
        miniText.style.color = "rgba(33, 37, 41, 0.75)"
        store.setCurrentTheme(true)
    }


}

</script >




<!-- CSS -->
<style scoped>

.seccion {
    height: 100vh;
}

.poster {
    height: 100vh;
    width: 100%;
}


.a-rigth {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0;
    padding-right: 0;
}





.tema {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 20px;
    margin-top: 10px;
}


.borderBlack {
    border: 0.5px solid rgb(51, 50, 50);
    box-shadow: 4px 4px 150px rgba(255, 255, 255, 0.144);
}



.teme{
    height: 20px;
    background-color: black;
}


@media (max-width: 912px) {

    .a-left {
        display: none;
    }

    .a-rigth {
        width: 100%;
    }
}



@media (max-width: 550px) {
    .form {
        box-shadow: none !important;
        border: none !important;
    }

    .teme {
        position: absolute;
        top: 0;
        right: 0;
    }
}
</style>