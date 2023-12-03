<template>
    <div class="menu">
        <img class="logo" src="../assets/logo.png" alt="logo Internships4u">
        <template v-if="usuarioAutenticado">
            <!-- Mostrar el nombre del usuario -->
            <span class="MenuLink">{{ nombreUsuario }}</span>
        </template>
        <template v-else>
            <!-- Mostrar el enlace de "Iniciar Sesión" si el usuario no está autenticado -->
            <span class="MenuLink">Iniciar Sesión</span>
        </template>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const usuarioAutenticado = ref(false);
const nombreUsuario = ref('');
const auth = getAuth();



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

                // Mueve la impresión del log después de verificar si existe el documento
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
    });
});
</script>

<style lang="scss">
.menu {
    height: 10%;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 2rem 0 2rem;
}

.logo {
    width: 100px;
    height: 100px;
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