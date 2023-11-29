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
  height: 70%;
}

.container_texto{
  display: flex;
  flex-direction: column;
  padding: 0 20px 0 20px;
}
.container_texto h1{
  text-align: center;
  color: $azul-oscuro;
  font-size: 70px;
  font-weight: bold;
  margin-bottom: 0;
}

.container_texto p{
  text-align: center;
  color: white;
  font-size: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: 50px;
}

.imagen_registro, img {
  height: 650px;
  object-fit: cover;
  position: fixed;
  bottom: 0;
  right: 100px;
}
</style>