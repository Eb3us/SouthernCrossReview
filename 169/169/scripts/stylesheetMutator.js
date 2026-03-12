import { mobilePortrait } from "./mobile.js"
export function mutator() {
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
        }
        if (stylesheetSelector.dataset.stylesheet === "desktop") {
        }
      }
    })
  })
  observerStylesheetAttr.observe(stylesheetSelector, {
    attributes: true,
  })
}
