import { db, app } from "../../../firebase/firebaseConfis";
import { getDocs, collection, setDoc, doc, query, where } from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

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

export const salvarProduto = (produto) => {
    const salvarImagem = async (produto) => {
        const objectImage = produto.url

        try {
            const storage = getStorage(app);
            const storageRef = ref(storage, `${produto.colecao}/${objectImage.name}`);
            const snapshot = await uploadBytes(storageRef, objectImage);
            const URL = await getDownloadURL(snapshot.ref);
            produto.url = URL;
            return true;
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            throw new Error("Falha ao subir imagem.");
        }
    };

    return new Promise(async (res, rej) => {
        try {
            await salvarImagem(produto);
            await setDoc(doc(db, produto.colecao, produto.codigo), produto);
            res("Produto cadastrado com sucesso");
        } catch (error) {
            console.error("Erro no processo de cadastro:", error);
            rej(new Error("Erro ao cadastrar produto. Tente novamente."));
        }
    });
}

export const buscarPorCodigo = async (data) => {
    return new Promise(async (res, rej) => {
        try {
            const citiesRef = collection(db, data.colecao);
            const q = query(citiesRef, where("codigo", "==", data.codigo));
            const querySnapshot = await getDocs(q);
            const objeto = new Object();

            querySnapshot.forEach((item) => {
                (objeto.id = item.id), (objeto.data = item.data());
            });
            res(objeto);
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            rej(new Error("Erro ao buscar produto. Tente novamente."));
        }
    });
};