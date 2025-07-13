// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização
    initializeNavigation();
    initializeAnimations();
    initializeForm();
    initializeMobileMenu();
    initializeScrollEffects();
    
    console.log('Convite de casamento carregado com sucesso!');
});

// ===== NAVEGAÇÃO =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    // Mostra/esconde navbar no scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Função para scroll suave para seções
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Ajuste para navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== MENU MOBILE =====
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ===== ANIMAÇÕES DE SCROLL =====
function initializeAnimations() {
    // Observer para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Adiciona observer aos elementos que devem animar
    const animateElements = document.querySelectorAll('.detail-card, .venue-info, .gift-option, .love-story');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

function initializeScrollEffects() {
    // Parallax suave para o hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ===== FORMULÁRIO DE CONFIRMAÇÃO =====
function initializeForm() {
    const form = document.getElementById('rsvpForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
        
        // Máscara para telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
                e.target.value = value;
            });
        }
        
        // Mostra/esconde campo de acompanhantes
        const acompanhantesSelect = document.getElementById('acompanhantes');
        const nomeAcompanhantesField = document.getElementById('nomeAcompanhantes').parentElement;
        
        if (acompanhantesSelect && nomeAcompanhantesField) {
            acompanhantesSelect.addEventListener('change', function() {
                if (this.value === '0') {
                    nomeAcompanhantesField.style.display = 'none';
                } else {
                    nomeAcompanhantesField.style.display = 'block';
                }
            });
            
            // Estado inicial
            if (acompanhantesSelect.value === '0') {
                nomeAcompanhantesField.style.display = 'none';
            }
        }
    }
}

function handleFormSubmission() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Mostra loading
    submitBtn.innerHTML = '<div class="loading"></div> Enviando...';
    submitBtn.disabled = true;
    
    // Coleta dados do formulário
    const formData = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        acompanhantes: document.getElementById('acompanhantes').value,
        nomeAcompanhantes: document.getElementById('nomeAcompanhantes').value,
        restricoes: document.getElementById('restricoes').value,
        mensagem: document.getElementById('mensagem').value
    };
    
    // Valida campos obrigatórios
    if (!formData.nome || !formData.telefone) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // Simula delay de envio
    setTimeout(() => {
        sendToWhatsApp(formData);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function sendToWhatsApp(data) {
    // Número do WhatsApp dos noivos (substitua pelo número real)
    const phoneNumber = '5511999999999'; // Formato: código do país + DDD + número
    
    // Monta a mensagem
    let message = `🎉 *CONFIRMAÇÃO DE PRESENÇA* 🎉\n\n`;
    message += `👤 *Nome:* ${data.nome}\n`;
    message += `📱 *Telefone:* ${data.telefone}\n`;
    
    if (data.acompanhantes === '0') {
        message += `👥 *Acompanhantes:* Apenas eu\n`;
    } else {
        message += `👥 *Acompanhantes:* ${data.acompanhantes}\n`;
        if (data.nomeAcompanhantes) {
            message += `📝 *Nomes dos acompanhantes:* ${data.nomeAcompanhantes}\n`;
        }
    }
    
    if (data.restricoes) {
        message += `🍽️ *Restrições alimentares:* ${data.restricoes}\n`;
    }
    
    if (data.mensagem) {
        message += `💌 *Mensagem:* ${data.mensagem}\n`;
    }
    
    message += `\n✨ Confirmado para o casamento de Ana & João! ✨`;
    
    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Cria o link do WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abre o WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Mostra confirmação
    showNotification('Redirecionando para o WhatsApp...', 'success');
    
    // Limpa o formulário após envio
    setTimeout(() => {
        document.getElementById('rsvpForm').reset();
        // Esconde campo de acompanhantes se necessário
        const nomeAcompanhantesField = document.getElementById('nomeAcompanhantes').parentElement;
        if (nomeAcompanhantesField) {
            nomeAcompanhantesField.style.display = 'none';
        }
    }, 2000);
}

// ===== MAPA =====
let map;
let currentMarker;

function openMap(location) {
    const mapContainer = document.getElementById('map');
    
    // Coordenadas dos locais (substitua pelas coordenadas reais)
    const locations = {
        igreja: {
            lat: -23.5505,
            lng: -46.6333,
            name: 'Igreja São José',
            address: 'Rua das Flores, 123 - Centro, São Paulo - SP'
        },
        festa: {
            lat: -23.5489,
            lng: -46.6388,
            name: 'Salão de Festas Jardim',
            address: 'Av. dos Jardins, 456 - Jardins, São Paulo - SP'
        }
    };
    
    const selectedLocation = locations[location];
    
    if (!selectedLocation) {
        console.error('Localização não encontrada');
        return;
    }
    
    // Inicializa o mapa se ainda não foi criado
    if (!map) {
        map = L.map('map').setView([selectedLocation.lat, selectedLocation.lng], 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    } else {
        // Remove marcador anterior
        if (currentMarker) {
            map.removeLayer(currentMarker);
        }
        
        // Centraliza no novo local
        map.setView([selectedLocation.lat, selectedLocation.lng], 15);
    }
    
    // Adiciona marcador
    currentMarker = L.marker([selectedLocation.lat, selectedLocation.lng])
        .addTo(map)
        .bindPopup(`<b>${selectedLocation.name}</b><br>${selectedLocation.address}`)
        .openPopup();
    
    // Anima o scroll até o mapa
    mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===== FUNCIONALIDADES EXTRAS =====

// Copia PIX para clipboard
function copyPix() {
    const pixKey = document.getElementById('pixKey').textContent;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(pixKey).then(() => {
            showNotification('PIX copiado para a área de transferência!', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(pixKey);
        });
    } else {
        fallbackCopyTextToClipboard(pixKey);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('PIX copiado para a área de transferência!', 'success');
    } catch (err) {
        showNotification('Erro ao copiar PIX. Tente selecionar e copiar manualmente.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Adiciona estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Adiciona animações CSS para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ===== EFEITOS ESPECIAIS =====

// Adiciona efeito de partículas de coração no hero
function createHeartParticles() {
    const hero = document.querySelector('.hero-section');
    
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% de chance
            const heart = document.createElement('div');
            heart.innerHTML = '♥';
            heart.style.cssText = `
                position: absolute;
                color: rgba(212, 165, 116, 0.6);
                font-size: ${Math.random() * 20 + 10}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                pointer-events: none;
                animation: floatUp 4s ease-out forwards;
                z-index: 1;
            `;
            
            hero.appendChild(heart);
            
            // Remove após animação
            setTimeout(() => {
                if (heart.parentElement) {
                    heart.remove();
                }
            }, 4000);
        }
    }, 2000);
}

// Adiciona animação de float up para corações
const heartStyles = document.createElement('style');
heartStyles.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyles);

// Inicia efeito de partículas após carregamento
setTimeout(createHeartParticles, 2000);

// ===== UTILITÁRIOS =====

// Debounce para otimizar eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplica debounce ao scroll
const debouncedScroll = debounce(() => {
    // Código de scroll otimizado pode ser adicionado aqui
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===== ACESSIBILIDADE =====

// Adiciona suporte a navegação por teclado
document.addEventListener('keydown', function(e) {
    // ESC fecha menu mobile
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Adiciona foco visível para navegação por teclado
const style = document.createElement('style');
style.textContent = `
    *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    button:focus,
    input:focus,
    select:focus,
    textarea:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

console.log('JavaScript do convite de casamento carregado com sucesso! 💒✨');

