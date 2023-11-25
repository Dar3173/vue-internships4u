<template>
  <FirstMenu />
  <router-view/>
</template>

<script setup>
import FirstMenu from './components/FirstMenu.vue';
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: $roboto;
}

html, body{
  margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
  background-image: url(./assets/patron.png);
  background-repeat: repeat;
}


</style>
