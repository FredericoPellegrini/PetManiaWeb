document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value.trim();

    const sheetsuUrl = "https://sheetsu.com/apis/v1.0/82203d8100e1";

    try {
        const response = await fetch(sheetsuUrl);

        if (!response.ok) {
            throw new Error(`Erro na resposta da API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);

        const rows = data;

        for (const row of rows) {
            const userOnly = { Usuario: row['Usuario'] };
            console.log('Linha atual:', userOnly);

            if (row.hasOwnProperty('Usuario') && row.hasOwnProperty('Senha')) {
                if (row['Usuario'].trim() === usuario && row['Senha'].trim() === senha) {
                    alert("Login bem-sucedido!");
                    window.location.href = "tela-inicial/index.html";
                    return;
                }
            }
        }

        alert("Credenciais inválidas. Tente novamente.");
    } catch (error) {
        console.error('Erro ao carregar ou processar dados:', error);
        alert("Erro ao carregar ou processar dados. Tente novamente mais tarde.");
    }
});
