<template>
  <div class="menu">
    <router-link :to="{ name: 'login' }">
      <img class="logo" src="../assets/logo.png" alt="logo Internships4u">
    </router-link>

    <div class="menu-link">
        <!-- Verifica si la ruta actual no está en la lista de rutas sin nombre de usuario -->
      <template v-if="usuarioAutenticado && !esPaginaDeLoginYRegistro">
        <!-- Mostrar el nombre del usuario y manejar el clic para mostrar el menú de perfil -->
        <span class="MenuLink" @click="toggleProfileMenu">Hola, {{ nombreUsuario }}</span>
        <button class="sign-out-button" @click="signOut">Cerrar sesión</button>
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
    

    <!-- Integrar el componente ProfileMenu.vue y mostrarlo según el estado -->
  </div>


</template>

<script setup>
import { ref, onMounted, watch, getCurrentInstance } from 'vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const usuarioAutenticado = ref(false);
const nombreUsuario = ref('');
const auth = getAuth();
const vm = getCurrentInstance();
const showProfileMenu = ref(false); // Estado para controlar la visibilidad del menú de perfil
const router = useRouter();

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
          // Capitaliza la primera letra del nombre de usuario
          nombreUsuario.value = userData.nombre.charAt(0).toUpperCase() + userData.nombre.slice(1);
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

// Método para cambiar el estado del menú de perfil al hacer clic en el nombre de usuario
const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
};

const signOut = () => {

router.push({ name: 'login' }); 


};
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

.menu-link {
  justify-content: flex-end;
}

.MenuLink {
    color: white;
    font-family: $script;
    font-size: 30px;
    margin-right: 1rem;
    text-decoration: none;
    font-weight: bold;
}

.sign-out-button{
  background-color: #E86207; 
  color: #FFFFFF; 
  padding: 10px 20px; 
  border: none;
  border-radius: 15px; 
  font-size: 16px; 
  cursor: pointer;
  font-weight: bold;
}
.sign-out-button:hover{
  background-color: #08435C; 
}
</style>
