const estadoCorredor = {
    CORRENDO: 0,
    PULANDO: 1,
    CAINDO: 2,
    COLIDINDO: 3,
}

class Pulo{
    constructor(alturaMaxima, velocidade) {
        this.alturaMaxima = alturaMaxima;
        this.velocidade = velocidade;
        this.alturaAtual = 0;
    }

    resetar(){
        this.alturaAtual = 0;
    }

    pular() {
        if (this.alturaAtual < this.alturaMaxima) {
            this.alturaAtual += this.velocidade;
            if (this.alturaAtual > this.alturaMaxima) {
                this.alturaAtual = this.alturaMaxima;
            }
            return this.velocidade;
        }
        return 0;
    }

    cair() {
        if (this.alturaAtual > 0) {
            this.alturaAtual -= this.velocidade;
            if (this.alturaAtual < 0) {
                this.alturaAtual = 0;
            }
            return this.velocidade;
        }
        return 0;
    }
}

class Corredor2D extends ISprite2D {
    constructor(nome, largura = null, altura = null, x = 0, y = 0, z = 1, fatorColisaoX = 50, fatorColisaoY = 5){
        super(x, y, z, fatorColisaoX, fatorColisaoY);
        this.setTam(largura, altura);
        this.nome = nome;
        this.vidas = 1;
        this.pulo = new Pulo(250, 5);
        this.estado = estadoCorredor.CORRENDO;
        this.posicaoInicial();
    }

    reiniciar(){
        this.estado = estadoCorredor.CORRENDO;
        this.pulo.resetar();
        this.vidas = 1;
        this.reiniciarSprite();
        this.posicaoInicial();
    }

    posicaoInicial(){
        this.posicionar(0, (window.innerHeight - this.altura()) + 'px', 1);
    }

    pular(){
        if (![estadoCorredor.PULANDO, estadoCorredor.CAINDO].includes(this.estado)) {
            this.estado = estadoCorredor.PULANDO;
        }
    }

    atualizarEstado(){
        this.atualizaSprite();

        if (this.estado == estadoCorredor.PULANDO){
            const velocidadePulo = this.pulo.pular();
            this.movCima(velocidadePulo);
            if (velocidadePulo == 0) {
                this.estado = estadoCorredor.CAINDO;
            }
        }
        else if (this.estado == estadoCorredor.CAINDO){
            const velocidadePulo = this.pulo.cair();
            this.movBaixo(velocidadePulo);
            if (velocidadePulo == 0) {
                this.estado = estadoCorredor.CORRENDO;
            }
        }
    }

}

// 1. Guara
const caminhoBaseCorreGuara = 'sprites/guara/'
let guara = new Corredor2D('Guará', null, '120px');
// 1.1 Sprite Correndo
for (let i = 1; i <= 9; i++){
    guara.adicionaSprite(`${caminhoBaseCorreGuara}guara-0${i.toString()}.png`);
}
