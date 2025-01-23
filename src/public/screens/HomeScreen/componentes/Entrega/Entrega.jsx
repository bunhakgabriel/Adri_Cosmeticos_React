import './Entrega.css'

const Entrega = () => {
    return (
        <div id="entregas">
            <section>
                <div className="conteudo">
                    <p>Realizamos entregas em Curitiba e região, para os bairros do Pinheirinho,
                        Xaxim, Alto Boqueirão, Boqueirão e Ganchinho não é cobrado taxa de entrega,
                        para os demais bairros é necessário consultar o valor da taxa.
                    </p>
                    <a
                        href="https://wa.me/5541996983316?text=Olá,+boa+tarde!+Gostaria+de+saber+quanto+fica+a+taxa+de+entrega+para+a+minha+região.">Ver
                        Mais</a>
                </div>
                <div className="img"><img src="./imagens/MakeupDelivery_1.png" alt="" /></div>
            </section>

        </div>
    )
}

export default Entrega;