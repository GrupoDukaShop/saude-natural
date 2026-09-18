// ==========================================================================
// APP.JS — Kit Sabedoria Natural (landing page)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Barra de progresso de leitura ---------- */
  const progressBar = document.getElementById('scrollProgressBar');
  function updateProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- Botão flutuante "voltar ao topo" ---------- */
  const topBtn = document.getElementById('scrollToTop');
  function updateTopBtn() {
    if (!topBtn) return;
    if (window.scrollY > 500) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', updateTopBtn, { passive: true });
  updateTopBtn();
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll(
    '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
  );
  if ('IntersectionObserver' in window && revealEls.length) {
    document.documentElement.classList.add('has-scroll-anim');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          setTimeout(() => entry.target.classList.add('reveal-completed'), 800);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((i) => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

});
