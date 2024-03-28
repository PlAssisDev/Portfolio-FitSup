// Registro de Usuário
function registrarUsuario(email, senha) {
    // Verificar se o usuário já existe no localStorage
    if (localStorage.getItem('userEmail')) {
        console.log("Usuário já registrado.");
        return;
    }

    // Armazenar o email e a senha no localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', senha);
    console.log("Usuário registrado com sucesso.");
}
