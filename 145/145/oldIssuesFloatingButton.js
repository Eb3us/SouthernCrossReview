function oldIssues() {
  const currentUrl = window.location.href
  const regex = /index\d+\.html/g
  if (regex.test(currentUrl)) {
    const floatingLink = document.createElement("div")
    const body = document.querySelector("body")
    floatingLink.style.width = "auto"
    floatingLink.style.height = "auto"
    floatingLink.style.opacity = "0.7"
    floatingLink.style.backgroundColor = "#0af"
    floatingLink.style.color = "#fff"
    floatingLink.style.position = "fixed"
    floatingLink.style.right = "2em"
    floatingLink.style.bottom = "2em"
    floatingLink.style.padding = "1em"
    floatingLink.style.borderRadius = "10px"
    floatingLink.style.fontSize = "1.5em"
    floatingLink.style.fontWeight = "bold"
    floatingLink.style.cursor = "pointer"
    floatingLink.style.boxShadow = "0px 2px 7px black"
    floatingLink.innerHTML = "<< Back to Old Issues..."
    floatingLink.addEventListener("mouseover", () => {
      floatingLink.style.opacity = "0.9"
    })
    floatingLink.addEventListener("mouseout", () => {
      floatingLink.style.opacity = "0.7"
    })
    floatingLink.addEventListener("click", () => {
      window.location = "https://southerncrossreview.org/old-issues.html"
    })
    body.appendChild(floatingLink)
  }
}
oldIssues()
