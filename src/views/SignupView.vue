<template>
  <div class="container_registro">
    <div class="container_texto">
      <h1>Registro</h1>
      <p>
        Desde prácticas locales hasta oportunidades internacionales, nuestra plataforma te conecta con empresas líderes que valoran el talento emergente.
      </p>
    </div>
    <FormularioRegistro />
  </div>
  <div class="imagen_registro">
    <img src="@/assets/img/mujer_estudiante.png" alt="mujer" />
  </div>
</template>

<script setup>
import FormularioRegistro from '../components/FormularioRegistro.vue';
</script>
  
<style scoped lang="scss">
.container_registro{
  display: block;
  margin-left: 100px;
  width: 40%;
  height: 40%;
}

.container_texto h1{
  text-align: center;
  color: $azul-oscuro;
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 0;
}

.container_texto p{
  text-align: center;
  color: white;
  font-size: 15px;
}

.imagen_registro, img {
  height: 650px;
  object-fit: cover;
  position: fixed;
  bottom: 0;
  right: 100px;
}
</style>