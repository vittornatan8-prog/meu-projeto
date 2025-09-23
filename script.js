// ================================
// CONFIGURAÇÕES
// ================================
const NUMERO_WHATSAPP = "5541996436889"; // Coloque aqui o número com DDI + DDD

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

  // Abre/fecha menu ao clicar no botão
  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", (!expanded).toString());
    toggleClasse(menuBtn, "active");
    toggleClasse(nav, "open");
  });

  // Fecha menu ao clicar em um link (mobile)
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

// =================================
// FORMULÁRIO DE CONTATO -> WHATSAPP
// =================================
function initFormContato() {
  const formContato = document.getElementById("formContato");
  const erro = document.getElementById("erroForm");

  if (!formContato) return;

  formContato.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = formContato.nome.value.trim();
    const email = formContato.email.value.trim();
    const objetivo = formContato.objetivo.value.trim();

    const emailok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!nome || !emailok || !objetivo) {
      erro.style.display = "block";
      return;
    }

    erro.style.display = "none";

    // ======== WhatsApp =========
    const mensagem = `Olá, meu nome é ${nome}.%0AEmail: ${email}%0AObjetivo: ${objetivo}%0AMensagem: ${Mensagem}`;
    const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`;

    window.open(link, "_blank"); // abre WhatsApp
    formContato.reset(); // limpa formulário
  });
}

// ================================
// MODAL
// ================================
function initModal() {
  const modal = document.querySelector("#modal");
  const openButtons = document.querySelectorAll(".open-modal");
  const closeButton = document.querySelector("#closeModal");
  const form = document.querySelector("#formAvaliacao");
  const erroMsg = document.querySelector("#erroModal");

  if (!modal) return;

  // Abre modal
  openButtons.forEach(button => {
    button.addEventListener("click", () => {
      modal.showModal();
      if (erroMsg) erroMsg.style.display = "none";
    });
  });

  // Fecha modal no botão "Cancelar"
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      modal.close();
    });
  }

  // Fecha modal ao clicar fora
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

  // Envia formulário para WhatsApp
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      let whatsapp = document.getElementById("contato2").value.trim();
      let cidade = document.getElementById("cidade2").value.trim();
      let horario = document.getElementById("horario2").value.trim();

      if (!whatsapp || !cidade || !horario) {
        if (erroMsg) erroMsg.style.display = "block";
        return;
      }

      if (erroMsg) erroMsg.style.display = "none";

      let mensagem = `*Novo agendamento de avaliação*%0A📱 WhatsApp: ${whatsapp}%0A🏙️ Cidade: ${cidade}%0A⏰ Horário preferido: ${horario}`;
      let url = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`;

      window.open(url, "_blank");
      modal.close();
      form.reset();
    });
  }
}

function enviarWhatsApp(plano, preco, beneficios) {
  // 🔴 Troque este número pelo seu WhatsApp (formato: 55 + DDD + número)
  const telefone = "5541996436889"; 

  // Monta a mensagem com emojis
  let mensagem = `👋 Olá! Tenho interesse no plano *${plano}* (${preco}).\n\n🔥 Benefícios inclusos:`;
  beneficios.forEach(item => {
    mensagem += `\n✅ ${item}`;
  });

  mensagem += `\n\n💪 Quero começar ainda hoje!`;

  // Link do WhatsApp
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  // Abre no WhatsApp Web ou App
  window.open(url, "_blank");
}


// ================================
// INICIALIZAÇÃO
// ================================
document.addEventListener("DOMContentLoaded", () => {
  initMenuMobile();
  initHeaderScroll();
  initFormContato();
  initModal();
});
