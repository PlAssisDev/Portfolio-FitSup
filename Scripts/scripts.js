let menu = document.querySelector('#menu-icon'); // Seleciona o ícone do menu
let navbar = document.querySelector('.navbar'); // Seleciona a barra de navegação

// Define um evento de clique para o ícone do menu
menu.onclick = () => {
    menu.classList.toggle('bx-x'); // Adiciona ou remove a classe 'bx-x' para alternar entre o ícone de menu e o ícone de fechar
    navbar.classList.toggle('active'); // Adiciona ou remove a classe 'active' para mostrar ou ocultar a barra de navegação
};

// Define um evento de rolagem da janela para fechar o menu ao rolar a página
window.onscroll = () => {
    menu.classList.remove('bx-x'); // Remove a classe 'bx-x' para voltar ao ícone de menu caso a página seja rolada
    navbar.classList.remove('active'); // Remove a classe 'active' para ocultar a barra de navegação ao rolar a página
};

document.addEventListener("DOMContentLoaded", function() {
  let menu = document.querySelector('#menu-icon'); // Seleciona o ícone do menu
  let navbar = document.querySelector('.navbar'); // Seleciona a barra de navegação

  // Define um evento de clique para o ícone do menu
  menu.onclick = () => {
      menu.classList.toggle('bx-x'); // Adiciona ou remove a classe 'bx-x' para alternar entre o ícone de menu e o ícone de fechar
      navbar.classList.toggle('active'); // Adiciona ou remove a classe 'active' para mostrar ou ocultar a barra de navegação
  };

  // Define um evento de rolagem da janela para fechar o menu ao rolar a página
  window.onscroll = () => {
      menu.classList.remove('bx-x'); // Remove a classe 'bx-x' para voltar ao ícone de menu caso a página seja rolada
      navbar.classList.remove('active'); // Remove a classe 'active' para ocultar a barra de navegação ao rolar a página
  };

  const container = document.querySelector('.container'); // Obtém uma referência ao elemento onde os produtos serão exibidos 

  // Carrega os produtos do JSON e exibe-os na página
  fetch('/Scripts/produtos.json') // Faz uma solicitação para carregar o arquivo JSON
      .then(response => response.json()) // Converte a resposta em formato JSON
      .then(data => { // Manipula os dados JSON
          data.forEach(product => { // Itera sobre cada produto no JSON
              const box = document.createElement('div'); // Cria um elemento <div> para cada produto
              box.classList.add('box'); // Adiciona a classe 'box' ao elemento <div>

              // Cria e configura a tag <img> para exibir a imagem do produto
              const img = document.createElement('img');
              img.src = product.image; // Define o atributo 'src' com o URL da imagem do produto
              img.alt = product.name; // Define o atributo 'alt' com o nome do produto (para acessibilidade)

              // Cria e configura a tag <h4> para exibir o nome do produto
              const name = document.createElement('h4');
              name.textContent = product.name; // Define o conteúdo de texto com o nome do produto

              // Cria e configura a tag <h5> para exibir o preço do produto
              const price = document.createElement('h5');
              price.textContent = `R$ ${product.price.toFixed(2)}`; // Define o conteúdo de texto com o preço do produto formatado

              // Cria e configura a tag <div> para o carrinho
              const cart = document.createElement('div');
              cart.classList.add('cart'); // Adiciona a classe 'cart' ao elemento <div>
              const cartIcon = document.createElement('i'); // Cria um elemento <i> para o ícone do carrinho
              cartIcon.classList.add('bx', 'bx-cart'); // Adiciona as classes para o ícone do carrinho
              cart.appendChild(cartIcon); // Adiciona o ícone do carrinho ao elemento <div> do carrinho

              // Adiciona os elementos de imagem, nome, preço e carrinho à caixa do produto
              box.appendChild(img);
              box.appendChild(name);
              box.appendChild(price);
              box.appendChild(cart);

              // Adiciona a caixa do produto ao contêiner
              container.appendChild(box);
          });
      })
      .catch(error => {
          console.error('Erro ao carregar os produtos:', error); // Exibe um erro caso ocorra um problema ao carregar o JSON
      });

  // Adicionar um listener de evento ao ícone de pesquisa
  const searchIcon = document.getElementById("search-icon");
  const searchCard = document.getElementById("search-card");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  searchIcon.addEventListener("click", () => {
      searchCard.classList.toggle("active"); // Adiciona ou remove a classe 'active' para mostrar ou ocultar a barra de pesquisa
      searchInput.focus(); // Coloca o foco no campo de pesquisa ao abrir a barra de pesquisa
  });

  // Função para pesquisar produtos
  function pesquisarProdutos(textoPesquisa) {
      // Limpa os resultados anteriores
      searchResults.innerHTML = '';

      // Filtra os produtos que correspondem à pesquisa
      var resultados = allProducts.filter(produto => produto.nome.toLowerCase().includes(textoPesquisa.toLowerCase()));

      // Cria elementos HTML para cada resultado de pesquisa
      resultados.forEach(resultado => {
          var li = document.createElement('li');
          li.textContent = resultado.nome;
          searchResults.appendChild(li);
      });
  }

  // Adicionar um ouvinte de evento de entrada ao campo de pesquisa
  searchInput.addEventListener('input', function() {
      var textoPesquisa = searchInput.value.trim(); // Obtém o texto digitado e remove espaços em branco desnecessários
      pesquisarProdutos(textoPesquisa); // Pesquisa produtos com base no texto digitado
  });

  // Função para pesquisar produtos com base no texto de entrada
  function pesquisarProdutos(textoPesquisa) {
      const resultados = produtosCarregados.filter(produto =>
          produto.nome.toLowerCase().includes(textoPesquisa.toLowerCase())
      );
      renderizarSugestoes(resultados);
  }

  // Função para renderizar as sugestões de pesquisa
  function renderizarSugestoes(sugestoes) {
      searchResults.innerHTML = '';
      sugestoes.forEach(sugestao => {
          const li = document.createElement('li');
          li.textContent = sugestao.nome;
          li.addEventListener('click', () => {
              const index = produtosCarregados.findIndex(
                  produto => produto.nome === sugestao.nome
              );
              container.children[index].scrollIntoView({ behavior: 'smooth' });
          });
          searchResults.appendChild(li);
      });
  }

  // Armazena os produtos carregados
  let produtosCarregados = [];

  // Função para carregar e exibir os produtos do JSON
  function carregarProdutos() {
      fetch('/Scripts/produtos.json') // Caminho para o arquivo JSON
          .then(response => response.json())
          .then(data => {
              // Armazena os produtos carregados
              produtosCarregados = data;
              // Limpa os produtos antigos
              container.innerHTML = '';
              // Loop para criar elementos HTML para cada produto
              data.forEach(produto => {
                  const box = document.createElement('div');
                  box.classList.add('box');
                  const img = document.createElement('img');
                  img.src = `/img/${produto.nome}.png`; // Assume-se que o nome da imagem é igual ao nome do produto
                  img.alt = produto.nome;
                  const nome = document.createElement('h4');
                  nome.textContent = produto.nome;
                  const preco = document.createElement('h5');
                  preco.textContent = produto.preco;
                  const cart = document.createElement('div');
                  cart.classList.add('cart');
                  const cartIcon = document.createElement('i');
                  cartIcon.classList.add('bx', 'bx-cart');
                  cart.appendChild(cartIcon);
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

  // Chama a função para carregar os produtos
  carregarProdutos();
});

document.addEventListener("DOMContentLoaded", function() {
  const userIcon = document.getElementById("user-icon");
  const loginModal = document.getElementById("login-modal");
  const registerModal = document.getElementById("register-modal");
  const loginForm = document.getElementById("login-form");
  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");
  const registerForm = document.getElementById("register-form");
  const registerName = document.getElementById("register-name");
  const registerEmail = document.getElementById("register-email");
  const registerPassword = document.getElementById("register-password");
  const loginMessage = document.getElementById("login-message");
  const registerMessage = document.getElementById("register-message");

  // Exibir modal de login ao clicar no ícone de usuário
  userIcon.addEventListener("click", function() {
      loginModal.style.display = "block";
  });

  // Fechar modais ao clicar no botão de fechar (X)
  document.querySelectorAll(".close").forEach(function(closeButton) {
      closeButton.addEventListener("click", function() {
          loginModal.style.display = "none";
          registerModal.style.display = "none";
      });
  });

  // Processar login
  loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const email = loginEmail.value;
      const password = loginPassword.value;
      // Implemente a função de login aqui
      // Exemplo:
      // login(email, password);
      // Onde 'login' é uma função que você definirá para processar o login
  });

  // Processar registro
  registerForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const name = registerName.value;
      const email = registerEmail.value;
      const password = registerPassword.value;
      // Implemente a função de registro aqui
      // Exemplo:
      // register(name, email, password);
      // Onde 'register' é uma função que você definirá para processar o registro
  });
});

document.addEventListener("DOMContentLoaded", function() {
    const cartIcon = document.getElementById("cart-icon");
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCart = document.getElementById("close-cart");

    cartIcon.addEventListener("click", function() {
        cartSidebar.classList.add("active");
    });

    closeCart.addEventListener("click", function() {
        cartSidebar.classList.remove("active");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Função para adicionar um produto ao carrinho
    function adicionarProdutoAoCarrinho(event) {
        // Evita o comportamento padrão do link
        event.preventDefault();

        // Obtém o elemento pai do botão clicado (o elemento .box)
        const box = event.target.closest('.bx');

        // Obtém o ID do produto associado a este box
        const productId = box.dataset.productId;

        // Adiciona o produto ao carrinho (lógica a ser implementada posteriormente)
        adicionarAoCarrinho(productId);

        // Atualiza a interface do usuário para refletir o novo estado do carrinho (lógica a ser implementada posteriormente)
        atualizarInterfaceDoUsuario();
    }

    // Adiciona um ouvinte de evento de clique a todos os botões "Adicionar ao Carrinho"
    const botoesAdicionarAoCarrinho = document.querySelectorAll('.cart');
    botoesAdicionarAoCarrinho.forEach(botao => {
        botao.addEventListener('click', adicionarProdutoAoCarrinho);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Função para adicionar um produto ao carrinho
    function adicionarProdutoAoCarrinho(event) {
        // Evita o comportamento padrão do link
        event.preventDefault();

        // Obtém o elemento pai do botão clicado (o elemento .box)
        const box = event.target.closest('.box');

        // Obtém o ID do produto associado a este botão de adicionar ao carrinho
        const productId = event.target.dataset.productId;

        // Verifica se o produto possui um ID válido
        if (productId) {
            // Você pode fazer o que quiser com o ID do produto aqui, como adicionar ao carrinho
            console.log("Produto adicionado ao carrinho com o ID:", productId);
        } else {
            console.error("O botão 'Adicionar ao Carrinho' não possui um ID de produto válido.");
        }
    }

    // Adiciona um ouvinte de evento de clique a todos os botões "Adicionar ao Carrinho"
    const botoesAdicionarAoCarrinho = document.querySelectorAll('.cart');
    botoesAdicionarAoCarrinho.forEach(botao => {
        botao.addEventListener('click', adicionarProdutoAoCarrinho);
    });
});

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(produto) {
    // Verificar se o produto já está no carrinho
    const produtoExistente = carrinho.find(item => item.id === produto.id);

    if (produtoExistente) {
        // Se o produto já estiver no carrinho, aumentar a quantidade
        produtoExistente.quantidade++;
    } else {
        // Se o produto não estiver no carrinho, adicionar como novo item
        carrinho.push({ ...produto, quantidade: 1 });
    }

    // Atualizar a interface do usuário para refletir o novo estado do carrinho
    atualizarInterfaceDoUsuario();
}


