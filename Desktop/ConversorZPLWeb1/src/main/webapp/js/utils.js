export const handleZipFile = async (fileBlob, format) => {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(fileBlob);
    const keys = Object.keys(zipContent.files);
    
    let fileUrls = [];
    let fileNames = [];

    // Filtra os arquivos do tipo correto, por exemplo, imagens ou PDFs
    const fileKeys = keys.filter(key => {
        return (format === "pdf" && key.endsWith(".pdf")) ||
               (format === "png" && key.endsWith(".png")) ||
               (format === "jpeg" && key.endsWith(".jpeg"));
    });

    for (let fileKey of fileKeys) {
        const fileBlob = await zipContent.files[fileKey].async("blob");
        const fileUrl = URL.createObjectURL(fileBlob);

        fileUrls.push(fileUrl);
        fileNames.push(fileKey);

        // Se for um PDF ou PNG, exibimos diretamente no preview
        if (fileBlob.type === "application/pdf" || fileBlob.type === "image/png") {
            const imgElement = document.createElement('img');
            imgElement.src = fileUrl;
            imgElement.style.maxWidth = "100%";
            imgElement.style.margin = "10px";
            
            // Limpa o conteúdo anterior e adiciona a nova imagem
            previewArea.innerHTML = '';
            previewArea.appendChild(imgElement);
        }
    }

    return { fileUrls, fileNames };
};
