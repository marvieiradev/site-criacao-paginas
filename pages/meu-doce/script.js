// ===== CONFIGURAÇÕES GLOBAIS =====
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }

  // Inicializar todas as funcionalidades
  initThemeToggle();
  initMobileMenu();
  initSmoothScrolling();
  initWhatsAppForm();
  initScrollEffects();
  initMenuItemAnimations();
  initParallaxEffects();
});

// ===== SISTEMA DE TEMAS =====
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeText = document.querySelector(".theme-text");
  const body = document.body;

  // Verificar tema salvo no localStorage
  const savedTheme = localStorage.getItem("theme") || "chocolate";
  setTheme(savedTheme);

  themeToggle.addEventListener("click", function () {
    const currentTheme = body.getAttribute("data-theme") || "chocolate";
    const newTheme = currentTheme === "chocolate" ? "strawberry" : "chocolate";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Animação do botão
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });

  function setTheme(theme) {
    if (theme === "strawberry") {
      body.setAttribute("data-theme", "strawberry");
      themeToggle.querySelector("img").src = "images/chocolate.svg";
    } else {
      body.removeAttribute("data-theme");
      themeToggle.querySelector("img").src = "images/morango.svg";
    }

    // Animação de transição suave
    body.style.transition = "all 0.5s ease";
    setTimeout(() => {
      body.style.transition = "";
    }, 500);
  }
}

// ===== MENU MOBILE =====
function initMobileMenu() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");

    // Prevenir scroll quando menu está aberto
    if (navMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Fechar menu ao clicar em um link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener("click", function (e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ===== SCROLL SUAVE =====
function initSmoothScrolling() {
  // Função para scroll suave para seções
  window.scrollToSection = function (sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const sectionTop = section.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  };

  // Aplicar scroll suave a todos os links de navegação
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      scrollToSection(targetId);
    });
  });
}

// ===== EFEITOS DE SCROLL =====
function initScrollEffects() {
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Header com fundo sólido ao rolar
    if (scrollTop > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }

    // Esconder/mostrar header ao rolar
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Destacar link ativo na navegação
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

// ===== FORMULÁRIO WHATSAPP =====
function initWhatsAppForm() {
  const form = document.getElementById("whatsapp-form");
  const whatsappNumber = "5511999999999"; // Substitua pelo número real

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validação básica
    if (!name || !phone || !message) {
      showNotification("Por favor, preencha todos os campos!", "error");
      return;
    }

    // Validação de telefone (formato brasileiro básico)
    const phoneRegex = /^[\d\s\(\)\-\+]+$/;
    if (!phoneRegex.test(phone)) {
      showNotification("Por favor, insira um telefone válido!", "error");
      return;
    }

    // Criar mensagem para WhatsApp
    const whatsappMessage =
      `Olá! Meu nome é ${name}.%0A%0A` +
      `Telefone: ${phone}%0A%0A` +
      `Mensagem: ${message}%0A%0A` +
      `Enviado através do site Meu Doce.`;

    // Criar URL do WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    // Abrir WhatsApp
    window.open(whatsappURL, "_blank");

    // Limpar formulário
    form.reset();
    showNotification("Redirecionando para o WhatsApp...", "success");
  });
}

// ===== ANIMAÇÕES DOS ITENS DO MENU =====
function initMenuItemAnimations() {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item, index) => {
    // Animação de entrada escalonada
    item.style.animationDelay = `${index * 0.1}s`;

    // Efeito hover personalizado
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });

    // Animação do preço
    const price = item.querySelector(".price");
    if (price) {
      item.addEventListener("mouseenter", function () {
        price.style.transform = "scale(1.1)";
        price.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
      });

      item.addEventListener("mouseleave", function () {
        price.style.transform = "scale(1)";
        price.style.boxShadow = "none";
      });
    }
  });
}

// ===== EFEITOS PARALLAX =====
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll(
    ".floating-image, .hero-section::before"
  );

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    parallaxElements.forEach((element) => {
      if (element.classList.contains("floating-image")) {
        element.style.transform = `translateY(${rate}px)`;
      }
    });
  });
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
function showNotification(message, type = "info") {
  // Remover notificação existente
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Criar nova notificação
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

  // Estilos da notificação
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

  notification.querySelector(".notification-content").style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;

  document.body.appendChild(notification);

  // Animar entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remover após 4 segundos
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 4000);
}

function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle";
    case "error":
      return "fa-exclamation-circle";
    case "warning":
      return "fa-exclamation-triangle";
    default:
      return "fa-info-circle";
  }
}

function getNotificationColor(type) {
  switch (type) {
    case "success":
      return "#4CAF50";
    case "error":
      return "#F44336";
    case "warning":
      return "#FF9800";
    default:
      return "#2196F3";
  }
}

// ===== LAZY LOADING DE IMAGENS =====
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ===== CONTADOR ANIMADO =====
function initCounterAnimation() {
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target);
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          counter.textContent = Math.floor(current);

          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          }
        }, 16);

        counterObserver.unobserve(counter);
      }
    });
  });

  counters.forEach((counter) => counterObserver.observe(counter));
}

// ===== BOTÃO VOLTAR AO TOPO =====
function initBackToTop() {
  // Criar botão
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = "back-to-top";
  backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: 2px solid white;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px var(--shadow-color);
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

  document.body.appendChild(backToTopBtn);

  // Mostrar/esconder botão baseado no scroll
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.transform = "translateY(0)";
    } else {
      backToTopBtn.style.transform = "translateY(100px)";
    }
  });

  // Funcionalidade do botão
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Efeito hover
  backToTopBtn.addEventListener("mouseenter", () => {
    backToTopBtn.style.transform += " scale(1.1)";
  });

  backToTopBtn.addEventListener("mouseleave", () => {
    backToTopBtn.style.transform = backToTopBtn.style.transform.replace(
      " scale(1.1)",
      ""
    );
  });
}

// ===== INICIALIZAR FUNCIONALIDADES ADICIONAIS =====
document.addEventListener("DOMContentLoaded", function () {
  initLazyLoading();
  initCounterAnimation();
  initBackToTop();
});

// ===== PERFORMANCE E OTIMIZAÇÃO =====
// Debounce para eventos de scroll
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

// Aplicar debounce aos eventos de scroll
const debouncedScrollHandler = debounce(() => {
  // Handlers de scroll otimizados aqui
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// ===== ACESSIBILIDADE =====
// Navegação por teclado
document.addEventListener("keydown", function (e) {
  // ESC para fechar menu mobile
  if (e.key === "Escape") {
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");

    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
});

// Anunciar mudanças de tema para leitores de tela
function announceThemeChange(theme) {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
  announcement.textContent = `Tema alterado para ${theme}`;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// ===== TRATAMENTO DE ERROS =====
window.addEventListener("error", function (e) {
  console.error("Erro JavaScript:", e.error);
  // Em produção, você pode enviar erros para um serviço de monitoramento
});

// ===== CONFIGURAÇÕES FINAIS =====
// Prevenir zoom em inputs no iOS
document.addEventListener("touchstart", function () {}, true);

// Melhorar performance em dispositivos móveis
if ("ontouchstart" in window) {
  document.body.classList.add("touch-device");
}
