function verificarColisaoTag(corpo1, corpo2) {
    const corpo1Espaco = corpo1.getBoundingClientRect();
    const corpo2Espaco = corpo2.getBoundingClientRect();

    if (corpo1Espaco.x < corpo2Espaco.x + corpo2Espaco.width - corpo1.fatorColisaoX && corpo1Espaco.x + corpo1Espaco.width - corpo1.fatorColisaoX > corpo2Espaco.x 
        && corpo1Espaco.y < corpo2Espaco.y + corpo2Espaco.height - corpo1.fatorColisaoY && corpo1Espaco.y + corpo1Espaco.height - corpo1.fatorColisaoY > corpo2Espaco.y) {
        // alert("Colisão detectada!");
        return true;
    }
    return false;
}