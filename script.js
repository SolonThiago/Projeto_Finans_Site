// Inicialização do AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa AOS com configurações personalizadas
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Validações de formulários
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('signupEmail').value;
      const emailFeedback = document.getElementById('emailFeedback');
      
      if (validateEmail(email)) {
        emailFeedback.textContent = "Email válido! Obrigado por se cadastrar.";
        emailFeedback.className = "form-text text-white mt-2";
        signupForm.reset();
        // Aqui você adicionaria código para enviar o email para o servidor
      } else {
        emailFeedback.textContent = "Por favor, insira um email válido.";
        emailFeedback.className = "form-text text-warning mt-2";
      }
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Simular login bem-sucedido (em produção, você faria uma chamada AJAX para o servidor)
      const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      modal.hide();
      alert('Login simulado com sucesso!');
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Obrigado por se inscrever na nossa newsletter!');
      newsletterForm.reset();
    });
  }

  // Suavização de rolagem para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') !== '#' && !anchor.hasAttribute('data-bs-toggle')) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Ajuste para o header fixo
            behavior: 'smooth'
          });
        }
      });
    }
  });

  // Contador de anos em operação (para propósitos de demonstração)
  const yearCounter = document.getElementById('year-counter');
  if (yearCounter) {
    const startYear = 2020; // Ano de fundação hipotético
    const currentYear = new Date().getFullYear();
    const yearsInOperation = currentYear - startYear;
    
    if (yearsInOperation > 0) {
      yearCounter.textContent = `${yearsInOperation} anos transformando finanças pessoais`;
    } else {
      yearCounter.textContent = "Transformando finanças pessoais";
    }
  }

  // Adiciona classe ativa ao item de navegação com base na seção visível
  window.addEventListener('scroll', updateActiveNavItem);
  updateActiveNavItem(); // Chama uma vez ao carregar a página
});

// Função para validar formato de email
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Função para atualizar o item de navegação ativo com base na seção visível
function updateActiveNavItem() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100; // Ajuste para trigger um pouco antes

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        navLink.classList.add('active');
      }
    }
  });
}