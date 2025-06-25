// API Configuration
const API_BASE_URL = "/api/auth"

// Global state
let currentSection = "login"
let isLoading = false

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Check authentication status
  checkAuthStatus()

  // Setup event listeners
  setupEventListeners()

  // Show initial section based on URL
  const path = window.location.pathname
  if (path.includes("register")) {
    showSection("register")
  } else if (path.includes("forgot-password")) {
    showSection("forgot-password")
  } else {
    showSection("login")
  }
}

function setupEventListeners() {
  // Form submissions
  document.getElementById("login-form").addEventListener("submit", handleLogin)
  document.getElementById("register-form").addEventListener("submit", handleRegister)
  document.getElementById("forgot-password-form").addEventListener("submit", handleForgotPassword)

  // Password confirmation validation
  document.getElementById("register-password-confirm").addEventListener("input", validatePasswordMatch)

  // Real-time email validation
  document.getElementById("register-email").addEventListener("blur", validateEmail)

  // Prevent form submission on Enter in password fields
  document.querySelectorAll('input[type="password"]').forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        const form = input.closest("form")
        if (form) {
          form.dispatchEvent(new Event("submit"))
        }
      }
    })
  })
}

// Authentication Functions
async function handleLogin(event) {
  event.preventDefault()

  if (isLoading) return

  const email = document.getElementById("login-email").value.trim()
  const password = document.getElementById("login-password").value
  const rememberMe = document.getElementById("remember-me").checked

  // Basic validation
  if (!email || !password) {
    showAlert("Please fill in all fields", "danger")
    return
  }

  if (!isValidEmail(email)) {
    showAlert("Please enter a valid email address", "danger")
    return
  }

  // Check reCAPTCHA
  if (typeof grecaptcha === "undefined" || !grecaptcha) {
    showAlert("reCAPTCHA is not loaded. Please try again later.", "warning")
    return
  }
  const recaptchaResponse = grecaptcha.getResponse()
  if (!recaptchaResponse) {
    showAlert("Please complete the reCAPTCHA", "warning")
    return
  }

  setLoading("login-btn", true)

  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
      },
      body: JSON.stringify({
        email: email,
        password: password,
        remember_me: rememberMe,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      showAlert("Login successful! Redirecting...", "success")

      // Store user data
      localStorage.setItem("user", JSON.stringify(data.user))

      // Redirect after short delay
      setTimeout(() => {
        showDashboard()
      }, 1500)
    } else {
      // Handle specific error messages
      if (data.non_field_errors) {
        showAlert(data.non_field_errors[0], "danger")
      } else if (data.email) {
        showAlert(data.email[0], "danger")
      } else if (data.password) {
        showAlert(data.password[0], "danger")
      } else {
        showAlert("Login failed. Please check your credentials.", "danger")
      }

      // Reset reCAPTCHA
      if (typeof grecaptcha !== "undefined") {
        grecaptcha.reset()
      }
    }
  } catch (error) {
    console.error("Login error:", error)
    showAlert("Network error. Please try again.", "danger")
    if (typeof grecaptcha !== "undefined") {
      grecaptcha.reset()
    }
  } finally {
    setLoading("login-btn", false)
  }
}

