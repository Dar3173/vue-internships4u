<template>
    <div class="job-container">
        <div class="job-view">
            <h2 v-if="jobDetails && jobDetails.data">{{ jobDetails.data.titulo }}</h2>
            <p v-if="jobDetails && jobDetails.data">Empresa: {{ jobDetails.data.empresa }}</p>
            <p v-if="jobDetails && jobDetails.data" v-html="formatDescription(jobDetails.data.descripcion)"></p>
            <p v-if="jobDetails && jobDetails.data">Dirección: {{ jobDetails.data.direccion }}</p> 
            <!-- Otros detalles del trabajo... -->

            <RouterLink :to="{name:'CSearch'}" class="routerlink"> <div class="btn"> &#60; </div></RouterLink>
        </div>

    </div>

    <ProfileMenu />
    
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchJobDetails } from "../services/firebaseService";
import { useRoute } from "vue-router";

import ProfileMenu from '../components/ProfileMenu.vue'

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
.job-container{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;

}
.job-view {
    padding: 10px;
    background: white url('../assets/logo_opacidad.png') no-repeat center;
    background-size: contain;
    width: 90%;
    border-radius: 15px;
    margin: auto;
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

.btn{
    display: flex;
    justify-content: center; 
    align-items: center; 
    width: 50px;
    height: 50px;
    background: $azul-oscuro;
    border-radius: 50%;
    transition: 50ms;
    font-size: 50px;
    color: white;
    font-weight: bold;
    margin: 5px;
    cursor: pointer;
}

.btn:hover {
    background: $naranja;
    width: 55px;
    height: 55px;
}

.routerlink{
    transition: 50ms;
    text-decoration: none;
    cursor: pointer;
}

.routerlink:hover {
    color: $azul-oscuro;
}
</style>
