/* ==========================================================================
   FISTA FITNESS - SCHEDULE JAVASCRIPT MODULE
   Controls day of week and category filtering for the weekly timetable
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const dayBtns = document.querySelectorAll('.schedule-day-btn');
  const categorySelect = document.getElementById('categoryFilterSelect');
  const scheduleCards = document.querySelectorAll('.schedule-card');

  let activeDay = 'all';
  let activeCategory = 'all';

  function filterSchedule() {
    scheduleCards.forEach(card => {
      const cardDay = card.getAttribute('data-day');
      const cardCategory = card.getAttribute('data-category');

      const dayMatch = (activeDay === 'all') || (cardDay === activeDay);
      const categoryMatch = (activeCategory === 'all') || (cardCategory === activeCategory);

      if (dayMatch && categoryMatch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Day Filter Buttons
  dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDay = btn.getAttribute('data-day');
      filterSchedule();
    });
  });

  // Category Select Dropdown
  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      activeCategory = categorySelect.value;
      filterSchedule();
    });
  }

  // Reserve Slot Modal Wiring
  const reserveBtns = document.querySelectorAll('.reserve-btn');
  const reserveModal = document.getElementById('reserveModal');
  const selectedSlotText = document.getElementById('selectedSlotText');
  const reserveForm = document.getElementById('reserveForm');

  reserveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const slotInfo = btn.getAttribute('data-class');
      if (selectedSlotText && slotInfo) {
        selectedSlotText.textContent = `Selected: ${slotInfo}`;
      }
      if (reserveModal) {
        reserveModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (reserveModal) reserveModal.classList.remove('open');
      document.body.style.overflow = '';
      reserveForm.reset();
      if (typeof showToast === 'function') {
        showToast('Class slot reserved successfully!', 'success');
      }
    });
  }

});
