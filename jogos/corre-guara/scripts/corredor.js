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

        this.tagImg = document.createElement("img");
        this.prepararExibicao();

        this.posicao = this.tagImg.getBoundingClientRect();
    }

    prepararExibicao(){
        this.tagImg.style.display = 'block';
        this.tagImg.style.width = '100px';
        this.tagImg.style.position = 'absolute';
        this.tagImg.style.top = '50%';
        this.tagImg.style.left = '0px';
        this.tagImg.style.transition = "top 0.5s ease";

    }

    pular(){
        if (this.estado != estado.pulando){
            this.estado = estado.pulando;
            this.tagImg.style.top = '30%';
            setTimeout(() => {
                this.tagImg.style.top = '50%';
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
        this.tagImg.src = this.sprite(); 
    }

    sprite(){
        return this.spriteSheet[Math.trunc(this.frameAtual)];
    }

    atualizarEstado(){
        this.posicao = this.tagImg.getBoundingClientRect();
        this.animar();
        // console.log("X:", this.posicao.x);
        // console.log("Y:", this.posicao.y);
        // console.log("Largura:", this.posicao.width);
        // console.log("Altura:", this.posicao.height);
    }

}

// 1. Guara
const caminhoBaseCorreGuara = 'sprites/guara/'
let guara = new Corredor('Guará');
// 1.1 Sprite Correndo
for (let i = 1; i <= 9; i++){
    guara.adicionaSprite(`${caminhoBaseCorreGuara}guara-0${i.toString()}.png`);
}
