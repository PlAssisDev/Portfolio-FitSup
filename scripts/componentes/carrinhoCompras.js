let cartSidebar = null; // Variável global para armazenar a referência da barra lateral do carrinho
let isCartOpen = false; // Variável global para controlar o estado da barra lateral do carrinho

// Selecionando o ícone do carrinho
const cartIcon = document.getElementById("cart-icon");

// Função para criar a barra lateral do carrinho
function createCartSidebar() {
    // Criar o elemento da barra lateral do carrinho
    cartSidebar = document.createElement("div");
    cartSidebar.id = "cart-sidebar";
    cartSidebar.classList.add("sidebar");

     // Adicionar o título "Carrinho de Compras" no topo da barra lateral
     const title = document.createElement("h2");
     title.textContent = "Carrinho de Compras";
     title.classList.add("cart-title");
     cartSidebar.appendChild(title);

    // Anexar a barra lateral do carrinho ao corpo do documento
    document.body.appendChild(cartSidebar);
}

// Função para abrir ou fechar a barra lateral do carrinho
function toggleCartSidebar() {
    if (!isCartOpen) {
        createCartSidebar(); // Se a barra lateral não estiver aberta, cria a barra lateral
    } else {
        // Se a barra lateral estiver aberta, remove-a do corpo do documento
        document.body.removeChild(cartSidebar);
        cartSidebar = null; // Define a referência da barra lateral como nula
    }
    isCartOpen = !isCartOpen; // Alterna o estado da barra lateral
}

// Adicionando evento de clique ao ícone do carrinho
cartIcon.addEventListener("click", toggleCartSidebar);

let cartItems = []; // Array para armazenar os itens do carrinho

// Função para adicionar um produto ao carrinho
function addToCart(product) {
    cartItems.push(product); // Adiciona o produto ao array do carrinho
    updateCartDisplay(); // Atualiza a exibição do carrinho
}

// Função para remover um produto do carrinho
function removeFromCart(productIndex) {
    cartItems.splice(productIndex, 1); // Remove o produto do array do carrinho
    updateCartDisplay(); // Atualiza a exibição do carrinho
}

// Função para atualizar a exibição do carrinho de compras
function updateCartDisplay() {
    // Verifica se a barra lateral do carrinho está aberta
    if (isCartOpen && cartSidebar) {
        const cartContent = cartSidebar.querySelector('.cart-content');
        if (cartContent) {
            // Limpa o conteúdo existente do carrinho
            cartContent.innerHTML = '';

            // Adiciona cada produto ao carrinho de compras
            cartItems.forEach((product, index) => {
                const productElement = document.createElement('div');
                productElement.textContent = product.nome; // Exemplo: exibindo apenas o nome do produto
                cartContent.appendChild(productElement);
            });
        }
    }
}
