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
    },

    starwars: {
        nome: "HQ Star Wars",
        preco: "R$ 49,90",
        imagem: "../img2/quadrinhodarth.jfif",
        descricao: "Quadrinho de Star Wars com uma história envolvente e visual marcante. Ideal para fãs da saga e colecionadores de HQs."
    },

    naruto: {
        nome: "Mangá Naruto",
        preco: "R$ 39,90",
        imagem: "../img2/MangaNaruto.jpg",
        descricao: "Mangá clássico de Naruto Uzumaki, mostrando sua jornada ninja em busca do sonho de se tornar Hokage."
    },

    marvel: {
        nome: "HQ Marvel",
        preco: "R$ 44,90",
        imagem: "../img2/hqmarvel.jfif",
        descricao: "Quadrinho da Marvel com histórias de heróis famosos, perfeito para fãs de ação, aventura e super-heróis."
    },

    agatha: {
        nome: "Agatha Christie",
        preco: "R$ 29,90",
        imagem: "../img2/AgathaChristie.jpg",
        descricao: "Obra de mistério e investigação de Agatha Christie, ideal para leitores que gostam de suspense e histórias inteligentes."
    },

    homemaranha: {
        nome: "HQ Homem-Aranha",
        preco: "R$ 42,90",
        imagem: "../img2/HomemAranha.jfif",
        descricao: "Quadrinho do Homem-Aranha com aventuras do famoso herói da Marvel, cheio de ação e momentos marcantes."
    }
};

// ← declarado no escopo global, acessível em todo o arquivo
const parametros = new URLSearchParams(window.location.search);
const produtoId = parametros.get("produto") || "meowth";

// Atualiza a página com o produto certo
if (produtos[produtoId]) {
    document.getElementById("produto-img").src = produtos[produtoId].imagem;
    document.getElementById("produto-img").alt = produtos[produtoId].nome;
    document.getElementById("produto-nome").textContent = produtos[produtoId].nome;
    document.getElementById("produto-preco").innerHTML =
        `${produtos[produtoId].preco} <span>2x sem juros</span>`;
    document.getElementById("produto-descricao").textContent = produtos[produtoId].descricao;
    document.title = `${produtos[produtoId].nome} - Estante Infinita`;
}

// Botão "Adicionar ao carrinho"
document.getElementById("btn-carrinho").addEventListener("click", () => {
    const produto = produtos[produtoId];
    if (!produto) return;

    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    const jaExiste = carrinho.find(item => item.id === produtoId);

    if (!jaExiste) {
        carrinho.push({
            id: produtoId,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem
        });
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }

    window.location.href = "tela_carrinho.html";
});

// Mini-cards
document.querySelectorAll(".mini-card").forEach(card => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
        window.location.href = `compra.html?produto=${card.dataset.produto}`;
    });
});