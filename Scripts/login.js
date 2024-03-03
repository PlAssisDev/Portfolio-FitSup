document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obtenha os valores dos campos de entrada
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        // Verifique se o email e a senha são válidos (pode ser uma validação simples por agora)
        if (email === "usuarioFitSup@gmail.com" && password === "Fitsub2024@") {
            // Login bem-sucedido, redirecione para a página principal
            window.location.href = "../index.html";
        } else {
            // Login falhou, exibe uma mensagem de erro
            alert("Credenciais inválidas. Tente novamente.");
            // Limpa os campos de entrada
            loginForm.reset();
        }
    });
});
