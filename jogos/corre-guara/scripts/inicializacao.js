function preloadImages(urls) {
    return Promise.all(urls.map(url => new Promise(resolve => {
        const img = new Image();
        img.onload = img.onerror = () => resolve();
        img.src = url;
    })));
}

window.addEventListener("load", () => {
    const imagens = [
        'sprites/guara/guara-01.png',
        'sprites/guara/guara-02.png',
        'sprites/guara/guara-03.png',
        'sprites/guara/guara-04.png',
        'sprites/guara/guara-05.png',
        'sprites/guara/guara-06.png',
        'sprites/guara/guara-07.png',
        'sprites/guara/guara-08.png',
        'sprites/guara/guara-09.png',
        'sprites/tronco/tronco-menor.png',
        'sprites/tronco/tronco-medio.png',
        'sprites/tronco/tronco-grande.png',
    ];

    preloadImages(imagens).then(() => {
        const jogo = new Jogo();
        jogo.comecar();
    });
});