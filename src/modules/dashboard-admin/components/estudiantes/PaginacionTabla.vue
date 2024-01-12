<!-- html -->
<template>
  <div class="clase">
    <p>pagina {{ props.current_page }} de {{ props.total_page }}</p>
  </div>
</template>


<!-- Js -->
<script setup>

import { ref, defineEmits, defineProps } from 'vue';

const props = defineProps(['current_page','total_page']);
const emits = defineEmits(['']);


</script>


<!-- CSS -->
<style scoped>
  .clase{
    /* color */
    color: rgb(38, 85, 28);
    background-color: rgb(117, 230, 230);
  }
</style>