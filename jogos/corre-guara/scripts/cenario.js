const caminhoBaseSprite = 'sprites/fundo/floresta-entardecer/';

class Camada{
    constructor(caminho, nivel, fator){
        this.tag = document.createElement('img')
        this.imagem = caminho;
        this.nivel = nivel;
        this.posicao = this.tag.getBoundingClientRect();
        this.velocidadeMovimento = 3;
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
        this.posicao = this.tag.getBoundingClientRect();
    }

    moveEsquerda(){
        this.posicao = this.tag.getBoundingClientRect();
        this.tag.style.left = (this.posicao.x - this.velocidadeMovimento) + "px";
    }

    atualizarEstado(){
        this.moveEsquerda();
        this.posicao = this.tag.getBoundingClientRect();
    }

    reposicionar(left){
        this.tag.style.left = left;
    }

    saiuTela(){
        this.posicao = this.tag.getBoundingClientRect();
        return this.posicao.x + this.posicao.width < -this.posicao.width;
    }
}

class Solo{
    constructor(caminho, fator){
        this.tag = document.createElement('img')
        this.imagem = caminho;
        this.posicao = this.tag.getBoundingClientRect();
        this.velocidadeMovimento = 3;
        this.fatorLeftInicial = fator;
        this.prepararExibicao();
    }

    prepararExibicao(){
        this.tag.style.display = 'block';
        this.tag.style.width = '100vw';
        this.tag.style.height = '10vh';
        this.tag.style.position = 'absolute';
        this.tag.style.top = '90vh';
        this.tag.style.left =  (100 * this.fatorLeftInicial) + 'vw';
        this.tag.style.zIndex = '0';
        this.tag.src = this.imagem;
        this.posicao = this.tag.getBoundingClientRect();
    }

    moveEsquerda(){
        this.posicao = this.tag.getBoundingClientRect();
        this.tag.style.left = (this.posicao.x - this.velocidadeMovimento) + "px";
    }

    atualizarEstado(){
        this.moveEsquerda();
        this.posicao = this.tag.getBoundingClientRect();
    }

    reposicionar(left){
        this.tag.style.left = left;
    }

    saiuTela(){
        this.posicao = this.tag.getBoundingClientRect();
        return this.posicao.x + this.posicao.width < -this.posicao.width;
    }
}

class Cenario{
    constructor(caminhoFundo){
        this.tag = document.createElement('img');
        this.fundo = caminhoFundo;
        this.camadas = [];
        this.solos = [];
        this.prepararExibicao();
    }

    adicionarAoPai(tagPai){
        this.resetar();
        tagPai.appendChild(this.tag);
        for (let c of this.camadas){
            tagPai.appendChild(c.tag);
        }
        for (let s of this.solos){
            tagPai.appendChild(s.tag);
        }
    }

    reposicionarCamada(camada) {
        let maiorX = camada.tag.getBoundingClientRect().x;

        for (let c of this.camadas) {
            if (c !== camada) {
                const posicao = c.tag.getBoundingClientRect();
                if (posicao.x > maiorX && c.nivel === camada.nivel)
                    maiorX = posicao.x;
            }
        }

        camada.reposicionar(maiorX - camada.velocidadeMovimento + camada.tag.getBoundingClientRect().width + 'px');
    }

    reposicionarSolo(solo) {
        let maiorX = solo.tag.getBoundingClientRect().x;

        for (let s of this.solos) {
            if (s !== solo) {
                const posicao = s.tag.getBoundingClientRect();
                if (posicao.x > maiorX) 
                    maiorX = posicao.x;
            }
        }

        solo.reposicionar(maiorX - solo.velocidadeMovimento + solo.tag.getBoundingClientRect().width + 'px');
    }

    removeDoPai(tagPai){
        tagPai.removeChild(this.tag);
        for (let c of this.camadas){
            tagPai.removeChild(c.tag);
        }
        for (let s of this.solos){
            tagPai.removeChild(s.tag);
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

    adicionarSolo(solo){
        this.solos.push(solo);
    }

    resetar(){
        for (let c of this.camadas){
            c.prepararExibicao();
        }
    }

    atualizarEstado(){
        for (let c of this.camadas){
            c.atualizarEstado();
            if (c.saiuTela()) this.reposicionarCamada(c);
        }
        for (let s of this.solos){
            s.atualizarEstado();
            if (s.saiuTela()) this.reposicionarSolo(s);
        }
    }
}

function criarCenarioFlorestaEntardecer(){
    florestaEntardecer = new Cenario(caminhoBaseSprite + 'floresta-entardecer-fundo.png');

    florestaEntardecerCamada1 = new Camada(caminhoBaseSprite + 'floresta-entardecer-atras.png', 3, 0);
    florestaEntardecerCamada2 = new Camada(caminhoBaseSprite + 'floresta-entardecer-atras.png', 3, 1);
    florestaEntardecerCamada3 = new Camada(caminhoBaseSprite + 'floresta-entardecer-atras.png', 3, 2);

    florestaEntardecerCamada4 = new Camada(caminhoBaseSprite + 'floresta-entardecer-meio.png', 2, 0);
    florestaEntardecerCamada5 = new Camada(caminhoBaseSprite + 'floresta-entardecer-meio.png', 2, 1);
    florestaEntardecerCamada6 = new Camada(caminhoBaseSprite + 'floresta-entardecer-meio.png', 2, 2);

    florestaEntardecerCamada7 = new Camada(caminhoBaseSprite + 'floresta-entardecer-frente.png', 1, 0);
    florestaEntardecerCamada8 = new Camada(caminhoBaseSprite + 'floresta-entardecer-frente.png', 1, 1);
    florestaEntardecerCamada9 = new Camada(caminhoBaseSprite + 'floresta-entardecer-frente.png', 1, 2);

    florestaEntardecer.adicionarCamada(florestaEntardecerCamada1);
    florestaEntardecer.adicionarCamada(florestaEntardecerCamada2);
    florestaEntardecer.adicionarCamada(florestaEntardecerCamada3);
    florestaEntardecer.adicionarCamada(florestaEntardecerCamada4);
    florestaEntardecer.adicionarCamada(florestaEntardecerCamada5);
    florestaEntardecer.adicionarCamada(florestaEntardecerCamada6);
    florestaEntardecer.adicionarCamada(florestaEntardecerCamada7);
    florestaEntardecer.adicionarCamada(florestaEntardecerCamada8);
    florestaEntardecer.adicionarCamada(florestaEntardecerCamada9);


    florestaEntardecerSolo1 = new Solo(caminhoBaseSprite + 'floresta-entardecer-solo.png', 0);
    florestaEntardecerSolo2 = new Solo(caminhoBaseSprite + 'floresta-entardecer-solo.png', 1);
    florestaEntardecerSolo3 = new Solo(caminhoBaseSprite + 'floresta-entardecer-solo.png', 2);

    florestaEntardecer.adicionarSolo(florestaEntardecerSolo1);
    florestaEntardecer.adicionarSolo(florestaEntardecerSolo2);
    florestaEntardecer.adicionarSolo(florestaEntardecerSolo3);

    return florestaEntardecer;
}


