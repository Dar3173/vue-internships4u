<template>
    <div>
        <button @click="toggleProfile" class="toggle-button">&#129094;</button>
        <div v-if="showProfile" class="profile">
            <div class="profile-menu">
                <div class="profile-image">
                    <img src="../assets/png/usuario.png" alt="User Profile" />
                </div>
                <div class="profile-info">
                    <p>{{ user.nombre }} {{ user.apellido }}</p>
                    <p>{{ user.correo }}</p>
                    <p>
                        Edad:
                        <span v-if="editingAge">
                            <input type="number" v-model="user.edad" />
                            <button class="btn-p" @click="saveAge">Guardar</button>
                        </span>
                        <span v-else>{{ user.edad }}</span>
                        <button class="btn-p" @click="editingAge = !editingAge">
                            {{ editingAge ? 'Cancelar' : '&#128394;' }}
                        </button>
                    </p>
                    <div v-if="confirmationMessage" class="confirmation-message">
                        {{ confirmationMessage }}
                    </div>
                    <button class="btn-perfil" @click="editEmail" v-if="!editingEmail">
                        {{ editingEmail ? 'Cancelar' : 'Editar Correo' }}
                    </button>
                    <div class="btn-editar" v-if="editingEmail">
                        <label for="newEmail">
                            <p>Nuevo Correo:</p>
                        </label>
                        <input type="email" id="newEmail" v-model="newEmail" />
                        <label for="confirmEmail">
                            <p>Confirmar Correo:</p>
                        </label>
                        <input type="email" id="confirmEmail" v-model="confirmEmail" />
                        <div class="btn_cambios">
                            <button class="btn-p" @click="saveNewEmail">Guardar</button>
                            <button class="btn-p" @click="cancelEditEmail">Cancelar</button>
                        </div>
                        
                    </div>
                    <button class="btn-perfil" @click="editPassword" v-if="!editingPassword">
                        {{ editingPassword ? 'Cancelar' : 'Cambiar Contraseña' }}
                    </button>
                    <div class="btn-editar" v-if="editingPassword">
                        <label for="currentPassword">
                            <p>Contraseña Actual:</p>
                        </label>
                        <input type="password" id="currentPassword" v-model="currentPassword" />
                        <label for="newPassword">
                            <p>Nueva Contraseña:</p>
                        </label>
                        <input type="password" id="newPassword" v-model="newPassword" />
                        <label for="confirmNewPassword">
                            <p>Confirmar Nueva Contraseña:</p>
                        </label>
                        <input type="password" id="confirmNewPassword" v-model="confirmNewPassword" />
                        <div class="btn_cambios">
                            <button class="btn-p" @click="saveNewPassword">Guardar</button>
                            <button class="btn-p" @click="cancelEditPassword">Cancelar</button>
                        </div>
                        
                    </div>
                    <button class="btn-perfil" @click="editPhone" v-if="!editingPhone">
                        {{ editingPhone ? 'Cancelar' : 'Editar Teléfono' }}
                    </button>
                    <div class="btn-editar" v-if="editingPhone">
                        <label for="newPhone">
                            <p>Nuevo Teléfono:</p>
                        </label>
                        <input type="tel" id="newPhone" v-model="newPhone" />
                        <label for="confirmPhone">
                            <p>Confirmar Teléfono:</p>
                        </label>
                        <input type="tel" id="confirmPhone" v-model="confirmPhone" />
                        <div class="btn-cambios">
                            <button class="btn-p" @click="saveNewPhone">Guardar</button>
                            <button class="btn-p" @click="cancelEditPhone">Cancelar</button>
                        </div>
                    </div>
                        
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, updatePassword } from 'firebase/auth';

