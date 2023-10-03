<!-- html -->
<template>
    <div class="miAlert">
        <div class="alert" :class="{ 'color-alert-success ': props.state, 'color-alert-faild': !props.state }" role="alert">
            {{ props.message }}
            <span class="icon" :class="{ 'icon-ok-circle': props.state, 'icon-cancel-circled': !props.state }">
            </span>
        </div>
    </div>
</template>


<!-- Js -->
<script setup>

import { defineProps , } from 'vue';


const props = defineProps({
    state : {
        type: Boolean,
        required: true
    },
    message:{
        type: String,
        required: true
    }
})



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


.color-alert-faild {
    background-color: var(--alert-success);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #b61919;
    flex-direction: column;
}

.color-alert-success {
    background-color: var(--alert-success);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #008000;
    flex-direction: column;

}

.icon {
    font-size: 25px;
}
</style>