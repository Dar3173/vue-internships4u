<template>
  <div>
    <div class="dropdown-container">
      <div class="dropdown">
        <button @click="toggleDropdown" class="dropdown-button">
          {{ selectedOption || 'Cargo o puesto' }}
          <span class="arrow">&#9662;</span>
        </button>
        <ul v-if="isOpen" class="dropdown-options">
          <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['categories'],
  setup(props, { emit }) {
    const isOpen = ref(false);
    const options = ref(props.categories);
    const selectedOption = ref(null);

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const selectOption = (option) => {
      selectedOption.value = option;
      isOpen.value = false;
      emit('categorySelected', option);
    };


    return {
      isOpen,
      options,
      selectedOption,
      toggleDropdown,
      selectOption,
      emit, // Agrega esto si realmente necesitas tener acceso a `emit` en el componente
    };
    
  },
};
</script>


<style lang="scss" scoped>
.dropdown-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 20px 5px 20px;
  padding: 30px;
}

.dropdown {
  position: relative;
  display: inline-block;
  font-size: 15px;
}

.dropdown-button {
  width: 1000px;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid white;
  color: $azul-oscuro;
}

.arrow {
  margin-left: 10px;
}

.dropdown-options {
  width: 1000px;
  justify-content: center;
  list-style: none;
  padding: 10px;
  position: absolute;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  color: $azul-oscuro;
}

.dropdown-options li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-options li:hover {
  background-color: #f0f0f0;
}

.search-button {
  padding: 10px 20px;
  margin-left: 5px;
  background-color: $naranja;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

}

.search-button:hover {
  background-color: $azul-oscuro;
}
</style>
