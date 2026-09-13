const SUPABASE_URL = "https://ksqtedskvplgwexkuajz.supabase.co";

// WEKA HAPA PUBLISHABLE KEY YAKO ILIYOPO KWENYE SCRIPT YA ZAMANI
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_LdD0uGB_tecjabBv9s2JAQ_II-EEsom";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // REGISTER PAGE
  // =========================

  const registerSubmit = document.getElementById("registerSubmit");

  if (registerSubmit) {
    registerSubmit.addEventListener("click", async () => {

      const nameInput = document.querySelector('input[type="text"]');
      const emailInput = document.querySelector('input[type="email"]');
      const passwordInput = document.querySelector('input[type="password"]');

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";

      if (!name || !email || !password) {
        alert("Tafadhali jaza taarifa zote.");
        return;
      }

      if (password.length < 6) {
        alert("Password iwe na angalau herufi 6.");
        return;
      }

      registerSubmit.disabled = true;
      registerSubmit.textContent = "Inasubiri...";

      const { error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: name
          }
        }
      });

      if (error) {
        alert("Usajili umeshindikana: " + error.message);
        registerSubmit.disabled = false;
        registerSubmit.textContent = "Jisajili Sasa";
        return;
      }

      alert(
        "Akaunti imetengenezwa! 🎉 Angalia email yako kuthibitisha akaunti."
      );

      registerSubmit.disabled = false;
      registerSubmit.textContent = "Jisajili Sasa";
    });
  }


  // =========================
  // HOME PAGE LOGIN MODAL
  // =========================

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
    } else {
      if (modalTitle) modalTitle.textContent = "Jisajili";

      if (modalText) {
        modalText.textContent =
          "Fungua akaunti yako na uanze kujifunza.";
      }
    }

    if (formMessage) formMessage.textContent = "";
  }


  function close() {
    if (!modal) return;

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }


  // MENU
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


  // LOGIN BUTTON
  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      openModal("login");
    });
  }


  // REGISTER BUTTON
  const registerBtn = document.getElementById("registerBtn");

  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      openModal("register");
    });
  }


  // CLOSE MODAL
  if (closeModal) {
    closeModal.addEventListener("click", close);
  }


  if (modal) {
    modal.addEventListener("click", event => {
      if (event.target === modal) {
        close();
      }
    });
  }


  // LOGIN / REGISTER FORM
  if (form) {
    form.addEventListener("submit", async event => {

      event.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');
      const passwordInput = form.querySelector('input[type="password"]');
      const nameInput = form.querySelector('input[type="text"]');

      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";
      const name = nameInput ? nameInput.value.trim() : "";

      const isLogin =
        modalTitle &&
        modalTitle.textContent.includes("Ingia");

      if (!email || !password) {
        if (formMessage) {
          formMessage.textContent = "Tafadhali jaza email na password.";
        }
        return;
      }

      if (formMessage) {
        formMessage.textContent = "Inasubiri...";
      }


      // LOGIN
      if (isLogin) {

        const { error } =
          await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
          });

        if (error) {
          if (formMessage) {
            formMessage.textContent =
              "Imeshindikana: " + error.message;
          }
          return;
        }

        if (formMessage) {
          formMessage.textContent =
            "Umeingia kikamilifu! 🎉";
        }

        return;
      }


      // REGISTER
      if (password.length < 6) {
        if (formMessage) {
          formMessage.textContent =
            "Password iwe na angalau herufi 6.";
        }
        return;
      }

      const { error } =
        await supabaseClient.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: name
            }
          }
        });

      if (error) {
        if (formMessage) {
          formMessage.textContent =
            "Imeshindikana: " + error.message;
        }
        return;
      }

      if (formMessage) {
        formMessage.textContent =
          "Akaunti imetengenezwa! 🎉 Angalia email yako kuthibitisha akaunti.";
      }

    });
  }


  // ACTIVE NAVIGATION
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
