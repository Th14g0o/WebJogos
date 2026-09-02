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

class Corredor2D extends Sprite2D {
    constructor(nome){
        super();
        this.nome = nome;
        this.vidas = 1;
        this.pulo = new Pulo(180, 3);
        this.estado = estadoCorredor.CORRENDO;
        this.posicaoInicial();
    }

    reiniciar(){
        this.posicaoInicial();
        this.estado = estadoCorredor.CORRENDO;
        this.pulo = new Pulo(180, 3);
        this.vidas = 1;
        this.reiniciarSprite();
    }

    posicaoInicial(){
        this.posicionar(0, (window.innerHeight - this.altura() * 2) + 'px', 1);
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
let guara = new Corredor2D('Guará');
// 1.1 Sprite Correndo
for (let i = 1; i <= 9; i++){
    guara.adicionaSprite(`${caminhoBaseCorreGuara}guara-0${i.toString()}.png`);
}
