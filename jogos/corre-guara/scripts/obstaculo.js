class Obstaculo extends Sprite2D {
    constructor(x = 0, y = 0, z = 1, fatorColisaoX = 0, fatorColisaoY = 0) {
        super(x, y, z, fatorColisaoX, fatorColisaoY);
        this.velocidadeMovimento = (Math.floor(Math.random() * 10) % 4 + 3) * 1.5; 
    }    

    posicaoInicial(){
        console.log(this.altura());
        this.posicionar((window.innerWidth + this.largura()) + 'px', (window.innerHeight - this.altura()) + 'px', 1);
    }

    saiuTela(){
        return this.posicao().x + this.largura() < -500;
    }

    atualizarEstado(){
        this.atualizaSprite();
        this.movEsquerda(this.velocidadeMovimento);
    }
}

const caminhoBaseTroncos = 'sprites/tronco/'

function criarTroncoMenor() { 
    const obstaculo = new Obstaculo();
    obstaculo.adicionaSprite(caminhoBaseTroncos + "tronco-menor.png");
    return obstaculo;
}

function criarTroncoMedio() { 
    const obstaculo = new Obstaculo();
    obstaculo.adicionaSprite(caminhoBaseTroncos + "tronco-medio.png");
    return obstaculo;
}

function criarTroncoGrande() { 
    const obstaculo = new Obstaculo();
    obstaculo.adicionaSprite(caminhoBaseTroncos + "tronco-grande.png");
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

