<template>
    <div class="job-container">
      <div class="job-view" v-if="jobDetails">
        <h2>{{ jobDetails.titulo }}</h2>
        <p>Empresa: {{ jobDetails.empresa }}</p>
        <p>Descripción: {{ jobDetails.descripcion }}</p>
        <p>Dirección: {{ jobDetails.direccion }}</p>
        <RouterLink :to="{ name: 'CSearch' }" class="routerlink">
          <div class="btn"> &#60; </div>
        </RouterLink>
      </div>
      <div class="img-job" >
        <img class="img" src="../assets/img/hombre_mujer_oficina.png" alt="Hombre y mujer trabajadores" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { fetchTaskDetails } from "../services/databaseService";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const taskId = ref(route.params.id);
  const jobDetails = ref(null);
  
  /*const formatDescription = (description) => {
    return description.replace(/\\r\\n|\\r|\\n/g, '<br>');
  };*/
  
  onMounted(async () => {
    try {
      jobDetails.value = await fetchTaskDetails(taskId.value);
      console.log("Task details:", jobDetails.value);
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
    margin-left: 25px;
    margin-bottom: 50px;
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

.img-job{
    position: relative;
    width: 40%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    object-fit: cover;
}

.img{
    max-width: 90%; 
    max-height: 90%;
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
