/* ==========================================================================
   FISTA FITNESS - MAIN JAVASCRIPT MODULE
   Controls theme switching, navigation drawer, modals, pricing toggle, & toasts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Theme Switcher (Dark / Light Mode)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlEl = document.documentElement;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('fista_theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('fista_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      if (theme === 'light') {
        icon.className = 'fa-solid fa-sun';
      } else {
        icon.className = 'fa-solid fa-moon';
      }
    }
  }

  /* --------------------------------------------------------------------------
     2. Mobile Drawer Navigation
     -------------------------------------------------------------------------- */
  const mobileMenuOpen = document.getElementById('mobileMenuOpen');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('open');
      drawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuOpen) mobileMenuOpen.addEventListener('click', openDrawer);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  /* --------------------------------------------------------------------------
     3. Pricing Toggle Switch (Monthly vs Yearly)
     -------------------------------------------------------------------------- */
  const pricingToggle = document.getElementById('pricingToggle');
  const pricePro = document.getElementById('pricePro');
  const periodPro = document.getElementById('periodPro');
  const priceVip = document.getElementById('priceVip');
  const periodVip = document.getElementById('periodVip');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      if (pricingToggle.checked) {
        // Yearly Billing (20% discount applied)
        if (pricePro) pricePro.textContent = '$39';
        if (periodPro) periodPro.textContent = 'per month (billed annually)';
        if (priceVip) priceVip.textContent = '$71';
        if (periodVip) periodVip.textContent = 'per month (billed annually)';
        showToast('20% Annual Discount Applied!', 'success');
      } else {
        // Monthly Billing
        if (pricePro) pricePro.textContent = '$49';
        if (periodPro) periodPro.textContent = 'per month';
        if (priceVip) priceVip.textContent = '$89';
        if (periodVip) periodVip.textContent = 'per month';
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Universal Modal Controls
     -------------------------------------------------------------------------- */
  const openModalBtns = document.querySelectorAll('.open-modal-btn, .signup-plan-btn');
  const modals = document.querySelectorAll('.modal');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModalId = btn.getAttribute('data-modal') || 'signupModal';
      const targetModal = document.getElementById(targetModalId) || document.getElementById('signupModal');

      if (targetModal) {
        // Pre-fill selected class or plan title if available
        const selectedClass = btn.getAttribute('data-class');
        const selectedPlan = btn.getAttribute('data-plan');

        if (selectedClass) {
          const hiddenClassInput = document.getElementById('selectedClassName');
          if (hiddenClassInput) hiddenClassInput.value = selectedClass;
        }

        if (selectedPlan) {
          const selectedPlanTitle = document.getElementById('selectedPlanTitle');
          if (selectedPlanTitle) selectedPlanTitle.textContent = `Selected Plan: ${selectedPlan}`;
        }

        targetModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  /* --------------------------------------------------------------------------
     5. Form Handlers & Confirmation Toasts
     -------------------------------------------------------------------------- */

  // Home Quick BMI Form
  const quickBmiForm = document.getElementById('quickBmiForm');
  if (quickBmiForm) {
    quickBmiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const h = parseFloat(document.getElementById('bmiHeight').value) / 100;
      const w = parseFloat(document.getElementById('bmiWeight').value);
      if (h > 0 && w > 0) {
        const bmi = (w / (h * h)).toFixed(1);
        const resultBox = document.getElementById('quickBmiResult');
        const bmiVal = document.getElementById('bmiVal');
        const bmiCat = document.getElementById('bmiCategory');

        if (bmiVal) bmiVal.textContent = bmi;

        let cat = 'Normal weight';
        if (bmi < 18.5) cat = 'Underweight';
        else if (bmi >= 25 && bmi < 29.9) cat = 'Overweight';
        else if (bmi >= 30) cat = 'Obese';

        if (bmiCat) bmiCat.textContent = cat;
        if (resultBox) resultBox.style.display = 'block';
      }
    });
  }

  // Class Booking Form
  const bookClassForm = document.getElementById('bookClassForm');
  if (bookClassForm) {
    bookClassForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modal = document.getElementById('bookClassModal');
      if (modal) modal.classList.remove('open');
      document.body.style.overflow = '';
      bookClassForm.reset();
      showToast('Free Class Trial Pass reserved successfully!', 'success');
    });
  }

  // Membership Signup Form
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modal = document.getElementById('signupModal');
      if (modal) modal.classList.remove('open');
      document.body.style.overflow = '';
      signupForm.reset();
      showToast('Welcome to Fista Fitness! Signup confirmation sent.', 'success');
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.reset();
      showToast('Thank you! Your message has been sent.', 'success');
    });
  }

  // Newsletter Form
  const blogNewsletterForm = document.getElementById('blogNewsletterForm');
  if (blogNewsletterForm) {
    blogNewsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      blogNewsletterForm.reset();
      showToast('Subscribed to Fista Fitness Newsletter!', 'success');
    });
  }

  /* --------------------------------------------------------------------------
     6. Accordion FAQ Controls
     -------------------------------------------------------------------------- */
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        accordionItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

});

/* --------------------------------------------------------------------------
   7. Global Toast Notification Helper
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-exclamation';

  toast.innerHTML = `<i class="fa-solid ${icon}" style="color: var(--primary);"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
