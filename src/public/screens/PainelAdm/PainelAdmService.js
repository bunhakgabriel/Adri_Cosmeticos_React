import { db } from "../../../firebase/firebaseConfis";
import { getDocs, collection } from "firebase/firestore";

export const getColecoes = () => {
    return new Promise(async (res, rej) => {

        const doc = await getDocs(collection(db, 'colecoes'));
        const data = new Array;
        doc.forEach(doc => {
            data.push(doc.data());
        });

        return res(data)
    })
} 