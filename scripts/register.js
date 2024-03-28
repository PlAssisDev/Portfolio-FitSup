document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o envio do formulário

            // Obter o email e senha do formulário
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            // Armazenar o email e a senha no localStorage
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            console.log('Registro bem-sucedido. Email:', email);

            // Redirecionar para a página de login
            window.location.href = '../componentes html/login.html';
        });
    } else {
        console.error('Elemento register-form não encontrado.');
    }
});
