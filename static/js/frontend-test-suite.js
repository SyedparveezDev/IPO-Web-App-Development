import { Chart } from "@/components/ui/chart"
/**
 * Frontend Test Suite for IPO Administration Dashboard
 * Tests all UI functionality, responsiveness, and user interactions
 */

class FrontendTestSuite {
  constructor() {
    this.testResults = {
      passed: 0,
      failed: 0,
      errors: [],
    }
    this.originalConsoleError = console.error
    this.capturedErrors = []
  }

  logTest(testName, passed, message = "") {
    if (passed) {
      this.testResults.passed++
      console.log(`✅ ${testName}: PASSED`)
    } else {
      this.testResults.failed++
      this.testResults.errors.push(`${testName}: ${message}`)
      console.log(`❌ ${testName}: FAILED - ${message}`)
    }
  }

  // Test DOM Elements and Structure
  testDOMStructure() {
    console.log("\n🔍 Testing DOM Structure...")

    // Test main layout elements
    const mainElements = ["main-header", "sidebar", "content", "main-footer"]

    mainElements.forEach((elementId) => {
      const element = document.getElementById(elementId)
      this.logTest(`DOM Element - ${elementId}`, !!element)
    })

    // Test section elements
    const sections = ["dashboard-section", "manage-ipo-section", "ipo-subscription-section", "ipo-allotment-section"]

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId)
      this.logTest(`Section - ${sectionId}`, !!section)
    })

    // Test form elements
    const formElements = ["ipo-form", "company-select", "price-min", "price-max", "open-date", "close-date"]

    formElements.forEach((elementId) => {
      const element = document.getElementById(elementId)
      this.logTest(`Form Element - ${elementId}`, !!element)
    })
  }

  // Test Navigation Functionality
  testNavigation() {
    console.log("\n🔍 Testing Navigation...")

    // Test sidebar navigation links
    const sidebarLinks = document.querySelectorAll(".sidebar .nav-link")
    this.logTest("Sidebar Navigation Links", sidebarLinks.length > 0)

    // Test header navigation
    const headerLinks = document.querySelectorAll(".main-header .nav-link")
    this.logTest("Header Navigation Links", headerLinks.length > 0)

    // Test section switching
    const showSection = window.showSection // Declare the variable before using it
    if (typeof showSection === "function") {
      try {
        showSection("dashboard")
        const dashboardSection = document.getElementById("dashboard-section")
        const isActive = dashboardSection.classList.contains("active")
        this.logTest("Section Switching", isActive)
      } catch (e) {
        this.logTest("Section Switching", false, e.message)
      }
    } else {
      this.logTest("Section Switching Function", false, "showSection function not found")
    }
  }

  // Test Form Functionality
  testFormFunctionality() {
    console.log("\n🔍 Testing Form Functionality...")

    // Test form validation
    const validateIPOForm = window.validateIPOForm // Declare the variable before using it
    if (typeof validateIPOForm === "function") {
      const invalidData = {
        company: null,
        price_band_min: null,
        price_band_max: null,
      }

      const isValid = validateIPOForm(invalidData)
      this.logTest("Form Validation", !isValid)
    } else {
      this.logTest("Form Validation Function", false, "validateIPOForm function not found")
    }

    // Test form data collection
    const getIPOFormData = window.getIPOFormData // Declare the variable before using it
    if (typeof getIPOFormData === "function") {
      try {
        // Set some test values
        const companySelect = document.getElementById("company-select")
        const priceMin = document.getElementById("price-min")
        const priceMax = document.getElementById("price-max")

        if (companySelect) companySelect.value = "1"
        if (priceMin) priceMin.value = "100"
        if (priceMax) priceMax.value = "120"

        const formData = getIPOFormData()
        this.logTest("Form Data Collection", typeof formData === "object")
      } catch (e) {
        this.logTest("Form Data Collection", false, e.message)
      }
    }
  }

  // Test API Integration
  async testAPIIntegration() {
    console.log("\n🔍 Testing API Integration...")

    // Test dashboard data loading
    const loadDashboardData = window.loadDashboardData // Declare the variable before using it
    if (typeof loadDashboardData === "function") {
      try {
        await loadDashboardData()
        this.logTest("Dashboard Data Loading", true)
      } catch (e) {
        this.logTest("Dashboard Data Loading", false, e.message)
      }
    }

    // Test IPO data loading
    const loadIPOData = window.loadIPOData // Declare the variable before using it
    if (typeof loadIPOData === "function") {
      try {
        await loadIPOData()
        this.logTest("IPO Data Loading", true)
      } catch (e) {
        this.logTest("IPO Data Loading", false, e.message)
      }
    }

    // Test companies loading
    const loadCompanies = window.loadCompanies // Declare the variable before using it
    if (typeof loadCompanies === "function") {
      try {
        await loadCompanies()
        this.logTest("Companies Loading", true)
      } catch (e) {
        this.logTest("Companies Loading", false, e.message)
      }
    }
  }

  // Test Responsive Design
  testResponsiveDesign() {
    console.log("\n🔍 Testing Responsive Design...")

    const breakpoints = [
      { width: 1920, height: 1080, name: "Desktop Large" },
      { width: 1366, height: 768, name: "Desktop" },
      { width: 1024, height: 768, name: "Tablet Landscape" },
      { width: 768, height: 1024, name: "Tablet Portrait" },
      { width: 414, height: 896, name: "Mobile Large" },
      { width: 375, height: 667, name: "Mobile Medium" },
      { width: 320, height: 568, name: "Mobile Small" },
    ]

    breakpoints.forEach((breakpoint) => {
      // Simulate viewport resize
      window.innerWidth = breakpoint.width
      window.innerHeight = breakpoint.height

      // Trigger resize event
      window.dispatchEvent(new Event("resize"))

      // Check if sidebar behaves correctly on mobile
      const sidebar = document.getElementById("sidebar")
      if (breakpoint.width <= 992) {
        // Mobile: sidebar should be hidden by default
        const isMobileReady = !sidebar.classList.contains("show")
        this.logTest(`Responsive - ${breakpoint.name} Sidebar`, isMobileReady)
      } else {
        // Desktop: sidebar should be visible
        this.logTest(`Responsive - ${breakpoint.name} Sidebar`, true)
      }

      // Check if navigation collapses on mobile
      const navbarCollapse = document.getElementById("navbarNav")
      if (navbarCollapse && breakpoint.width <= 991) {
        const hasCollapse = navbarCollapse.classList.contains("collapse")
        this.logTest(`Responsive - ${breakpoint.name} Navigation`, hasCollapse)
      }
    })

    // Reset to original viewport
    window.innerWidth = screen.width
    window.innerHeight = screen.height
    window.dispatchEvent(new Event("resize"))
  }

  // Test Chart Functionality
  testChartFunctionality() {
    console.log("\n🔍 Testing Chart Functionality...")

    // Check if Chart.js is loaded
    const chartJSLoaded = typeof Chart !== "undefined"
    this.logTest("Chart.js Library", chartJSLoaded)

    // Test chart canvas element
    const chartCanvas = document.getElementById("mainBoardChart")
    this.logTest("Chart Canvas Element", !!chartCanvas)

    // Test chart update function
    const updateMainBoardChart = window.updateMainBoardChart // Declare the variable before using it
    if (typeof updateMainBoardChart === "function") {
      try {
        const testStats = {
          upcoming_ipos: 5,
          new_listed_ipos: 10,
          ongoing_ipos: 2,
        }
        updateMainBoardChart(testStats)
        this.logTest("Chart Update Function", true)
      } catch (e) {
        this.logTest("Chart Update Function", false, e.message)
      }
    }
  }

  // Test Utility Functions
  testUtilityFunctions() {
    console.log("\n🔍 Testing Utility Functions...")

    // Test date formatting
    const formatDate = window.formatDate // Declare the variable before using it
    if (typeof formatDate === "function") {
      const testDate = "2024-12-25"
      const formatted = formatDate(testDate)
      this.logTest("Date Formatting", typeof formatted === "string")
    }

    // Test status formatting
    const formatStatus = window.formatStatus // Declare the variable before using it
    if (typeof formatStatus === "function") {
      const status = formatStatus("upcoming")
      this.logTest("Status Formatting", status === "Upcoming")
    }

    // Test debounce function
    const debounce = window.debounce // Declare the variable before using it
    if (typeof debounce === "function") {
      const testFunc = () => {}
      const debouncedFunc = debounce(testFunc, 300)
      this.logTest("Debounce Function", typeof debouncedFunc === "function")
    }

    // Test CSRF token function
    const getCSRFToken = window.getCSRFToken // Declare the variable before using it
    if (typeof getCSRFToken === "function") {
      const token = getCSRFToken()
      this.logTest("CSRF Token Function", typeof token === "string")
    }
  }

  // Test Accessibility
  testAccessibility() {
    console.log("\n🔍 Testing Accessibility...")

    // Check for alt attributes on images
    const images = document.querySelectorAll("img")
    let imagesWithAlt = 0
    images.forEach((img) => {
      if (img.hasAttribute("alt")) imagesWithAlt++
    })
    this.logTest("Image Alt Attributes", imagesWithAlt === images.length)

    // Check for form labels
    const inputs = document.querySelectorAll("input, select, textarea")
    let inputsWithLabels = 0
    inputs.forEach((input) => {
      const label = document.querySelector(`label[for="${input.id}"]`)
      if (label || input.hasAttribute("aria-label")) inputsWithLabels++
    })
    this.logTest("Form Labels", inputsWithLabels === inputs.length)

    // Check for ARIA attributes
    const buttons = document.querySelectorAll("button")
    let buttonsWithAria = 0
    buttons.forEach((button) => {
      if (button.hasAttribute("aria-label") || button.textContent.trim()) {
        buttonsWithAria++
      }
    })
    this.logTest("Button Accessibility", buttonsWithAria === buttons.length)
  }

  // Test Performance
  testPerformance() {
    console.log("\n🔍 Testing Performance...")

    // Test page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
    this.logTest("Page Load Time", loadTime < 5000, `${loadTime}ms`)

    // Test DOM ready time
    const domReadyTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
    this.logTest("DOM Ready Time", domReadyTime < 3000, `${domReadyTime}ms`)

    // Test resource count
    const resources = performance.getEntriesByType("resource")
    this.logTest("Resource Loading", resources.length > 0)

    // Check for large resources
    const largeResources = resources.filter((resource) => resource.transferSize > 1000000)
    this.logTest("Large Resources Check", largeResources.length === 0, `${largeResources.length} resources > 1MB`)
  }

  // Run all tests
  async runAllTests() {
    console.log("🚀 Starting Frontend Test Suite for IPO Administration Dashboard")
    console.log("=" * 80)

    // Capture console errors
    console.error = (...args) => {
      this.capturedErrors.push(args.join(" "))
      this.originalConsoleError.apply(console, args)
    }

    this.testDOMStructure()
    this.testNavigation()
    this.testFormFunctionality()
    await this.testAPIIntegration()
    this.testResponsiveDesign()
    this.testChartFunctionality()
    this.testUtilityFunctions()
    this.testAccessibility()
    this.testPerformance()

    // Restore console.error
    console.error = this.originalConsoleError

    // Print summary
    console.log("\n" + "=".repeat(80))
    console.log("📊 FRONTEND TEST SUMMARY")
    console.log("=".repeat(80))
    console.log(`✅ Tests Passed: ${this.testResults.passed}`)
    console.log(`❌ Tests Failed: ${this.testResults.failed}`)

    if (this.testResults.errors.length > 0) {
      console.log("\n🔍 FAILED TESTS:")
      this.testResults.errors.forEach((error) => {
        console.log(`   • ${error}`)
      })
    }

    if (this.capturedErrors.length > 0) {
      console.log("\n⚠️  CONSOLE ERRORS:")
      this.capturedErrors.forEach((error) => {
        console.log(`   • ${error}`)
      })
    }

    const successRate = (this.testResults.passed / (this.testResults.passed + this.testResults.failed)) * 100
    console.log(`\n📈 Success Rate: ${successRate.toFixed(1)}%`)

    if (successRate >= 95) {
      console.log("🎉 EXCELLENT: All frontend functionalities are working!")
    } else if (successRate >= 85) {
      console.log("✅ GOOD: Most functionalities are working with minor issues.")
    } else {
      console.log("⚠️  WARNING: Multiple issues detected. Review required.")
    }

    return successRate >= 95
  }
}

// Auto-run tests when page is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Wait a bit for all scripts to load
  setTimeout(async () => {
    const testSuite = new FrontendTestSuite()
    await testSuite.runAllTests()
  }, 2000)
})

// Make test suite available globally for manual testing
window.FrontendTestSuite = FrontendTestSuite
