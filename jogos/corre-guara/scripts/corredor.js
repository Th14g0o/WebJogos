const estado = {
    correndo: 0,
    pulando: 1,
    caindo: 2,
}

class Corredor {
    constructor(nome){
        this.nome = nome;
        this.spriteSheet = [];
        this.vidas = 1;
        this.frameAtual = 0;
        this.velocidadeAnima = 0.05;

        this.estado = estado.correndo;

        this.tag = document.createElement("img");
        this.prepararExibicao();

        this.posicao = this.tag.getBoundingClientRect();

        this.fatorColisaoX = 35;
        this.fatorColisaoY = 0;
    }

    reiniciar(){
        this.estado = estado.correndo;
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
        this.tag.style.transition = "bottom 0.5s ease";
        this.tag.style.zIndex = "1";
    }

    pular(){
        if (this.estado != estado.pulando){
            this.estado = estado.pulando;
            this.tag.style.bottom = '175px';
            setTimeout(() => {
                this.tag.style.bottom = '0';
                setTimeout(() => {
                    this.estado = estado.correndo;
                }, 500);
            }, 500);
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