export default {
    data() {
        return {
            showProfile: false,
            user: {
                nombre: '',
                apellido: '',
                correo: '',
                edad: null,
            },
            editingAge: false,
            editingEmail: false,
            newEmail: '',
            confirmEmail: '',
            editingPassword: false,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            confirmationMessage: '',
            editingPhone: false,
            newPhone: '',
            confirmPhone: '',
        };
    },
    methods: {
        async toggleProfile() {
            this.showProfile = !this.showProfile;
            if (this.showProfile) {
                try {
                    const auth = getAuth();

                    onAuthStateChanged(auth, async (user) => {
                        if (user) {
                            // El usuario está autenticado, obtén su información desde Firestore
                            const db = getFirestore();
                            const userDocRef = doc(db, 'users', user.uid);
                            const userDocSnapshot = await getDoc(userDocRef);

                            if (userDocSnapshot.exists()) {
                                this.user = userDocSnapshot.data();
                            } else {
                                console.error('Usuario no encontrado en Firestore');
                            }
                        } else {
                            // No hay usuario autenticado, puedes manejar esto según tus necesidades
                            console.error('No hay usuario autenticado');
                        }
                    });
                } catch (error) {
                    console.error('Error al obtener información del usuario desde Firestore:', error);
                }
            }
        },
        async saveAge() {
            this.editingAge = false;
            await this.updateAge();
        },
        editEmail() {
            if (this.editingEmail) {
                // Si ya está en modo de edición, cancela la edición
                this.cancelEditEmail();
            } else {
                // Inicia el modo de edición de correo
                this.editingEmail = true;
            }
        },
        cancelEditEmail() {
            // Cancela la edición del correo y limpia los campos
            this.editingEmail = false;
            this.newEmail = '';
            this.confirmEmail = '';
        },
        editPassword() {
            if (this.editingPassword) {
                // Si ya está en modo de edición, cancela la edición
                this.cancelEditPassword();
            } else {
                // Inicia el modo de edición de contraseña
                this.editingPassword = true;
            }
        },
        cancelEditPassword() {
            // Cancela la edición de la contraseña y limpia los campos
            this.editingPassword = false;
            this.currentPassword = '';
            this.newPassword = '';
            this.confirmNewPassword = '';
        },
        async updateAge() {
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (user) {
                    const db = getFirestore();
                    const userDocRef = doc(db, 'users', user.uid);

                    // Actualiza solo el campo de edad en Firestore
                    await updateDoc(userDocRef, {
                        edad: this.user.edad,
                    });

                    console.log('Edad actualizada en Firestore:', this.user.edad);
                } else {
                    console.error('No hay usuario autenticado');
                }
            } catch (error) {
                console.error('Error al actualizar la edad en Firestore:', error);
            }
        },
        async saveNewEmail() {
            // Lógica para validar y guardar el nuevo correo
            if (this.newEmail === this.confirmEmail && this.isValidEmail(this.newEmail)) {
                try {
                    const auth = getAuth();
                    const user = auth.currentUser;

                    if (user) {
                        const db = getFirestore();
                        const userDocRef = doc(db, 'users', user.uid);

                        // Actualiza el campo de correo en Firestore
                        await updateDoc(userDocRef, {
                            correo: this.newEmail,
                        });

                        console.log('Correo actualizado en Firestore:', this.newEmail);
                        this.confirmationMessage = 'Correo actualizado correctamente';

                        // Oculta el mensaje después de 5 segundos
                        setTimeout(() => {
                            this.confirmationMessage = '';
                        }, 5000);
                    } else {
                        console.error('No hay usuario autenticado');
                    }
                } catch (error) {
                    console.error('Error al actualizar el correo en Firestore:', error);
                }

                // Finaliza la edición del correo y limpia los campos
                this.editingEmail = false;
                this.newEmail = '';
                this.confirmEmail = '';
            } else {
                console.error('Los correos no coinciden o no son válidos');
            }
        },
        async saveNewPassword() {
            // Lógica para validar y guardar la nueva contraseña
            if (
                this.newPassword === this.confirmNewPassword &&
                this.isValidPassword(this.newPassword)
            ) {
                try {
                    const auth = getAuth();
                    const user = auth.currentUser;

                    if (user) {
                        // Cambia la contraseña en Firebase Authentication
                        await updatePassword(user, this.newPassword);

                        console.log('Contraseña actualizada en Firebase Authentication');
                        // Actualiza la contraseña en Firestore
                        await this.updatePasswordInFirestore(user.uid, this.newPassword);
                        this.confirmationMessage = 'Contraseña actualizada correctamente';

                        // Oculta el mensaje después de 5 segundos
                        setTimeout(() => {
                            this.confirmationMessage = '';
                        }, 5000);
                    } else {
                        console.error('No hay usuario autenticado');
                    }
                } catch (error) {
                    console.error('Error al actualizar la contraseña en Firebase Authentication:', error);
                }

                // Finaliza la edición de la contraseña y limpia los campos
                this.editingPassword = false;
                this.currentPassword = '';
                this.newPassword = '';
                this.confirmNewPassword = '';
            } else {
                console.error('Las contraseñas no coinciden o no son válidas');
            }
        },

        async updatePasswordInFirestore(userId, newPassword) {
    try {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', userId);

        // Actualiza el campo de contraseña en Firestore
        await updateDoc(userDocRef, {
            contraseña: newPassword,
        });

        console.log('Contraseña actualizada en Firestore:');
    } catch (error) {
        console.error('Error al actualizar la contraseña en Firestore', error);
    }
},
        isValidEmail(email) {
            // Lógica para validar el formato de correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        isValidPassword(password) {
            const passwordRegex = /^[a-zA-Z0-9]{1,6}$/;
            return passwordRegex.test(password) 
        },
        editPhone() {
            if (this.editingPhone) {
                // Si ya está en modo de edición, cancela la edición
                this.cancelEditPhone();
            } else {
                // Inicia el modo de edición de teléfono
                this.editingPhone = true;
            }
        },

        cancelEditPhone() {
            // Cancela la edición del teléfono y limpia los campos
            this.editingPhone = false;
            this.newPhone = '';
            this.confirmPhone = '';
        },

        async saveNewPhone() {
    // Lógica para validar y guardar el nuevo número de teléfono
    if (this.isValidPhone(this.newPhone)) {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const db = getFirestore();
                const userDocRef = doc(db, 'users', user.uid);

                // Actualiza el campo de teléfono en Firestore
                await updateDoc(userDocRef, {
                    telefono: this.newPhone,
                });

                console.log('Número de teléfono actualizado en Firestore:', this.newPhone);
                this.confirmationMessage = 'Número de teléfono actualizado correctamente';

                // Oculta el mensaje después de 5 segundos
                setTimeout(() => {
                    this.confirmationMessage = '';
                }, 5000);
            } else {
                console.error('No hay usuario autenticado');
            }
        } catch (error) {
            console.error('Error al actualizar el número de teléfono en Firestore:', error);
        }

        // Finaliza la edición del teléfono y limpia los campos
        this.editingPhone = false;
        this.newPhone = '';
        this.confirmPhone = '';
    } else {
        console.error('El número de teléfono no es válido');
    }
},
        isValidPhone(phone) {
            // Lógica para validar el formato de teléfono (10 dígitos, sin decimales)
            const phoneRegex = /^\d{10}$/;
            return phoneRegex.test(phone);
        },
    },
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

.toggle-button:hover {
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
    background-color: rgba(8, 67, 92, 0.9);
    ;
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

.btn-perfil:hover, .btn-p:hover {
    background-color: $naranja;
}

.btn-editar {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.btn-cambios {
    flex-direction: row;
    flex-wrap: wrap;
}

.btn-p {
    padding: 10px 15px;
    font-size: 15px;
    background-color: $azul-oscuro;
    color: white;
    border: none;
    border-radius: 15px;
    margin: 5px 2px;
    cursor: pointer;
}

editingAge {
    padding: 10px 12px;
    font-size: 15px;
    border: none;
    border-radius: 10px;
    background: white;

}

.confirmation-message {
    color: white;
    text-decoration: underline;

}
</style>
