<!-- html -->
<template>
    <div class="detalleEstudiante">
        <div class="p-2 ">
            <div class="row">
                <!-- col 1 -->
                <div class="col-12 col-md-12">
                    <div class="">
                        <embed class="visorPdf" :src="docs.pdf" frameborder="0">
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2 ">
            <div class="row ">
                <h3>Imagen del pago:</h3>
                <!-- col 1 -->
                <div class="col-12 col-md-12">
                    <div class="content-image">
                        <img class="imagen" :src="docs.img" frameborder="0">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<!-- Js -->
<script setup>

defineProps(['docs']);

</script>


<!-- CSS -->
<style scoped>
.detalleEstudiante {
    width: 100%;
    background-color: rgba(236, 236, 236, 0.986);
    border: 1px solid rgb(179, 179, 179);
    border-radius: 10px;
    padding: 10px;
    color: black;
}

.visorPdf{
    width: 100%;
    height: 460px;
    border-radius: 6px;
}


.content-image{
    display: flex;
    justify-content: center;
    border: 1px solid rgb(200, 200, 200);
    height: 460px;
    border-radius: 8px;

}

.imagen{

    max-width: 60%;
}


</style>