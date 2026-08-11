function verificarColisao(corredor, obstaculoImg) {
    const corredorImg = corredor.tagImg.getBoundingClientRect();
    const obstaculo = obstaculoImg.getBoundingClientRect();
    if (corredorImg.x < obstaculo.x + obstaculo.width  && corredorImg.x + corredorImg.width > obstaculo.x &&
        corredorImg.y < obstaculo.y + obstaculo.height && corredorImg.y + corredorImg.height > obstaculo.y) {
        console.log("COLISÃO!");
    }
}