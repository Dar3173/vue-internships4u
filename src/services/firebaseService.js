// firebaseService.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";

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

// Colección de posts en Firestore
const postsCollection = collection(db, 'posts');

// Función para obtener todos los posts desde la colección "posts"
const fetchPosts = async () => {
    const querySnapshot = await getDocs(postsCollection);
    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
    return posts;
};

// Función para obtener los detalles de un trabajo específico por su ID (postId)
const fetchJobDetails = async (postId) => {
    const jobDocRef = doc(db, 'posts', postId);
    console.log(postId)
    const jobDocSnapshot = await getDoc(jobDocRef);

    if (jobDocSnapshot.exists()) {
        const jobDetails = { id: jobDocSnapshot.id, data: jobDocSnapshot.data() };
        return jobDetails;
    } else {
        throw new Error(`Job with ID ${postId} not found.`);
    }
};

// Colección de usuarios en Firestore
const usersCollection = collection(db, 'users');


// Función para agregar un nuevo usuario a la colección "users"
const agregarUsuario = async (usuario) => {
    const docRef = await addDoc(usersCollection, usuario);
    return docRef.id; // Devuelve el ID del documento recién creado
};

// Exporta las funciones para su uso en otros archivos
export { fetchPosts, fetchJobDetails, agregarUsuario };
