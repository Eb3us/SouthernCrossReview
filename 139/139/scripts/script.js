import { createNavMenu, createArticlePeek } from "./navmenu.js"
import { mobilePortrait } from "./mobile.js"
import {
  stylesheet,
  toggleStylesheetLightButton,
  toggleStylesheetDarkButton,
  navMenu,
  navDivTop,
  mainPage,
  topBar,
  lightDarkWarning,
  subscribeDiv,
  subscribeTop,
  abnormalLogo,
  abnormalLogoStylesheet,
  footerAbnormal,
  mobileSubscribe,
  introScreen,
  menuBar,
  stylesheetSelector,
  previousStylesheet,
  prefix,
} from "./variables.js"
let mainPageTop = 0

//scroll to top on refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0)
}

//create elements for data-attributes

// function to set data atributes acording to screen width
function setStylesheetDataAttr() {
  if (screen.width <= 650) {
    if (stylesheetSelector.dataset.stylesheet == "mobile") return
    stylesheetSelector.dataset.stylesheet = "mobile"
  } else if (screen.width >= 651 && screen.width < 1200) {
    if (stylesheetSelector.dataset.stylesheet == "medium") return
    stylesheetSelector.dataset.stylesheet = "medium"
  } else {
    if (stylesheetSelector.dataset.stylesheet == "desktop") return
    stylesheetSelector.dataset.stylesheet = "desktop"
  }
}

//execute on rezise
window.addEventListener("resize", () => {
  setStylesheetDataAttr()
})

//ovserve changes on data-attributes and execute functions
let observerStylesheetAttr = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type == "attributes") {
      if (stylesheetSelector.dataset.stylesheet === "mobile") {
        mobilePortrait()
      }
    }
  })
})
observerStylesheetAttr.observe(stylesheetSelector, {
  attributes: true,
})

//onload functions
window.addEventListener("load", () => {
  setStylesheetDataAttr()
  // antroLinks.classList.add("nav-height")
  mainPageTop = mainPage.offsetTop
  introScreen.classList.add("fade-out")
  setTimeout(() => {
    introScreen.style.display = "none"
    document.querySelector("html").style.overflowY = "visible"
    lightDarkWarning.classList.remove("desktop-hide", "mobile-hide")
  }, 1000)

  //local storage - if exists change theme
  if (!localStorage.getItem("style")) return
  lightDarkWarning.style.display = "none"
  const lightOrDark = localStorage.getItem("style")
  if (lightOrDark === "light") {
    stylesheet.href = `${prefix}css/light.css`
  }

  if (screen.width <= 650) {
    mobilePortrait()
  }
})

//remove light-and-dark warning onclick
lightDarkWarning.addEventListener("click", () => {
  lightDarkWarning.style.display = "none"
})

// Toggle Stylesheets
toggleStylesheetLightButton.addEventListener("click", () => {
  stylesheet.href = `${prefix}css/light.css`
  localStorage.setItem("style", "light")
})
toggleStylesheetDarkButton.addEventListener("click", () => {
  stylesheet.href = `${prefix}css/dark.css`
  localStorage.setItem("style", "dark")
})

//observer function, scroll-in abnormal logo when footer is 50% visible
let notFirstTime = 0
const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting === true) {
      if (notFirstTime > 0) return
      abnormalLogoStylesheet.href = `${prefix}css/logo2.css`
      abnormalLogo.classList.add("logo-animation")
      notFirstTime++
    }
  },
  { threshold: [0.5] }
)

observer.observe(footerAbnormal)
createNavMenu(navMenu)

createArticlePeek("Title Page", "Murder Most Foul")

//--------------------------------
// Change navbar position to fixed on scroll
// function navMenuPositionFixed() {
//   if (window.pageYOffset + 55 >= navDivTop) {
//     navMenu.classList.add("fixed")
//   } else {
//     navMenu.classList.remove("fixed")
//   }
// }
// window.onscroll = () => {
//   navMenuPositionFixed()
// }
//-------------------
