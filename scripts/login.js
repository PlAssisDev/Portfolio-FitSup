document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o envio do formulário

            // Obter o email e a senha do formulário
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Obter o email e a senha registrados
            const registeredEmail = localStorage.getItem('userEmail');
            const registeredPassword = localStorage.getItem('userPassword');

            // Verificar se o email e a senha correspondem aos dados registrados
            if (email === registeredEmail && password === registeredPassword) {
                console.log('Login bem-sucedido. Email:', email);
                // Redirecionar para a página principal do site após o login bem-sucedido
                window.location.href = '/index.html';
            } else {
                console.error('Login falhou. Verifique seus dados e tente novamente.');
                // Adicione lógica para exibir uma mensagem de erro ao usuário, se desejar
            }
        });
    } else {
        console.error('Elemento login-form não encontrado.');
    }
});
