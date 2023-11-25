<template>
  <div class="customSearch">
    <h1>Búsqueda Avanzada</h1>
    <DropdownCS :categories="categories" @categorySelected="filterPosts" />
    <div class="center-box">
      <hr>
      <ul>
        <li v-for="item in filteredPosts" :key="item.id" class="post-card" >
          <router-link :to="{ name: 'jobView', params: { id: item.id } }">
          <p class="post-title">{{ item.data.titulo }}</p>
          <p class="company-info">En <u>{{ item.data.empresa }}</u></p>
        </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import DropdownCS from '../components/DropdownCS.vue';
import { ref, onMounted } from 'vue';
import { fetchPosts } from '../services/firebaseService';
// eslint-disable-next-line



const categories = ref(['Ingenieria Industrial', 'Diseño gráfico', 'Publicidad', 'Ingenieria Biomédica']);
const posts = ref([]);
const filteredPosts = ref([]);

onMounted(async () => {
  posts.value = await fetchPosts();
  filteredPosts.value = posts.value;
});

const filterPosts = (category) => {
  if (category === 'all') {
    filteredPosts.value = posts.value;
  } else {
    filteredPosts.value = posts.value.filter(post => post.data.categoria === category);
  }
};

</script>

<style lang="scss" scoped>
  .customSearch h1 {
    margin: 5px 0 5px 20px;
    font-size: 60px;
    color: $azul-oscuro;
    text-align: left;
    font-weight: bold;
  }
  .center-box {
    width: 97%;
    height: 400px;
    background-color: white;
    border-radius: 10px;
    margin: auto;
  }
  .post-card {
  width: calc(90% - 20px); 
  margin: 10px;
  padding: 15px;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  box-sizing: border-box;
}
ul{
  list-style: none;
}
.post-title {
  color: $azul-oscuro;
  font-weight: bold;
}
.company-info {
  margin-top: 5px; /* Ajusta según sea necesario */
}
.router-link {
  text-decoration: none; /* Quitar subrayado */
  color: inherit; /* Heredar color del texto del contenedor padre */
}

</style>


