<template>
    <div class="container_login">
        <div class="container_texto">
            <h1>Iniciar Sesión</h1>
            <P class="texto_parrafo">Encuentra la práctica perfecta para adquirir experiencia real y desarrollar tus habilidades.</P>
            <p class="texto_iconos">
                &#10003; Publica tu vacante.
                <br>
                &#9993; Revisa las postulaciones.
                <br>
                &#128447; Contrata
            </p>
        </div>
        <FormularioLogin />
    </div>
    <div class="imagen_login">
        <img src="../assets/img/hombre_mujer_estudiantes.png" alt="hombre y mujer mirando una tablet" />
    </div>
</template>

<script setup>
import FormularioLogin from '@/components/FormularioLogin.vue';
</script>

<style lang="scss" scoped>
.container_login{
    display: block;
    margin-left: 100px;
    width: 40%;
    height: 70%;
}

.container_texto{
    padding: 0 20px 0 20px;
}
.container_texto h1{
    text-align: center;
    color: $azul-oscuro;
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 0;
}

.texto_parrafo{
    text-align: center;
    color: white;
    font-size: 20px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.texto_iconos{
    color: white;
    font-size: 25px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    margin-left: 100px;
    margin-top: 20px;
}

.imagen_login, img {
    height: 650px;
    object-fit: cover;
    position: fixed;
    bottom: 0;
    right: 100px;
}
</style>