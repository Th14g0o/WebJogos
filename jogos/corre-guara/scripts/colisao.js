function verificarColisao(corredor, obstaculo) {
    const corredorImg = corredor.tag.getBoundingClientRect();
    const obstaculoImg = obstaculo.tag.getBoundingClientRect();

    if (corredorImg.x < obstaculoImg.x + obstaculoImg.width - corredor.fatorColisaoX && corredorImg.x + corredorImg.width - corredor.fatorColisaoX > obstaculoImg.x 
        && corredorImg.y < obstaculoImg.y + obstaculoImg.height - corredor.fatorColisaoY && corredorImg.y + corredorImg.height - corredor.fatorColisaoY > obstaculoImg.y) {
        // alert("Colisão detectada!");
        return true;
    }
    return false;
}