// --- Navbar scroll efekti ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 20);
});

// --- Mobil menü ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// --- ROI Hesaplayıcı ---
const calcBtn = document.getElementById('calcBtn');
const resultBox = document.getElementById('calcResult');

calcBtn.addEventListener('click', () => {
  const emp = parseFloat(document.getElementById('emp').value) || 0;
  const salary = parseFloat(document.getElementById('salary').value) || 0;
  const revenue = parseFloat(document.getElementById('revenue').value) || 0;

  const personnelSaving = emp * salary * 0.18 * 12;
  const stockSaving = revenue * 0.02 * 12;
  const revenueGain = revenue * 0.03 * 12;
  const totalYear = personnelSaving + stockSaving + revenueGain;

  const fmt = n => '₺' + Math.round(n).toLocaleString('tr-TR');

  resultBox.innerHTML = `
    <div>
      <p>Yıllık tahmini tasarruf</p>
      <h3>${fmt(totalYear)}</h3>
      <p>Personel verimliliği: <strong>${fmt(personnelSaving)}</strong><br>
         Stok tasarrufu: <strong>${fmt(stockSaving)}</strong><br>
         Ciro artışı: <strong>${fmt(revenueGain)}</strong></p>
      <p style="margin-top:14px;font-size:.8rem;opacity:.7;">
        * Ortalama proje sonuçlarına dayalı tahmindir.
      </p>
    </div>
  `;
});

// --- Scroll animasyonu ---
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.bento__card, .feature, .case, .calc, .contact__left, .contact__form, .process__step, .testimonial, .faq__item')
  .forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(el);
  });

// --- Formspree İletişim Formu ---
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = new FormData(contactForm);
    formStatus.textContent = '⏳ Gönderiliyor...';
    formStatus.style.color = 'var(--muted)';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = '✅ Teşekkürler! En kısa sürede size ulaşacağız.';
        formStatus.style.color = 'var(--accent-2)';
        contactForm.reset();
      } else {
        const result = await response.json();
        formStatus.textContent = '❌ Bir hata oluştu. Lütfen tekrar deneyin.';
        formStatus.style.color = '#ff6b6b';
        console.error('Formspree hatası:', result);
      }
    } catch (error) {
      formStatus.textContent = '❌ Bağlantı hatası. Lütfen tekrar deneyin.';
      formStatus.style.color = '#ff6b6b';
      console.error(error);
    }
  });
}
