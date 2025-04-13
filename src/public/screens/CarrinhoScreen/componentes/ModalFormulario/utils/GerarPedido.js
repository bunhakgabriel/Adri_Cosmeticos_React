const formatarCliente = (nome, celular, endereco) => `
-------- Cliente --------

Nome: ${nome}
Celular: ${celular}
Endereco: ${endereco}`;

const formatarProduto = (produto, index) => `${index + 1} - ${produto.produto}
Código: ${produto.id}
Quantidade: ${produto.quantidade}
Preço(un): ${produto.preco}
`;

const gerarPedido = (cliente, carrinho, totalProdutos) => {
    const { nome, celular, endereco } = cliente;
    const produtosTexto = carrinho
        .map((produto, index) => formatarProduto(produto, index))
        .join("\n");

    const mensagem = `${formatarCliente(nome, celular, endereco)}

-------- Produtos --------

${produtosTexto}

Total Pedido: ${totalProdutos.valor.toFixed(2)}`;

    const mensagemCodificada = encodeURIComponent(mensagem);
    const numeroWhatsapp = "5541996983316";
    const whatsappLink = `https://wa.me/${numeroWhatsapp}?text=${mensagemCodificada}`;
    window.open(whatsappLink, '_blank');
};

export default gerarPedido;