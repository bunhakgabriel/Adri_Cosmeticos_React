import { db, app } from "../../../firebase/firebaseConfis";
import {
    getDocs,
    collection,
    setDoc,
    doc,
    query,
    where,
    updateDoc,
    deleteDoc
} from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from "firebase/storage";

import { firebaseConfig } from "../../../firebase/firebaseConfis";

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

export const atualizarProduto = async (data) => {
    const coletionRef = doc(db, data.colecao, data.codigo);
    const versionSnapshot = await getDocs(collection(db, "version"));

    return new Promise(async (res, rej) => {
        try {
            await updateDoc(coletionRef, {
                produto: data.produto,
                descricao: data.descricao,
                estoque: data.estoque,
                preco: data.preco,
            });

            // Verifica se há documentos na coleção "version"
            if (!versionSnapshot.empty) {
                const versionDoc = versionSnapshot.docs[0];  // Acessa o primeiro documento
                const versionData = versionDoc.data();  // Extrai os dados do documento
                versionData.versao++

                // Atualiza a versão
                const coletionVersionRef = doc(db, "version", versionDoc.id);
                await updateDoc(coletionVersionRef, {
                    versao: versionData.versao
                });

            } else {
                //Nenhum documento encontrado na coleção 'version'
            }

            res('Alterações salvas com sucesso');
        } catch (e) {
            rej('Erro ao fazer alterações, tente novamente')
            console.log("ERRO AO ALTERAR DADOS: ", e);
        }
    })
}

export const deletarProduto = async (produto) => {
    const obterPathImagem = (url) => {
        const storageBucket = firebaseConfig.storageBucket;
        const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/`;
        if (url.startsWith(baseUrl)) {
            const path = url.substring(baseUrl.length, url.indexOf('?'));
            return decodeURIComponent(path);
        }
        return null;
    }

    return new Promise(async (res, rej) => {
        try {
            try {
                const storage = getStorage(app);
                const filePath = obterPathImagem(produto.url);
                const desertRef = ref(storage, filePath);
                deleteObject(desertRef)
            } catch (e) {
                console.log('Erro ao excluir imagem do storage: ', e);
            }

            const docRef = doc(db, produto.colecao, produto.codigo);
            await deleteDoc(docRef);
            res('Produto deletado com sucesso');
            location.reload()
        } catch (e) {
            console.log('Erro ao fazer delete: ', e);
            res('Erro ao deletar produto, tente novamente');
        }
    })
}