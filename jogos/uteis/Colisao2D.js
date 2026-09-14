class Colisao2D {
    static verificarColisaoSprite2D(corpo1, corpo2) {
        const corpo1Img = corpo1.tag.getBoundingClientRect();
        const corpo2Img = corpo2.tag.getBoundingClientRect();

        if (corpo1Img.x < corpo2Img.x + corpo2Img.width - corpo1.fatorColisaoX && corpo1Img.x + corpo1Img.width - corpo1.fatorColisaoX > corpo2Img.x 
            && corpo1Img.y < corpo2Img.y + corpo2Img.height - corpo1.fatorColisaoY && corpo1Img.y + corpo1Img.height - corpo1.fatorColisaoY > corpo2Img.y) {
            // alert("Colisão detectada!");
            return true;
        }
        return false;
    }
}