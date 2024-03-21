/* Caixa branca */

// Selecionando o ícone de pesquisa
const searchIcon = document.getElementById("search-icon");

// Selecionando a caixa de pesquisa e o fundo escurecido
const searchBox = document.getElementById("search-box");
const backdrop = document.getElementById("backdrop");

// Adicionando evento de clique ao ícone de pesquisa
searchIcon.addEventListener("click", function() {
    // Exibindo a caixa de pesquisa e o fundo escurecido ao clicar no ícone de pesquisa
    searchBox.classList.remove("hidden");
    backdrop.classList.remove("hidden");
});

// Adicionando evento de clique ao fundo escurecido para fechar a caixa de pesquisa
backdrop.addEventListener("click", function() {
    // Escondendo a caixa de pesquisa e o fundo escurecido ao clicar fora da caixa de pesquisa
    searchBox.classList.add("hidden");
    backdrop.classList.add("hidden");
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
}

// Event listener para detectar quando o usuário digitar na barra de pesquisa
document.getElementById('search-input').addEventListener('input', function(event) {
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
