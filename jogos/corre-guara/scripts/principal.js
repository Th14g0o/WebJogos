class Jogo {
    constructor(){
        this.corredor = guara;
        this.pontuacao = new Pontuacao();
        this.vidasConsumidas = 0;
        this.iniciado = true;
        this.correGuara = document.getElementById('corre-guara');
        this.obstaculos = [];
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
        this.correGuara.removeChild(this.corredor.tagImg);
        this.correGuara.innerHTML = '';
        this.iniciado = true; 
        this.corredor.reiniciar();
        this.pontuacao.pontos = 0;

        this.inicio();
    }

    inicio(){
        this.correGuara.appendChild(this.pontuacao.tag);
        this.correGuara.appendChild(this.corredor.tagImg);
        this.adicionarObstaculo();
    }

    jogo(){
        this.corredor.atualizarEstado();
        this.pontuacao.contando();
        for (let i = 0; i < this.obstaculos.length; i++) {
            this.obstaculos[i].atualizarEstado();
            
            if (this.obstaculos[i].saiuTela()) {
                this.correGuara.removeChild(this.obstaculos[i].tag);
                this.obstaculos.splice(i, 1);
                this.adicionarObstaculo();
            }

            const colidiu = verificarColisao(this.corredor, this.obstaculos[i]);
            if (colidiu == true) {
                this.vidasConsumidas++;
            }

            if (this.vidasConsumidas >= this.corredor.vidas) {
                this.iniciado = false; 
                this.pontuacao.acabouJogo();
                alert("Game Over! Sua pontuação foi: " + Math.trunc(this.pontuacao.pontos) + "\nMaior pontuação: " + Math.trunc(this.pontuacao.maiorPontuacao));
                this.reiniciarJogo();
            }
        }
    }

    comecar(){
        this.inicio();

        document.addEventListener("keydown", (evento) => {
            if (evento.code === "Space") {
                this.corredor.pular();
            }
        });

        setInterval(() => {
            if (this.iniciado) {
                this.jogo();
            }
        }, 0);
    }
}

jogo = new Jogo();
jogo.comecar();