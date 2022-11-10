// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

//Get content
var content = document.getElementById("content");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
 if (window.pageYOffset >= sticky) {
   navbar.classList.add("sticky");
   content.classList.add("content-top-margin");
 } else {
   navbar.classList.remove("sticky");
   content.classList.remove("content-top-margin");
 }
}

function myFunction2() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
