function changeTitle() {
  const title = document.querySelector("#nav-title")
  let width = screen.width
  if (width < 800) {
  title.innerText = "SCR"
  } else {
  title.innerText = "SouthernCrossReview"
}}
changeTitle()
window.addEventListener('resize', changeTitle)

const user = "southerncrossreview";
const domain = "gmail.com";
const subject = "Comment about Frank Thomas Smith - The J R Baseball Murders";

const email = user + "@" + domain;

const link = document.createElement("a");
link.href = "#";
link.textContent = "Send us your comments about this chapter";
link.onclick = function(e) {
    e.preventDefault();
    window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent(subject);
    return false;
};

// Find the <p> and add the link
document.getElementById("comments").appendChild(link);
