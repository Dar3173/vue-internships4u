// firebaseService.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Configuración de Firebase con nuestras credenciales
const firebaseConfig = {
    apiKey: "AIzaSyBq8Sl1VkCUAErrum7wQ1_BX15bakkO5QE",
    authDomain: "internships-4u-vue.firebaseapp.com",
    projectId: "internships-4u-vue",
    storageBucket: "internships-4u-vue.appspot.com",
    messagingSenderId: "970046382749",
    appId: "1:970046382749:web:fafea2d721838538ee6a74"
};

// Inicialización de la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Obtiene una instancia de Firestore
const db = getFirestore(app);

// Obtiene una instancia de Auth para Firebase Authentication
const auth = getAuth(app);

// Colección de usuarios en Firestore
const usersCollection = collection(db, 'users');

// Función para agregar un nuevo usuario a la colección "users"
const agregarUsuario = async (usuario) => {
    try {
        // Utiliza el UID del usuario como ID del documento
        const docRef = doc(usersCollection, usuario.uid);

        // Usa setDoc en lugar de addDoc para especificar el ID del documento
        await setDoc(docRef, {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            contraseña: usuario.contraseña,
            edad: usuario.edad,
            telefono: usuario.telefono,
            uid: usuario.uid,
        });

        console.log('Usuario agregado con ID (UID): ', usuario.uid);
        return usuario.uid;
    } catch (error) {
        console.error('Error al agregar usuario: ', error);
        throw error;
    }
};

// Función para autenticar con correo electrónico y contraseña
const autenticarConCorreoYContraseña = async (correo, contraseña) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, correo, contraseña);
        return userCredential.user;
    } catch (error) {
        throw new Error('Error al autenticar con correo electrónico y contraseña: ' + error.message);
    }
};

// Función para registrar un nuevo usuario con correo electrónico y contraseña
const registrarUsuarioConCorreoYContraseña = async (correo, contraseña) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
        return userCredential.user;
    } catch (error) {
        throw new Error('Error al registrar usuario con correo electrónico y contraseña: ' + error.message);
    }
};

// Exporta las funciones para su uso en otros archivos
export { agregarUsuario, autenticarConCorreoYContraseña, registrarUsuarioConCorreoYContraseña };
