const SUPABASE_URL = "https://ksqtedskvplgwexkuajz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_LdD0uGB_tecjabBv9s2JAQ_II-EEsom";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const menuToggle = document.querySelector(".menu-toggle");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const form = document.getElementById("signupForm");
  const formMessage = document.getElementById("formMessage");

  function openModal(mode = "register") {
    if (!modal) return;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");

    if (mode === "login") {
      if (modalTitle) modalTitle.textContent = "Ingia OBA TZ";
      if (modalText) {
        modalText.textContent =
          "Mfumo wa wanafunzi utakuwezesha kuingia kwenye akaunti yako.";
      }

      if (form) {
        const button = form.querySelector("button");
        if (button) button.textContent = "Endelea";
      }
    } else {
      if (modalTitle) modalTitle.textContent = "Jisajili";
      if (modalText) {
        modalText.textContent =
          "Fungua akaunti yako na uanze kujifunza.";
      }

      if (form) {
        const button = form.querySelector("button");
        if (button) button.textContent = "Tengeneza Akaunti";
      }
    }

    if (formMessage) formMessage.textContent = "";
  }

  function close() {
    if (!modal) return;

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (nav) nav.classList.toggle("open");
    });
  }

  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("open");
    });
  });

  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => openModal("login"));
  }

  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", () => openModal("register"));
  }

  const heroRegister = document.getElementById("heroRegister");
  if (heroRegister) {
    heroRegister.addEventListener("click", () => openModal("register"));
  }

  const ctaRegister = document.getElementById("ctaRegister");
  if (ctaRegister) {
    ctaRegister.addEventListener("click", () => openModal("register"));
  }

  if (closeModal) {
    closeModal.addEventListener("click", close);
  }

  if (modal) {
    modal.addEventListener("click", event => {
      if (event.target === modal) close();
  if (form) {
  form.addEventListener("submit", async event => {
    event.preventDefault();

    const email = form.querySelector('input[type="email"]').value.trim();
    const password = form.querySelector('input[type="password"]').value;
    const name = form.querySelector('input[type="text"]').value.trim();
    const isLogin = modalTitle && modalTitle.textContent.includes("Ingia");

    if (formMessage) formMessage.textContent = "Inasubiri...";

    if (isLogin) {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        formMessage.textContent = "Imeshindikana: " + error.message;
        return;
      }

      formMessage.textContent = "Umeingia kikamilifu! 🎉";
    } else {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });

      if (error) {
        formMessage.textContent = "Imeshindikana: " + error.message;
        return;
      }

      formMessage.textContent =
        "Akaunti imetengenezwa! 🎉 Angalia email yako kuthibitisha akaunti.";
    }
  });
}
       
  }

  const sections = document.querySelectorAll(
    "main section[id], footer[id]"
  );

  const navLinks = document.querySelectorAll(
    'nav a[href^="#"]'
  );

  function setActive() {
    let current = "home";
    const y = window.scrollY + 120;

    sections.forEach(section => {
      if (y >= section.offsetTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );
    });
  }

  window.addEventListener("scroll", setActive, {
    passive: true
  });

  setActive();
});
