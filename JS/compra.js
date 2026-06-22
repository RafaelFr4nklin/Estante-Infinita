const produtos = {
    bulbasaur: {
        nome: "Bulbasaur BASIC",
        preco: "R$ 25,00",
        imagem: "../img2/Bulbasaur.jfif",
        descricao: "Bulbasaur é um dos Pokémon iniciais mais queridos da franquia. Esta carta é perfeita para colecionadores e fãs do tipo Planta."
    },

    jirachi: {
        nome: "Jirachi BASIC",
        preco: "R$ 34,50",
        imagem: "../img2/Jirachi.jpg",
        descricao: "Jirachi é um Pokémon mítico extremamente raro. Sua carta possui uma arte brilhante e muito procurada por colecionadores."
    },

    meowth: {
        nome: "Meowth EX",
        preco: "R$ 91,00",
        imagem: "../img2/Meowth.png",
        descricao: "Carta poderosa e cobiçada, o Meowth EX se destaca pelo seu estilo único e ataques rápidos. Ideal para colecionadores e jogadores que buscam agilidade e vantagem estratégica nas batalhas. Um item raro que não pode faltar na sua coleção."
    },

    charmander: {
        nome: "Charmander BASIC",
        preco: "R$ 21,50",
        imagem: "../img2/Charmander.png",
        descricao: "Charmander é um dos Pokémon iniciais mais populares. Sua carta é ideal para fãs do tipo Fogo e para completar coleções clássicas."
    },

    zygarde: {
        nome: "Zygarde EX",
        preco: "R$ 79,90",
        imagem: "../img2/Zygarde.png",
        descricao: "Zygarde EX é uma carta impressionante com visual único e grande presença em coleções Pokémon. Excelente para jogadores e colecionadores."
    }

};

// Troca o produto ao abrir a página
const parametros = new URLSearchParams(window.location.search);
const produtoAtual = parametros.get("produto") || "meowth";

if (produtos[produtoAtual]) {

    document.getElementById("produto-img").src =
        produtos[produtoAtual].imagem;

    document.getElementById("produto-img").alt =
        produtos[produtoAtual].nome;

    document.getElementById("produto-nome").textContent =
        produtos[produtoAtual].nome;

    document.getElementById("produto-preco").innerHTML =
        `${produtos[produtoAtual].preco} <span>2x sem juros</span>`;

    document.getElementById("produto-descricao").textContent =
        produtos[produtoAtual].descricao;

    document.title =
        `${produtos[produtoAtual].nome} - Estante Infinita`;
}

// Clique nos cards
const cards = document.querySelectorAll(".mini-card");

cards.forEach(card => {

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {

        const produto = card.dataset.produto;

        window.location.href =
            `compra.html?produto=${produto}`;
    });

});