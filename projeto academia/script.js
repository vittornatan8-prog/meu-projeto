 
    // Ano no rodapé
    document.getElementById('ano').textContent = new Date().getFullYear();

    // Menu mobile
    const btnToggle = document.querySelector('.menu-toggle');
    const links = document.getElementById('menuLinks');
    btnToggle.addEventListener('click', () => links.classList.toggle('open'));

    // Modal
    const modal = document.getElementById('modal');
    const openers = document.querySelectorAll('#openModal, #openModal2, .open-modal');
    const closeModal = document.getElementById('closeModal');
    const cancelar = document.getElementById('cancelar');
    openers.forEach(b => b.addEventListener('click', () => modal.showModal()));
    [closeModal, cancelar].forEach(b => b.addEventListener('click', () => modal.close()));

    // Validação formulário contato
    const formContato = document.getElementById('formContato');
    formContato.addEventListener('submit', (e)=>{
      e.preventDefault();
      const nome = formContato.nome.value.trim();
      const email = formContato.email.value.trim();
      const objetivo = formContato.objetivo.value;
      const erro = document.getElementById('erroForm');
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if(!nome || !emailOk || !objetivo){
        erro.style.display = 'block';
        return;
      }
      erro.style.display = 'none';
      alert('Obrigado! Em breve entrarei em contato.');
      formContato.reset();
    });

    // Validação modal
    const formAvaliacao = document.getElementById('formAvaliacao');
    formAvaliacao.addEventListener('submit', (e)=>{
      e.preventDefault();
      const ok = ['nome2','contato2','cidade2','horario2'].every(id => document.getElementById(id).value.trim());
      const erro = document.getElementById('erroModal');
      if(!ok){ erro.style.display='block'; return; }
      erro.style.display='none';
      modal.close();
      // Simule envio para WhatsApp com dados
      const nome = document.getElementById('nome2').value.trim();
      const whats = document.getElementById('contato2').value.trim();
      const cidade = document.getElementById('cidade2').value.trim();
      const horario = document.getElementById('horario2').value.trim();
      const msg = encodeURIComponent(`Olá! Gostaria de agendar avaliação.\nNome: ${nome}\nWhatsApp: ${whats}\nCidade: ${cidade}\nHorário: ${horario}`);
      window.open(`https://wa.me/5500000000000?text=${msg}`, '_blank');
    });
    
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

