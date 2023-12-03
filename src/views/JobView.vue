<template>
    <div class="job-container">
        <div class="job-view">
            <h2 v-if="jobDetails && jobDetails.data">{{ jobDetails.data.titulo }}</h2>
            <p v-if="jobDetails && jobDetails.data">Empresa: {{ jobDetails.data.empresa }}</p>
            <p v-if="jobDetails && jobDetails.data" v-html="formatDescription(jobDetails.data.descripcion)"></p>
            <p v-if="jobDetails && jobDetails.data">Dirección: {{ jobDetails.data.direccion }}</p> 
            <!-- Otros detalles del trabajo... -->
        </div>
        <div class="img-job">
            <img src="../assets/img/hombre_mujer_oficina.png" alt="Hombre y mujer trabajadores">
        </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchJobDetails } from "../services/firebaseService";
import { useRoute } from "vue-router";

const route = useRoute();
const jobId = ref(route.params.id); // Asigna el ID del trabajo que deseas cargar
const jobDetails = ref(null);


const formatDescription = (description) => {
    return description.replace(/\\r\\n|\\r|\\n/g, '<br>');
};

onMounted(async () => {
    try {
        jobDetails.value = await fetchJobDetails(jobId.value);
        console.log('job details', jobDetails.value)
    } catch (error) {
        console.error("Error fetching job details: ", error);
    }
});
</script>

<style scoped lang="scss">
.post-page {
    display: flex;
    margin: 3%;
    padding: 1%;
    justify-content: center;
    height: 475px;
}

.job-container{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;

}
.job-view {
    padding: 10px;
    background-color: white;
    width: 55%;
    border-radius: 15px;
    margin: 50px;
    margin-left: 25px;
    line-height: 25px;
    white-space: pre-line;
}

.company-description {
    background-color: white;
    width: 40%;
    border-radius: 15px;
    padding: 10px;
}

h2,
h3 {
    padding: 10px;
    margin: 10px;
    color: $azul-oscuro;
}

p,
h4 {
    padding: 10px;
    margin: 10px;
}

.img-job, img{
    height: 600px;
    object-fit: cover;
    position: fixed;
    bottom: 0;
    right: 0;
}
</style>
