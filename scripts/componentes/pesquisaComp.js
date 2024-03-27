/* Caixa branca */

// Selecionando o ícone de pesquisa
const searchIcon = document.getElementById("search-icon");

// Selecionando a caixa de pesquisa e o fundo escurecido
const searchBox = document.getElementById("search-box");
const backdrop = document.getElementById("backdrop");

// Exibindo a caixa de pesquisa e o fundo escurecido ao clicar no ícone de pesquisa
searchIcon.addEventListener("click", function () {
    searchBox.classList.remove("hidden");
    backdrop.classList.remove("hidden");
    backdrop.classList.add("dark"); // Adicionando classe para escurecer o fundo
});

// Escondendo a caixa de pesquisa e o fundo escurecido ao clicar fora da caixa de pesquisa
document.addEventListener("click", function (event) {
    if (!searchBox.contains(event.target) && event.target !== searchIcon) {
        searchBox.classList.add("hidden");
        backdrop.classList.add("hidden");
        backdrop.classList.remove("dark"); // Removendo classe para escurecer o fundo
    }
});




/* Fim caixa branca */

/* Funcionalidade barra de pesquisa */

// Função para realizar a pesquisa
function pesquisarProduto(termo) {
    // Carregar os dados do JSON
    fetch('./scripts/produtos.json')
        .then(response => response.json())
        .then(dados => {
            const resultados = [];
            const termoMinusculo = termo.toLowerCase(); // Converter o termo de pesquisa para minúsculas

            // Iterar sobre os produtos e verificar se o termo de pesquisa está presente no nome do produto
            for (const produto of dados.produtos) {
                if (produto.nome.toLowerCase().includes(termoMinusculo)) {
                    resultados.push(produto); // Adicionar o produto aos resultados se o termo de pesquisa for encontrado
                }
            }

            renderizarResultados(resultados); // Renderizar os resultados na tela
        })
        .catch(error => console.error('Erro ao carregar dados do JSON:', error));
}

// Função para renderizar os resultados da pesquisa na tela
function renderizarResultados(resultados) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = ''; // Limpar os resultados anteriores

    // Verificar se há resultados
    if (resultados.length === 0) {
        searchResults.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    // Iterar sobre os resultados e criar elementos HTML para exibir os produtos
    resultados.forEach(produto => {
        const divProduto = document.createElement('div');
        divProduto.classList.add('produto');
        divProduto.id = produto.nome;

        // Div para a imagem do produto
        const divImagem = document.createElement('div');
        divImagem.classList.add('imagem-produto');

        // Adicionar a imagem do produto
        const imagemProduto = document.createElement('img');
        imagemProduto.src = `img/${produto.nome}.png`; // Assumindo que as imagens estão no formato PNG e estão na pasta "img"
        imagemProduto.alt = produto.nome;
        divImagem.appendChild(imagemProduto);

        // Adicionar a div da imagem à div do produto
        divProduto.appendChild(divImagem);

        // Div para os textos (nome e preço)
        const divTextos = document.createElement('div');
        divTextos.classList.add('textos-produto');

        const nomeProduto = document.createElement('p');
        nomeProduto.textContent = produto.nome;

        const precoProduto = document.createElement('p');
        precoProduto.textContent = produto.preco;

        // Adicionar os textos à div de textos
        divTextos.appendChild(nomeProduto);
        divTextos.appendChild(precoProduto);

        // Adicionar a div de textos à div do produto
        divProduto.appendChild(divTextos);

        // Adicionar o produto à lista de resultados
        searchResults.appendChild(divProduto);
    });

    // elemento que faz tudo que tiver .produto receber o click
    let produtoElemento = document.querySelectorAll(".produto");
    produtoElemento.forEach(element => {
        element.addEventListener('click', () => {
            produtoClick(element);
        })
    });
}

// função que recebe o click no produto pesquisado fazendo com que, quando foi clicado  feche a caixa de pesquisa e coloque um focus no produto pesquisado e role até onde o produto está localizado na página
function produtoClick(element) {
    searchBox.classList.add("hidden");
    backdrop.classList.add("hidden");

    boxProduto = document.querySelectorAll('.box');
    boxProduto.forEach(produto => {
        produto.classList.remove('focus');
        if (produto.id === element.id) {
            produto.classList.add('focus');

            // Role a página até o produto clicado, colocando-o no topo da janela
            const rect = produto.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetTop = rect.top + scrollTop;
            window.scrollTo({
                top: targetTop - 100, // Ajuste conforme necessário para considerar a altura de outros elementos fixos na página
                behavior: 'smooth'
            });

            // Remover o foco após 3 segundos (3000 milissegundos)
            setTimeout(() => {
                produto.classList.remove('focus');
            }, 3000);
        }
    });
}


// Event listener para detectar quando o usuário digitar na barra de pesquisa
document.getElementById('search-input').addEventListener('input', function (event) {
    const termo = event.target.value.trim(); // Obter o termo de pesquisa e remover espaços em branco desnecessários
    if (termo === '') {
        // Se o termo de pesquisa estiver vazio, limpar os resultados
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';
    } else {
        // Se houver um termo de pesquisa, realizar a pesquisa
        pesquisarProduto(termo);
    }
})


/* Fim funcionalidade da barra de pesquisa */
