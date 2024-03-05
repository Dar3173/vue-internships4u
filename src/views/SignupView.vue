<template>
  <div class="container_registro">
    <div class="container_texto">
      <h1>Registro</h1>
      <p class="container_parrafo">
        Desde prácticas locales hasta oportunidades internacionales, nuestra plataforma te conecta con empresas líderes que valoran el talento emergente.
      </p>
    </div>
    <FormularioRegistro />
  </div>
  <div class="imagen_registro">
    <img src="@/assets/img/mujer_estudiante.png" alt="mujer" />
  </div>
  
    <RouterLink :to="'/'" class="routerlink"> <div class="btn_login"> &#60; </div></RouterLink>
  
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
.container_parrafo{
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

.btn_login{
  position: absolute;
  width: 50px;
  height: 50px;
  left: 20px;
  bottom: 50px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  text-align: center;
  transition: 50ms;
  cursor: pointer;
}

.btn_login:hover {
  background-color: white;
  width: 55px;
  height: 55px;
}

.routerlink{
  text-align: center;
  font-size: 40px;
  color: $azul-oscuro;
  font-weight: bold;
  transition: 50ms;
  text-decoration: none;
  cursor: pointer;
}

.routerlink:hover {
  color: $naranja;
}
</style>