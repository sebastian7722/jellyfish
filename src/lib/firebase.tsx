import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    getDocs
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBj5e4tdRjWOjFn2DhIZlLarW0sjuIILEU",
    authDomain: "jellyfish-98f73.firebaseapp.com",
    projectId: "jellyfish-98f73",
    storageBucket: "jellyfish-98f73.appspot.com",
    messagingSenderId: "42530164546",
    appId: "1:42530164546:web:9a3856af8dbb679cef42db",
    measurementId: "G-16YW9VX118"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const posts = collection(db, "posts");


export async function writeData( text: string, name: string, url: string ) {
    try {
        const docRef = await addDoc(posts, {
            content: text,
            createdAt: serverTimestamp(),
            username: name,
            photoURL: url,
        });
        console.log(`Document written with ID: , ${docRef.id} sucessfully`);
    } catch (e) {
        console.error("💩 Doesnt work! Error adding document: ", e);
    }
}

export async function fetchData() {
    try {
        const postsSnapshot = await getDocs(posts);
        const postsList = postsSnapshot.docs.map(doc => {
            const data = doc.data();
            const time = data.createdAt.toDate().toString().slice(0, 21);
            const id = doc.id;
            return ({id, ...data, time});
        });
        return postsList;
    } catch (e) {
        console.error("💩 Doesnt work! Error fetching data: ", e);
    }
}

export default app;