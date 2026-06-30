document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");
    const aviso = document.getElementById("aviso-carrinho-vazio");
    const btnAdicionar = document.querySelector(".adicionar");
    const totalEl = document.querySelectorAll(".total h2")[1];
    const calculoEl = document.getElementById("calculo-valores");

    function getCarrinho() {
        return JSON.parse(localStorage.getItem("carrinho") || "[]");
    }

    function salvarCarrinho(carrinho) {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }

    function recalcular() {
        const itens = document.querySelectorAll(".item-carrinho");
        const selecionados = [];

        itens.forEach(div => {
            const check = div.querySelector(".check-item");
            if (check && check.checked) {
                const precoUnit = parseFloat(div.dataset.precoUnit);
                const qty = parseInt(div.querySelector(".qty-valor").textContent);
                if (!isNaN(precoUnit) && !isNaN(qty)) {
                    const subtotal = precoUnit * qty;
                    const subtotalFmt = subtotal.toLocaleString("pt-BR", {
                        style: "currency", currency: "BRL"
                    });
                    selecionados.push({ subtotal, subtotalFmt });
                }
            }
        });

        const total = selecionados.reduce((acc, i) => acc + i.subtotal, 0);

        if (calculoEl) {
            if (selecionados.length === 0) {
                calculoEl.textContent = "";
            } else if (selecionados.length === 1) {
                calculoEl.textContent = selecionados[0].subtotalFmt;
            } else {
                const parcelas = selecionados.map(i => i.subtotalFmt).join(" + ");
                const totalFmt = total.toLocaleString("pt-BR", {
                    style: "currency", currency: "BRL"
                });
                calculoEl.textContent = `${parcelas} = ${totalFmt}`;
            }
        }

        if (totalEl) {
            totalEl.textContent = total.toLocaleString("pt-BR", {
                style: "currency", currency: "BRL"
            });
        }
    }

    function atualizarPrecoExibido(div) {
        const precoUnit = parseFloat(div.dataset.precoUnit);
        const qty = parseInt(div.querySelector(".qty-valor").textContent);
        const subtotal = precoUnit * qty;
        div.querySelector(".preco-item").textContent = subtotal.toLocaleString("pt-BR", {
            style: "currency", currency: "BRL"
        });
    }

    function renderizar() {
        // Remove itens anteriores (sem remover aviso e botão)
        document.querySelectorAll(".item-carrinho").forEach(el => el.remove());

        const carrinho = getCarrinho();

        if (carrinho.length === 0) {
            aviso.style.display = "flex";
            if (calculoEl) calculoEl.textContent = "";
            if (totalEl) totalEl.textContent = "R$ 0,00";
            return;
        }

        aviso.style.display = "none";

        carrinho.forEach(item => {
            const qty = item.qty || 1;

            // Converte preco string → número
            const precoUnit = parseFloat(
                item.preco.replace("R$", "").trim().replace(".", "").replace(",", ".")
            );
            const subtotal = precoUnit * qty;

            const div = document.createElement("div");
            div.classList.add("item-carrinho");
            div.dataset.id = item.id;
            div.dataset.precoUnit = precoUnit;

            div.innerHTML = `
                <input type="checkbox" class="check-item" checked>
                <img src="${item.imagem}" alt="${item.nome}">
                <span class="nome-item">${item.nome}</span>

                <div class="qty-controle">
                    <button class="qty-btn qty-menos">−</button>
                    <span class="qty-valor">${qty}</span>
                    <button class="qty-btn qty-mais">+</button>
                </div>

                <span class="preco-item">${subtotal.toLocaleString("pt-BR", {
                    style: "currency", currency: "BRL"
                })}</span>

                <button class="remover-item" data-id="${item.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;

            main.insertBefore(div, btnAdicionar);

            // Botão +
            div.querySelector(".qty-mais").addEventListener("click", () => {
                const carrinho = getCarrinho();
                const idx = carrinho.findIndex(i => i.id === item.id);
                if (idx !== -1) {
                    carrinho[idx].qty = (carrinho[idx].qty || 1) + 1;
                    salvarCarrinho(carrinho);
                    div.querySelector(".qty-valor").textContent = carrinho[idx].qty;
                    atualizarPrecoExibido(div);
                    recalcular();
                }
            });

            // Botão −
            div.querySelector(".qty-menos").addEventListener("click", () => {
                const carrinho = getCarrinho();
                const idx = carrinho.findIndex(i => i.id === item.id);
                if (idx !== -1) {
                    const novaQty = (carrinho[idx].qty || 1) - 1;
                    if (novaQty <= 0) {
                        // Remove o item
                        carrinho.splice(idx, 1);
                        salvarCarrinho(carrinho);
                        div.remove();
                        recalcular();
                        if (getCarrinho().length === 0) {
                            aviso.style.display = "flex";
                            if (calculoEl) calculoEl.textContent = "";
                            if (totalEl) totalEl.textContent = "R$ 0,00";
                        }
                    } else {
                        carrinho[idx].qty = novaQty;
                        salvarCarrinho(carrinho);
                        div.querySelector(".qty-valor").textContent = novaQty;
                        atualizarPrecoExibido(div);
                        recalcular();
                    }
                }
            });

            // Checkbox
            div.querySelector(".check-item").addEventListener("change", recalcular);

            // Remover
            div.querySelector(".remover-item").addEventListener("click", () => {
                const carrinho = getCarrinho();
                const novoCarrinho = carrinho.filter(i => i.id !== item.id);
                salvarCarrinho(novoCarrinho);
                div.remove();
                recalcular();
                if (getCarrinho().length === 0) {
                    aviso.style.display = "flex";
                    if (calculoEl) calculoEl.textContent = "";
                    if (totalEl) totalEl.textContent = "R$ 0,00";
                }
            });
        });

        recalcular();
    }

    renderizar();
});
document.getElementById("adicionar-mais-itens").addEventListener("click", () => {
    

    window.location.href = "index.html";
});
