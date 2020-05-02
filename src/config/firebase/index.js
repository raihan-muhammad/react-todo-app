import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDVpzJjt3pqYms9_AlSuVMgiITGwvkL8Aw",
    authDomain: "todo-list-779f8.firebaseapp.com",
    databaseURL: "https://todo-list-779f8.firebaseio.com",
    projectId: "todo-list-779f8",
    storageBucket: "todo-list-779f8.appspot.com",
    messagingSenderId: "1078863429281",
    appId: "1:1078863429281:web:dad2c6f201ca0fa46ebae0",
    measurementId: "G-PVJSBLWM1J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;