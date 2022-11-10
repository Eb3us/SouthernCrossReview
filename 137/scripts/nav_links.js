const navChekboxes = Array.from(document.querySelectorAll("#nav-menu input"))

// Uncheck all other hidden checkboxes when one is checked
// colapses nav-menu dropdowns when a new one is expanded
navChekboxes.forEach(input => {
  input.addEventListener("change", () => {
    navChekboxes.forEach(element => {
      if (element === input) return
      element.checked = false
    })
  })
})

// open diferent files inside "mainPage" div

//URL'S:
const editorsLinkOne = "refuting-darwin-peek.html"
const editorsLinkTwo = "refuting-darwin-esp-peek.html"
const eventsLinkOne = "bacevich-so-it-goes-peek.html"
const antroLinkOne = "steiner-second-coming-2-peek.html"
const reviewLinkOne = "schaefer-salman-peek.html"
const fictionLinkOne = "thurber-mitty-peek.html"
const fictionLinkTwo = "fts-knock-on-wood-peek.html"
const fictionLinkThree = "fts-tocad-madera-peek.html"
const poetryLink1 = "bronson-if-you-knew-peek.html"
const poetryLink2 = "bishop-one-art-peek.html"
const poetryLink3 = "monet-lisel-peek.html"
const poetryLink4 = "faust-prologue-in-heaven-peek.html"
const poetryLink5 = "goethe-faust-peek.html"
const scienceLink1 = "mellet-einstein-peek.html"

//function:
function fetchPeek(pageUrl, sectionKeyword, load) {
  fetch("/137/peeks/" + pageUrl)
    .then(response => response.text())
    .then(html => {
      mainPage.innerHTML = html
      if (!load) {
        window.scrollTo({ top: mainPageTop - 50, behavior: "smooth" })
      }
      menuBar.dataset.opened = "false"
      mainPage.dataset.pageName = sectionKeyword
      checkAndReduce()
    })
    .catch(error => {
      console.log(error)
    })
}

//Listner
document.addEventListener("click", e => {
  if (!e.target.matches(".nav-menu-links")) return
  if (e.target.matches("#editors-link-1")) {
    fetchPeek(editorsLinkOne, "home")
  } else if (e.target.matches("#editors-link-2")) {
    fetchPeek(editorsLinkTwo, "home")
  } else if (e.target.matches("#events-link-1")) {
    fetchPeek(eventsLinkOne, "events")
  } else if (e.target.matches("#antro-link-1")) {
    fetchPeek(antroLinkOne, "antro")
  } else if (e.target.matches("#review-link-1")) {
    fetchPeek(reviewLinkOne, "review")
  } else if (e.target.matches("#fiction-link-1")) {
    fetchPeek(fictionLinkOne, "fiction")
  } else if (e.target.matches("#fiction-link-2")) {
    fetchPeek(fictionLinkTwo, "fiction")
  } else if (e.target.matches("#fiction-link-3")) {
    fetchPeek(fictionLinkThree, "fiction")
  } else if (e.target.matches("#poetry-link-1")) {
    fetchPeek(poetryLink1, "poetry")
  } else if (e.target.matches("#poetry-link-2")) {
    fetchPeek(poetryLink2, "poetry")
  } else if (e.target.matches("#poetry-link-3")) {
    fetchPeek(poetryLink3, "poetry")
  } else if (e.target.matches("#poetry-link-4")) {
    fetchPeek(poetryLink4, "poetry")
  } else if (e.target.matches("#poetry-link-5")) {
    fetchPeek(poetryLink5, "poetry")
  } else if (e.target.matches("#science-link-1")) {
    fetchPeek(scienceLink1, "science")
  }
})
