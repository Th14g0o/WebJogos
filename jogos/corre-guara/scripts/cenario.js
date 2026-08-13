const caminhoBaseSprite = 'sprites/fundo/floresta-entardecer/';

class Camada{
    constructor(caminho, nivel, fator){
        this.tag = document.createElement('img')
        this.imagem = caminho;
        this.nivel = nivel;
        this.posicao = this.tag.getBoundingClientRect();
        this.velocidadeMovimento = 0.5;
        this.fatorLeftInicial = fator;
        this.prepararExibicao();
    }

    prepararExibicao(){
        this.tag.style.display = 'block';
        this.tag.style.width = '100vw';
        this.tag.style.height = '90vh';
        this.tag.style.position = 'absolute';
        this.tag.style.top = '0';
        this.tag.style.left =  (100 * this.fatorLeftInicial) + 'vw';
        this.tag.style.zIndex = (this.nivel * -1) + '';
        this.tag.src = this.imagem;
    }

    posicionarSprite(fator){
        this.posicao = this.tag.getBoundingClientRect();
        this.tag.style.right = '-' + (this.posicao.width * fator) + "px";
    }

    moveEsquerda(){
        const posicaoAtual = this.tag.getBoundingClientRect();
        this.tag.style.left = (posicaoAtual.x - this.velocidadeMovimento) + "px";
    }

    atualizarEstado(){
        this.moveEsquerda();
        this.posicao = this.tag.getBoundingClientRect();
    }

    saiuTela(){
        const posicaoAtual = this.tag.getBoundingClientRect();
        return posicaoAtual.x + posicaoAtual.width < -posicaoAtual.width;
    }
}

class Cenario{
    constructor(caminhoFundo){
        this.tag = document.createElement('img');
        this.fundo = caminhoFundo;
        this.camadas = [];
        this.prepararExibicao();
    }

    adicionarAoPai(tagPai){
        this.resetar();
        tagPai.appendChild(this.tag);
        for (let c of this.camadas){
            tagPai.appendChild(c.tag);
        }
    }

    removeDoPai(tagPai){
        tagPai.removeChild(this.tag);
        for (let c of this.camadas){
            tagPai.removeChild(c.tag);
        }
    }

    prepararExibicao(){
        this.tag.style.display = 'block';
        this.tag.style.width = '100vw';
        this.tag.style.height = '90vh';
        this.tag.style.position = 'absolute';
        this.tag.style.top = '0';
        this.tag.style.left = '0';
        this.tag.src = this.fundo;
    }

    maiorNivel(){
        if (this.camadas.length > 0){
            let maior = this.camadas[0].nivel;
            for (let c of this.camadas){
                if (c.nivel > maior) maior = c.nivel;
            }
            return maior;
        }
        return 0;
    }

    adicionarCamada(camada){
        this.camadas.push(camada);
        this.tag.style.zIndex = (this.maiorNivel() + 1) * -1 + '';
    }

    resetar(){
        for (let c of this.camadas){
            c.prepararExibicao();
        }
    }

    atualizarEstado(){
        for (let c of this.camadas){
            c.atualizarEstado();
            if (c.saiuTela()) c.posicionarSprite(1)
        }
    }
}

function criarCenarioFlorestaEntardecer(){
    florestaEntardecer = new Cenario(caminhoBaseSprite + 'floresta-entardecer-fundo.png');

    florestaEntardecerCamada1 = new Camada(caminhoBaseSprite + 'floresta-entardecer-atras.png', 3, 0);
    florestaEntardecerCamada2 = new Camada(caminhoBaseSprite + 'floresta-entardecer-atras.png', 3, 1);

    florestaEntardecerCamada3 = new Camada(caminhoBaseSprite + 'floresta-entardecer-meio.png', 2, 0);
    florestaEntardecerCamada4 = new Camada(caminhoBaseSprite + 'floresta-entardecer-meio.png', 2, 1);

    florestaEntardecerCamada5 = new Camada(caminhoBaseSprite + 'floresta-entardecer-frente.png', 1, 0);
    florestaEntardecerCamada6 = new Camada(caminhoBaseSprite + 'floresta-entardecer-frente.png', 1, 1);

    florestaEntardecer.adicionarCamada(florestaEntardecerCamada1);
    florestaEntardecer.adicionarCamada(florestaEntardecerCamada2);
    florestaEntardecer.adicionarCamada(florestaEntardecerCamada3);
    florestaEntardecer.adicionarCamada(florestaEntardecerCamada4);
    florestaEntardecer.adicionarCamada(florestaEntardecerCamada5);
    florestaEntardecer.adicionarCamada(florestaEntardecerCamada6);

    return florestaEntardecer;
}


