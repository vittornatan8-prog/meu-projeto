// ================================
// CONFIGURAÇÕES
// ================================
const NUMERO_WHATSAPP = "5585980000000"; // Coloque aqui o número com DDI + DDD

// ================================
// UTILITÁRIOS
// ================================
function setAno(idElemento) {
  const el = document.getElementById(idElemento);
  if (el) el.textContent = new Date().getFullYear();
}

function toggleClasse(el, classe) {
  el.classList.toggle(classe);
}

// ================================
// MENU MOBILE
// ================================
function initMenuMobile() {
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("main-nav");

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", (!expanded).toString());
    toggleClasse(menuBtn, "active");
    toggleClasse(nav, "open");
  });

  // Fecha menu ao clicar em link (mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width:900px)").matches) {
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.classList.remove("active");
        nav.classList.remove("open");
      }
    });
  });
}

// ================================
// HEADER COM FUNDO AO ROLAR
// ================================
function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // inicial
}

// ================================
// FORMULÁRIO DE CONTATO
// ================================
function initFormContato() {
  const formContato = document.getElementById("formContato");
  const erro = document.getElementById("erroForm");

  if (!formContato) return;

  formContato.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = formContato.nome.value.trim();
    const email = formContato.email.value.trim();
    const objetivo = formContato.objetivo.value;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!nome || !emailOk || !objetivo) {
      erro.style.display = "block";
      return;
    }

    erro.style.display = "none";
    alert("Obrigado! Em breve entrarei em contato.");
    formContato.reset();
  });
}
// ================================
// MODAL
// ================================
function initModal() {
  const modal = document.getElementById("modal");
  const openButtons = document.querySelectorAll(".open-modal");
  const closeButtons = document.querySelectorAll(".close-modal");

  if (!modal) return;

  // Abre modal ao clicar nos botões
  openButtons.forEach(button => {
    button.addEventListener("click", () => {
      modal.showModal();
    });
  });

  // Fecha modal ao clicar nos botões com classe "close-modal"
  closeButtons.forEach(button => {
    button.addEventListener("click", () => {
      modal.close();
    });
  });

  // Fecha modal ao clicar fora dele
  modal.addEventListener("click", (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });
}

// ================================
// FORMULÁRIO DE AVALIAÇÃO (MODAL)
// ================================
function initFormAvaliacao() {
  const form = document.getElementById("formAvaliacao");
  const modal = document.getElementById("modal");
  const erro = document.getElementById("erroModal");

  if (!form || !modal) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome2").value.trim();
    const whats = document.getElementById("contato2").value.trim();
    const cidade = document.getElementById("cidade2").value.trim();
    const horario = document.getElementById("horario2").value.trim();

    // Validação básica
    if (!nome || !whats || !cidade || !horario) {
      erro.style.display = "block";
      return;
    }
    erro.style.display = "none";

    // Validação telefone
    const regexTelefone = /^(\(\d{2}\)\s?)?\d{4,5}-?\d{4}$/;
    if (!regexTelefone.test(whats)) {
      alert("Digite um WhatsApp válido! Ex: (99) 99999-9999");
      return;
    }

    // Monta mensagem
    const texto = encodeURIComponent(
      `📌 *Novo Agendamento*\n\n` +
      `👤 *Nome:* ${nome}\n` +
      `📱 *WhatsApp:* ${whats}\n` +
      `🏙️ *Cidade:* ${cidade}\n` +
      `⏰ *Horário:* ${horario}\n\n` +
      `➡️ Solicitação enviada via formulário do site.`
    );

    // Defina aqui o número de destino do WhatsApp (somente números com DDD e DDI)
    const NUMERO_WHATSAPP = "5599999999999";

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${texto}`;

    // Fecha modal, reseta e abre WhatsApp
    modal.close();
    form.reset();
    window.open(url, "_blank");
  });
}

// ================================
// INICIALIZAÇÃO
// ================================
document.addEventListener("DOMContentLoaded", () => {
  initModal();
  initFormAvaliacao();
});
