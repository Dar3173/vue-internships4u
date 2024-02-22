<template>
    <div>
        <button @click="toggleProfile" class="toggle-button">&#129094;</button>
        <div v-if="showProfile" class="profile">
            <div  class="profile-menu">
                <div class="profile-image">
                    <img src="../assets/png/usuario.png" alt="User Profile" />
                </div>
                <div class="profile-info">
                    <p>{{ user.firstName }} {{ user.lastName }}</p>
                    <p>{{ user.email }}</p>
                    <p>
                    Edad: 
                    <span v-if="editingAge">
                        <input type="number" v-model="user.age" />
                        <button class="btn-perfil" @click="saveAge">Guardar</button>
                    </span>
                    <span v-else>{{ user.age }}</span>
                    <button class="btn-perfil" @click="editingAge = !editingAge">
                        {{ editingAge ? 'Cancelar' : '&#128394;' }}
                    </button>
                    </p>
                    <button class="btn-perfil" @click="editEmail">Editar Correo</button>
                    <button class="btn-perfil" @click="editPassword">Cambiar Contraseña</button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    data() {
    return {
        showProfile: false,
        user: {
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'correo@example.com',
        age: 30 // Edad de ejemplo
        },
        editingAge: false
        };
    },
    methods: {
        toggleProfile() {
        this.showProfile = !this.showProfile;
        },
        saveAge() {
        // Aquí podrías enviar la edad editada al servidor si es necesario
        // Por simplicidad, aquí solo cambiaremos el estado local
        this.editingAge = false;
        },
        editEmail() {
        // Lógica para editar correo electrónico
        },
        editPassword() {
        // Lógica para cambiar la contraseña
        }
    }
    };
</script>

<style scoped lang="scss">
.toggle-button {
    position: fixed;
    right: 0;
    top: 50vh;
    z-index: 999;
    padding: 10px 15px;
    font-size: 30px;
    background-color: $azul-oscuro;
    color: white;
    border: none;
    border-radius: 15px 0 0 15px;
    cursor: pointer;
    transition: 1s;
}

.toggle-button:hover{
    background-color: $naranja;
    padding: 10px 30px 10px 15px;
}
.profile {
    position: fixed;
    right: 0;
    top: 0;
    height: 50vh;
    padding: 20vh 0;
    z-index: 998;
}

.profile-menu {
    width: 250px;
    background-color: rgba(8, 67, 92, 0.9);;
    padding: 30px;
    border-radius: 15px 0 0 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 5px 5px 10px 2px #000000;

}

.profile-image img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.profile-info p {
    margin: 5px 0;
    text-align: center;
    color: white;
    font-family: $roboto;
}

.profile-info button {
    margin-right: 15px;
}

.btn-perfil {
    padding: 10px 15px;
    font-size: 15px;
    background-color: $azul-claro;
    color: white;
    border: none;
    border-radius: 15px;
    margin: 5px;
    cursor: pointer;
}

.btn-perfil:hover {
    background-color: $naranja;
}

editingAge {
    padding: 10px 12px;
    font-size: 15px;
    border: none;
    border-radius: 10px;
    background: white;

}
</style>
