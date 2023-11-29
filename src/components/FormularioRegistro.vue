<template>
    <div class="container_formulario">
      <div class="formulario">
        <div class="container_nombres_apellidos">
          <!-- Sección 1: Nombre -->
          <div class="nombre_barra">
            <input type="text" class="nombre" v-model="nombre" placeholder="Nombre" @input="handleNombreInput" />
            <p v-if="!nombreValido" style="color: red;">Nombre inválido.</p>
          </div>
          <!-- Sección 2: Apellido -->
          <div class="apellido_barra">
            <input type="text" class="apellido" v-model="apellido" placeholder="Apellido" @input="handleApellidoInput" />
            <p v-if="!apellidoValido" style="color: red;">Apellido inválido.</p>
          </div>
        </div>
      <br />
      <!-- Sección ingreso correo y contraseña -->
      <div class="correo_contraseña">
        <label class="correo_barra">
          <input type="email" class="correo" v-model="correo" placeholder="Correo electrónico" @input="validarCorreo" />
          <p v-if="mensajeErrorCorreo" style="color: red;">{{ mensajeErrorCorreo }}</p>
        </label>
        <!-- Sección ingreso contraseña -->
        <label class="contrasena_barra">
          <input type="password" class="contraseña" v-model="contraseña" placeholder="Contraseña" @input="handleContraseñaInput" />
          <p v-if="mensajeErrorContraseña" style="color: red;">{{ mensajeErrorContraseña }}</p>
        </label>
        <br />
      </div>
      <br />
      <!-- Sección fecha de nacimiento____ -->
      <div class="container_edad">
        <div class="Dia">
          <select id="dia" v-model="dia" @change="handleDiaChange">
            <option disabled value="">Día</option>
            <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
          </select>
        </div>
        <div class="mes">
          <select id="mes" v-model="mes" @change="handleFechaInput">
            <option disabled value="">Mes</option>
            <option v-for="(month, index) in months" :key="index" :value="month.abbr">{{ month.abbr }}</option>
          </select>
        </div>
        <div class="año">
          <select v-model="selectedYear" id="yearSelect" @change="handleYearChange">
            <option disabled value="">Año</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>
      <br />
      <!-- Botón para enviar el formulario -->
      <div class="btn_formulario">
        <button @click="enviarRegistroFirebase">Registrar</button>
        <p v-if="registroExitoso" class="confirmacion_mensaje">Usuario registrado con éxito.</p>
      </div>
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { agregarUsuario } from '../services/firebaseService';

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
  
  // Sección fecha de nacimiento
  const dia = ref('');
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  
  const handleDiaChange = () => {};
  
  const mes = ref('');
  const months = [];
  for (let i = 0; i < 12; i++) {
    const monthName = new Date(2023, i, 1).toLocaleString('default', { month: 'long' });
    const monthAbbr = new Date(2023, i, 1).toLocaleString('default', { month: 'short' });
    months.push({ name: monthName, abbr: monthAbbr.toLowerCase() });
  }
  
  const selectedYear = ref('');
  const handleYearChange = () => {};
  
  function generateYearList(start, end) {
    const yearList = [];
    for (let year = start; year <= end; year++) {
      yearList.push(year);
    }
    return yearList;
  }
  
  const years = generateYearList(1900, 2023);
  
  // Validación de la fecha de nacimiento
  const fechaValida = ref(true);
  
  const handleFechaInput = () => {
    const fechaNacimiento = new Date(selectedYear.value, months.findIndex((m) => m.abbr === mes.value), dia.value);
    const edad = calcularEdad(fechaNacimiento);
  
    fechaValida.value = !isNaN(fechaNacimiento.getTime()) && edad >= 18;
  };
  
  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const cumpleanos = new Date(hoy - fechaNacimiento);
  
    return cumpleanos.getUTCFullYear() - 1970;
  };
  

  //funcion para enviar la info a firebase 
  
  const enviarRegistroFirebase = async () => {

  try {
    // Verifica que todos los campos estén válidos antes de enviar a Firebase
    if (nombreValido.value && apellidoValido.value && mensajeErrorCorreo.value === '' && mensajeErrorContraseña.value === '' && fechaValida.value) {
      // Crea un objeto con la información del registro
      const registro = {
        nombre: nombre.value,
        apellido: apellido.value,
        correo: correo.value,
        contraseña: contraseña.value,
        fechaNacimiento: {
          dia: dia.value,
          mes: mes.value,
          año: selectedYear.value
        }
      };

      // Llama a la función de Firebase para guardar la información
      const idUsuario = await agregarUsuario(registro);

      // Restablece los valores de los campos después del registro exitoso
      nombre.value = '';
      apellido.value = '';
      correo.value = '';
      contraseña.value = '';
      dia.value = '';
      mes.value = '';
      selectedYear.value = '';

      // Activa el estado de registro exitoso
      registroExitoso.value = true;

      console.log(`Usuario registrado en Firebase con ID: ${idUsuario}`);
    } else {
      console.log('Corrige los errores antes de enviar el formulario.');
    }
  } catch (error) {
    console.error('Error al enviar el formulario a Firebase:', error.message);
  }
};

</script>

<style scoped lang="scss">
.container_formulario{
  width: 100%;
  padding: 10px;
  line-height: 25px;
  font-size: 10px;
}

.formulario{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container_nombres_apellidos, .correo_contraseña{
  display: flex;
  justify-content: space-between;
}

.nombre, .apellido, .correo, .contraseña {
  border: none;
  width: 90%;
  height: 30px;
  border-radius: 15px;
  padding-left: 15px;
  margin-right: 104px;
}

.btn_formulario button {
  padding: 10px 20px;
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
  color: $azul-oscuro;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}

</style>