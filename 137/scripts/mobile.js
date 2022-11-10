if (screen.width <= 650) {
  mobilePortrait()
}
function mobilePortrait() {
  if (previousStylesheet.dataset.stylesheet == "mobile") return

  //create elements in mobile-navbar
  const mobileSubscribeContent = subscribeDiv.cloneNode(true)
  const pageName = document.createElement("p")
  const menuButton = document.createElement("div")
  const navMobile = navMenu.cloneNode(true)

  //asign ids
  pageName.id = "page-name"
  menuButton.id = "menu-button-open-close"
  navMobile.id = "mobile-nav-menu"

  //get modify input and label "for" in mobile nav
  const navMobileInputs = Array.from(navMobile.querySelectorAll("input"))
  const navMobileLabels = Array.from(navMobile.querySelectorAll("label"))

  navMobileInputs.forEach(input => {
    input.id += "-mobile"
  })

  navMobileLabels.forEach(label => {
    label.htmlFor += "-mobile"
  })

  // Uncheck all other hidden checkboxes when one is checked
  // colapses nav-menu dropdowns when a new one is expanded
  navMobileInputs.forEach(input => {
    input.addEventListener("change", () => {
      navMobileInputs.forEach(element => {
        if (element === input) return
        element.checked = false
      })
    })
  })

  //append elements
  menuBar.appendChild(pageName)
  menuBar.appendChild(menuButton)
  topBar.appendChild(navMobile)
  mobileSubscribe.appendChild(mobileSubscribeContent)

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

  let observerPageName = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type == "attributes") {
        if (mainPage.dataset.pageName == "home") {
          pageName.innerHTML = "Editor's Page"
        } else if (mainPage.dataset.pageName == "events") {
          pageName.innerHTML = "Current Events"
        } else if (mainPage.dataset.pageName == "antro") {
          pageName.innerHTML = "Antroposophy"
        } else if (mainPage.dataset.pageName == "fiction") {
          pageName.innerHTML = "Fiction"
        } else if (mainPage.dataset.pageName == "features") {
          pageName.innerHTML = "Features"
        } else if (mainPage.dataset.pageName == "music") {
          pageName.innerHTML = "Words and Music"
        } else if (mainPage.dataset.pageName == "poetry") {
          pageName.innerHTML = "Poetry"
        } else if (mainPage.dataset.pageName == "review") {
          pageName.innerHTML = "Book Review"
        } else if (mainPage.dataset.pageName == "science") {
          pageName.innerHTML = "Science"
        }
      }
    })
  })
  //create menu button - three lines
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
  observerPageName.observe(mainPage, { attributes: true })
  //asign default data attribute
  setTimeout(() => {
    mainPage.dataset.pageName = "home"
  }, 50)
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
