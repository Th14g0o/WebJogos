const estadoJogo = {
    INICIO: 0,
    JOGO: 1,
    PAUSE: 2,
    FIM: 3,
}

const imagens = [
    'sprites/guara/guara-01.png',
    'sprites/guara/guara-02.png',
    'sprites/guara/guara-03.png',
    'sprites/guara/guara-04.png',
    'sprites/guara/guara-05.png',
    'sprites/guara/guara-06.png',
    'sprites/guara/guara-07.png',
    'sprites/guara/guara-08.png',
    'sprites/guara/guara-09.png',
    'sprites/tronco/tronco-menor.png',
    'sprites/tronco/tronco-medio.png',
    'sprites/tronco/tronco-grande.png',
    'sprites/fundo/floresta-entardecer/floresta-entardecer-atras.png',
    'sprites/fundo/floresta-entardecer/floresta-entardecer-meio.png',
    'sprites/fundo/floresta-entardecer/floresta-entardecer-frente.png',
    'sprites/fundo/floresta-entardecer/floresta-entardecer-fundo.png',
    'sprites/fundo/floresta-entardecer/floresta-entardecer-solo.png',
];

class Jogo extends IJogo {
    constructor(){
        super(imagens);
        this.corredor = guara;
        this.pontuacao = new Pontuacao();
        this.vidasConsumidas = 0;
        this.estado = estadoJogo.JOGO;
        this.obstaculos = [];
        this.cenario = criarCenarioFlorestaEntardecer();
    }

    async adicionarObstaculo(){
        const obstaculo = gerarTroncoAleatorio();
        this.areaJogo.appendChild(obstaculo.tag);
        this.obstaculos.push(obstaculo);
        obstaculo.atualizarImagem();
        await obstaculo.aguardarImagem();
        obstaculo.posicaoInicial();
    }

    reiniciarJogo(){
       this.vidasConsumidas = 0;

        for (let i = this.obstaculos.length - 1; i >= 0; i--) {
            this.obstaculos[i].tag.remove();
        }

        this.obstaculos = [];

        this.pontuacao.tag.remove();

        this.corredor.tag.remove();

        this.cenario.removeDoPai(this.areaJogo);

        this.corredor.reiniciar();

        this.pontuacao.pontos = 0;

        this.carregarJogo();

        this.estado = estadoJogo.JOGO;
    }

    async carregarJogo(){
        this.areaJogo.appendChild(this.pontuacao.tag);

        this.areaJogo.appendChild(this.corredor.tag);
        await this.corredor.aguardarImagem();
        this.corredor.atualizarImagem();
        this.corredor.posicaoInicial();

        this.cenario.adicionarAoPai(this.areaJogo);

        this.adicionarObstaculo();
    }

    jogo(){
        this.pontuacao.contando();
        this.cenario.atualizarEstado();

        this.corredor.atualizarEstado();
        
        for (let i = 0; i < this.obstaculos.length; i++) {
            this.obstaculos[i].atualizarEstado();
            
            if (this.obstaculos[i].saiuTela()) {
                this.areaJogo.removeChild(this.obstaculos[i].tag);
                this.obstaculos.splice(i, 1);
                this.adicionarObstaculo();
            }

            const colidiu = Colisao2D.verificarColisaoSprite2D(this.corredor, this.obstaculos[i]);
            if (colidiu == true) {
                this.vidasConsumidas++;
            }

            if (this.vidasConsumidas >= this.corredor.vidas) {
                this.estado = estadoJogo.FIM; 
                break;
            }
        }
    }

    async comecar(){
        await this.carregarTela()
            .then(() => {
                this.carregarJogo();

                document.addEventListener("keydown", (evento) => {
                    if (evento.code === "Space") {
                        this.corredor.pular();
                    }
                });

                document.addEventListener('pointerdown', () => {
                    this.corredor.pular();
                });

                setInterval(() => {
                    if (this.estado === estadoJogo.JOGO) {
                        this.jogo();
                    }
                    else if (this.estado === estadoJogo.FIM) {
                        this.pontuacao.acabouJogo();
                        alert("Game Over! Sua pontuação foi: " + Math.trunc(this.pontuacao.pontos) + "\nMaior pontuação: " + Math.trunc(this.pontuacao.maiorPontuacao));
                        this.reiniciarJogo();
                    }
                }, 5);
            })
            .catch((erro) => {
                console.error("Erro ao carregar tela: ", erro);
            });
    }
}

const jogo = new Jogo();
jogo.comecar();