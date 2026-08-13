function preloadImages(urls) {
    return Promise.all(urls.map(url => new Promise(resolve => {
        const img = new Image();
        img.onload = img.onerror = () => resolve();
        img.src = url;
    })));
}

window.addEventListener("load", () => {
    // Hide scrollbar but allow scroll
    document.body.style.overflow = 'hidden'; // disables scroll
    // To allow scroll without showing scrollbar:
    document.body.style.overflow = 'auto';
    document.body.style.scrollbarWidth = 'none'; // Firefox
    document.body.style.msOverflowStyle = 'none'; // IE/Edge

    // For WebKit browsers
    const style = document.createElement('style');
    style.innerHTML = '::-webkit-scrollbar { display: none; }';
    document.head.appendChild(style);

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
        'sprites/fundo/floresta-entardecer/floresta-entardecer-atras.png',
        'sprites/fundo/floresta-entardecer/floresta-entardecer-meio.png',
        'sprites/fundo/floresta-entardecer/floresta-entardecer-frente.png',
        'sprites/fundo/floresta-entardecer/floresta-entardecer-fundo.png',
        'sprites/fundo/floresta-entardecer/floresta-entardecer-solo.png',
    ];

    preloadImages(imagens).then(() => {
        const jogo = new Jogo();
        jogo.comecar();
    });
});