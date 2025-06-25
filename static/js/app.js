import { Chart } from "@/components/ui/chart"
// API Configuration
const API_BASE_URL = "/api"

// Global variables
let currentPage = 1
let currentFilters = {}
let dashboardChart = null
let ipoData = []
let companies = []
const bootstrap = window.bootstrap // Declare the bootstrap variable

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Setup event listeners
  setupEventListeners()

  // Load initial data
  loadDashboardData()
  loadCompanies()

  // Show dashboard by default
  showSection("dashboard")
}

function setupEventListeners() {
  // Sidebar navigation
  document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const section = link.dataset.section
      if (section) {
        showSection(section)
        updateActiveNavLink(link)
      }
    })
  })

  // Header navigation
  document.querySelectorAll(".main-header .nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const section = link.dataset.section
      if (section) {
        e.preventDefault()
        showSection(section)
        // Close mobile menu if open
        const navbarCollapse = document.getElementById("navbarNav")
        if (navbarCollapse.classList.contains("show")) {
          bootstrap.Collapse.getInstance(navbarCollapse).hide()
        }
      }
    })
  })

  // Sidebar toggle
  document.getElementById("sidebarCollapse").addEventListener("click", toggleSidebar)

  // IPO form submission
  document.getElementById("save-ipo-btn").addEventListener("click", saveIPO)

  // Filter event listeners
  document.getElementById("status-filter").addEventListener("change", applyFilters)
  document.getElementById("date-from").addEventListener("change", applyFilters)
  document.getElementById("date-to").addEventListener("change", applyFilters)
  document.getElementById("company-search").addEventListener("input", debounce(applyFilters, 300))

  // Search event listeners
  document.getElementById("dashboard-search").addEventListener("input", debounce(handleDashboardSearch, 300))

  // Mobile menu handling
  handleMobileMenu()
}

function handleMobileMenu() {
  // Handle mobile sidebar toggle
  const sidebarToggle = document.getElementById("sidebarCollapse")
  const sidebar = document.getElementById("sidebar")

  if (window.innerWidth <= 992) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show")
    })

    // Close sidebar when clicking outside
    document.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove("show")
      }
    })
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      sidebar.classList.remove("show")
    }
  })
}

// Navigation Functions
function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active")
  })

  // Show target section
  const targetSection = document.getElementById(`${sectionName}-section`)
  if (targetSection) {
    targetSection.classList.add("active")

    // Load section-specific data
    switch (sectionName) {
      case "dashboard":
        loadDashboardData()
        break
      case "manage-ipo":
        loadIPOData()
        break
    }
  }
}

function updateActiveNavLink(activeLink) {
  document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
    link.classList.remove("active")
  })
  activeLink.classList.add("active")
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar")
  const content = document.getElementById("content")

  sidebar.classList.toggle("collapsed")
  content.classList.toggle("expanded")
}

// Dashboard Functions
async function loadDashboardData() {
  try {
    showLoading(true)

    // Load dashboard stats
    const statsResponse = await fetch(`${API_BASE_URL}/dashboard-stats/`)
    const stats = await statsResponse.json()

    updateDashboardStats(stats)

    // Load quick links
    const linksResponse = await fetch(`${API_BASE_URL}/quick-links/`)
    const links = await linksResponse.json()

    updateQuickLinks(links)

    // Update chart
    updateMainBoardChart(stats)
  } catch (error) {
    console.error("Error loading dashboard data:", error)
    showAlert("Error loading dashboard data", "danger")
  } finally {
    showLoading(false)
  }
}

function updateDashboardStats(stats) {
  // Update stat circles
  document.getElementById("loss-count").textContent = stats.loss_making_ipos || 0
  document.getElementById("total-count").textContent = stats.total_ipos || 0
  document.getElementById("gain-count").textContent = stats.profitable_ipos || 0

  // Update legend counts
  document.getElementById("upcoming-legend").textContent = stats.upcoming_ipos || 0
  document.getElementById("new-listed-legend").textContent = stats.new_listed_ipos || 0
  document.getElementById("ongoing-legend").textContent = stats.ongoing_ipos || 0
}

