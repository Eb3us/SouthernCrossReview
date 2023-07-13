export {
  stylesheet,
  toggleStylesheetLightButton,
  toggleStylesheetDarkButton,
  navMenu,
  navDivTop,
  mainPage,
  topBar,
  lightDarkWarning,
  abnormalLogo,
  abnormalLogoStylesheet,
  footerAbnormal,
  introScreen,
  stylesheetSelector,
  previousStylesheet,
  //mobile
  menuButton,
  navMobile,
  menuBar,
  pageName,
  prefix,
}
const stylesheet = document.querySelector("#stylesheet")
const toggleStylesheetLightButton = document.querySelector("#light")
const toggleStylesheetDarkButton = document.querySelector("#dark")
const navMenu = document.querySelector("#nav-menu")
const navDivTop = navMenu.offsetTop
const mainPage = document.querySelector("#main-div")
const topBar = document.querySelector("#top-bar")
const lightDarkWarning = document.querySelector("#light-dark-warning")
const abnormalLogo = document.querySelector("#logo")
const abnormalLogoStylesheet = document.querySelector("#logo-stylesheet")
const footerAbnormal = document.querySelector("#footer-fourth")
const introScreen = document.querySelector("[data-intro-screen]")
const stylesheetSelector = document.createElement("div")
const previousStylesheet = document.createElement("div")
const menuButton = document.querySelector("#menu-button-open-close")
const navMobile = document.querySelector("#mobile-nav-menu")
const menuBar = document.querySelector("#mobile-menu-bar")
const pageName = document.querySelector("#page-name")
/*change prefix from "./" for test page inside the issue's 
folder to "./issues-number/" for root index file */
const prefix = "./150/"
