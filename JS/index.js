document.querySelectorAll(".card[data-produto]").forEach(card => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
        const produto = card.dataset.produto;

        const quadrinhos = [
            "starwars",
            "naruto",
            "marvel",
            "agatha",
            "homemaranha"
        ];

        if (quadrinhos.includes(produto)) {
            window.location.href = `compra2.html?produto=${produto}`;
        } else {
            window.location.href = `compra.html?produto=${produto}`;
        }
    });
});