<!-- html -->
<template>
    <div class="container-fluid  miclass">

        <!-- toda la vista de la pantalla -->
        <section class="row seccion mx-auto px-auto">

            <!-- seccion 1 -->
            <aside class="a-left m-0 p-0 col-12 col-sm-12 col-md-5 bg-success">
                <img src="../../../assets/images/portada1.png" class="poster" alt="" srcset="">
            </aside>

            <!-- seccion 2 -->
            <aside class="a-rigth m-0 col-12 col-sm-12 col-md-7 derecha">
                
                <!-- formularios (registro o login) -->
                <router-view />
            </aside>
        </section>
    </div>
</template>


<!-- Js -->
<script setup>




</script >




<!-- CSS -->
<style >

.miclass{
    padding-left: 0;
    padding-right: 0;
}


.seccion {
    height: 100vh;
}

.poster {
    height: 100%;
    width: 100%;
}


.a-rigth {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0;
    padding-right: 0;
}




.borderBlack {
    border: 0.5px solid rgb(51, 50, 50);
    box-shadow: 5px 5px 150px rgba(255, 255, 255, 0.274);
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
}
</style>