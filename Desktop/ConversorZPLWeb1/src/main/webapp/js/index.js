import { showLoading, updateBodyMargin, toggleLogoTransition, toggleAdvancedOptions, updateProgress } from './effects.js';
import { convertFile } from './conversion.js';  
import { startProgressPolling, checkProgress } from './progress.js'; // Importando a função checkProgress corretamente
import { handleZipFile } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    const codeEditor = document.getElementById("codeEditor");
    const previewArea = document.getElementById("previewArea");
    const convertBtn = document.getElementById("convertBtn");
    const printBtn = document.getElementById("printBtn");
    const formatSelect = document.getElementById("fileFormat");
    const downloadBtn = document.getElementById("downloadBtn");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    let fileUrls = [];
    let fileNames = [];
    let request_id = null;

    // Inicializa os efeitos
    showLoading(false, convertBtn);
    updateBodyMargin();
    toggleLogoTransition();
    toggleAdvancedOptions();

    // Evento do botão Converter
    convertBtn.addEventListener("click", () => {
        const zplCode = codeEditor.value.trim();
        const format = formatSelect.value;

        if (!zplCode) {
            alert("Por favor, insira ou cole um código ZPL válido.");
            return;
        }

        if (!format) {
            alert("Por favor, selecione um formato antes de converter.");
            return;
        }

        const zplBlob = new Blob([zplCode], { type: "text/plain" });
        showLoading(true, convertBtn);

        // Envia o arquivo e obtém os URLs necessários
        convertFile(zplBlob, format, showLoading, handleZipFile)
            .then(response => {
                console.log("Resposta da conversão recebida:", response); // Log para verificar a resposta
                if (response && response.request_id) {
                    request_id = response.request_id;
                    console.log(`Request ID: ${request_id}`);
                    // Monitorar o progresso via polling
                    startProgressPolling(request_id, updateProgress, showLoading); // A chamada do polling
                } else {
                    console.log("Arquivo binário recebido sem request_id.");
                }
            })
            .catch(error => {
                console.error("Erro ao iniciar a conversão:", error);
            });
    });

    // Evento do botão Baixar
    downloadBtn.addEventListener("click", () => {
        if (!fileUrls || !fileNames) {
            alert("Nenhum arquivo disponível para download.");
            return;
        }

        fileUrls.forEach((url, index) => {
            const a = document.createElement("a");
            a.href = url;
            a.download = fileNames[index];
            a.click();
        });
    });

    // Evento do botão Imprimir
    printBtn.addEventListener("click", () => {
        if (!fileUrls || !fileNames) {
            alert("Nenhum arquivo disponível para impressão.");
            return;
        }

        try {
            fileUrls.forEach((url) => {
                const newWindow = window.open(url, "_blank");
                newWindow.onload = () => newWindow.print();
            });
        } catch (error) {
            console.error("Erro ao imprimir:", error);
            alert("Erro ao imprimir os arquivos.");
        }
    });
});
