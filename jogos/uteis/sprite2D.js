class Sprite2D{
    constructor(x = 0, y = 0, z = 1){
        this.spriteSheet = [];
        this.frameAtual = 0;
        this.velocidadeAnima = 0.05;

        this.tag = document.createElement("img");
        this.prepararExibicao(x, y, z);

        this.fatorColisaoX = 35;
        this.fatorColisaoY = 0;
    }

    posicao(){
        return this.tag.getBoundingClientRect();;
    }

    reiniciarSprite(){
        this.tag = document.createElement("img");
        this.prepararExibicao();
        this.frameAtual = 0;
    }

    prepararExibicao(x = null, y = null, z = null){
        this.tag.style.display = 'block';
        this.tag.style.width = '100px';
        this.tag.style.position = 'absolute';
        this.tag.style.top = y == null ? '0' : y;
        this.tag.style.left = x == null ? '0' : x;
        this.tag.style.zIndex = z == null ? '1' : z;
    }

    adicionaSprite(caminho){
        this.spriteSheet.push(caminho)
    }
    
    animar(){
        this.frameAtual = (this.frameAtual + this.velocidadeAnima) % this.spriteSheet.length;
        this.tag.src = this.sprite(); 
    }

    sprite(){
        return this.spriteSheet[Math.trunc(this.frameAtual)];
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
        this.prepararExibicao(x, y, z = 1)
    }

    atualizaSprite(){
        this.animar();
    }
}
