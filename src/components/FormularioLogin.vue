<template>
    <form @submit.prevent="login">
        <div>
            <input v-model="usuario" placeholder="Correo Electronico" name="usuario" />
            <span v-if="usuarioError" class="error-message">{{ usuarioError }}</span>
        </div>
        <div>
            <input type="password" v-model="contrasena" placeholder="Contraseña" />
        </div>
        <span v-if="errorGeneral" class="error-message">{{ errorGeneral }}</span>
        <p>
            Aún no estás registrado
            <RouterLink :to="{ name: 'Signup' }"> Regístrate </RouterLink>
        </p>
        <button type="submit">Iniciar Sesión</button>
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
  
<style scoped>
.error-message {
    color: red;
    font-size: 14px;
}
</style>
  