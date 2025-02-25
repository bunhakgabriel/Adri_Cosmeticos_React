import { db } from "../../../firebase/firebaseConfis";
import { getDocs, collection, query, getCountFromServer } from "firebase/firestore";

const verificarTotalBanco = async () => {
    return new Promise(async (res, rej) => {
        let totProdFirebase = 0;
        let retorno = false;

        const colecoes = ["manicurePedicure", "salao", "lash"]
        for (const col of colecoes) {
            const collectionRef = collection(db, col);
            const querySnapshot = query(collectionRef);
            const countSnapshot = await getCountFromServer(querySnapshot);
            totProdFirebase += countSnapshot.data().count;
        }

        if (localStorage.totalProdutos) {
            let totProdStorage = JSON.parse(localStorage["totalProdutos"])
            totProdStorage != totProdFirebase ?
                localStorage["totalProdutos"] = JSON.stringify(totProdFirebase) :
                retorno = true
        } else {
            localStorage["totalProdutos"] = JSON.stringify(totProdFirebase)
        }

        res(retorno)
    })
}

const verificarVersaoBanco = async () => {
    return new Promise(async (res, rej) => {
        let versionFirebase = 0;
        let retorno = false;

        const versionSnapshot = await getDocs(collection(db, "version"));
        // Verifica se há documentos na coleção "version"
        if (!versionSnapshot.empty) {
            const versionDoc = versionSnapshot.docs[0];  // Acessa o primeiro documento
            versionFirebase = versionDoc.data().versao // Extrai os dados do documento
        }

        if (localStorage.versaoProdutos) {
            let versionStorage = JSON.parse(localStorage["versaoProdutos"]);
            versionFirebase != versionStorage ?
                localStorage["versaoProdutos"] = JSON.stringify(versionFirebase) :
                retorno = true
        } else {
            localStorage["versaoProdutos"] = JSON.stringify(versionFirebase)
        }
        res(retorno)
    })
}

export const getColecaoProdutos = async () => {
    return new Promise(async (res, rej) => {

        const data = {manicurePedicure: [], salao: [], lash: []}
        const colecoes = ["manicurePedicure", "salao", "lash"]
        const respTotProdBanco = await verificarTotalBanco();
        const respVersionBanco = await verificarVersaoBanco();

        if (
            localStorage.manicurePedicure &&
            localStorage.lash &&
            localStorage.salao &&
            respTotProdBanco &&
            respVersionBanco
        ) {
            console.log('Existe dados no storage')

            colecoes.forEach(async (col) => {
                const array = 
                JSON.parse(localStorage[col])
                .sort((a,b) => a.produto.localeCompare(b.produto));

                data[col] = array;
            })

            return res(data);
        } else {
            console.log('Chamada back-end')
            for (const col of colecoes) {
                const array_db = new Array;
                const doc = await getDocs(collection(db, col));
                doc.forEach(doc => {
                    array_db.push(doc.data());
                });

                localStorage[col] = JSON.stringify(array_db);
                data[col] = array_db.sort((a,b) => a.produto.localeCompare(b.produto));
            }
    
            return res(data);
        }
    })
}



