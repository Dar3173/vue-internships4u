<template>
    <div class="container-registro">
    <div class="container-formulario">
      <p class="titulo">Registro</p>
      <p class="parrafo">
        Desde prácticas locales hasta oportunidades internacionales, nuestra plataforma te conecta con empresas líderes que valoran el talento emergente.
      </p>
    </div>
    <div class="container-nombres-apellidos">
      <form>
        <!-- Sección 1: Nombre -->
        <div class="nombre">
          <input type="text" id="nombre" v-model="nombre" placeholder="Nombre" @input="handleNombreInput" />
          <p v-if="!nombreValido" style="color: red;">Nombre inválido.</p>
        </div>
        <!-- Sección 2: Apellido -->
        <div class="apellido">
          <input type="text" id="apellido" v-model="apellido" placeholder="Apellido" @input="handleApellidoInput" />
          <p v-if="!apellidoValido" style="color: red;">Apellido inválido.</p>
        </div>
      </form>
    </div>
    <br />
    <!-- Sección ingreso correo -->
    <div class="Correo">
      <div class="correo">
        <input type="email" id="correo" v-model="correo" placeholder="Correo electrónico" @input="validarCorreo" />
        <p v-if="mensajeErrorCorreo" style="color: red;">{{ mensajeErrorCorreo }}</p>
      </div>
      <!-- Sección ingreso contraseña -->
      <div class="Correo-contraseña">
        <div class="contrasena">
          <input type="password" id="contraseña" v-model="contraseña" placeholder="Contraseña" @input="handleContraseñaInput" />
          <p v-if="mensajeErrorContraseña" style="color: red;">{{ mensajeErrorContraseña }}</p>
        </div>
      </div>
      <br />
    </div>
    <br />
    <!-- Sección fecha de nacimiento -->
    <div class="container-edad">
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
    <button @click="enviarRegistro">Registrar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
  
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
  
  // Función para enviar el formulario
  const enviarRegistro = () => {
    if (nombreValido.value && apellidoValido.value && mensajeErrorCorreo.value === '' && mensajeErrorContraseña.value === '' && fechaValida.value) {
      console.log('Formulario válido. Enviar a la base de datos.');
      // Aquí puedes enviar la información del registro a la base de datos
    } else {
      console.log('Formulario no válido. Corrige los errores antes de enviar.');
    }
  };
</script>

<style scoped>
</style>