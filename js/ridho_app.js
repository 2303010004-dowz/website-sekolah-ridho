document.addEventListener("DOMContentLoaded", () => {
  // 1. Toggle menu navigasi mobile
  const ridhoMenuToggle = document.getElementById("ridho_menu_toggle");
  const ridhoNavList = document.getElementById("ridho_nav_list");

  if (ridhoMenuToggle && ridhoNavList) {
    ridhoMenuToggle.addEventListener("click", () => {
      ridhoNavList.classList.toggle("ridho_menu_open");
    });
  }

  // 2. Fungsi umum untuk filter kartu berdasarkan atribut data-*
  function setupCardFilter(buttonSelector, cardSelector, attrName) {
    const buttons = document.querySelectorAll(buttonSelector);
    const cards = document.querySelectorAll(cardSelector);

    if (buttons.length === 0 || cards.length === 0) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedValue = btn.getAttribute(attrName);

        buttons.forEach((item) => item.classList.remove("ridho_tab_active"));
        btn.classList.add("ridho_tab_active");

        cards.forEach((card) => {
          const cardValue = card.getAttribute(attrName);
          const isMatch = selectedValue === "semua" || selectedValue === cardValue;
          card.style.display = isMatch ? "block" : "none";
        });
      });
    });
  }

  // Aktifkan filter untuk Beranda, Guru, dan Berita
  setupCardFilter(".ridho_home_filter", ".ridho_info_card", "data-filter");
  setupCardFilter(".ridho_guru_filter", ".ridho_guru_card", "data-role");
  setupCardFilter(".ridho_berita_filter", ".ridho_berita_card", "data-news");

  // 3. Validasi & feedback pengiriman pesan di halaman Kontak
  const ridhoContactForm = document.getElementById("ridho_contact_form");
  const ridhoFeedback = document.getElementById("ridho_form_feedback");

  if (ridhoContactForm && ridhoFeedback) {
    const namaInput = document.getElementById("ridho_nama");
    const emailInput = document.getElementById("ridho_email");
    const topikInput = document.getElementById("ridho_topik");
    const pesanInput = document.getElementById("ridho_pesan");

    ridhoContactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nama = namaInput ? namaInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const topik = topikInput ? topikInput.value : "Umum";
      const pesan = pesanInput ? pesanInput.value.trim() : "";

      if (!nama || !email || !pesan) {
        ridhoFeedback.style.display = "block";
        ridhoFeedback.style.backgroundColor = "#fee2e2";
        ridhoFeedback.style.color = "#991b1b";
        ridhoFeedback.style.borderColor = "#fca5a5";
        ridhoFeedback.textContent = "Mohon lengkapi nama, email, dan isi pesan terlebih dahulu.";
        return;
      }

      ridhoFeedback.style.display = "block";
      ridhoFeedback.style.backgroundColor = "#dcfce7";
      ridhoFeedback.style.color = "#166534";
      ridhoFeedback.style.borderColor = "#86efac";
      ridhoFeedback.textContent = `Terima kasih, ${nama}. Pesan Anda mengenai "${topik}" sudah tercatat di halaman ini.`;
      ridhoContactForm.reset();
    });
  }
});