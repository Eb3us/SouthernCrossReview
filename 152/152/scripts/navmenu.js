import { articles } from "./articleObject.js"
import { mainPage, menuBar, prefix } from "./variables.js"
const articlesKeys = Object.keys(articles)

// Uncheck all other hidden checkboxes when one is checked
// colapses nav-menu dropdowns when a new one is expanded
export function createNavMenu(navMenuElement) {

  function createMenuLinks() {
    articlesKeys.forEach(category => {
      // create dropdown menu if there is more than one article in category
      if (articles[category].length === 1) {
        if (!articles[category][0]["title"]) return
        const div = document.createElement("div")
        const p = document.createElement("p")
        const title = articles[category][0]["title"]
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/g, "")
        p.className = "nav-menu-links"
        p.innerText = category
        p.dataset.title = title
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
          const title = article["title"]
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()
          li.className = "nav-menu-links"
          li.id = article["title"]
          li.innerText = `${article.title} - ${article.author}`
          li.dataset.title = title
          list.appendChild(li)
        })
        navMenuElement.appendChild(content)
      }
    })
    const createSingleLink = (title, id) => {
        const div = document.createElement("div")
        const p = document.createElement("p")
        p.className = "nav-menu-links"
        p.innerText = title
        p.dataset.title = id
        div.appendChild(p)
        navMenuElement.appendChild(div)
    }
    createSingleLink("Other Sections", "pic-nav-menu")
    createSingleLink("Subscribe", "subscribe")
  }
  createMenuLinks()

  //event listeners
  const navmenuLinkArray = Array.from(
    navMenuElement.querySelectorAll(".nav-menu-links")
  )
  const scrollToTarget = target => {
    const headerOffset = 120
    const elementPositon = target.getBoundingClientRect().top
    const offsetPosition = elementPositon + window.pageYOffset - headerOffset
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }

  navmenuLinkArray.forEach(link => {
    link.addEventListener("click", () => {
      let article = document.querySelector(`#${link.dataset.title}`)
      scrollToTarget(article)
      if (menuBar.dataset.opened === "true") {
        menuBar.dataset.opened = "false"
      }
    })
  })
  
  const navChekboxes = Array.from(document.querySelectorAll(".nav-hidden-inputs"))

    navChekboxes.forEach(input => {
    input.addEventListener("change", () => {
      navChekboxes.forEach(element => {
        console.log("hi")
        if (element === input) return
        element.checked = false
      })
    })
  })


}
function checkAndReduce() {
  const title = mainPage.querySelector("h2")
  if (title.innerText.length > 20) {
    title.style.fontSize = "2.5em"
  }
}

function appendPicNavMenu() {
  const picNavDiv = document
    .querySelector("[data-pic-nav]")
    .content.cloneNode(true)
  const nav = picNavDiv.querySelector("nav")
  nav.id = "pic-nav-menu"
  const subscribeDiv = document
    .querySelector("[data-subscribe-div]")
    .content.cloneNode(true)
  const subscribe = subscribeDiv.querySelector("div")
  subscribe.id = "subscribe"
  const firstChild = document.querySelector("#main-div").lastElementChild
  const navDiv = document.createElement("div")
  navDiv.appendChild(picNavDiv)
  navDiv.appendChild(subscribe)
  firstChild.insertAdjacentElement("afterend", navDiv)
}

export function createArticlePeek(object) {
  const keys = Object.keys(object)
  keys.forEach(key => {
    if (keys.indexOf(key) !== 0) {
      const categoryTitle = document.createElement("h1")
      categoryTitle.innerText = key
      categoryTitle.className = "category-title"
      mainPage.appendChild(categoryTitle)
    }
    object[key].forEach(article => {
      const articleDiv = document
        .querySelector("[data-article-template]")
        .content.cloneNode(true)
      const articleInnerDiv = articleDiv.querySelector("article")
      const titleElement = articleDiv.querySelector("h2")
      const author = articleDiv.querySelector("h1")
      const subTitle = articleDiv.querySelector("h3")
      const description = articleDiv.querySelector("[data-article-description]")
      const img = articleDiv.querySelector("[data-article-img]")
      const linkContainer = articleDiv.querySelector("[data-link-container]")
      const link = articleDiv.querySelector("[data-article-link]")
      articleInnerDiv.id = article["title"]
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "")
      titleElement.innerHTML = article["title"]
      author.innerHTML = article["author"]
      if (article["sub-title"] && article["sub-title"].length !== 0) {
        subTitle.innerText = article["sub-title"]
      }
      img.src = article["imgUrl"]
      linkContainer.style.display = "flex"
      linkContainer.style.width = "100%"
      linkContainer.style.justifyContent = "center"
      link.href = article["link"]
      link.style.fontSize = "130%"
      link.style.fontWeight = "500"
      // Special Atributes for "Featured Art"
      if (article["mainImg"]) {
        titleElement.style.marginBottom = "1em"
        link.style.display = "none"
        img.style.maxWidth = "80%"
        img.style.maxHeight = "100%"
        img.style.marginLeft = "auto"
        img.style.marginRight = "auto"
        img.style.marginBottom = "1em"
        img.style.float = "none"
        img.insertAdjacentElement("afterend", author)
      }
      // if its a poem, make the div and link float (so the text doesn't go under the img)
      if (article["poem"]) {
        description.style.float = "left"
        link.style.clear = "left"
        link.style.float = "right"
      }
      let i = 1
      const className = article["title"]
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase()
      description.id = `${className}-paragraphs-div`
      link.id = `${className}-main-link`
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
  appendPicNavMenu()
}
