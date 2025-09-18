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
    const numeroWhats = "5541996436889"; // Coloque o número do autor (código do país + DDD + número)
    const mensagem = `Olá, meu nome é ${nome}.%0AEmail: ${email}%0AObjetivo: ${objetivo}`;

    const link = `https://wa.me/${numeroWhats}?text=${mensagem}`;

    // Abre o WhatsApp com a mensagem
    window.open(link, "_blank");

    // Limpa o formulário
    formContato.reset();
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
      if (erroMsg) erroMsg.style.display = "none"; // esconde erro ao abrir
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

      // Verificação simples
      if (!whatsapp || !cidade || !horario) {
        if (erroMsg) {
          erroMsg.style.display = "block"; // mostra mensagem de erro
        }
        return; // não envia
      }

      // Oculta mensagem de erro se os campos estiverem ok
      if (erroMsg) erroMsg.style.display = "none";

      // Seu número (formato: 55 + DDD + número)
      let telefone = "5541996436889";

      let mensagem = `*Novo agendamento de avaliação*%0A
📱 WhatsApp: ${whatsapp}%0A
🏙️ Cidade: ${cidade}%0A
⏰ Horário preferido: ${horario}`;

      let url = `https://wa.me/${telefone}?text=${mensagem}`;

      window.open(url, "_blank"); // Abre WhatsApp
      modal.close(); // Fecha modal depois de enviar
      form.reset(); // Limpa o formulário
    });
  }
}

initModal();


// ================================
// INICIALIZAÇÃO
// ================================

document.addEventListener("DOMContentLoaded", () => {
  initModal();
  initFormContato();
  initMenuMobile(); // ✅ ativa o menu mobile

  // DEBUG para ver se os botões aparecem no mobile
  const botoes = document.querySelectorAll(".btn-assinar");
  console.log("Botões encontrados:", botoes.length);

  botoes.forEach((btn, i) => {
    console.log(`Botão ${i + 1}:`, btn.innerText);
  });
});


  // Número do autor no formato internacional (ex: Brasil 55 + DDD + número)
  const numeroAutor = "5541996436889";

  document.querySelectorAll(".btn-assinar").forEach(button => {
    button.addEventListener("click", function() {
      const card = this.closest(".card");

      const nomePlano = card.querySelector("h3").innerText;
      const preco = card.querySelector(".price").innerText + " " + card.querySelector(".period").innerText;
      
      const beneficios = Array.from(card.querySelectorAll("ul li"))
        .map(li => "- " + li.innerText)
        .join("%0A");

    });
  });

  function enviarWhatsApp(nomePlano, preco, beneficios) {
  const numero = "5541996436889"; // <- Coloque aqui o número do autor (55 + DDD + número)
  const beneficiosTexto = beneficios.map(b => `- ${b}`).join('%0A'); 
  const mensagem = `Olá! Quero assinar o plano *${nomePlano}*%0APreço: ${preco}%0A%0A*Benefícios:*%0A${beneficiosTexto}`;
  
  const url = `https://wa.me/${numero}?text=${mensagem}`;
  window.open(url, "_blank");}

function initMenuMobile() {
  const btnMenu = document.querySelector(".menu-toggle");
  const menuLinks = document.getElementById("menuLinks");

  if (!btnMenu || !menuLinks) return;

  btnMenu.addEventListener("click", () => {
    menuLinks.classList.toggle("ativo"); // alterna a classe ativo
  });
}

