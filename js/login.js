/**
 * RentIt – Multi-Category Online Rental Marketplace
 * Authentication & Profile Client-Side Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- LOGIN FORM HANDLING ---
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;
      const rememberMe = document.getElementById("login-remember")?.checked;

      // Clean simple form validation
      if (!email || !password) {
        showToast("Please fill in all fields", "error");
        return;
      }

      if (!validateEmail(email)) {
        showToast("Please enter a valid email address", "error");
        return;
      }

      // Simulate Authentication
      showLoadingScreen();
      
      setTimeout(() => {
        // Create user session
        const existingUser = getCurrentUser();
        const loggedUser = {
          ...existingUser,
          email: email,
          type: "renter"
        };
        saveCurrentUser(loggedUser);
        
        hideLoadingScreen();
        showToast("Welcome back, " + (loggedUser.name || "User") + "!", "success");
        
        // Redirect to main market home
        setTimeout(() => {
          window.location.href = "home.html";
        }, 800);
      }, 1000);
    });
  }

  // --- REGISTRATION FORM HANDLING ---
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    const avatarInput = document.getElementById("register-avatar-file");
    const avatarPreview = document.getElementById("register-avatar-preview");

    // Profile photo upload preview
    if (avatarInput && avatarPreview) {
      avatarInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            avatarPreview.src = event.target.result;
            avatarPreview.classList.remove("opacity-50");
          };
          reader.readAsDataURL(file);
        }
      });
    }

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("register-name").value.trim();
      const phone = document.getElementById("register-phone").value.trim();
      const email = document.getElementById("register-email").value.trim();
      const password = document.getElementById("register-password").value;
      const confirmPassword = document.getElementById("register-confirm-password").value;
      const avatarSrc = avatarPreview ? avatarPreview.src : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";

      // Form validation
      if (!name || !phone || !email || !password || !confirmPassword) {
        showToast("All fields are required", "error");
        return;
      }

      if (!validateEmail(email)) {
        showToast("Please enter a valid email address", "error");
        return;
      }

      if (password.length < 6) {
        showToast("Password must be at least 6 characters long", "error");
        return;
      }

      if (password !== confirmPassword) {
        showToast("Passwords do not match", "error");
        return;
      }

      showLoadingScreen();

      setTimeout(() => {
        const newUser = {
          name: name,
          email: email,
          phone: phone,
          address: "No address configured yet.",
          avatar: avatarSrc,
          type: "renter"
        };
        saveCurrentUser(newUser);

        hideLoadingScreen();
        showToast("Account created successfully!", "success");

        setTimeout(() => {
          window.location.href = "home.html";
        }, 800);
      }, 1200);
    });
  }

  // --- SOCIAL LOGIN SIMULATION ---
  const googleBtns = document.querySelectorAll(".social-login-google");
  googleBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      simulateSocialLogin("Google");
    });
  });

  const appleBtns = document.querySelectorAll(".social-login-apple");
  appleBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      simulateSocialLogin("Apple");
    });
  });

  function simulateSocialLogin(provider) {
    showLoadingScreen();
    setTimeout(() => {
      const socialUser = {
        name: provider === "Google" ? "Alex G-User" : "Apple Member",
        email: provider.toLowerCase() + "@oauth.rentit.com",
        phone: "+1 (555) 019-9281",
        address: "Connected via " + provider,
        avatar: provider === "Google" 
          ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
          : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
        type: "renter"
      };
      saveCurrentUser(socialUser);
      hideLoadingScreen();
      showToast(`Connected via ${provider} successfully!`, "success");
      setTimeout(() => {
        window.location.href = "home.html";
      }, 800);
    }, 1000);
  }

  // --- LOGOUT HANDLERS ---
  const logoutBtns = document.querySelectorAll(".logout-trigger");
  logoutBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showLoadingScreen();
      setTimeout(() => {
        // Do not delete products, but wipe user state to defaults
        localStorage.removeItem("rentit_user");
        hideLoadingScreen();
        window.location.href = "login.html";
      }, 600);
    });
  });

  // --- HELPERS ---
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
