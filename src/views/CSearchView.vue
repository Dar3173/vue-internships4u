<template>
  <div class="customSearch">
    <h1>Búsqueda Avanzada</h1>
    <DropdownCS/>
    <div class="center-box">
    </div>
  </div>
</template>

<script setup>
import DropdownCS from '../components/DropdownCS.vue'
</script>

<style lang="scss" scoped>
  .customSearch h1{
    margin: 5px 0 5px 20px;
    font-size: 60px;
    color: $azul-oscuro;
    text-align: left;
    font-weight: bold;
  }
  .center-box {
    width: 97%;
    height: 400px;
    background-color: white;
    border-radius: 10px;
    margin: auto;
  }
</style>


