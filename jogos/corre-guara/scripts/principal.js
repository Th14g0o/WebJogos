class Jogo {
    constructor(){
        this.corredor = guara;
        this.pontuacao = Pontuacao();
        this.vidasConsumidas = 0;
        this.iniciado = true;
    }
    comecar(){
        const personagemImg = document.getElementById('personagem');
        while (this.iniciado){
            this.corredor.animar();
            personagemImg.src = this.corredor.spriteSheet[Math.trunc(this.corredor.frameAtual)];
        }
    }
}

jogo = Jogo();
jogo.comecar;