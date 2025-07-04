import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCg3ZIpBl2jxW-McpRXKoD1vN51T_pxmsc",
    authDomain: "adricosmeticos-88d41.firebaseapp.com",
    projectId: "adricosmeticos-88d41",
    storageBucket: "adricosmeticos-88d41.appspot.com",
    messagingSenderId: "535046942907",
    appId: "1:535046942907:web:221ce40943dfa84d05399e"
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);