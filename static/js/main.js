// Main JavaScript file for IPO Web App

document.addEventListener("DOMContentLoaded", () => {
  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

  // Initialize search functionality
  initializeSearch()

  // Initialize filter functionality
  initializeFilters()

  // Initialize lazy loading for images
  initializeLazyLoading()

  // Initialize smooth scrolling
  initializeSmoothScrolling()
})

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById("searchInput")
  const searchFilter = document.getElementById("searchFilter")

  if (searchInput) {
    let searchTimeout

    searchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout)
      const query = this.value.trim()

      if (query.length >= 2) {
        searchTimeout = setTimeout(() => {
          performSearch(query)
        }, 300)
      }
    })
  }

  if (searchFilter) {
    searchFilter.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault()
        this.form.submit()
      }
    })
  }
}

// Perform AJAX search
function performSearch(query) {
  fetch(`/search/?q=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((data) => {
      displaySearchSuggestions(data.results)
    })
    .catch((error) => {
      console.error("Search error:", error)
    })
}

// Display search suggestions
function displaySearchSuggestions(results) {
  // Create or update search suggestions dropdown
  let suggestionsContainer = document.getElementById("searchSuggestions")

  if (!suggestionsContainer) {
    suggestionsContainer = document.createElement("div")
    suggestionsContainer.id = "searchSuggestions"
    suggestionsContainer.className = "search-suggestions"
    document.getElementById("searchInput").parentNode.appendChild(suggestionsContainer)
  }

  if (results.length === 0) {
    suggestionsContainer.style.display = "none"
    return
  }

  let html = '<div class="list-group">'
  results.forEach((ipo) => {
    html += `
            <a href="/ipo/${ipo.id}/" class="list-group-item list-group-item-action">
                <div class="d-flex align-items-center">
                    ${
                      ipo.logo_url
                        ? `<img src="${ipo.logo_url}" alt="${ipo.company_name}" width="30" height="30" class="me-2 rounded">`
                        : '<div class="company-logo-placeholder-small me-2"><i class="bi bi-building"></i></div>'
                    }
                    <div>
                        <div class="fw-bold">${ipo.company_name}</div>
                        <small class="text-muted">${ipo.status} • ${ipo.price_band}</small>
                    </div>
                </div>
            </a>
        `
  })
  html += "</div>"

  suggestionsContainer.innerHTML = html
  suggestionsContainer.style.display = "block"
}

// Filter functionality
function initializeFilters() {
  const statusFilter = document.getElementById("statusFilter")

  if (statusFilter) {
    statusFilter.addEventListener("change", function () {
      // Add loading state
      this.disabled = true
      this.form.submit()
    })
  }

  // Filter cards on client side for better UX
  const filterButtons = document.querySelectorAll("[data-filter]")
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.dataset.filter
      filterIPOCards(filter)

      // Update active state
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")
    })
  })
}

// Filter IPO cards
function filterIPOCards(status) {
  const cards = document.querySelectorAll(".ipo-card")

  cards.forEach((card) => {
    const cardStatus = card.dataset.status

    if (status === "all" || cardStatus === status) {
      card.parentElement.style.display = "block"
      card.style.opacity = "0"
      setTimeout(() => {
        card.style.opacity = "1"
      }, 100)
    } else {
      card.parentElement.style.display = "none"
    }
  })
}

// Lazy loading for images
function initializeLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }
}

// Smooth scrolling
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function showToast(message, type = "info") {
  // Create toast element
  const toast = document.createElement("div")
  toast.className = `toast align-items-center text-white bg-${type} border-0`
  toast.setAttribute("role", "alert")
  toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `

  // Add to toast container
  let toastContainer = document.getElementById("toastContainer")
  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.id = "toastContainer"
    toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3"
    document.body.appendChild(toastContainer)
  }

  toastContainer.appendChild(toast)

  // Show toast
  const bsToast = new bootstrap.Toast(toast)
  bsToast.show()

  // Remove from DOM after hiding
  toast.addEventListener("hidden.bs.toast", () => {
    toast.remove()
  })
}

// API helper functions
class IPOApi {
  static async getAllIPOs(params = {}) {
    const url = new URL("/api/ipo/", window.location.origin)
    Object.keys(params).forEach((key) => {
      if (params[key]) url.searchParams.append(key, params[key])
    })

    try {
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      console.error("API Error:", error)
      throw error
    }
  }

  static async getIPODetails(id) {
    try {
      const response = await fetch(`/api/ipo/${id}/`)
      return await response.json()
    } catch (error) {
      console.error("API Error:", error)
      throw error
    }
  }

  static async getStats() {
    try {
      const response = await fetch("/api/stats/")
      return await response.json()
    } catch (error) {
      console.error("API Error:", error)
      throw error
    }
  }
}

// Export for use in other scripts
window.IPOApp = {
  api: IPOApi,
  utils: {
    formatCurrency,
    formatDate,
    showToast,
  },
}
