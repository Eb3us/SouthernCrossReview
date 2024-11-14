import { articles } from "./articleObject.js";
import { mainPage, menuBar, prefix } from "./variables.js";
const articlesKeys = Object.keys(articles);

// Uncheck all other hidden checkboxes when one is checked
// colapses nav-menu dropdowns when a new one is expanded
export function createNavMenu(navMenuElement) {
  function createMenuLinks() {
    articlesKeys.forEach((category) => {
      // create dropdown menu if there is more than one article in category
      if (articles[category].length === 1) {
        if (!articles[category][0]["title"]) return;
        const div = document.createElement("div");
        const p = document.createElement("p");
        const title = articles[category][0]["title"]
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/g, "");
        p.className = "nav-menu-links";
        p.innerText = category;
        p.dataset.title = title;
        div.appendChild(p);
        navMenuElement.appendChild(div);
      } else if (articles[category].length > 1) {
        const content = document
          .querySelector("[data-dropdown-template]")
          .content.cloneNode(true);
        const hiddenInput = content.querySelector("[data-hidden-input]");
        const label = content.querySelector("[data-label]");
        const title = content.querySelector("[data-title]");
        const list = content.querySelector("[data-list]");
        hiddenInput.id = `${category}-input`;
        label.htmlFor = hiddenInput.id;
        title.innerHTML = `${category} &#9660;`;
        articles[category].forEach((article) => {
          const li = document.createElement("li");
          const title = article["title"]
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase();
          li.className = "nav-menu-links";
          li.id = article["title"];
          li.innerText = `${article.title} - ${article.author}`;
          li.dataset.title = title;
          list.appendChild(li);
        });
        navMenuElement.appendChild(content);
      }
    });
    const createSingleLink = (title, id) => {
      const div = document.createElement("div");
      const p = document.createElement("p");
      p.className = "nav-menu-links";
      p.innerText = title;
      p.dataset.title = id;
      div.appendChild(p);
      navMenuElement.appendChild(div);
    };
    //createSingleLink("Letters to the Editor", "pic-nav-menu");
    createSingleLink("Other Sections", "pic-nav-menu");
    createSingleLink("Subscribe", "subscribe");
  }
  createMenuLinks();

  //event listeners
  const navmenuLinkArray = Array.from(
    navMenuElement.querySelectorAll(".nav-menu-links"),
  );
  const scrollToTarget = (target) => {
    const headerOffset = 120;
    const elementPositon = target.getBoundingClientRect().top;
    const offsetPosition = elementPositon + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  navmenuLinkArray.forEach((link) => {
    link.addEventListener("click", () => {
      let article = document.querySelector(`#${link.dataset.title}`);
      scrollToTarget(article);
      if (menuBar.dataset.opened === "true") {
        menuBar.dataset.opened = "false";
      }
    });
  });

  const navChekboxes = Array.from(
    document.querySelectorAll(".nav-hidden-inputs"),
  );

  navChekboxes.forEach((input) => {
    input.addEventListener("change", () => {
      navChekboxes.forEach((element) => {
        console.log("hi");
        if (element === input) return;
        element.checked = false;
      });
    });
  });
}
function checkAndReduce() {
  const title = mainPage.querySelector("h2");
  if (title.innerText.length > 20) {
    title.style.fontSize = "2.5em";
  }
}

function appendPicNavMenu() {
  const picNavDiv = document
    .querySelector("[data-pic-nav]")
    .content.cloneNode(true);
  const nav = picNavDiv.querySelector("nav");
  nav.id = "pic-nav-menu";
  const subscribeDiv = document
    .querySelector("[data-subscribe-div]")
    .content.cloneNode(true);
  const subscribe = subscribeDiv.querySelector("div");
  subscribe.id = "subscribe";
  const firstChild = document.querySelector("#main-div").lastElementChild;
  const navDiv = document.createElement("div");
  navDiv.appendChild(picNavDiv);
  navDiv.appendChild(subscribe);
  firstChild.insertAdjacentElement("afterend", navDiv);
}

