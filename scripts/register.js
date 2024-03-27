document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio do formulário

        // Obter os valores de nome, e-mail e senha
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        // Aqui você pode adicionar a lógica de registro
        // Por exemplo, você pode fazer uma solicitação AJAX para enviar os dados do formulário para o servidor e criar uma nova conta de usuário
        // Em seguida, redirecione o usuário para a página de login após o registro bem-sucedido, ou exiba uma mensagem de erro se houver algum problema
        // Por enquanto, vamos apenas exibir os valores de nome, e-mail e senha para fins de teste
        console.log('Nome:', name);
        console.log('E-mail:', email);
        console.log('Senha:', password);
    });
});
