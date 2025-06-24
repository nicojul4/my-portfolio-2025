// Struktur yang Benar: Hanya satu DOMContentLoaded untuk semua logika
document.addEventListener("DOMContentLoaded", function () {
  // ===== FUNGSI BARU UNTUK MEMUTAR ANIMASI BARS (REUSABLE) =====
  function playBarsAnimation() {
    const barsBox = document.querySelector(".bars-box");
    if (!barsBox) return; // Hentikan jika elemen tidak ditemukan

    // 1. Paksa elemen untuk ditampilkan kembali dan reset class 'active'
    barsBox.style.display = "flex";
    barsBox.classList.remove("active");

    // 2. Beri jeda sangat singkat (penting!) sebelum menambahkan class 'active' lagi
    //    agar browser mengenali ini sebagai animasi baru.
    setTimeout(() => {
      barsBox.classList.add("active");
    }, 10); // 10 milidetik

    // 3. Setelah animasi selesai, sembunyikan kembali elemen bars
    //    Durasi total animasi sekitar 1.1 detik, kita beri buffer menjadi 1.5 detik.
    setTimeout(() => {
      barsBox.style.display = "none";
    }, 1500);
  }
  // ===== AKHIR DARI FUNGSI BARU =====

  // ===== KODE JAM DIGITAL (TETAP ADA) =====
  const clockElement = document.getElementById("clock");
  if (clockElement) {
    function updateClock() {
      const now = new Date();
      // Menggunakan zona waktu Asia/Jakarta untuk WIB
      const timeString = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      clockElement.textContent = timeString + " WIB";
    }
    // Memperbarui jam setiap detik
    setInterval(updateClock, 1000);
    // Memanggil fungsi sekali saat halaman dimuat agar tidak ada jeda
    updateClock();
  }
  // ===== AKHIR DARI KODE JAM DIGITAL =====

  // 1. LOGIKA UNTUK TYPING TEXT ANIMATION (TETAP ADA)
  const textElement = document.querySelector(".typing-text");
  if (textElement) {
    const words = [
      "Frontend Developer",
      "Pentester",
      "Backend Developer",
      "UI/UX Designer",
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
      } else {
        const typingSpeed = isDeleting ? 100 : 200;
        setTimeout(type, typingSpeed);
      }
    }
    type();
  }

  // ===== PERUBAHAN PADA LOGIKA NAVIGASI =====
  const navLinks = document.querySelectorAll("header nav a");
  const logoLink = document.querySelector(".logo");
  const sections = document.querySelectorAll("section");

  const activePage = () => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
  };

  // Fungsi untuk mengaktifkan section sesuai id
  function activateSection(sectionId) {
    sections.forEach((section) => {
      if (section.id === sectionId) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });
  }

  // Event listener asli untuk navigasi (disimpan untuk fungsi dasarnya)
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Hindari scroll default

      if (!link.classList.contains("active")) {
        activePage();
        link.classList.add("active");
      }
      const sectionId = link.getAttribute("href").replace("#", "");
      activateSection(sectionId);
    });
  });

  logoLink.addEventListener("click", (e) => {
    e.preventDefault();

    if (!navLinks[0].classList.contains("active")) {
      activePage();
      navLinks[0].classList.add("active");
    }
    // Logo selalu ke home
    activateSection("home");
  });
  // ===== AKHIR PERUBAHAN PADA LOGIKA NAVIGASI =====

  // 2. LOGIKA UNTUK TOMBOL RESUME (TETAP ADA)
  const resumeBtns = document.querySelectorAll(".resume-btn");
  resumeBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      const resumeDetails = document.querySelectorAll(".resume-detail");
      resumeBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");

      resumeDetails.forEach((detail) => {
        detail.classList.remove("active");
      });
      resumeDetails[idx].classList.add("active");
    });
  });

  // 3. LOGIKA UNTUK SLIDER PORTOFOLIO (TETAP ADA)
  const portfolioContainer = document.querySelector(".portfolio-container");
  if (portfolioContainer) {
    // Pastikan container ada sebelum menjalankan kode
    const imgSlide = portfolioContainer.querySelector(".img-slide");
    const imgItems = portfolioContainer.querySelectorAll(".img-item");
    const arrowLeft = portfolioContainer.querySelector(".arrow-left");
    const arrowRight = portfolioContainer.querySelector(".arrow-right");
    const portfolioDetails =
      portfolioContainer.querySelectorAll(".portfolio-detail");
    // Penambahan Variabel Tombol Baru
    const portfolioButtons = portfolioContainer.querySelectorAll(
      ".portfolio-button-container .view-website-btn"
    );

    if (
      imgSlide &&
      imgItems.length > 0 &&
      arrowLeft &&
      arrowRight &&
      portfolioButtons.length > 0
    ) {
      let currentIndex = 0;
      const totalSlides = imgItems.length;

      function showSlide(index) {
        imgSlide.style.transform = `translateX(-${index * 100}%)`;

        portfolioDetails.forEach((detail, i) => {
          detail.classList.remove("active");
          if (i === index) {
            detail.classList.add("active");
          }
        });

        // Penambahan Logika untuk Tombol Baru
        portfolioButtons.forEach((button, i) => {
          button.classList.remove("active");
          if (i === index) {
            button.classList.add("active");
          }
        });
      }

      arrowRight.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex >= totalSlides) {
          currentIndex = 0;
        }
        showSlide(currentIndex);
      });

      arrowLeft.addEventListener("click", () => {
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = totalSlides - 1;
        }
        showSlide(currentIndex);
      });

      // Tampilkan slide & detail & tombol pertama saat halaman dimuat
      showSlide(0);
    }
  }

  // Initialize EmailJS
  (function () {
    // TODO: Replace this with your EmailJS public key from:
    // https://dashboard.emailjs.com/admin/integration
    emailjs.init("DB2dxP2XaQvQ10i7A");
  })();

  // Contact Form Handler
  const contactForm = document.getElementById("contactForm");
  const alertBox = document.getElementById("alert");
  const submitBtn = document.getElementById("submitBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Disable submit button while sending
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      // Clear previous alerts
      alertBox.className = "alert";
      alertBox.textContent = "";

      // Get form data
      const formData = {
        to_name: "Nicolas Julian", // Nama penerima (Anda)
        from_name: document.getElementById("fullName").value,
        reply_to: document.getElementById("email").value,
        phone_number: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // Basic validation
      if (!formData.from_name || !formData.reply_to || !formData.message) {
        showAlert("Please fill in all required fields.", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.reply_to)) {
        showAlert("Please enter a valid email address.", "error");
        return;
      }

      // Phone validation (optional)
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (formData.phone_number && !phoneRegex.test(formData.phone_number)) {
        showAlert("Please enter a valid phone number.", "error");
        return;
      }

      // TODO: Replace SERVICE_ID and TEMPLATE_ID with your EmailJS credentials from:
      // https://dashboard.emailjs.com/admin
      emailjs
        .send("service_oxpgnij", "template_4cn3qok", formData)
        .then(function (response) {
          showAlert(
            "Message sent successfully! I will get back to you soon.",
            "success"
          );
          contactForm.reset();
        })
        .catch(function (error) {
          console.error("EmailJS Error:", error);
          showAlert("Failed to send message. Please try again later.", "error");
        })
        .finally(function () {
          // Re-enable submit button
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        });
    });
  }

  // Helper function to show alerts
  function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";

    // Auto hide success messages after 5 seconds
    if (type === "success") {
      setTimeout(() => {
        alertBox.className = "alert";
        alertBox.textContent = "";
      }, 5000);
    }
  }

  // =================================================================
  // PENAMBAHAN BARU: LOGIKA UNTUK MENU ICON DAN NAVIGASI MOBILE
  // =================================================================
  const menuIcon = document.getElementById("menu-icon");
  const nav = document.querySelector("header nav");

  // Fungsi untuk menutup mobile menu jika terbuka
  const closeMobileMenu = () => {
    if (nav.classList.contains("active")) {
      menuIcon.classList.remove("fa-xmark"); // Ganti ikon kembali ke bars
      nav.classList.remove("active");
    }
  };

  // Event listener untuk ikon hamburger (membuka/menutup menu)
  if (menuIcon && nav) {
    menuIcon.addEventListener("click", () => {
      menuIcon.classList.toggle("fa-xmark");
      nav.classList.toggle("active");
    });
  }

  // Tambahkan event listener ke setiap link di nav untuk menutup menu setelah diklik
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Panggil fungsi animasi bar dan tutup menu
      playBarsAnimation();
      closeMobileMenu();
    });
  });

  // Tambahkan event listener ke logo untuk menutup menu setelah diklik
  logoLink.addEventListener("click", () => {
    // Panggil fungsi animasi bar dan tutup menu
    playBarsAnimation();
    closeMobileMenu();
  });
});
