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

                    // Criar o elemento do ícone do carrinho
                    const cart = document.createElement('div');
                    cart.classList.add('cart');
                    const cartIcon = document.createElement('i');
                    cartIcon.classList.add('bx', 'bx-cart');
                    cart.appendChild(cartIcon);

                    // Adicionar evento de clique ao ícone do carrinho
                    cartIcon.addEventListener('click', function() {
                        // Aqui você pode adicionar a lógica para adicionar o produto ao carrinho
                        // Por exemplo, você pode obter os detalhes do produto associado a este ícone
                        // e, em seguida, adicioná-lo ao carrinho ou exibir uma mensagem de confirmação
                        
                        // Por enquanto, vamos apenas exibir uma mensagem no console para teste
                        console.log('Ícone do carrinho clicado!');
                    });

                    // Adicionar o elemento do ícone do carrinho ao seu contêiner de produtos
                        box.appendChild(cart);
    
                        box.appendChild(img);
                        box.appendChild(nome);
                        box.appendChild(preco);
                        box.appendChild(cart);
    
                        container.appendChild(box);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar os produtos:', error);
            });
    }

    // Função para atualizar os produtos a cada intervalo de tempo
    function atualizarProdutos() {
        carregarProdutos(); // Carrega os produtos inicialmente

        // Define um intervalo para atualizar os produtos a cada 5 minutos (300000 milissegundos)
        setInterval(carregarProdutos, 300000); // 5 minutos
    }

    // Chama a função para atualizar os produtos
    atualizarProdutos();

});