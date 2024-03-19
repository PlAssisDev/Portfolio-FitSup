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



/* Fim funcionalidade da barra de pesquisa */
