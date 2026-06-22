const produtos = {
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

const params = new URLSearchParams(window.location.search);
const produtoAtual = params.get("produto") || "starwars";

if (produtos[produtoAtual]) {
    document.getElementById("produto-img").src = produtos[produtoAtual].imagem;
    document.getElementById("produto-img").alt = produtos[produtoAtual].nome;
    document.getElementById("produto-nome").textContent = produtos[produtoAtual].nome;
    document.getElementById("produto-preco").innerHTML = `${produtos[produtoAtual].preco} <span>2x sem juros</span>`;
    document.getElementById("produto-descricao").textContent = produtos[produtoAtual].descricao;
    document.title = `${produtos[produtoAtual].nome} - Estante Infinita`;
}

document.querySelectorAll(".mini-card").forEach(card => {
    card.addEventListener("click", () => {
        const produto = card.dataset.produto;
        window.location.href = `compra2.html?produto=${produto}`;
    });
});