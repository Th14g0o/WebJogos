class Obstaculo {
    constructor() {
        this.spriteSheet = [];
        this.frameAtual = 0;
        this.velocidadeAnima = 0.05;
        this.tag = document.createElement("img");
        this.prepararExibicao();
        this.posicao = this.tag.getBoundingClientRect();
        this.velocidadeMovimento = (Math.floor(Math.random() * 10) % 3 + 1) * 1.5; 
    }    

    adicionaSprite(caminho){
        this.spriteSheet.push(caminho)
    }

    prepararExibicao(){
        this.tag.style.position = 'absolute';
        this.tag.style.display = 'block';
        this.tag.style.width = '90px';
        this.tag.style.bottom = '0px';
        this.tag.style.right  = '0';
        this.tag.style.zIndex = "2";
    }

    animar(){
        this.frameAtual = (this.frameAtual + this.velocidadeAnima) % this.spriteSheet.length;
        this.tag.src = this.sprite(); 
    }

    sprite(){
        return this.spriteSheet[Math.trunc(this.frameAtual)];
    }

    atualizarImagem(){
        this.tag.src = this.sprite();
    }

    movendoEsquerda(){
        const posicaoAtual = this.tag.getBoundingClientRect();
        this.tag.style.left = (posicaoAtual.x - this.velocidadeMovimento) + "px";
    }

    atualizarEstado(){
        this.movendoEsquerda();
        this.posicao = this.tag.getBoundingClientRect();
    }

    posicionarSprite(){
        this.atualizarImagem();
        this.posicao = this.tag.getBoundingClientRect();
        this.tag.style.right = '-' + (this.posicao.width * 1.5) + "px";
    }

    saiuTela(){
        const posicaoAtual = this.tag.getBoundingClientRect();
        return posicaoAtual.x + posicaoAtual.width < -500;
    }
}

const caminhoBaseTroncos = 'sprites/tronco/'

function criarTroncoMenor() { 
    const obstaculo = new Obstaculo();
    obstaculo.adicionaSprite(caminhoBaseTroncos + "tronco-menor.png");
    obstaculo.posicionarSprite();
    return obstaculo;
}

function criarTroncoMedio() { 
    const obstaculo = new Obstaculo();
    obstaculo.adicionaSprite(caminhoBaseTroncos + "tronco-medio.png");
    obstaculo.posicionarSprite();
    return obstaculo;
}

function criarTroncoGrande() { 
    const obstaculo = new Obstaculo();
    obstaculo.adicionaSprite(caminhoBaseTroncos + "tronco-grande.png");
    obstaculo.posicionarSprite();
    return obstaculo;
}

function gerarTroncoAleatorio(){
    let obstaculo = null;
    const tamanhoAleatorio = Math.floor(Math.random() * 3) + 1;
    switch (tamanhoAleatorio) {
        case 1:
            obstaculo = criarTroncoGrande();
            break;
        case 2:
            obstaculo = criarTroncoMedio();
            break;
        case 3:
            obstaculo = criarTroncoMenor();
            break;
    }
    return obstaculo;
}

