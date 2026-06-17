 /* =====================================================
         JAVASCRIPT — ANIMAÇÃO DE CONFETES
         Desenha partículas coloridas caindo no <canvas>.
         Roda automaticamente ao carregar a página.
    ====================================================== -->*/



(function () {

            /* --- Configurações da animação --- */
            const TOTAL_PARTICULAS = 80;   // Quantidade de confetes
            const CORES = [
                '#f94144', '#f3722c', '#f8961e',
                '#f9c74f', '#90be6d', '#43aa8b',
                '#4d908e', '#577590', '#277da1'
            ];

            /* --- Referência ao canvas e contexto 2D --- */
            const canvas = document.getElementById('confetti-canvas');
            const ctx    = canvas.getContext('2d');

            /* Ajusta o tamanho do canvas ao container */
            function ajustarCanvas() {
                canvas.width  = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            }
            ajustarCanvas();
            window.addEventListener('resize', ajustarCanvas);

            /* --- Cria cada partícula com posição e física aleatórias --- */
            function criarParticula() {
                return {
                    x:       Math.random() * canvas.width,          // Posição horizontal inicial
                    y:       Math.random() * canvas.height - canvas.height, // Começa acima do canvas
                    tamanho: Math.random() * 8 + 4,                 // Tamanho entre 4 e 12px
                    cor:     CORES[Math.floor(Math.random() * CORES.length)],
                    velY:    Math.random() * 2 + 1,                 // Velocidade de queda
                    velX:    (Math.random() - 0.5) * 1.5,           // Deriva lateral
                    rotacao: Math.random() * 360,                   // Ângulo inicial
                    velRot:  (Math.random() - 0.5) * 4,             // Velocidade de rotação
                    forma:   Math.random() > 0.5 ? 'retangulo' : 'circulo'
                };
            }

            /* Cria o array inicial de partículas */
            let particulas = Array.from({ length: TOTAL_PARTICULAS }, criarParticula);

            /* --- Loop principal de animação --- */
            function animar() {
                /* Limpa o frame anterior */
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particulas.forEach(p => {

                    /* Atualiza posição e rotação */
                    p.y      += p.velY;
                    p.x      += p.velX;
                    p.rotacao += p.velRot;

                    /* Reinicia a partícula no topo quando sai pela base */
                    if (p.y > canvas.height + 10) {
                        Object.assign(p, criarParticula());
                        p.y = -10; // Começa logo acima do canvas
                    }

                    /* Desenha a partícula */
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotacao * Math.PI) / 180);
                    ctx.fillStyle = p.cor;

                    if (p.forma === 'retangulo') {
                        ctx.fillRect(
                            -p.tamanho / 2,
                            -p.tamanho / 4,
                            p.tamanho,
                            p.tamanho / 2
                        );
                    } else {
                        ctx.beginPath();
                        ctx.arc(0, 0, p.tamanho / 2, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    ctx.restore();
                });

                /* Solicita o próximo frame (~60fps) */
                requestAnimationFrame(animar);
            }

            /* Inicia a animação */
            animar();
 })();