<template>
    <div class="menu">
        <router-link :to="{ name: 'login' }">
            <img class="logo" src="../assets/logo.png" alt="logo Internships4u">
        </router-link>

        <!-- Verifica si la ruta actual no está en la lista de rutas sin nombre de usuario -->
        <template v-if="usuarioAutenticado && !esPaginaDeLoginYRegistro">
            <!-- Mostrar el nombre del usuario -->
            <span class="MenuLink">{{ nombreUsuario }}</span>
        </template>

        <!-- Verifica si la ruta actual está en la lista de rutas sin nombre de usuario -->
        <template v-else-if="esPaginaDeLoginYRegistro">
            <!-- No mostrar nada en las páginas de login y registro -->
        </template>

        <!-- Verifica si la ruta actual no está en la lista de rutas sin nombre de usuario -->
        <template v-else>
            <!-- Mostrar el enlace de "Iniciar Sesión" si el usuario no está autenticado -->
            <span class="MenuLink">Iniciar Sesión</span>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, getCurrentInstance } from 'vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const usuarioAutenticado = ref(false);
const nombreUsuario = ref('');
const auth = getAuth();
const vm = getCurrentInstance();

// Rutas donde no quieres mostrar el nombre del usuario
const rutasSinNombreUsuario = ['login', 'Signup'];

// Obtener la ruta actual
const esPaginaDeLoginYRegistro = ref(false);

onMounted(async () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Usuario autenticado
            usuarioAutenticado.value = true;

            // Obtener el nombre del usuario desde la base de datos
            const db = getFirestore();
            const userDoc = doc(db, 'users', user.uid);

            try {
                const userSnapshot = await getDoc(userDoc);

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    nombreUsuario.value = userData.nombre;
                } else {
                    console.error('El documento del usuario no existe en Firestore.');
                }
            } catch (error) {
                console.error('Error obteniendo datos del usuario:', error);
            }
        } else {
            // Usuario no autenticado
            usuarioAutenticado.value = false;
        }
        // Verificar si la ruta actual está en la lista de rutas sin nombre de usuario
        const rutaActual = vm.proxy.$route.name;
        esPaginaDeLoginYRegistro.value = rutasSinNombreUsuario.includes(rutaActual);
    });

    // Observar cambios en la ruta
    watch(() => vm.proxy.$route, (to) => {
        const rutaActual = to.name;
        esPaginaDeLoginYRegistro.value = rutasSinNombreUsuario.includes(rutaActual);
    });
});
</script>

<style lang="scss">
.menu {
    height: 20%;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 2rem 0 2rem;
}

.logo {
    width: 130px;
    height: 130px;
}

router-link {
    text-decoration: none;
}

.MenuLink {
    color: white;
    margin-right: 1.5rem;
    text-decoration: none;
    font-weight: bold;
}

.MenuLink:hover {
    text-decoration: none;
    color: $naranja;
    transition: 0.5s;
}
</style>