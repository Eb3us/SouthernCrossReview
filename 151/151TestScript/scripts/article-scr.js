const title = document.querySelector("#nav-title")
function changeTitle() {
  let width = screen.width
  if (width < 800) {
  title.innerText = "SCR"
  } else {
  title.innerText = "SouthernCrossReview"
}}
changeTitle()
window.addEventListener('resize', changeTitle)
