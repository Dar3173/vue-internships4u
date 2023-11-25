<template>
    <div class="menu">
        <RouterLink to="/"><img class="logo" src="../assets/logo.png" alt="logo Internships4u"></RouterLink>
        <router-link to="/login" class="MenuLink">Iniciar Sesión</router-link>
    </div>
</template>

<script setup>
</script>

<style lang="scss">
    .menu {
        height: 10%;
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0.8rem 2rem 0 2rem;
    }

    .logo {
        width: 100px;
        height: 100px;
    }

    router-link {
        text-decoration: none;
    }

    .MenuLink {
        color: white;
        margin-right: 1.5rem;
        text-decoration: none;
        font-weight: bold;
    }

    .MenuLink:hover{
        text-decoration: none;
        color: $naranja;
        transition: 0.5s;
    }
</style>