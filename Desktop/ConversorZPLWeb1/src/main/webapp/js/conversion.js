export const convertFile = async (file, format, showLoading, handleZipFile) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`https://zpl-prime.up.railway.app/convert_${format}`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Erro ao iniciar a conversão: ${response.statusText}`);
        }

        const jsonResponse = await response.json();
        console.log('Resposta JSON do backend:', jsonResponse); // Log para verificar o que o backend retornou

        const { request_id, download_url } = jsonResponse;

        console.log(`Request ID extraído: ${request_id}`);
        console.log(`Download URL: ${download_url}`);

        return { request_id, download_url };

    } catch (error) {
        console.error("Erro no envio do arquivo:", error);
        alert(`Erro: ${error.message}`);
    }
};
