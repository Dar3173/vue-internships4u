<template>
  <form @submit.prevent="enviarRegistroFirebase">
    <div class="container_formulario">
      <div class="formulario">
        <div class="container_nombres_apellidos">
          <!-- Sección 1: Nombre -->
          <div class="nombre_barra">
            <input type="text" class="nombre" v-model="nombre" placeholder="Nombre" @input="handleNombreInput" />
            <div class="error-message">
              <p v-if="!nombreValido" class="error">&#9888; Nombre inválido.</p>
            </div>
          </div>
          <!-- Sección 2: Apellido -->
          <div class="apellido_barra">
            <input type="text" class="apellido" v-model="apellido" placeholder="Apellido" @input="handleApellidoInput" />
            <div class="error-message">
              <p v-if="!apellidoValido" class="error">&#9888; Apellido inválido.</p>
            </div>
          </div>
        </div>
        <br />
        <!-- Sección ingreso correo y contraseña -->
        <div class="correo_contraseña">
          <label class="correo_barra">
            <input type="email" class="correo" v-model="correo" placeholder="Correo electrónico" @input="validarCorreo" />
            <div class="error-message">
              <p v-if="mensajeErrorCorreo" class="error">&#9888; {{ mensajeErrorCorreo }}</p>
            </div>
          </label>
          
          <!-- Sección ingreso contraseña -->
          <label class="contrasena_barra">
            <input type="password" class="contraseña" v-model="contraseña" placeholder="Contraseña"
              @input="handleContraseñaInput" />
              <div class="error-message">
                <p v-if="mensajeErrorContraseña" class="error password-error">&#9888; {{ mensajeErrorContraseña }}</p>
              </div>  
          </label>
          
          <br />
        </div>
        <br />
        <!-- Sección edad y número de teléfono -->
        <div class="container_edad_telefono">
          <div class="edad">
            <label>
              <input type="text" class="edad_input" v-model="edad" placeholder="Edad" @input="validarEdad" />
            </label>
            <div class="error-message">
              <p v-if="!edadValida" class="error">&#9888; Edad inválida. Debe ser mayor de 15 años</p>
            </div>
          </div>
          <div class="telefono">
            <label>
              <input type="text" class="telefono_input" v-model="telefono" placeholder="Número de teléfono"
                @input="validarTelefono" />
            </label>
            <div class="error-message">
              <p v-if="!telefonoValido" class="error">&#9888; Número de teléfono inválido. Debe tener 10 dígitos.</p>
            </div>
          </div>
        </div>

        <br />
        <!-- Botón para enviar el formulario -->
        <div class="btn_formulario">
          <button type="submit">Registrar</button>
        </div>
        <p v-if="registroExitoso" class="confirmacion_mensaje"> &#128077; Usuario registrado con éxito.</p>
        <p class="mensaje_error" v-if="mensajeErrorGeneral">&#9888; {{ mensajeErrorGeneral }}</p>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { registrarUsuarioConCorreoYContraseña } from '../services/firebaseService';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const router = useRouter();


let registroExitoso = ref(false);

// Sección 1: Nombre
const nombre = ref('');
const nombreValido = ref(true);
const handleNombreInput = () => {
  const regex = /^[a-zA-Z\s]*$/;
  nombreValido.value = regex.test(nombre.value);
};

// Sección 2: Apellido
const apellido = ref('');
const apellidoValido = ref(true);
const handleApellidoInput = () => {
  const regex = /^[a-zA-Z\s]*$/;
  apellidoValido.value = regex.test(apellido.value);
};

// Sección Correo
const correo = ref('');
const mensajeErrorCorreo = ref('');

const validarCorreo = () => {
  // Utilizamos una expresión regular más sencilla para validar el correo electrónico
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const correoSinEspacios = correo.value.trim();
  mensajeErrorCorreo.value = regex.test(correoSinEspacios) ? '' : 'Correo electrónico inválido';
};

// Sección Contraseña
const contraseña = ref('');
const mensajeErrorContraseña = ref('');

const handleContraseñaInput = () => {
  const regex = /^[a-zA-Z0-9]{1,6}$/;
  mensajeErrorContraseña.value = regex.test(contraseña.value) ? '' : 'Contraseña inválida. Debe contener letras A-Z (mayúsculas o minúsculas) y números 0-9, sin caracteres especiales, sin espacios, y tener una longitud de 1 a 6 caracteres.';
};

// Sección Edad
const edad = ref('');
const edadValida = ref(true);

