export const useProduto = () => {
    
    const getProdutos = async () => {
        await fetch('http://localhost:8080/AdriCosmeticosApi/api/Produtos')
        .then(response => response.json())
        .then(data => console.log(data))
    }
    
    return {
        getProdutos
    }
}