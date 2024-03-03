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

const container = document.querySelector('.container'); // Passo 1: Obtém uma referência ao elemento onde os produtos serão exibidos 

// Passo 2: Carrega os produtos do JSON e exibe-os na página
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