const validarEdad = () => {
  const regex = /^\d{2}$/;
  edadValida.value = regex.test(edad.value);
};

// Sección Número de Teléfono
const telefono = ref('');
const telefonoValido = ref(true);

const validarTelefono = () => {
  const regex = /^\d{10}$/; // Ahora la expresión regular exige exactamente 10 dígitos
  telefonoValido.value = regex.test(telefono.value);
};


//funcion para enviar la info a firebase 

// Validación general del formulario
const formularioValido = computed(() => {
  return (
    nombreValido.value &&
    apellidoValido.value &&
    mensajeErrorCorreo.value === '' &&
    mensajeErrorContraseña.value === '' &&
    edadValida.value &&
    telefonoValido.value &&
    !camposEnBlanco()
  );
});

const camposEnBlanco = () => {
  return (
    nombre.value.trim() === '' ||
    apellido.value.trim() === '' ||
    correo.value.trim() === '' ||
    contraseña.value.trim() === '' ||
    edad.value.trim() === '' ||
    telefono.value.trim() === ''
  );
};

let mensajeErrorGeneral = ref('');

const enviarRegistroFirebase = async () => {
  try {
    // Verifica que todos los campos estén válidos antes de enviar a Firebase
    if (formularioValido.value) {
      // Llama a la función de Firebase para crear un nuevo usuario con correo y contraseña
      const user = await registrarUsuarioConCorreoYContraseña(correo.value, contraseña.value);

      // Llama a la función de Firebase para guardar la información en Firestore
      const db = getFirestore();

      // Utiliza el UID como ID del documento
      const userDocRef = doc(collection(db, 'users'), user.uid);

      // Usa setDoc para establecer el documento con el UID específico
      await setDoc(userDocRef, {
        nombre: nombre.value,
        apellido: apellido.value,
        correo: correo.value,
        contraseña: contraseña.value,
        edad: edad.value,
        telefono: telefono.value,
        uid: user.uid, // Asegúrate de incluir el UID también si lo necesitas
      });

      console.log(`Usuario registrado en Firebase con UID: ${user.uid}`);

      // Restablece los valores de los campos después del registro exitoso
      nombre.value = '';
      apellido.value = '';
      correo.value = '';
      contraseña.value = '';
      edad.value = '';
      telefono.value = '';

      // Activa el estado de registro exitoso
      registroExitoso.value = true;
      // Restablece el mensaje de error general
      mensajeErrorGeneral.value = '';

      // Desactiva el estado de registro exitoso después de un tiempo
      setTimeout(() => {
        registroExitoso.value = false;
        // Redirige a la página de inicio de sesión
        router.push({ name: 'login' });
      }, 5000); // Por ejemplo, espera 5 segundos antes de desactivar
    } else {
      // Muestra un mensaje de error general si el formulario no es válido
      mensajeErrorGeneral.value = 'Corrige los errores antes de enviar el formulario.';
    }
  } catch (error) {
    console.error('Error al enviar el formulario a Firebase:', error.message);
  }
};
</script>

<style scoped lang="scss">
.container_formulario {
  width: 100%;
  padding: 10px;
  line-height: 25px;
  font-size: 10px;
}

.formulario {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container_nombres_apellidos,
.correo_contraseña,
.container_edad_telefono {
  display: flex;
  justify-content: space-between;
}

.nombre,
.apellido,
.correo,
.contraseña,
.edad_input,
.telefono_input {
  border: none;
  width: 90%;
  height: 30px;
  border-radius: 15px;
  padding-left: 15px;
  margin-right: 104px;
}

.error-message {
  position: absolute;
}

.error{
  background-color: rgba(255, 255, 255, 0.849);
  border: 1px solid #0a0a2648;
  border-radius: 10px;
  padding: 10px;
  color: orangered;
  font-weight: bold;
  font-size: 12px;
  margin: -10px;
}

.password-error {
  width: 400px;
}

.btn_formulario button {
  padding: 10px 50px;
  font-size: 16px;
  background-color: $naranja;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}

.btn_formulario button:hover {
  background-color: $azul-oscuro;
}

.confirmacion_mensaje {
  background-color: $azul-oscuro;
  border-radius: 15px;
  padding: 8px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}

.mensaje_error {
  background-color: $naranja;
  border-radius: 15px;
  padding: 8px;
  color: white;
  font-size: 15px;
  margin-top: 10px;
  text-align: center;
}
</style>
