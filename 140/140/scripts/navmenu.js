import { articles } from "./articleObject.js"
import { mainPage, menuBar } from "./variables.js"
const articlesKeys = Object.keys(articles)
const navChekboxes = Array.from(document.querySelectorAll("#nav-menu input"))

// Uncheck all other hidden checkboxes when one is checked
// colapses nav-menu dropdowns when a new one is expanded
export function createNavMenu(navMenuElement) {
  navChekboxes.forEach(input => {
    input.addEventListener("change", () => {
      navChekboxes.forEach(element => {
        if (element === input) return
        element.checked = false
      })
    })
  })

  function createMenuLinks() {
    articlesKeys.forEach(category => {
      if (articles[category].length === 1) {
        const div = document.createElement("div")
        const p = document.createElement("p")
        p.className = "nav-menu-links"
        p.id = articles[category][0]["title"]
        p.innerText = category
        p.dataset.category = category
        div.appendChild(p)
        navMenuElement.appendChild(div)
      } else if (articles[category].length > 1) {
        const content = document
          .querySelector("[data-dropdown-template]")
          .content.cloneNode(true)
        const hiddenInput = content.querySelector("[data-hidden-input]")
        const label = content.querySelector("[data-label]")
        const title = content.querySelector("[data-title]")
        const list = content.querySelector("[data-list]")
        hiddenInput.id = `${category}-input`
        label.htmlFor = hiddenInput.id
        title.innerHTML = `${category} &#9660;`
        articles[category].forEach(article => {
          const li = document.createElement("li")
          li.className = "nav-menu-links"
          li.id = article["title"]
          li.innerText = `${article.title} - ${article.author}`
          li.dataset.category = category
          list.appendChild(li)
        })
        navMenuElement.appendChild(content)
      }
    })
  }
  createMenuLinks()

  //event listeners
  const navmenuLinkArray = Array.from(
    navMenuElement.querySelectorAll(".nav-menu-links")
  )

  navmenuLinkArray.forEach(link => {
    link.addEventListener("click", () => {
      createArticlePeek(link.dataset.category, link.id)
      if (menuBar.dataset.opened === "true") {
        menuBar.dataset.opened = "false"
      }
    })
  })
}
function checkAndReduce() {
  const title = mainPage.querySelector("h2")
  if (title.innerText.length > 20) {
    title.style.fontSize = "2.5em"
  }
}

export function createArticlePeek(category, title) {
  mainPage.innerHTML = ""
  articlesKeys.forEach(group => {
    if (group !== category) return
    articles[group].forEach(article => {
      if (article["title"] !== title) return
      const articleDiv = document
        .querySelector("[data-article-template]")
        .content.cloneNode(true)
      const titleElement = articleDiv.querySelector("h2")
      const author = articleDiv.querySelector("h1")
      const subTitle = articleDiv.querySelector("h3")
      const description = articleDiv.querySelector("[data-article-description]")
      const img = articleDiv.querySelector("[data-article-img]")
      const link = articleDiv.querySelector("[data-article-link]")
      titleElement.innerText = title
      author.innerText = article["author"]
      if (article["sub-title"] && article["sub-title"].length !== 0) {
        subTitle.innerText = article["sub-title"]
      }
      img.src = article["imgUrl"]
      link.href = article["link"]
      let i = 1
      const className = article["title"].replace(/\s/g, "-").toLowerCase()
      article["description"].forEach(descriptionParagraph => {
        const paragraph = document.createElement("p")
        paragraph.innerHTML = descriptionParagraph
        paragraph.className = `${className}-paragraph-${i}`
        description.appendChild(paragraph)
        i++
      })
      mainPage.appendChild(articleDiv)
      checkAndReduce()
    })
  })
}
