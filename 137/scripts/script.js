const stylesheet = document.querySelector("#stylesheet")
const toggleStylesheetLightButton = document.querySelector("#light")
const toggleStylesheetDarkButton = document.querySelector("#dark")
const navMenu = document.querySelector("#nav-menu")
const antroLinks = document.querySelector("#nav-antro")
const musicLinks = document.querySelector("#nav-music")
const navDivTop = navMenu.offsetTop
const mainPage = document.querySelector("#main-div")
const facebookShare = document.querySelector("#logo-face")
const topBar = document.querySelector("#top-bar")
const lightDarkWarning = document.querySelector("#light-dark-warning")
const subscribeDiv = document.querySelector("#subscribe")
const subscribeTop = subscribeDiv.offsetTop
const abnormalLogo = document.querySelector("#logo")
const abnormalLogoStylesheet = document.querySelector("#logo-stylesheet")
const footerAbnormal = document.querySelector("#footer-fourth")
const mobileSubscribe = document.querySelector("#mobile-subscribe")
const introScreen = document.querySelector("[data-intro-screen]")
const menuBar = document.querySelector("#mobile-menu-bar")
let mainPageTop = 0

//scroll to top on refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0)
}

//create elements for data-attributes
const stylesheetSelector = document.createElement("div")
const previousStylesheet = document.createElement("div")

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
      if (stylesheetSelector.dataset.stylesheet === "medium") {
        mobileLandscape()
      }
      if (stylesheetSelector.dataset.stylesheet === "desktop") {
        desktop()
      }
    }
  })
})
observerStylesheetAttr.observe(stylesheetSelector, {
  attributes: true,
})

//onload functions
window.addEventListener("load", () => {
  fetchPeek(editorsLinkOne, "home", true)
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
    stylesheet.href = "/css/light.css"
  }
})



//function to check the length in title and reduce font-size if long
function checkAndReduce() {
  const title = document.querySelector("#main-div h2")
  if (title.innerText.length > 20) {
    title.style.fontSize = "2.5em"
  }
}

//remove light-and-dark warning onclick
lightDarkWarning.addEventListener("click", () => {
  lightDarkWarning.style.display = "none"
})

// Toggle Stylesheets
toggleStylesheetLightButton.addEventListener("click", () => {
  stylesheet.href = "/css/light.css"
  localStorage.setItem("style", "light")
})
toggleStylesheetDarkButton.addEventListener("click", () => {
  stylesheet.href = "/css/dark.css"
  localStorage.setItem("style", "dark")
})

//observer function, scroll-in abnormal logo when footer is 50% visible
let notFirstTime = 0
const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting === true) {
      if (notFirstTime > 0) return
      abnormalLogoStylesheet.href = "/css/logo2.css"
      abnormalLogo.classList.add("logo-animation")
      notFirstTime++
    }
  },
  { threshold: [0.5] }
)

observer.observe(footerAbnormal)





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


