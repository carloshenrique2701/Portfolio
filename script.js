// Funções para controle dos modais
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Adiciona evento para fechar com ESC
        document.addEventListener('keydown', handleEscKey);
        
        // Adiciona evento para fechar clicando fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modalId);
            }
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Remove evento ESC
        document.removeEventListener('keydown', handleEscKey);
    }
}

function handleEscKey(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        document.removeEventListener('keydown', handleEscKey);
    }
}

// Adiciona eventos aos cards de projetos
document.addEventListener('DOMContentLoaded', function() {
    // Eventos para abrir modais
    const projectCards = {
        'blog': 'modal-blog',
        'album': 'modal-album',
        'estacionamento': 'modal-estacionamento',
        'supermercado': 'modal-supermercado'
    };
    
    for (const [cardId, modalId] of Object.entries(projectCards)) {
        const card = document.getElementById(cardId);
        if (card) {
            card.addEventListener('click', () => openModal(modalId));
            
            // Adiciona estilo de cursor pointer
            card.style.cursor = 'pointer';
        }
    }
    
    // Adiciona eventos para fechar modais nos botões de fechar
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Adiciona efeito de parallax suave
    const parallaxElements = document.querySelectorAll('.parallax');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxElements.forEach(section => {
                    const bg = section.querySelector('.parallax-bg');
                    if (!bg) return;

                    const rect = section.getBoundingClientRect();
                    if (rect.bottom < 0 || rect.top > innerHeight) return;

                    bg.style.transform = `translate3d(0, ${rect.top * 0.3}px, 0)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Configura animação inicial das seções
    const sections = document.querySelectorAll('.secao1, .secao2, .secao3');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Anima a entrada inicial
    setTimeout(() => {
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }, 300);
    
    
    // Ajusta altura da sidebar para preencher a tela
    function adjustSidebarHeight() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.height = window.innerHeight + 'px';
        }
    }
    
    adjustSidebarHeight();
    window.addEventListener('resize', adjustSidebarHeight);
    
    // Efeito de hover suave nos cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // Adiciona efeito de brilho nos textos dourados
    const goldenTexts = document.querySelectorAll('h1, h2, .content-section1 h1');
    goldenTexts.forEach(text => {
        if (getComputedStyle(text).color.includes('rgb(212, 175, 55)') || 
            text.classList.contains('golden')) {
            text.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
            text.style.transition = 'text-shadow 0.3s ease';
            
            text.addEventListener('mouseenter', function() {
                this.style.textShadow = '0 0 20px rgba(212, 175, 55, 0.6)';
            });
            
            text.addEventListener('mouseleave', function() {
                this.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
            });
        }
    });
});

// Função para rolar suavemente para seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Adiciona efeito de digitação no título
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicializa efeito de digitação no título principal
window.addEventListener('load', function() {
    const title = document.querySelector('.content-section1 h1');
    if (title) {
        const originalText = title.textContent;
        setTimeout(() => {
            typeWriter(title, originalText, 80);
        }, 500);
    }
});