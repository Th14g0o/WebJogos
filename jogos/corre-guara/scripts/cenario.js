const caminhoBaseSprite = 'sprites/fundo/floresta-entardecer/';

class Camada{
    constructor(caminho, nivel, fator, altura = '90vh', y = '0'){
        this.tag = document.createElement('img');
        this.altura = altura;
        this.y = y;
        this.imagem = caminho;
        this.nivel = nivel;
        this.posicao = this.tag.getBoundingClientRect();
        this.velocidadeMovimento = 3;
        this.fatorLeftInicial = fator;
        this.prepararExibicao();
    }

    prepararExibicao(){
        this.tag.style.display = 'block';
        this.tag.style.position = 'absolute';
        this.tag.style.height = this.altura;
        this.tag.style.top = this.y;
        this.tag.style.width = '100vw';
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

class Fundo{
    constructor(caminho, largura, altura, x = '0', y = '0'){
        this.tag = document.createElement('img');
        this.caminho = caminho;
        this.largura = largura;
        this.altura = altura;
        this.x = x;
        this.y = y;
        this.nivel = 0;
    }

    getNivel(){
        return (-1*this.nivel).toString();
    }

    setNivel(n){
        this.nivel = n;
        this.tag.style.zIndex = this.getNivel();
    }

    prepararExibicao(){
        this.tag.style.display = 'block';
        this.tag.style.position = 'absolute';

        this.tag.style.top = this.y;
        this.tag.style.left = this.x;

        this.tag.style.width = this.largura;
        this.tag.style.height = this.altura;
        this.tag.src = this.caminho; 
        
        this.tag.style.zIndex = this.getNivel();
    }
}

class Cenario{
    constructor(){
        this.fundo = null;
        this.camadas_fundo = [];
        this.camadas_solo = [];
        this.maiorNivel = 0;
    }

    adicionarFundo(fundo){
        this.fundo = fundo;
        this.fundo.prepararExibicao();
    }

    adicionarAoPai(tagPai){
        this.resetar();
        if (this.fundo) tagPai.appendChild(this.fundo.tag);
        for (let c of this.camadas_fundo){
            tagPai.appendChild(c.tag);
        }
        for (let s of this.camadas_solo){
            tagPai.appendChild(s.tag);
        }
    }

    reposicionarCamada(camada) {
        let maiorX = camada.tag.getBoundingClientRect().x;

        for (let c of this.camadas_fundo) {
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

        for (let s of this.camadas_solo) {
            if (s !== solo) {
                const posicao = s.tag.getBoundingClientRect();
                if (posicao.x > maiorX && s.nivel === solo.nivel)
                    maiorX = posicao.x;
            }
        }

        solo.reposicionar(maiorX - solo.velocidadeMovimento + solo.tag.getBoundingClientRect().width + 'px');
    }

    removeDoPai(tagPai){
        if (this.fundo) tagPai.removeChild(this.fundo.tag);
        for (let c of this.camadas_fundo){
            tagPai.removeChild(c.tag);
        }
        for (let s of this.camadas_solo){
            tagPai.removeChild(s.tag);
        }
    }

    adicionarCamada(camada){
        this.camadas_fundo.push(camada);
        if (camada && camada.nivel > this.maiorNivel) {
            this.maiorNivel = camada.nivel;
            if (this.fundo) this.fundo.setNivel(this.maiorNivel);
        }
    }

    adicionarSolo(solo){
        this.camadas_solo.push(solo);
        if (solo && solo.nivel > this.maiorNivel) {
            this.maiorNivel = solo.nivel;
            if (this.fundo) this.fundo.setNivel(this.maiorNivel);
        }
    }

    resetar(){
        if (this.fundo) this.fundo.prepararExibicao();
        for (let c of this.camadas_fundo){
            c.prepararExibicao();
        }
        for (let s of this.camadas_solo){
            s.prepararExibicao();
        }
    }

    atualizarEstado(){
        for (let c of this.camadas_fundo){
            c.atualizarEstado();
            if (c.saiuTela()) this.reposicionarCamada(c);
        }
        for (let s of this.camadas_solo){
            s.atualizarEstado();
            if (s.saiuTela()) this.reposicionarSolo(s);
        }
    }
}

function criarCenarioFlorestaEntardecer(){
    florestaEntardecer = new Cenario();

    const fundo = new Fundo(caminhoBaseSprite + 'floresta-entardecer-fundo.png', '100vw', '90vh');

    florestaEntardecer.adicionarFundo(fundo);

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


    florestaEntardecerSolo1 = new Camada(caminhoBaseSprite + 'floresta-entardecer-solo.png', 1, 0, '10vh', '90vh');
    florestaEntardecerSolo2 = new Camada(caminhoBaseSprite + 'floresta-entardecer-solo.png', 1, 1, '10vh', '90vh');
    florestaEntardecerSolo3 = new Camada(caminhoBaseSprite + 'floresta-entardecer-solo.png', 1, 2, '10vh', '90vh');

    florestaEntardecer.adicionarSolo(florestaEntardecerSolo1);
    florestaEntardecer.adicionarSolo(florestaEntardecerSolo2);
    florestaEntardecer.adicionarSolo(florestaEntardecerSolo3);

    return florestaEntardecer;
}