function doubleFeaturedArt({
  div1,
  div2,
  titleElement,
  subTitle,
  articleInnerDiv,
  img,
  description,
}) {
  div1.id = "i-have-id";
  titleElement.innerHTML = "Reincarnation Blues and Other Poems";
  div2.id = "me-too";
  const titleElement2 = div2.querySelector("h2");
  titleElement2.innerHTML = "Reincarnation Blues<br/>Cantos";
  titleElement2.style.fontSize = "2.5em";
  div1.style.width = window.screen.width > 1200 ? "50%" : "80%";
  div2.style.width = window.screen.width > 1200 ? "50%" : "80%";
  subTitle.style.display = "none";
  const subTitle2 = div2.querySelector("h3");
  subTitle2.style.display = "none";
  articleInnerDiv.style.display = "flex";
  articleInnerDiv.style.flexDirection =
    window.screen.width > 1200 ? "row" : "column";
  articleInnerDiv.style.alignItems = "center";
  img.src = `${prefix}reincarnation-blues-back-cover.png`;
  const img2 = div2.querySelector("[data-article-img]");
  img2.src = `${prefix}reincarnation-blues-cover.png`;
  img2.style.width = "100%";
  const description2 = div2.querySelector("[data-article-description]");
  const div1p1 = document.createElement("p");
  const div2p1 = document.createElement("p");
  div2p1.style.textAlign = "center";
  div2p1.innerHTML =
    'An audio-visual presentantion<br />Voices: Frank Thomas Smith – María Teresa Gutiérrez<br/>Music & tech: Nicolás Gawain Smith<br/>Art: Celina MacKern<br/>Listen at:<br /><br/><a href="https://southerncrossreview.org/reincarnation_blues/reincarnation-blues-intro.html">SouthernCrossReview.org</a></br><a href="https://youtube.com/playlist?list=OLAK5uy_mLbIFxgXRN_siL8NTwbrt8G4l2O1n1wb8&si=D5x68a1a5kmdV6Ay">YouTube</a><br/><a href="https://open.spotify.com/intl-es/album/3sn1lIfbo7STn2HV6jjpp4?si=tNo1njxiRNS800yXvSujCg">Spotify</a>';
  div1p1.innerHTML =
    'Fifty poems plus the twelve Reincarnation Blues Cantos by Frank Thomas Smith with illustrations by Celina MacKern for puchase at Amazon <a href="https://www.amazon.com/Reincarnation-Blues-Frank-Thomas-Smith/dp/1948302551">Reincarnation Blues and Other Stories</a>';
  img2.style.maxWidth = "80%";
  img2.style.maxHeight = "100%";
  img2.style.marginLeft = "auto";
  img2.style.marginRight = "auto";
  img2.style.marginBottom = "1em";
  img2.style.float = "none";
  const link2 = div2.querySelector("[data-article-link]");
  link2.style.display = "none";
  description.appendChild(div1p1);
  description2.appendChild(div2p1);
  articleInnerDiv.appendChild(div2);
  window.addEventListener("resize", () => {
    div1.style.width = window.screen.width > 1200 ? "50%" : "80%";
    div2.style.width = window.screen.width > 1200 ? "50%" : "80%";
    articleInnerDiv.style.flexDirection =
      window.screen.width > 1200 ? "row" : "column";
  });
}

export function createArticlePeek(object) {
  const keys = Object.keys(object);
  keys.forEach((key) => {
    if (keys.indexOf(key) !== 0) {
      const categoryTitle = document.createElement("h1");
      categoryTitle.innerText = key;
      categoryTitle.className = "category-title";
      mainPage.appendChild(categoryTitle);
    }
    object[key].forEach((article) => {
      const articleDiv = document
        .querySelector("[data-article-template]")
        .content.cloneNode(true);
      const articleInnerDiv = articleDiv.querySelector("article");
      const div1 = articleDiv.querySelector("div");
      const div2 = div1.cloneNode(true);
      const titleElement = articleDiv.querySelector("h2");
      const author = articleDiv.querySelector("h1");
      const subTitle = articleDiv.querySelector("h3");
      const description = articleDiv.querySelector(
        "[data-article-description]",
      );
      const img = articleDiv.querySelector("[data-article-img]");
      const linkContainer = articleDiv.querySelector("[data-link-container]");
      const link = articleDiv.querySelector("[data-article-link]");
      articleInnerDiv.id = article["title"]
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "");
      titleElement.innerHTML = article["title"];
      author.innerHTML = article["author"];
      if (article["sub-title"] && article["sub-title"].length !== 0) {
        subTitle.innerText = article["sub-title"];
      }
      img.src = article["imgUrl"];
      linkContainer.style.display = "flex";
      linkContainer.style.width = "100%";
      linkContainer.style.justifyContent = "center";
      link.href = article["link"];
      link.style.fontSize = "130%";
      link.style.fontWeight = "500";
      // Special Atributes for "Featured Art"
      if (article["mainImg"]) {
     //   doubleFeaturedArt({
     //     div1,
     //     div2,
     //     titleElement,
     //     subTitle,
     //     articleInnerDiv,
     //     img,
     //     description,
     //   });
        titleElement.style.marginBottom = "1em";
        link.style.display = "none";
        img.style.maxWidth = "40%";
        img.style.maxHeight = "100%";
        img.style.marginLeft = "auto";
        img.style.marginRight = "auto";
        img.style.marginBottom = "1em";
        img.style.float = "none";
        img.insertAdjacentElement("afterend", author);
      }
      // if its a poem, make the div and link float (so the text doesn't go under the img)
      if (article["poem"]) {
        description.style.float = "left";
        link.style.clear = "left";
        link.style.float = "right";
      }
      let i = 1;
      const className = article["title"]
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
      description.id = `${className}-paragraphs-div`;
      link.id = `${className}-main-link`;
      article["description"].forEach((descriptionParagraph) => {
        const paragraph = document.createElement("p");
        paragraph.innerHTML = descriptionParagraph;
        paragraph.className = `${className}-paragraph-${i}`;
        description.appendChild(paragraph);
        i++;
      });
      mainPage.appendChild(articleDiv);
      checkAndReduce();
    });
  });
  appendPicNavMenu();
}