function updateQuickLinks(links) {
  const container = document.getElementById("quick-links-container")

  container.innerHTML = links
    .map(
      (link) => `
    <a href="${link.url}" target="_blank" class="quick-link-item">
      <div class="quick-link-icon">
        <i class="${link.icon}"></i>
      </div>
      <div class="quick-link-content">
        <h6>${link.name}</h6>
        <p>${link.description}</p>
      </div>
    </a>
  `,
    )
    .join("")
}

function updateMainBoardChart(stats) {
  const ctx = document.getElementById("mainBoardChart").getContext("2d")

  if (dashboardChart) {
    dashboardChart.destroy()
  }

  dashboardChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Upcoming", "New Listed", "Ongoing"],
      datasets: [
        {
          data: [stats.upcoming_ipos || 0, stats.new_listed_ipos || 0, stats.ongoing_ipos || 0],
          backgroundColor: ["#6366f1", "#10b981", "#f59e0b"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      cutout: "70%",
    },
  })
}

// IPO Management Functions
async function loadIPOData() {
  try {
    showLoading(true)

    const params = new URLSearchParams({
      page: currentPage,
      ...currentFilters,
    })

    const response = await fetch(`${API_BASE_URL}/ipos/?${params}`)
    const data = await response.json()

    ipoData = data.results || data
    updateIPOTable(ipoData)
    updatePagination(data)
  } catch (error) {
    console.error("Error loading IPO data:", error)
    showAlert("Error loading IPO data", "danger")
  } finally {
    showLoading(false)
  }
}

