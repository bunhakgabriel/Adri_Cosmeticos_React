import { db } from "../../../firebase/firebaseConfis";
import { getDocs, collection } from "firebase/firestore";

const verificarStorage = (colecao) => {
    if(localStorage[colecao]){
        console.log('Chamada Storage')
        return JSON.parse(localStorage[colecao]);
    }
}

export const getColecaoProdutos = async (colecao) => {
    return new Promise(async (res, rej) => {

        let storage = verificarStorage(colecao)
        let data = storage ? storage : new Array;
        if(data.length > 0)  return res(data);

        console.log('Chamada back-end')
        const doc = await getDocs(collection(db, colecao));
        doc.forEach(doc => data.push(doc.data()));
        data = data.sort((a,b) => a.produto.localeCompare(b.produto))

        localStorage[colecao] = JSON.stringify(data);

        return res(data);
    })
}
