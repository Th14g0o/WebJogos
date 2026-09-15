class Acao{
    constructor(nome, teclas){
        this.nome = nome;
        this.teclas = teclas;
    }
}

class Jogo{
    constructor(numero, nome, genero, descricao, link, capa){
        this.numero = numero;
        this.nome = nome;
        this.genero = genero;
        this.descricao = descricao;
        this.link = link;
        this.acoes = [];
        this.capa = capa;
    }

    adicionarAcao(acao){
        this.acoes.push(acao);
    }
}

class ListaJogos{
    constructor(){
        this.jogos = [];
        this.tagListaJogos = document.getElementById('gameList');
        this.tagPreviewScreen = document.getElementById('preview-screen');
        this.tagPreviewTitle = document.getElementById('preview-title');
        this.tagPreviewDescription = document.getElementById('preview-description');
        this.tagControls = document.getElementById('controls');
        this.tagQtdJogos = document.getElementById('qtd-jogos');
    }

    adicionarAcaoHtml(acao){
        let tagAcao = document.createElement('div');
        tagAcao.className = 'control-row';
        tagAcao.innerHTML = `<span>${acao.nome.toUpperCase()}</span><span class="key">${acao.teclas.toUpperCase()}</span>`;
        this.tagControls.appendChild(tagAcao);
    }

    adicionarJogo(jogo){
        this.jogos.push(jogo);
    }

    limparDadosJogo(){
        this.tagPreviewScreen.innerHTML = "";
        this.tagPreviewTitle.innerHTML = "";
        this.tagPreviewDescription.innerHTML = "";
        this.tagControls.innerHTML = "";
    }

    limparSelecao(){
        document.querySelectorAll('.game-item').forEach(jogo => {
            jogo.classList.remove('selected');
        });
    }

    exibirDadosJogo(numero){
        if (numero == -1){
            this.limparDadosJogo()
        }
        else{
            this.jogos.forEach(jogo => {
                if (jogo.numero == numero){
                    this.tagPreviewScreen.innerHTML = "";
                    let img = document.createElement('img');
                    img.src = jogo.capa;
                    this.tagPreviewScreen.appendChild(img);
                    this.tagPreviewTitle.innerHTML = jogo.nome.toUpperCase();
                    this.tagPreviewDescription.innerHTML = jogo.descricao.toUpperCase();
                    this.tagControls.innerHTML = "";
                    jogo.acoes.forEach(acao => {
                        this.adicionarAcaoHtml(acao);
                    });
                    return;
                }
            });
        }
    }

    adicionarJogosHtml(){
        this.jogos.forEach(jogo => {
            let tagJogo = document.createElement('a');
            tagJogo.href = jogo.link;
            tagJogo.className = 'game-item';
            tagJogo.innerHTML = 
            `   <span class="game-number">${jogo.numero}</span>
                <span class="game-title">${jogo.nome.toUpperCase()}</span>
                <span class="game-meta">${jogo.genero.toUpperCase()}</span>
                <span class="game-play">JOGAR</span>`;

            tagJogo.addEventListener('mouseenter', () => {
                this.exibirDadosJogo(jogo.numero);
                this.limparSelecao();
                tagJogo.classList.add('selected');
            });
            tagJogo.addEventListener('mouseleave', () => {
                this.limparSelecao();
                tagJogo.classList.add('selected');
            });
            tagJogo.addEventListener('touchstart', () => {
                this.exibirDadosJogo(jogo.numero);
                this.limparSelecao();
                tagJogo.classList.add('selected');
            });
            this.tagListaJogos.appendChild(tagJogo);
        });
    }

    carregar(){
        this.tagListaJogos.innerHTML = '';
        this.adicionarJogosHtml();
        this.tagQtdJogos.innerText = this.jogos.length;
    }
}

let listaJogos = new ListaJogos();

// Corre guara
let jogo = new Jogo(1, "Corre Guara", "Runner", "Jogo inspirado no jogo do T-Rex do Google", 
    "jogos/corre-guara/menu.html", "imgs/capas/CorreGuara.png"
);
jogo.adicionarAcao(new Acao("Pular", "Barra de espaço, Esquerda do Mouse"));
listaJogos.adicionarJogo(jogo);

// for (let i = 2; i < 22; i++){
//     let j = new Jogo(i, "Temp" + i, "Teste", "Teste desc", 
//         "#"
//     );
//     for (let k = 0; k < 20; k++) j.adicionarAcao(new Acao("Pular" + k, "Barra de espaço"));
//     listaJogos.adicionarJogo(j);
// }


listaJogos.carregar();