async function handleRegister(event) {
  event.preventDefault()

  if (isLoading) return

  const fullName = document.getElementById("register-name").value.trim()
  const email = document.getElementById("register-email").value.trim()
  const password = document.getElementById("register-password").value
  const passwordConfirm = document.getElementById("register-password-confirm").value

  // Validation
  if (!fullName || !email || !password || !passwordConfirm) {
    showAlert("Please fill in all fields", "danger")
    return
  }

  if (!isValidEmail(email)) {
    showAlert("Please enter a valid email address", "danger")
    return
  }

  if (password !== passwordConfirm) {
    showAlert("Passwords do not match", "danger")
    return
  }

  if (password.length < 8) {
    showAlert("Password must be at least 8 characters long", "danger")
    return
  }

  // Check reCAPTCHA
  if (typeof grecaptcha === "undefined" || !grecaptcha) {
    showAlert("reCAPTCHA is not loaded. Please try again later.", "warning")
    return
  }
  const recaptchaResponse = grecaptcha.getResponse()
  if (!recaptchaResponse) {
    showAlert("Please complete the reCAPTCHA", "warning")
    return
  }

  setLoading("register-btn", true)

  try {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
      },
      body: JSON.stringify({
        full_name: fullName,
        email: email,
        password: password,
        password_confirm: passwordConfirm,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      showAlert("Account created successfully!", "success")

      // Store user data
      localStorage.setItem("user", JSON.stringify(data.user))

      // Show success section
      setTimeout(() => {
        showSection("success")
      }, 1500)
    } else {
      // Handle validation errors
      if (data.email) {
        showAlert(data.email[0], "danger")
      } else if (data.password) {
        showAlert(data.password[0], "danger")
      } else if (data.non_field_errors) {
        showAlert(data.non_field_errors[0], "danger")
      } else {
        showAlert("Registration failed. Please try again.", "danger")
      }

      if (typeof grecaptcha !== "undefined") {
        grecaptcha.reset()
      }
    }
  } catch (error) {
    console.error("Registration error:", error)
    showAlert("Network error. Please try again.", "danger")
    if (typeof grecaptcha !== "undefined") {
      grecaptcha.reset()
    }
  } finally {
    setLoading("register-btn", false)
  }
}

async function handleForgotPassword(event) {
  event.preventDefault()

  if (isLoading) return

  const email = document.getElementById("forgot-email").value.trim()

  if (!email) {
    showAlert("Please enter your email address", "danger")
    return
  }

  if (!isValidEmail(email)) {
    showAlert("Please enter a valid email address", "danger")
    return
  }

  setLoading("forgot-password-btn", true)

  try {
    const response = await fetch(`${API_BASE_URL}/forgot-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
      },
      body: JSON.stringify({
        email: email,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      showAlert("Password reset link sent to your email!", "success")

      // Show reset link in development
      if (data.reset_link) {
        console.log("Password reset link:", data.reset_link)
        showAlert(`Development: Reset link logged to console`, "info")
      }

      // Clear form
      document.getElementById("forgot-email").value = ""

      // Redirect to login after delay
      setTimeout(() => {
        showSection("login")
      }, 3000)
    } else {
      if (data.email) {
        showAlert(data.email[0], "danger")
      } else {
        showAlert("Failed to send reset email. Please try again.", "danger")
      }
    }
  } catch (error) {
    console.error("Forgot password error:", error)
    showAlert("Network error. Please try again.", "danger")
  } finally {
    setLoading("forgot-password-btn", false)
  }
}

async function checkAuthStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/check-auth/`, {
      method: "GET",
      headers: {
        "X-CSRFToken": getCSRFToken(),
      },
    })

    const data = await response.json()

    if (data.authenticated) {
      localStorage.setItem("user", JSON.stringify(data.user))
      // User is already logged in, could redirect to dashboard
      console.log("User is authenticated:", data.user)
    }
  } catch (error) {
    console.error("Auth check error:", error)
  }
}

// UI Helper Functions
function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll(".auth-section").forEach((section) => {
    section.classList.add("d-none")
  })

  // Show target section
  const targetSection = document.getElementById(`${sectionName}-section`)
  if (targetSection) {
    targetSection.classList.remove("d-none")
    currentSection = sectionName

    // Update URL without page reload
    const newUrl = sectionName === "login" ? "/" : `/${sectionName}/`
    window.history.pushState({}, "", newUrl)

    // Clear any existing alerts
    clearAlerts()

    // Reset reCAPTCHA if present
    if (typeof grecaptcha !== "undefined") {
      setTimeout(() => {
        try {
          grecaptcha.reset()
        } catch (e) {
          // reCAPTCHA not ready yet
        }
      }, 100)
    }
  }
}

