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
    document.body.style.scrollbarWidth = 'none'; // Firefox
    document.body.style.msOverflowStyle = 'none'; // IE/Edge

    // For WebKit browsers
    const style = document.createElement('style');
    style.innerHTML = '::-webkit-scrollbar { display: none; }';
    document.head.appendChild(style);

    const imagens = [
        // 'imgs/sprites',
    ];

    preloadImages(imagens).then(() => {
        const jogo = new Jogo();
        jogo.comecar();
    });
});