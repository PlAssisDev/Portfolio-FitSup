document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar e exibir os produtos do JSON
    function carregarProdutos() {
        fetch('../Scripts/produtos.json') // Caminho para o arquivo JSON
            .then(response => response.json())
            .then(data => {
                const container = document.querySelector('.container');
                container.innerHTML = ''; // Limpa os produtos antigos

                data.produtos.forEach(produto => {
                    const box = document.createElement('div');
                    box.classList.add('box');
                    box.id = produto.nome;

                    const img = document.createElement('img');
                    img.src = `/img/${produto.nome}.png`; // Assume-se que o nome da imagem é igual ao nome do produto
                    img.alt = produto.nome;

                    const nome = document.createElement('h4');
                    nome.textContent = produto.nome;

                    const preco = document.createElement('h5');
                    preco.textContent = produto.preco;
                    preco.classList.add('preco'); // Adiciona a classe 'preco' para estilização CSS

                    // Criar o elemento do ícone do carrinho
                    const cart = document.createElement('div');
                    cart.classList.add('cart');
                    const cartIcon = document.createElement('i');
                    cartIcon.classList.add('bx', 'bx-cart');
                    cart.appendChild(cartIcon);

                    // Adicionar evento de clique ao ícone do carrinho
                    cart.addEventListener('click', function() {
                        // Adicionar o produto ao carrinho de compras
                        adicionarProdutoAoCarrinho(produto);
                        console.log('Produto adicionado ao carrinho:', produto.nome);
                    });

                    // Adicionar elementos ao contêiner do produto
                    box.appendChild(img);
                    box.appendChild(nome);
                    box.appendChild(preco); // Adiciona o preço abaixo do nome
                    box.appendChild(cart);

                    container.appendChild(box);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar os produtos:', error);
            });
    }

    // Função para adicionar um produto ao carrinho de compras
    function adicionarProdutoAoCarrinho(produto) {
        let carrinhoDeCompras = obterCarrinhoDeCompras();
        // Verifica se o produto já está no carrinho
        const produtoExistente = carrinhoDeCompras.find(item => item.nome === produto.nome);
        if (!produtoExistente) {
            // Se o produto não estiver no carrinho, adiciona-o com quantidade 1
            produto.quantidade = 1;
            carrinhoDeCompras.push(produto);
        } else {
            // Se o produto já estiver no carrinho, incrementa a quantidade
            produtoExistente.quantidade++;
        }
        atualizarCarrinho(carrinhoDeCompras); // Atualiza o carrinho após adicionar o produto
        salvarCarrinhoNoLocalStorage(carrinhoDeCompras); // Salva o carrinho no armazenamento local
    }

    // Função para obter o carrinho de compras do armazenamento local
    function obterCarrinhoDeCompras() {
        return JSON.parse(localStorage.getItem('carrinhoDeCompras')) || [];
    }

    // Função para salvar o carrinho de compras no armazenamento local
    function salvarCarrinhoNoLocalStorage(carrinhoDeCompras) {
        localStorage.setItem('carrinhoDeCompras', JSON.stringify(carrinhoDeCompras));
    }

    // Função para limpar o carrinho de compras ao recarregar a página
    function limparCarrinhoAoRecarregar() {
        localStorage.removeItem('carrinhoDeCompras');
    }

// Função para atualizar a exibição do carrinho de compras na interface do usuário
function atualizarCarrinho(carrinhoDeCompras) {
    const carrinhoSidebar = document.getElementById('cart-sidebar');
    if (carrinhoSidebar) {
        carrinhoSidebar.innerHTML = '';

        // Adicionar o título do carrinho
        const tituloCarrinho = document.createElement('h2');
        tituloCarrinho.textContent = "Seu Carrinho de Compras";
        carrinhoSidebar.appendChild(tituloCarrinho);

        let totalCarrinho = 0; // Inicializa o total do carrinho

        // Crie elementos para cada produto no carrinho e adicione-os ao carrinho na interface do usuário
        carrinhoDeCompras.forEach(produto => {
            // Cria um elemento de contêiner para o produto
            const produtoElemento = document.createElement('div');
            produtoElemento.classList.add('produto-item');

            // Adiciona a imagem do produto em sua própria div
            const imagemDiv = document.createElement('div');
            imagemDiv.classList.add('produto-imagem-container');

            const img = document.createElement('img');
            img.src = `/img/${produto.nome}.png`; // Caminho da imagem do produto
            img.alt = produto.nome; // Texto alternativo para a imagem
            img.classList.add('produto-imagem'); // Adiciona uma classe para estilização CSS
            imagemDiv.appendChild(img);
            produtoElemento.appendChild(imagemDiv);

            // Cria uma div para as outras informações do produto
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('produto-info');

            // Adiciona o nome do produto
            const nomeProduto = document.createElement('div');
            nomeProduto.textContent = produto.nome;
            nomeProduto.classList.add('produto-nome');
            infoDiv.appendChild(nomeProduto);

            // Adiciona o preço do produto
            const precoProduto = document.createElement('div');
            precoProduto.textContent = `Preço: ${produto.preco}`;
            precoProduto.classList.add('produto-preco');
            infoDiv.appendChild(precoProduto);

            // Adiciona os botões de adicionar e remover quantidade
            const botoesQuantidade = document.createElement('div');
            botoesQuantidade.classList.add('botoes-quantidade');

            // Exibe a quantidade do produto
            const quantidadeProduto = document.createElement('div');
            quantidadeProduto.textContent = ` Quantidade: ${produto.quantidade}`;
            quantidadeProduto.classList.add('produto-quantidade');
            botoesQuantidade.appendChild(quantidadeProduto);

            // Botão "+" para adicionar quantidade
            const botaoAdicionar = document.createElement('button');
            botaoAdicionar.textContent = '+';
            botaoAdicionar.classList.add('botao-adicionar');
            botaoAdicionar.addEventListener('click', function() {
                produto.quantidade++;
                atualizarCarrinho(carrinhoDeCompras);
            });
            botoesQuantidade.appendChild(botaoAdicionar);

            // Botão "-" para remover quantidade
            const botaoRemover = document.createElement('button');
            botaoRemover.textContent = '-';
            botaoRemover.classList.add('botao-minus');
            botaoRemover.addEventListener('click', function() {
                if (produto.quantidade > 1) {
                    produto.quantidade--;
                } else {
                    carrinhoDeCompras = carrinhoDeCompras.filter(item => item.nome !== produto.nome);
                }
                atualizarCarrinho(carrinhoDeCompras);
            });
            botoesQuantidade.appendChild(botaoRemover);

            infoDiv.appendChild(botoesQuantidade);

            produtoElemento.appendChild(infoDiv);

            // Calcula e exibe o total do produto
            const precoNumerico = parseFloat(produto.preco.replace(',', '.')); // Converte o preço para um número
            const totalProduto = precoNumerico * produto.quantidade;
            totalCarrinho += totalProduto;

            // Adiciona o produto ao carrinho na interface do usuário
            carrinhoSidebar.appendChild(produtoElemento);
        });

    } else {
        console.error('Elemento do carrinho não encontrado.');
    }
}


    // Função para inicializar o carrinho de compras
    function inicializarCarrinho() {
        limparCarrinhoAoRecarregar(); // Limpa o carrinho ao recarregar a página
        const carrinhoDeCompras = obterCarrinhoDeCompras();
        atualizarCarrinho(carrinhoDeCompras); // Exibe o carrinho de compras inicialmente
    }

    // Chama a função para atualizar os produtos e exibir o carrinho inicialmente
    carregarProdutos();
    inicializarCarrinho();
});
