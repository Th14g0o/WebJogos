class Pontuacao {
    constructor(){
        this.pontos = 0;
        this.maiorPontuacao = 0;
    }
    acabouJogo(){
        if (this.pontos > this.maiorPontuacao) this.maiorPontuacao = this.pontos;
    }
}