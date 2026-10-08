document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTS
  ========================================= */

  const loginForm = document.getElementById("loginForm");

  const emailInput = loginForm
    ? loginForm.querySelector('input[type="email"]')
    : null;

  const passwordInput = document.getElementById("password");

  const passwordToggle = document.getElementById("pwdToggle");

  const rememberMe = document.querySelector(
    '.check input[type="checkbox"]'
  );

  const roleButtons = document.querySelectorAll(".role-card");

  const roleSlider = null;

  const titleText = document.querySelector(".login-box h1");

  const subtitleText = document.querySelector(".login-sub");

  const roleName = null;

  const formMessage = document.getElementById("loginError");

  const submitButton = document.querySelector(".login-btn");

  const restaurantId = null;

  if (!loginForm) return;


  /* =========================================
     PASSWORD SHOW / HIDE
  ========================================= */

  if (passwordToggle && passwordInput) {

    passwordToggle.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';

    passwordToggle.addEventListener("click", () => {

      if (passwordInput.type === "password") {

        passwordInput.type = "text";

        passwordToggle.innerHTML =
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l18 18"/><path d="M10.58 10.58a2 2 0 0 0 2.83 2.83"/><path d="M9.88 5.09A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-3.06 4.28"/><path d="M6.61 6.61C3.91 8.46 1 12 1 12s4 8 11 8a10.94 10.94 0 0 0 4.12-.79"/></svg>';

        passwordToggle.setAttribute(
          "aria-label",
          "Hide password"
        );

      } else {

        passwordInput.type = "password";

        passwordToggle.innerHTML =
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';

        passwordToggle.setAttribute(
          "aria-label",
          "Show password"
        );
      }
    });
  }


  /* =========================================
     EMAIL VALIDATION
  ========================================= */

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }


  /* =========================================
     PASSWORD VALIDATION
  ========================================= */

  function validatePassword(value) {

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;

    return passwordRegex.test(value);
  }


  /* =========================================
     SHOW ERROR
  ========================================= */

  function showError(message) {

    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.style.color = "var(--coral-500)";
    formMessage.classList.add("show");
  }


  /* =========================================
     SHOW SUCCESS
  ========================================= */

  function showSuccess(message) {

    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.style.color = "#16845c";
    formMessage.classList.add("show");
  }


  /* =========================================
     HIDE MESSAGE
  ========================================= */

  function hideMessage() {

    if (!formMessage) return;

    formMessage.textContent = "";
    formMessage.classList.remove("show");
  }


  /* =========================================
     REMOVE INPUT ERRORS
  ========================================= */

  [emailInput, passwordInput].forEach((input) => {

    if (!input) return;

    input.addEventListener("input", () => {

      input.style.borderColor = "";

      hideMessage();
    });
  });


  /* =========================================
     ROLE SLIDER
  ========================================= */

  function updateRoleSlider(activeButton) {

    if (!roleSlider || !activeButton) return;

    if (activeButton === roleButtons[0]) {

      roleSlider.style.transform = "translateX(0)";

    } else {

      roleSlider.style.transform = "translateX(100%)";
    }
  }


  /* =========================================
     ROLE SELECTOR
  ========================================= */

  roleButtons.forEach((button) => {

    button.addEventListener("click", () => {

      /* Remove active state */

      roleButtons.forEach((item) => {
        item.classList.remove("active");
      });


      /* Add active state */

      button.classList.add("active");


      /* Move role indicator */

      updateRoleSlider(button);


      const selectedRole = button.dataset.role;


      /* Update role name */

      if (roleName) {
        roleName.textContent = selectedRole;
      }


      /* Update heading */

      if (titleText) {

        titleText.innerHTML =
          selectedRole === "staff"
            ? 'Sign in to your <span class="hl">staff account</span>'
            : 'Sign in to your <span class="hl">account</span>';
      }


      /* Update subtitle */

      if (subtitleText) {

        subtitleText.textContent =
          selectedRole === "staff"
            ? "Manage patients, appointments, and veterinary care."
            : "Book visits, view records, and manage your pet's care.";
      }


      /* Update email label */

      const emailLabel = document.getElementById("emailLabel");

      if (emailLabel) {

        emailLabel.textContent =
          selectedRole === "staff"
            ? "Staff Email"
            : "Email Address";
      }


      /* Update email placeholder */

      if (emailInput) {

        emailInput.placeholder =
          selectedRole === "staff"
            ? "staff@pawsandclaws.vet"
            : "you@email.com";
      }


      /* Update login button */

      const btnText = document.getElementById("btnText");

      if (btnText) {

        btnText.textContent =
          selectedRole === "staff"
            ? "Sign in as Staff / Vet"
            : "Sign in as Pet Owner";
      }


      hideMessage();
    });
  });


  /* =========================================
     LOGIN
  ========================================= */

  loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    hideMessage();

    let valid = true;


    const emailValue = emailInput
      ? emailInput.value.trim()
      : "";


    const passwordValue = passwordInput
      ? passwordInput.value
      : "";


    /* =========================================
       EMAIL CHECK
    ========================================= */

    if (!validateEmail(emailValue)) {

      if (emailInput) {

        emailInput.style.borderColor =
          "var(--coral-500)";
      }

      showError(
        "Please enter a valid email address."
      );

      valid = false;
    }


    /* =========================================
       PASSWORD EMPTY CHECK
    ========================================= */

    if (passwordValue === "") {

      if (passwordInput) {

        passwordInput.style.borderColor =
          "var(--coral-500)";
      }

      showError(
        "Please enter your password."
      );

      return;
    }


    /* =========================================
       PASSWORD FORMAT CHECK
    ========================================= */

    if (!validatePassword(passwordValue)) {

      if (passwordInput) {

        passwordInput.style.borderColor =
          "var(--coral-500)";
      }

      showError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );

      return;
    }


    if (!valid) return;


    /* =========================================
       GET ACTIVE ROLE
    ========================================= */

    const activeRole =
      document.querySelector(".role-card.active");


    const selectedRole = activeRole
      ? activeRole.dataset.role
      : "pet-owner";


    /* =========================================
       LOGIN LOADING
    ========================================= */

    const originalHTML = submitButton
      ? submitButton.innerHTML
      : "";


    if (submitButton) {

      submitButton.classList.add("loading");

      submitButton.innerHTML = `
        <span>Signing in...</span>
        <strong class="login-spinner"></strong>
      `;

      submitButton.disabled = true;
    }


    /* =========================================
       LOGIN PROCESS
    ========================================= */

    setTimeout(() => {

      const currentUser = {

        name: emailValue.split("@")[0],

        email: emailValue,

        role:
          selectedRole === "staff"
            ? "Staff / Vet"
            : "Pet Owner"
      };


      /* Save login session */

      sessionStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );


      /* Success message */

      showSuccess(
        `Welcome back! Signed in as ${
          selectedRole === "staff"
            ? "Staff / Vet"
            : "Pet Owner"
        }.`
      );


      /* Reset form */

      loginForm.reset();


      if (emailInput) {
        emailInput.value = "";
      }


      if (passwordInput) {

        passwordInput.value = "";

        passwordInput.type = "password";
      }


      /* Reset password icon */

      if (passwordToggle) {

        passwordToggle.innerHTML =
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';

        passwordToggle.setAttribute(
          "aria-label",
          "Show password"
        );
      }


      /* Reset role selector */

      roleButtons.forEach((button, index) => {

        button.classList.toggle(
          "active",
          index === 0
        );
      });


      if (roleSlider) {

        roleSlider.style.transform =
          "translateX(0)";
      }


      if (roleName) {

        roleName.textContent =
          "Pet Owner";
      }


      if (titleText) {

        titleText.innerHTML =
          'Sign in to your <span class="hl">account</span>';
      }


      if (subtitleText) {

        subtitleText.textContent =
          "Choose how you'd like to continue.";
      }


      const emailLabel =
        document.getElementById("emailLabel");

      if (emailLabel) {

        emailLabel.textContent =
          "Email Address";
      }


      if (emailInput) {

        emailInput.placeholder =
          "you@email.com";
      }


      const btnText =
        document.getElementById("btnText");

      if (btnText) {

        btnText.textContent =
          "Sign in as Pet Owner";
      }


      /* Restore login button */

      if (submitButton) {

        submitButton.classList.remove("loading");

        submitButton.innerHTML =
          originalHTML;

        submitButton.disabled = false;
      }


      /* =========================================
         REDIRECT
      ========================================= */

      setTimeout(() => {

        if (
          selectedRole.toLowerCase() ===
          "staff"
        ) {

          window.location.href =
            "staff-dashboard.html";

        } else {

          window.location.href =
            "petOwner-dashboard.html";
        }

      }, 1000);

    }, 1200);
  });


  /* =========================================
     RESET LOGIN PAGE
  ========================================= */

  window.addEventListener("pageshow", () => {

    loginForm.reset();


    if (emailInput) {

      emailInput.value = "";
    }


    if (passwordInput) {

      passwordInput.value = "";

      passwordInput.type =
        "password";
    }


    hideMessage();


    if (rememberMe) {

      rememberMe.checked = false;
    }


    /* Reset password icon */

    if (passwordToggle) {

      passwordToggle.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';

      passwordToggle.setAttribute(
        "aria-label",
        "Show password"
      );
    }


    /* Reset role buttons */

    roleButtons.forEach((button, index) => {

      button.classList.toggle(
        "active",
        index === 0
      );
    });


    /* Reset role indicator */

    if (roleSlider) {

      roleSlider.style.transform =
        "translateX(0)";
    }


    /* Reset heading */

    if (titleText) {

      titleText.innerHTML =
        'Sign in to your <span class="hl">account</span>';
    }


    /* Reset subtitle */

    if (subtitleText) {

      subtitleText.textContent =
        "Choose how you'd like to continue.";
    }


    /* Reset email label */

    const emailLabel =
      document.getElementById("emailLabel");

    if (emailLabel) {

      emailLabel.textContent =
        "Email Address";
    }


    /* Reset email placeholder */

    if (emailInput) {

      emailInput.placeholder =
        "you@email.com";
    }


    /* Reset login button */

    const btnText =
      document.getElementById("btnText");

    if (btnText) {

      btnText.textContent =
        "Sign in as Pet Owner";
    }


    /* Reset role name */

    if (roleName) {

      roleName.textContent =
        "Pet Owner";
    }
  });

});