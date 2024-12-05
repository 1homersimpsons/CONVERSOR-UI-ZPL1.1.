// Função para verificar o progresso usando uma requisição HTTP regular
export const checkProgress = async (request_id, updateProgress, showLoading) => {
    try {
        const response = await fetch(`https://zpl-prime.up.railway.app/progress/${request_id}`);
        const data = await response.json();
        console.log("Progresso obtido via HTTP:", data);  // Log para verificar a resposta

        if (data.progress >= 100.0) {
            console.log("Conversão concluída!");
            document.getElementById("download-btn").href = data.download_url; // Atualiza o link de download
        } else if (data.progress === -1.0) {
            alert("Erro na conversão!");
        } else {
            console.log(`Progresso: ${data.progress}%`);
            updateProgress(data.progress);  // Atualiza a barra de progresso
        }
    } catch (error) {
        console.error("Erro ao consultar progresso:", error);
    }
};

// Exemplo de como você pode chamar a função de verificação de progresso a cada 5 segundos
export const startProgressPolling = (request_id, updateProgress, showLoading) => {
    setInterval(() => {
        console.log(`Verificando progresso para o request_id: ${request_id}`);
        checkProgress(request_id, updateProgress, showLoading);
    }, 5000);  // Intervalo de 5 segundos para consulta do progresso
};
