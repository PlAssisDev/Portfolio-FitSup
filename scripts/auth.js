// Registro de Usuário
function registrarUsuario(nomeUsuario, senha) {
    // Verificar se o usuário já existe no localStorage
    if (localStorage.getItem(nomeUsuario)) {
        console.log("Usuário já registrado.");
        return;
    }

    // Armazenar o nome de usuário e senha no localStorage
    localStorage.setItem(nomeUsuario, senha);
    console.log("Usuário registrado com sucesso.");
}

// Login de Usuário
function loginUsuario(nomeUsuario, senha) {
    // Verificar se o usuário existe no localStorage
    if (!localStorage.getItem(nomeUsuario)) {
        console.log("Usuário não encontrado.");
        return;
    }

    // Verificar se a senha corresponde à senha armazenada
    if (localStorage.getItem(nomeUsuario) === senha) {
        console.log("Login bem-sucedido.");
        // Adicionar lógica para redirecionar ou permitir acesso ao usuário
    } else {
        console.log("Senha incorreta.");
    }
}