function updateIPOTable(ipos) {
  const tbody = document.getElementById("ipo-table-body")

  if (!ipos || ipos.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" class="text-center text-muted py-4">
          <i class="fas fa-inbox fa-2x mb-2 d-block"></i>
          No IPOs found
        </td>
      </tr>
    `
    return
  }

  tbody.innerHTML = ipos
    .map(
      (ipo) => `
    <tr>
      <td>
        <div class="d-flex align-items-center">
          ${ipo.company_logo ? `<img src="${ipo.company_logo}" alt="${ipo.company_name}" class="me-2" style="width: 32px; height: 32px; border-radius: 4px;">` : ""}
          <span class="fw-medium">${ipo.company_name}</span>
        </div>
      </td>
      <td>${ipo.price_band_display}</td>
      <td>${formatDate(ipo.open_date)}</td>
      <td>${formatDate(ipo.close_date)}</td>
      <td>${ipo.issue_size_display}</td>
      <td><span class="badge bg-secondary">${formatIssueType(ipo.issue_type)}</span></td>
      <td>${ipo.listing_date ? formatDate(ipo.listing_date) : "-"}</td>
      <td><span class="status-badge status-${ipo.status}">${formatStatus(ipo.status)}</span></td>
      <td>
        <button class="btn btn-primary btn-action btn-update" onclick="updateIPO(${ipo.id})">
          Update
        </button>
      </td>
      <td>
        <button class="btn btn-danger btn-action btn-delete me-1" onclick="deleteIPO(${ipo.id})">
          <i class="fas fa-trash"></i>
        </button>
        <button class="btn btn-info btn-action btn-view" onclick="viewIPO(${ipo.id})">
          <i class="fas fa-eye"></i>
        </button>
      </td>
    </tr>
  `,
    )
    .join("")
}

function updatePagination(data) {
  const pagination = document.getElementById("pagination")

  if (!data.count || data.count <= 10) {
    pagination.innerHTML = ""
    return
  }

  const totalPages = Math.ceil(data.count / 10)
  let paginationHTML = ""

  // Previous button
  paginationHTML += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
    </li>
  `

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage || i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      paginationHTML += `
        <li class="page-item ${i === currentPage ? "active" : ""}">
          <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
        </li>
      `
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`
    }
  }

  // Next button
  paginationHTML += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
    </li>
  `

  pagination.innerHTML = paginationHTML
}

function changePage(page) {
  if (page < 1) return
  currentPage = page
  loadIPOData()
}

function applyFilters() {
  currentFilters = {
    status: document.getElementById("status-filter").value,
    date_from: document.getElementById("date-from").value,
    date_to: document.getElementById("date-to").value,
    search: document.getElementById("company-search").value,
  }

  // Remove empty filters
  Object.keys(currentFilters).forEach((key) => {
    if (!currentFilters[key]) {
      delete currentFilters[key]
    }
  })

  currentPage = 1
  loadIPOData()
}

// Company Functions
async function loadCompanies() {
  try {
    const response = await fetch(`${API_BASE_URL}/companies/`)
    const data = await response.json()
    companies = data.results || data

    updateCompanySelect()
  } catch (error) {
    console.error("Error loading companies:", error)
  }
}

function updateCompanySelect() {
  const select = document.getElementById("company-select")

  select.innerHTML =
    '<option value="">Select Company</option>' +
    companies
      .map(
        (company) => `
      <option value="${company.id}">${company.name}</option>
    `,
      )
      .join("")
}

// IPO CRUD Functions
async function saveIPO() {
  try {
    const formData = getIPOFormData()

    if (!validateIPOForm(formData)) {
      return
    }

    showLoading(true)

    const response = await fetch(`${API_BASE_URL}/ipos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      showAlert("IPO registered successfully!", "success")
      resetIPOForm()
      bootstrap.Modal.getInstance(document.getElementById("registerIPOModal")).hide()
      loadIPOData()
    } else {
      const errorData = await response.json()
      showAlert(getErrorMessage(errorData), "danger")
    }
  } catch (error) {
    console.error("Error saving IPO:", error)
    showAlert("Error saving IPO. Please try again.", "danger")
  } finally {
    showLoading(false)
  }
}

function getIPOFormData() {
  return {
    company: Number.parseInt(document.getElementById("company-select").value),
    price_band_min: Number.parseFloat(document.getElementById("price-min").value),
    price_band_max: Number.parseFloat(document.getElementById("price-max").value),
    open_date: document.getElementById("open-date").value,
    close_date: document.getElementById("close-date").value,
    issue_size: Number.parseFloat(document.getElementById("issue-size").value),
    issue_type: document.getElementById("issue-type").value,
    listing_date: document.getElementById("listing-date").value || null,
    status: document.getElementById("status").value,
    listing_price: Number.parseFloat(document.getElementById("po-price").value) || null,
    current_market_price: Number.parseFloat(document.getElementById("listing-price").value) || null,
    listing_gain_loss: Number.parseFloat(document.getElementById("listing-gain").value) || null,
    market_cap: Number.parseFloat(document.getElementById("market-cap").value) || null,
    registrar: document.getElementById("registrar").value || "",
    lead_managers: document.getElementById("lead-managers").value || "",
    lot_size: Number.parseInt(document.getElementById("lot-size").value) || 1,
    face_value: Number.parseFloat(document.getElementById("face-value").value) || 10,
    fresh_issue: Number.parseFloat(document.getElementById("fresh-issue").value) || 0,
    offer_for_sale: Number.parseFloat(document.getElementById("offer-for-sale").value) || 0,
    exchange: document.getElementById("exchange").value || "both",
    pe_ratio: Number.parseFloat(document.getElementById("pe-ratio").value) || null,
    retail_subscription: Number.parseFloat(document.getElementById("retail-subscription").value) || 0,
    qib_subscription: Number.parseFloat(document.getElementById("qib-subscription").value) || 0,
    nii_subscription: Number.parseFloat(document.getElementById("nii-subscription").value) || 0,
  }
}

function validateIPOForm(data) {
  if (!data.company) {
    showAlert("Please select a company", "warning")
    return false
  }

  if (!data.price_band_min || !data.price_band_max) {
    showAlert("Please enter price band", "warning")
    return false
  }

  if (data.price_band_min >= data.price_band_max) {
    showAlert("Price band minimum must be less than maximum", "warning")
    return false
  }

  if (!data.open_date || !data.close_date) {
    showAlert("Please enter open and close dates", "warning")
    return false
  }

  if (new Date(data.open_date) >= new Date(data.close_date)) {
    showAlert("Open date must be before close date", "warning")
    return false
  }

  if (!data.issue_size) {
    showAlert("Please enter issue size", "warning")
    return false
  }

  return true
}

function resetIPOForm() {
  document.getElementById("ipo-form").reset()
  document.getElementById("ipo-details-form").reset()

  // Reset to default values
  document.getElementById("status").value = "upcoming"
  document.getElementById("issue-type").value = "book_built"
  document.getElementById("exchange").value = "both"
  document.getElementById("face-value").value = "10"
}

async function updateIPO(id) {
  // Implementation for updating IPO
  showAlert("Update IPO functionality coming soon", "info")
}

async function deleteIPO(id) {
  if (!confirm("Are you sure you want to delete this IPO?")) {
    return
  }

  try {
    showLoading(true)

    const response = await fetch(`${API_BASE_URL}/ipos/${id}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": getCSRFToken(),
      },
    })

    if (response.ok) {
      showAlert("IPO deleted successfully!", "success")
      loadIPOData()
    } else {
      showAlert("Error deleting IPO", "danger")
    }
  } catch (error) {
    console.error("Error deleting IPO:", error)
    showAlert("Error deleting IPO", "danger")
  } finally {
    showLoading(false)
  }
}