function showAlert(message, type = "info") {
  const alertContainer = document.getElementById("alert-container")
  const alertId = "alert-" + Date.now()

  const alertHTML = `
    <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">
      <i class="fas fa-${getAlertIcon(type)} me-2"></i>
      ${message}
      <button type="button" class="btn-close" onclick="removeAlert('${alertId}')"></button>
    </div>
  `

  alertContainer.insertAdjacentHTML("beforeend", alertHTML)

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    removeAlert(alertId)
  }, 5000)
}

function removeAlert(alertId) {
  const alertElement = document.getElementById(alertId)
  if (alertElement) {
    alertElement.remove()
  }
}

function clearAlerts() {
  const alertContainer = document.getElementById("alert-container")
  alertContainer.innerHTML = ""
}

function getAlertIcon(type) {
  const icons = {
    success: "check-circle",
    danger: "exclamation-circle",
    warning: "exclamation-triangle",
    info: "info-circle",
  }
  return icons[type] || "info-circle"
}

function setLoading(buttonId, loading) {
  const button = document.getElementById(buttonId)
  if (button) {
    if (loading) {
      button.classList.add("loading")
      button.disabled = true
      isLoading = true
    } else {
      button.classList.remove("loading")
      button.disabled = false
      isLoading = false
    }
  }
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const button = input.nextElementSibling
  const icon = button.querySelector("i")

  if (input.type === "password") {
    input.type = "text"
    icon.classList.remove("fa-eye")
    icon.classList.add("fa-eye-slash")
  } else {
    input.type = "password"
    icon.classList.remove("fa-eye-slash")
    icon.classList.add("fa-eye")
  }
}

// Validation Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateEmail() {
  const email = document.getElementById("register-email").value.trim()
  const emailInput = document.getElementById("register-email")

  if (email && !isValidEmail(email)) {
    emailInput.classList.add("is-invalid")
    showAlert("Please enter a valid email address", "warning")
  } else {
    emailInput.classList.remove("is-invalid")
  }
}

function validatePasswordMatch() {
  const password = document.getElementById("register-password").value
  const passwordConfirm = document.getElementById("register-password-confirm").value
  const confirmInput = document.getElementById("register-password-confirm")

  if (passwordConfirm && password !== passwordConfirm) {
    confirmInput.classList.add("is-invalid")
  } else {
    confirmInput.classList.remove("is-invalid")
  }
}

// Utility Functions
function getCSRFToken() {
  const cookies = document.cookie.split(";")
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=")
    if (name === "csrftoken") {
      return value
    }
  }
  return ""
}

function showDashboard() {
  // In a real application, this would redirect to the dashboard
  showAlert("Redirecting to dashboard...", "success")

  // Simulate dashboard redirect
  setTimeout(() => {
    alert("Welcome to BLUESTOCK Dashboard!\n\nThis would normally redirect to your main application.")

    // For demo purposes, show login again
    showSection("login")

    // Clear stored user data
    localStorage.removeItem("user")
  }, 2000)
}

// Make functions globally available
window.showSection = showSection
window.togglePassword = togglePassword
window.showDashboard = showDashboard
window.removeAlert = removeAlert

// Handle browser back/forward buttons
window.addEventListener("popstate", () => {
  const path = window.location.pathname
  if (path.includes("register")) {
    showSection("register")
  } else if (path.includes("forgot-password")) {
    showSection("forgot-password")
  } else {
    showSection("login")
  }
})

// Handle Google Sign-in (placeholder)
document.addEventListener("click", (e) => {
  if (e.target.closest(".btn-google")) {
    e.preventDefault()
    showAlert("Google Sign-in integration would be implemented here", "info")
  }
})

// Form validation styling
document.addEventListener("input", (e) => {
  if (e.target.classList.contains("form-control")) {
    if (e.target.value.trim()) {
      e.target.classList.remove("is-invalid")
    }
  }
})

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Escape key to clear alerts
  if (e.key === "Escape") {
    clearAlerts()
  }

  // Ctrl/Cmd + Enter to submit current form
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    const activeForm = document.querySelector(".auth-section:not(.d-none) form")
    if (activeForm) {
      activeForm.dispatchEvent(new Event("submit"))
    }
  }
})
