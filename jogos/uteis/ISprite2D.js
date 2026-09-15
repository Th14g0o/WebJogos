class ISprite2D{
    constructor(x = 0, y = 0, z = 1, fatorColisaoX = 0, fatorColisaoY = 0){
        this.spriteSheet = [];
        this.frameAtual = 0;
        this.velocidadeAnima = 0.05;

        this.tag = document.createElement("img");
        this.prepararExibicao(x, y, z);

        this.fatorColisaoX = fatorColisaoX;
        this.fatorColisaoY = fatorColisaoY;

        this.alturaImg = null;
        this.larguraImg = null;
    }

    setTam(largura, altura){
        this.alturaImg = altura;
        this.larguraImg = largura;
        this.prepararExibicao();
    }

    posicao(){
        return this.tag.getBoundingClientRect();
    }

    reiniciarSprite(){ 
        this.frameAtual = 0;
        if (this.spriteSheet.length > 0) 
            this.atualizarImagem();
        this.prepararExibicao();
    }

    prepararExibicao(){
        if (this.largura != null) 
            this.tag.style.width = this.larguraImg;
        if (this.altura != null) 
            this.tag.style.height = this.alturaImg;
        this.tag.style.display  = 'block';
        this.tag.style.position = 'absolute';
        this.atualizarImagem();
    }

    adicionaSprite(caminho){
        this.spriteSheet.push(caminho);
    }

    atualizarImagem(){
        this.tag.src = this.sprite(); 
    }
    
    animar(){
        this.frameAtual = (this.frameAtual + this.velocidadeAnima) % this.spriteSheet.length;
        this.atualizarImagem();
    }

    sprite(){
        return this.spriteSheet[Math.trunc(this.frameAtual) % this.spriteSheet.length];
    }

    aguardarImagem(){
        return new Promise((resolve, reject) => {
            if (this.tag.complete && this.tag.naturalWidth > 0) {
                resolve();
                return;
            }

            this.tag.onload = () => resolve();
            this.tag.onerror = () => reject(
                new Error("Erro ao carregar: " + this.tag.src)
            );
        });
    }

    movCima(qtd){
        this.tag.style.top = (this.posicao().y - qtd) + "px";
    }

    movBaixo(qtd){
        this.tag.style.top = (this.posicao().y + qtd) + "px";
    }

    movEsquerda(qtd){
        this.tag.style.left = (this.posicao().x - qtd) + "px";
    }

    movDireita(qtd){
        this.tag.style.left = (this.posicao().x + qtd) + "px";
    }

    largura(){
        return this.posicao().width;
    }

    altura(){
        return this.posicao().height;
    }

    posicionar(x, y, z = 1){
        this.tag.src = this.sprite();
        this.prepararExibicao();
        this.tag.style.top = y == null ? '0' : y;
        this.tag.style.left = x == null ? '0' : x;
        this.tag.style.zIndex = z == null ? '1' : z;
    }

    atualizaSprite(){
        this.animar();
    }

    atualizarEstado () { }

    reiniciar () { }
}
