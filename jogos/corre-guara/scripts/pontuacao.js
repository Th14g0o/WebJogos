class Pontuacao {
    constructor(){
        this.pontos = 0;
        this.maiorPontuacao = 0;
        this.tag = document.createElement("p");
        this.prepararExibicao();
    }

    prepararExibicao(){
        this.tag.style.display = 'block';
        this.tag.style.color = "#e2e621";
        this.tag.style.fontSize = "30px";
        this.tag.style.position = "absolute";
        this.tag.style.top = "1%";
        this.tag.style.right = "2%";
    }

    contando(){
        this.tag.innerHTML = "Pontuação: " + Math.trunc(this.pontos);
        this.pontos += 0.015;
    }

    acabouJogo(){
        if (this.pontos > this.maiorPontuacao) 
            this.maiorPontuacao = this.pontos;
    }
}