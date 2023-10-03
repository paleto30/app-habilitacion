<!-- html -->
<template>
    <div class="miAlert">
        <div class="alert color-alert" role="alert">
            ¡Su registro fue exitoso!
            <span class="icon-ok-circle  icon">
            </span>
        </div>
    </div>
</template>


<!-- Js -->
<script setup>



</script>


<!-- CSS -->
<style scoped>
.miAlert {
    /* color */
    z-index: 100000;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.356);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}


.color-alert {
    background-color: var(--alert-success);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #008000;
    flex-direction: column;
}

.icon{
    font-size: 25px;
}

</style>