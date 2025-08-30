// Efeito Parallax dinâmico
let ticking = false;

// Função para o efeito parallax dinâmico com scroll
function updateParallax() {
    const elementosParallax = document.querySelectorAll('.parallax');
    const deslocamento = window.pageYOffset;

    elementosParallax.forEach(function(elemento) {
        elemento.style.backgroundPositionY = `${deslocamento * 0.7}px`;
    });

    ticking = false;
}

// Verifica se o scroll foi acionado
document.addEventListener('scroll', function () {
    if (!ticking) {
        requestAnimationFrame(updateParallax); //torna o efeito mais suave
        ticking = true;
    }
});

// Funções para abrir os modais
function abrirModal(modalName) {
    
    let modal;
    
    switch (modalName) {
        case 'udemy':
            modal = document.getElementById('modal-udemy');
            break;

        case 'game':
            modal = document.getElementById('modal-game');
            break;

        case 'estoque':
            modal = document.getElementById('modal-estoque');
            break;
    
        default:
            console.log('Modal não encontrado');
            return;
    }
    
    if (modal) {
        modal.style.display = 'flex';
        // Força um reflow para garantir que a transição funcione
        modal.offsetHeight;
        modal.style.opacity = '1';
    }

}

// Função para fechar modal com animação
function fecharModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // Tempo da transição
}

// Fechar modais
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando funcionalidades...');
    
    const botoesFechar = document.querySelectorAll('.fechar');
    //Fecha os modais com o botão fechar
    botoesFechar.forEach(function(botao) {
        botao.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                fecharModal(modal);
            }
        });
    });

    // Fechar modal clicando fora dele
    const modais = document.querySelectorAll('.modal');
    modais.forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                fecharModal(this);
            }
        });
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modaisAbertos = document.querySelectorAll('.modal[style*="flex"]');
            modaisAbertos.forEach(function(modal) {
                fecharModal(modal);
            });
        }
    });

    // Detectar qual seção está visível
    detectarSecaoVisivel();

});


// Função para detectar qual seção está visível
function detectarSecaoVisivel() {
    const secoes = document.querySelectorAll('.parallax');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const secaoAtual = entry.target.id;
                console.log('Seção visível:', secaoAtual);

                // destaca o link do menu correspondente
                destacarMenuAtivo(secaoAtual);
            }
        });
    }, {
        threshold: 0.5 // 50% da seção precisa estar visível
    });
    
    secoes.forEach(secao => {
        observer.observe(secao);
    });
}

// Função para destacar o menu ativo
function destacarMenuAtivo(secaoId) {
    // Remove destaque de todos os links
    document.querySelectorAll('.menu-underline a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Adiciona destaque ao link correspondente
    const linkAtivo = document.querySelector(`[href="#${secaoId}"]`);
    if (linkAtivo) {
        linkAtivo.classList.add('active');
    }
}