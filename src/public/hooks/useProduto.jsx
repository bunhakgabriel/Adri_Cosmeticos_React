export const useProduto = () => {

    const getProdutos = async () => {
        try {
            const response = await fetch('http://localhost:8080/AdriCosmeticosApi/api/Produtos');
            const data = await response.json();
            return data;
        } catch (e) {
            console.log('ERRO AO OBTER PRODUTOS: ', e)
        }
    }

    return {
        getProdutos
    }
}