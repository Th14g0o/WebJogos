class IJogo{
    constructor(imgs = []){
        this.imagens = imgs;
        this.tela = document.body;
    }

    adicionarImagem(caminho){
        this.imagens.push(caminho);
    }


    precarregarImagens(urls) {
        return Promise.all(urls.map(url => new Promise(resolve => {
            const img = new Image();
            img.onload = img.onerror = () => resolve();
            img.src = url;
        })));
    }

    async carregarTela(){
       await new Promise(resolve => {
            if (document.readyState === "loading") {
                window.addEventListener("load", resolve, { once: true });
            } else {
                resolve();
            }
        });
        
        // Hide scrollbar but allow scroll
        this.tela.style.overflow = 'hidden'; // disables scroll
        this.tela.style.scrollbarWidth = 'none'; // Firefox
        this.tela.style.msOverflowStyle = 'none'; // IE/Edge
        this.tela.style.width = '100vw';
        this.tela.style.height = '100vh';
        this.tela.style.maxWidth = '100vw';
        this.tela.style.maxHeight = '100vh';
        this.tela.style.boxSizing = 'border-box';

        // For WebKit browsers
        const style = document.createElement('style');
        style.innerHTML = '::-webkit-scrollbar { display: none; }';
        document.head.appendChild(style);

        await this.precarregarImagens(imagens);
    }


}