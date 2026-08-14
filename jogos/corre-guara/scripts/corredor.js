const estadoCorredor = {
    CORRENDO: 0,
    PULANDO: 1,
    CAINDO: 2,
    COLIDINDO: 3,
}

class Pulo{
    constructor(alturaMaxima, velocidade){
        this.alturaMaxima = alturaMaxima;
        this.velocidade = velocidade;
        this.alturaAtual = velocidade;
    }

    pular(){
        if (this.alturaAtual <= this.alturaMaxima + this.velocidade){
            this.alturaAtual += this.velocidade;
            return this.velocidade;
        }
        return 0;
    }

    cair(){
        if (this.alturaAtual >= -this.velocidade){
            this.alturaAtual -= this.velocidade;
            return this.velocidade;
        }
        return 0;
    }
}

class Corredor {
    constructor(nome){
        this.nome = nome;
        this.spriteSheet = [];
        this.vidas = 1;
        this.frameAtual = 0;
        this.velocidadeAnima = 0.05;
        
        this.pulo = new Pulo(180, 3);

        this.estado = estadoCorredor.CORRENDO;

        this.tag = document.createElement("img");
        this.prepararExibicao();

        this.posicao = this.tag.getBoundingClientRect();

        this.fatorColisaoX = 35;
        this.fatorColisaoY = 0;
    }

    reiniciar(){
        this.estado = estadoCorredor.CORRENDO;
        this.tag = document.createElement("img");
        this.pulo = new Pulo(180, 3);
        this.prepararExibicao();
        this.posicao = this.tag.getBoundingClientRect();
        this.vidas = 1;
        this.frameAtual = 0;
    }

    prepararExibicao(){
        this.tag.style.display = 'block';
        this.tag.style.width = '100px';
        this.tag.style.position = 'absolute';
        this.tag.style.bottom = '0';
        this.tag.style.left = '0';
        this.tag.style.zIndex = "1";
    }

    pular(){
        if (![estadoCorredor.PULANDO, estadoCorredor.CAINDO].includes(this.estado)) {
            this.estado = estadoCorredor.PULANDO;
        }
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

    atualizarEstado(){
        this.posicao = this.tag.getBoundingClientRect();

        if (this.estado == estadoCorredor.PULANDO){
            const velocidadePulo = this.pulo.pular();
            this.tag.style.top = (this.posicao.y - velocidadePulo) + "px";
            if (velocidadePulo == 0) {
                this.estado = estadoCorredor.CAINDO;
            }
        }
        else if (this.estado == estadoCorredor.CAINDO){
            const velocidadePulo = this.pulo.cair();
            this.tag.style.top = (this.posicao.y + velocidadePulo) + "px";
            if (velocidadePulo == 0) {
                this.estado = estadoCorredor.CORRENDO;
            }
        }

        this.animar();
    }

}

// 1. Guara
const caminhoBaseCorreGuara = 'sprites/guara/'
let guara = new Corredor('Guará');
// 1.1 Sprite Correndo
for (let i = 1; i <= 9; i++){
    guara.adicionaSprite(`${caminhoBaseCorreGuara}guara-0${i.toString()}.png`);
}
