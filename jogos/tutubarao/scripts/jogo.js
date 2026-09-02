class Jogo {
    constructor(){
        this.tela = document.getElementById('body');
        this.pontuacao = new Pontuacao();
        this.estado = estadoJogo.JOGO;
        this.vidasConsumidas = 0;
        this.tubarao = null;
        this.cenario = null;
    }


    reiniciarJogo(){
        this.vidasConsumidas = 0;        
        this.tela.removeChild(this.pontuacao.tag);
        this.tela.innerHTML = '';
        this.pontuacao.pontos = 0;
        this.carregarJogo();
        this.estado = estadoJogo.JOGO;
    }

    carregarJogo(){
        this.tela.appendChild(this.pontuacao.tag);
    }

    jogo(){
        this.pontuacao.contando();
    }

    comecar(){
        this.carregarJogo();
        
        setInterval(() => {
            if (this.estado === estadoJogo.JOGO) {
                this.jogo();
            }
        }, 5);
    }
}
