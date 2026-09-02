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

class Jogo extends IniciarJogo {
    constructor(){
        super(imagens);
        this.corredor = guara;
        this.pontuacao = new Pontuacao();
        this.vidasConsumidas = 0;
        this.estado = estadoJogo.JOGO;
        this.correGuara = document.getElementById('corre-guara');
        this.obstaculos = [];
        this.cenario = criarCenarioFlorestaEntardecer();
    }

    adicionarObstaculo(){
        const obstaculo = gerarTroncoAleatorio();
        this.correGuara.appendChild(obstaculo.tag);
        this.obstaculos.push(obstaculo);
    }

    reiniciarJogo(){
        this.vidasConsumidas = 0;        
        for (let i = 0; i < this.obstaculos.length; i++) {
            this.correGuara.removeChild(this.obstaculos[i].tag);
            this.obstaculos.splice(i, 1); 
        }
        this.correGuara.removeChild(this.pontuacao.tag);
        this.correGuara.removeChild(this.corredor.tag);
        this.cenario.removeDoPai(this.correGuara);
        this.correGuara.innerHTML = '';
        this.corredor.reiniciar();
        this.pontuacao.pontos = 0;

        this.carregarJogo();
        this.estado = estadoJogo.JOGO;
    }

    carregarJogo(){
        this.correGuara.appendChild(this.pontuacao.tag);
        this.correGuara.appendChild(this.corredor.tag);
        this.cenario.adicionarAoPai(this.correGuara);
        this.adicionarObstaculo();
    }

    jogo(){
        this.corredor.atualizarEstado();
        this.cenario.atualizarEstado();
        this.pontuacao.contando();
        for (let i = 0; i < this.obstaculos.length; i++) {
            this.obstaculos[i].atualizarEstado();
            
            if (this.obstaculos[i].saiuTela()) {
                this.correGuara.removeChild(this.obstaculos[i].tag);
                this.obstaculos.splice(i, 1);
                this.adicionarObstaculo();
            }

            const colidiu = verificarColisaoTag(this.corredor.tag, this.obstaculos[i].tag);
            if (colidiu == true) {
                this.vidasConsumidas++;
            }

            if (this.vidasConsumidas >= this.corredor.vidas) {
                this.estado = estadoJogo.FIM; 
                this.pontuacao.acabouJogo();
                alert("Game Over! Sua pontuação foi: " + Math.trunc(this.pontuacao.pontos) + "\nMaior pontuação: " + Math.trunc(this.pontuacao.maiorPontuacao));
                this.reiniciarJogo();
                break;
            }
        }
    }

    comecar(){
        this.carregarTela();
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
        }, 5);
    }
}

const jogo = new Jogo();
jogo.comecar();