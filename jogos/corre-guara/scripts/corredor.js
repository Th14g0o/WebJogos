
class Corredor {
    constructor(nome){
        this.nome = nome;
        this.spriteSheet = [];
        this.vidas = 1;
        this.frameAtual = 0;
        this.velocidadeAnima = 0.05;
    }
    adicionaSprite(caminho){
        this.spriteSheet.push(caminho)
    }
    animar(){
        this.frameAtual = (this.frameAtual + velocidadeAnima) % spriteSheet.length()
    }
}

// 1. Guara
const caminhoBaseCorreGuara = '/jogos/corre-guara/sprites/'
guara = Corredor('Guará');

// 1.1 Sprite Correndo
for (let i = 1; i <= 0; i++)
    guara.adicionaSprite(caminhoBaseCorreGuara + 'guara-0' + i + '.png');
