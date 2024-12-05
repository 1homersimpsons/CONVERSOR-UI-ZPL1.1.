


// effects.js

export const showLoading = (isLoading, convertBtn) => {
    if (isLoading) {
        convertBtn.disabled = true;
        convertBtn.textContent = "Processando...";
    } else {
        convertBtn.disabled = false;
        convertBtn.textContent = "Converter";
    }
};

export const updateBodyMargin = () => {
    const header = document.querySelector("header");
    const body = document.body;
    const headerHeight = header.offsetHeight;
    body.style.marginTop = `${headerHeight + 20}px`;
};

export const toggleLogoTransition = () => {
    const logoImage = document.getElementById("logo-image");
    const logoFull = document.getElementById("logo-full");

    setInterval(() => {
        if (logoImage.style.opacity === "1" || logoImage.style.opacity === "") {
            logoImage.style.opacity = "0";
            logoFull.style.opacity = "1";
        } else {
            logoImage.style.opacity = "1";
            logoFull.style.opacity = "0";
        }
    }, 3000);
};

export const toggleAdvancedOptions = () => {
    const advancedOptionsBtn = document.getElementById("advancedOptionsBtn");
    const advancedOptions = document.getElementById("advancedOptions");
    const configSection = document.querySelector(".config-section");

    advancedOptionsBtn.addEventListener("click", () => {
        if (advancedOptions.classList.contains("open")) {
            advancedOptions.classList.remove("open");
            advancedOptions.style.maxHeight = null;
            configSection.style.height = "50%";
        } else {
            advancedOptions.classList.add("open");
            advancedOptions.style.maxHeight = `${advancedOptions.scrollHeight}px`;
            configSection.style.height = "auto";
        }
    });
};


export const updateProgress = (progress) => {
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    if (progressBar && progressText) {
        progressBar.style.width = `${progress}%`;
        progressText.innerText = `Progresso: ${progress.toFixed(2)}%`;
    } else {
        console.error("Elementos de barra de progresso não encontrados.");
    }
};
