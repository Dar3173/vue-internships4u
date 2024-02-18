<template>
  <div class="customSearch">
    <h1>Búsqueda Avanzada</h1>
    <DropdownCS :categories="categories" @categorySelected="filterPosts" />
    <div class="center-box">
      <ul>
        <router-link :to="{ name: 'jobView', params: { id: item.id } }" v-for="item in filteredPosts" :key="item.id" class="post-card">
          <p class="post-title">{{ item.titulo }}</p>
          <p class="company-info">En {{ item.empresa }}</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script setup>
import DropdownCS from '../components/DropdownCS.vue';
import { ref, onMounted } from 'vue';
import { fetchTasks } from '../services/databaseService';

const categories = ref(['Ingenieria Industrial', 'Desarrollador web', 'Publicidad', 'Ingenieria Biomédica']);
const posts = ref([]);
const filteredPosts = ref([]);

onMounted(async () => {
  posts.value = await fetchTasks();
  filteredPosts.value = posts.value;
});

const filterPosts = (category) => {
  if (category === 'all') {
    filteredPosts.value = posts.value;
  } else {
    filteredPosts.value = posts.value.filter(post => post.categoria === category);
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
    height: 100%;
    background-color: white;
    border-radius: 20px;
    margin: 10px auto 10px auto;
    padding: 10px;
  }
  .post-card {
    display: flex;
    flex-direction: column;
    align-items: left; 
    width: 98%;
    margin: 15px 0 15px 0;
    padding: 15px;
    background-color: white;
    border: 2px dotted $azul-oscuro;
    border-radius: 10px;
    box-sizing: border-box;
    text-decoration: none;
}


  ul{
    list-style: none;
}

.post-title, .company-info {
  color: $azul-oscuro;
  display: block;
  text-decoration-color: white;
}

  
  .post-title {
    font-weight: bold;
    font-size: 18px;

}
  .company-info {
    margin-top: 2px;
}

router-link {
    color: inherit; /* Heredar color del texto del contenedor padre */
}
</style>


