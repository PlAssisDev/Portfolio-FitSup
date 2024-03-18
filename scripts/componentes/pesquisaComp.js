document.addEventListener("DOMContentLoaded", function() {
    const searchIcon = document.getElementById("search-icon");
    const searchBox = document.getElementById("search-box");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    const backdrop = document.getElementById("backdrop");

    // Abrir a caixa de pesquisa ao clicar no ícone de pesquisa
    searchIcon.addEventListener("click", function() {
        searchBox.classList.add("active");
        backdrop.style.display = "block";
        searchInput.focus(); // Coloca o foco no campo de pesquisa
    });

    // Fechar a caixa de pesquisa ao clicar fora dela ou no fundo escurecido
    backdrop.addEventListener("click", function() {
        searchBox.classList.remove("active");
        backdrop.style.display = "none";
        searchInput.value = ""; // Limpa o campo de pesquisa ao fechar
        searchResults.innerHTML = ""; // Limpa os resultados da pesquisa
    });

    // Carregar os dados dos produtos do JSON
    fetch('../scripts/produtos.json')
        .then(response => response.json())
        .then(data => {
            // Atualizar a lista de produtos com os dados do JSON
            produtos = data.produtos;
        })
        .catch(error => {
            console.error('Erro ao carregar os dados dos produtos:', error);
        });

    // Função para pesquisar produtos com base no texto inserido na caixa de pesquisa
    function pesquisarProdutos(textoPesquisa) {
        // Limpa os resultados anteriores
        searchResults.innerHTML = '';

        // Filtra os produtos que correspondem à pesquisa
        const resultados = produtos.filter(produto =>
            produto.nome.toLowerCase().includes(textoPesquisa.toLowerCase())
        );

        // Exibe os resultados da pesquisa na caixa de resultados
        resultados.forEach(resultado => {
            const divResultado = document.createElement('div');
            divResultado.classList.add('search-result');
            divResultado.innerHTML = `
                <img src="${resultado.imagem}" alt="${resultado.nome}">
                <div>
                    <h3>${resultado.nome}</h3>
                    <p>${resultado.preco}</p>
                </div>
            `;
            searchResults.appendChild(divResultado);
        });
    }

    // Adicionar um ouvinte de evento de entrada ao campo de pesquisa
    searchInput.addEventListener('input', function() {
        const textoPesquisa = searchInput.value.trim(); // Obtém o texto digitado e remove espaços em branco desnecessários
        pesquisarProdutos(textoPesquisa); // Pesquisa produtos com base no texto digitado
    });
});

// Dados dos produtos (você pode substituir isso pelo carregamento do JSON)
let produtos = [];
