<template>
    <form @submit.prevent="login" class="container_formulario">
        <div class="correo_container">
            <input v-model="usuario" placeholder="Correo Electronico" name="usuario" class="correo" />
            <span v-if="usuarioError" style="color: orangered; font-size: 15px;">{{ usuarioError }}</span>
        </div>
        <div class="contraseña_container">
            <input type="password" v-model="contrasena" placeholder="Contraseña" class="contraseña" />
            <span v-if="errorGeneral" style="color: orangered; font-size: 15px;">{{ errorGeneral }}</span>
        </div>
        <button type="submit" class="btn_login">Iniciar Sesión</button>
        <br>
        <br>
        <p class="registro">
            &#8594; Aún no estás registrado
            <RouterLink :to="{ name: 'Signup' }" class="routerlink"> Regístrate </RouterLink>
        </p>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { autenticarConCorreoYContraseña } from '../services/firebaseService';
import { useRouter } from 'vue-router';

const usuario = ref('');
const contrasena = ref('');
const usuarioError = ref('');
const errorGeneral = ref('');
const router = useRouter();

const login = async () => {
    try {
        // Intentar autenticar con correo electrónico y contraseña
        const usuarioAutenticado = await autenticarConCorreoYContraseña(usuario.value, contrasena.value);
        // Autenticación exitosa, aquí puedes redirigir a otra página o realizar otras acciones
        console.log('Iniciando sesión con usuario:', usuarioAutenticado.uid);
        errorGeneral.value = '';
        // Redirige a la página después de iniciar sesión (ajusta según tu estructura de ruta)
        router.push({ name: 'CSearch' });
    } catch (error) {
        // Manejar errores de autenticación
        console.error('Error al iniciar sesión:', error.message);
        errorGeneral.value = 'Usuario o contraseña incorrectos.';
    }
};
</script>

<style scoped lang="scss">
.container_formulario {
    width: 100%;
    padding: 10px;
    line-height: 25px;
    display: flex;
    flex-direction: column;
}

.correo_container, .contraseña_container {
    margin-bottom: 10px;
}

.correo, .contraseña {
    border: none;
    width: 100%;
    height: 30px;
    border-radius: 15px;
    padding-left: 15px;
    margin-right: 104px;
}

.btn_login {
    padding: 10px 20px;
    font-size: 16px;
    background-color: $naranja;
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
}

.btn_login:hover {
    background-color: $azul-oscuro;
}

.registro {
    background-color: $azul-oscuro;
    border-radius: 15px;
    padding: 8px;
    color: white;
    font-size: 15px;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
}

.routerlink {
    color: $azul-claro;
}

.routerlink:active {
    color: $naranja;
}

</style>
