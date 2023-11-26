<!-- html -->
<template>
    <div class="menuss">
        <ul class="navbar-nav">
            <li class="lista" v-for="(item, i) in props.menus" :key="i">
                <router-link class="nav-link linnk" :to="{ name: item.nameRoute }" ><span :class="item.icon"></span> {{ item.text }}</router-link>
            </li>
        </ul>
    </div>
</template>


<!-- Js -->
<script setup>



// props del menu
const props = defineProps({
    menus: Array
});







</script>


<!-- CSS -->
<style scoped>
.menuss {
    /*   border: 0.1px  solid black; */
    padding: 5px;
}


.lista{
    margin: 1px;
}

.linnk{
    padding-left: 10px;
    border-radius: 6px;
}


.router-link-active {
    background-color: #579b0979;
    border-radius: 6px;
}

.linnk:hover{
    background-color: #579b0979 ;
}





</style>