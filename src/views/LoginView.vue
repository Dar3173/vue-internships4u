<template>
    <div>
      <div class="imagen">
        <img class="imagen" src="@/assets/img/mujer_estudiante.png" alt="mujer" />
      </div>
      <FormularioRegistro />
      <!-- Otras secciones de tu componente principal -->
    </div>
  </template>
  
  <script setup>
  import FormularioRegistro from '../components/FormularioRegistro.vue';
  
  // Resto de tu código principal
  </script>
  
  <style>
    .imagen {
      margin-left: 0px;
      margin-top: -20px;
      width: 600px;
      height: 600px;
    }
  </style>