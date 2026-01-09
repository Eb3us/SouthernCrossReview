import { createNavMenu, createArticlePeek } from "./navmenu.js"
import {
  mainPage,
  topBar,
  previousStylesheet,
  menuButton,
  navMobile,
  menuBar,
  pageName,
} from "./variables.js"

export function mobilePortrait() {
  if (previousStylesheet.dataset.stylesheet == "mobile") return
  pageName.innerHTML = "Menu"
  //create elements in mobile-navbar


  createNavMenu(navMobile)

  //get modify input and label "for" in mobile nav
  const navMobileInputs = Array.from(navMobile.querySelectorAll("input"))
  const navMobileLabels = Array.from(navMobile.querySelectorAll("label"))

  navMobileInputs.forEach(input => {
    input.id += "-mobile"
  })

  navMobileLabels.forEach(label => {
    label.htmlFor += "-mobile"
  })

  //append elements
  topBar.appendChild(navMobile)

  //create observer functions
  let observerMobileMenu = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type == "attributes") {
        if (menuBar.dataset.opened == "true") {
          navMobile.classList.add("open")
          menuButton.classList.add("close")
        } else {
          navMobile.classList.remove("open")
          menuButton.classList.remove("close")
        }
      }
    })
  })

  //create menu open button - three lines
  for (let i = 0; i < 3; i++) {
    const menuButtonLine = document.createElement("div")
    menuButtonLine.className = "menu-button-line"
    menuButton.appendChild(menuButtonLine)
  }
  //give new class to desktop menu
  navMobile.className = "nav-menu menu-mobile desktop-hide"
  //observe for changes
  observerMobileMenu.observe(menuBar, {
    attributes: true,
  })

  //menu button listener
  menuButton.addEventListener("click", () => {
    if (menuBar.dataset.opened === "false") {
      menuBar.dataset.opened = "true"
    } else {
      menuBar.dataset.opened = "false"
    }
  })
  previousStylesheet.dataset.stylesheet = "mobile"

  // musicLinks.innerHTML = "Words and Music"
}
// check screen width and change "words and music"
// if (screen.width >= 651 && screen.width < 1200) {
//   musicLinks.innerHTML = "Music"
// } else {
//   musicLinks.innerHTML = "Words and music"
// }

function mobileLandscape() {
  // musicLinks.innerHTML = "Music"
}
function desktop() {
  // musicLinks.innerHTML = "Words and music"
}
