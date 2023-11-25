// firebaseService.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBq8Sl1VkCUAErrum7wQ1_BX15bakkO5QE",
    authDomain: "internships-4u-vue.firebaseapp.com",
    projectId: "internships-4u-vue",
    storageBucket: "internships-4u-vue.appspot.com",
    messagingSenderId: "970046382749",
    appId: "1:970046382749:web:fafea2d721838538ee6a74"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const postsCollection = collection(db, 'posts');

const fetchPosts = async () => {
    const querySnapshot = await getDocs(postsCollection);
    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
    return posts;
};

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

export { fetchPosts, fetchJobDetails };
