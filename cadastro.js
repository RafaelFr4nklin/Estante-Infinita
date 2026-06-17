 document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("criacao-conta");
    const successMessage = document.getElementById("msg-sucesso");

            form.addEventListener("submit", (event) => {

                event.preventDefault();

                const nome = document.getElementById("nome-completo").value.trim();
                const email = document.getElementById("email").value.trim();
                const senha = document.getElementById("senha").value.trim();
                const cidade = document.getElementById("cidade").value.trim();

                if (!nome || !email || !senha || !cidade) {
                    alert("Preencha todos os campos.");
                    return;
                }

                const usuario = {
                    nome,
                    email,
                    cidade
                };

                localStorage.setItem(
                    "usuarioEstanteInfinita",
                    JSON.stringify(usuario)
                );

                successMessage.classList.add("show");

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2500);

            });

        });
