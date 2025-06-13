export const useProduto = () => {

    const getProdutos = async () => {
        try {
            const response = await fetch('http://localhost:8080/AdriCosmeticosApi/api/Produtos', {
                method: 'GET',
                // headers: {
                //     'ngrok-skip-browser-warning': 'true',  // Adicionando o cabeçalho para ignorar a página de introdução
                // }
            });
            const data = await response.json();
            console.log(data)
            return data;
        } catch (e) {
            console.log('ERRO AO OBTER PRODUTOS: ', e)
        }
    }

    return {
        getProdutos
    }
}