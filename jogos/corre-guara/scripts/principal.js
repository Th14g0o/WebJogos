class Jogo {
    constructor(){
        this.corredor = guara;
        this.pontuacao = new Pontuacao();
        this.vidasConsumidas = 0;
        this.iniciado = true;
        this.correGuara = document.getElementById('corre-guara');
    }
    comecar(){
        this.correGuara.appendChild(this.pontuacao.tag);
        this.correGuara.appendChild(this.corredor.tagImg);

        document.addEventListener("keydown", (evento) => {
            if (evento.code === "Space") {
                this.corredor.pular();
            }
        });

        setInterval(() => {
            this.corredor.atualizarEstado();
            this.pontuacao.contando();
        }, 0);
    }
}

jogo = new Jogo();
jogo.comecar();