async function viewIPO(id) {
  // Implementation for viewing IPO details
  showAlert("View IPO functionality coming soon", "info")
}

// Utility Functions
function formatDate(dateString) {
  if (!dateString) return "-"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

function formatStatus(status) {
  const statusMap = {
    upcoming: "Upcoming",
    ongoing: "Ongoing",
    new_listed: "New Listed",
    confirming: "Confirming",
    closed: "Closed",
  }
  return statusMap[status] || status
}

function formatIssueType(type) {
  const typeMap = {
    book_built: "Book Built",
    fixed_price: "Fixed Price",
    rights_issue: "Rights Issue",
  }
  return typeMap[type] || type
}

function showAlert(message, type = "info") {
  // Create alert element
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  alertDiv.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;"
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `

  document.body.appendChild(alertDiv)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove()
    }
  }, 5000)
}

function showLoading(show) {
  const overlay = document.getElementById("loading-overlay")
  if (show) {
    overlay.classList.remove("d-none")
  } else {
    overlay.classList.add("d-none")
  }
}

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

function getErrorMessage(errorData) {
  if (typeof errorData === "string") {
    return errorData
  }

  if (errorData.detail) {
    return errorData.detail
  }

  if (errorData.non_field_errors) {
    return errorData.non_field_errors[0]
  }

  // Get first field error
  for (const field in errorData) {
    if (Array.isArray(errorData[field])) {
      return `${field}: ${errorData[field][0]}`
    }
  }

  return "An error occurred. Please try again."
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function handleDashboardSearch(event) {
  const searchTerm = event.target.value.toLowerCase()
  // Implementation for dashboard search
  console.log("Dashboard search:", searchTerm)
}

// Make functions globally available
window.changePage = changePage
window.updateIPO = updateIPO
window.deleteIPO = deleteIPO
window.viewIPO = viewIPO

// Handle browser back/forward buttons
window.addEventListener("popstate", () => {
  const path = window.location.pathname
  if (path.includes("upcoming")) {
    showSection("manage-ipo")
  } else if (path.includes("register")) {
    showSection("manage-ipo")
  } else {
    showSection("dashboard")
  }
})
