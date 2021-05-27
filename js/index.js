const burger_icon = document.querySelector(".burger-icon");
const burger_item1 = document.querySelector(".burger-item1");
const burger_item2 = document.querySelector(".burger-item2");
const burger_item3 = document.querySelector(".burger-item3");
const menu_background = document.querySelector(".menu-background");
const nav = document.querySelector(".navigation");
const nav_items = document.querySelectorAll(".navigation-item");

const nav_letters_container = document.querySelectorAll(
  ".nav-link .letters-container"
);

nav_letters_container.forEach((container) => {
  container.innerHTML = container.textContent.replace(
    /\S/g,
    "<span class='nav-item-letter'>$&</span>"
  );
});
const nav_link_letters = document.querySelectorAll(".nav-item-letter");


// Reveal Elements (opacity only) on Scroll
const revealOpacity = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
    observer.unobserve(entry.target);
  }
};

const opacityObserver = new IntersectionObserver(revealOpacity, {
  root: null,
  threshold: 1,
});

const all_opacity = document.querySelectorAll(".to-reveal");
all_opacity.forEach(function (section) {
  opacityObserver.observe(section);
});


// Reveal Elements (opacity + slideup )on Scroll
const revealSlide = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
      entry.target.classList.add("slide-up");
    observer.unobserve(entry.target);
  }
};

const slideObserver = new IntersectionObserver(revealSlide, {
  root: null,
  threshold: 1,
});

const all_slideup = document.querySelectorAll(".to-slide-up");
all_slideup.forEach(function (section) {
  slideObserver.observe(section);
});


// Reveal Elements (opacity + slideup )on Scroll threshold sooner
const revealSlide2 = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
      entry.target.classList.add("slide-up");
    observer.unobserve(entry.target);
  }
};

const slideObserver2 = new IntersectionObserver(revealSlide2, {
  root: null,
  threshold: 0.1,
});

const all_slideup2 = document.querySelectorAll(".to-slide-up2");
all_slideup2.forEach(function (section) {
  slideObserver2.observe(section);
});

// Header animation when loading finishes
const portfolioContent = document.querySelector("#portfolio-content");
const headerTitle = document.querySelector(".header-title");
const helloTitle = document.querySelector(".hello-title");
const nameTitle = document.querySelector(".name-title");
const subtitle = document.querySelector(".subtitle");
const headerElementsReveal = document.querySelectorAll(".header-reveal");
const burger = [burger_icon, menu_background];
document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    portfolioContent.style.visibility = "hidden";
  } else {
    setTimeout(() => {
      document.querySelector("body").classList.add("loaded");
      portfolioContent.style.visibility = "visible";
      setTimeout(() => {
        helloTitle.classList.add("anim-text-clip");
      }, 1200);
      setTimeout(() => {
        nameTitle.classList.add("anim-text-clip");
      }, 1900);
      setTimeout(() => {
        headerTitle.classList.add("anim-outer-left");
        helloTitle.classList.add("anim-inner-left");
      }, 3200);
      setTimeout(() => {
        subtitle.classList.add("subtitle-reveal");
      }, 4100);
      setTimeout(() => {
        headerElementsReveal.forEach((el) =>
          el.classList.add("header-reveal-end"));
        burger.forEach(el => el.classList.add("burger-reveal"));
      },5200);
      setTimeout(() => {
        headerElementsReveal.forEach((el) =>
          el.style.setProperty("transition", "none")
        );
        headerTitle.style.setProperty("transition", "none")
      }, 5500);
    }, 900);
   
  }
};


// Menu Indicator======================
//======================================
const navIndicatorContent = document.querySelector("#navigation-indicator p");
const navIndicator = document.querySelector("#navigation-indicator");
const navBullets = document.querySelectorAll(".nav-bullet");



// Navigation indicator change text
const navIndicatorChange = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting || (entry.isIntersecting && entry.isVisible)) {
    navIndicatorContent.innerHTML = entry.target.dataset.indicator
      ? entry.target.dataset.indicator
      : "";
    navBullets.forEach((bullet) => bullet.classList.remove("bullet-grow"));
    document
      .querySelector(`.bullet${entry.target.dataset.number}`)
      .classList.add("bullet-grow");
  }
};

const navObserver = new IntersectionObserver(navIndicatorChange, {
  root: null,
  threshold: 0.2,
});

document
  .querySelectorAll(".section-observe")
  .forEach((section) => navObserver.observe(section));



// Open the burger menu================
//======================================
let menuIsOpen = false;
const toggleMenu = () => {
  let t = 0;
  menuIsOpen = !menuIsOpen;
  burger_item2.classList.toggle("opacity-hidden");
  burger_item1.classList.toggle("burger-item1-anim");
  burger_item3.classList.toggle("burger-item3-anim");
  burger_icon.classList.toggle("burger-icon-rotate");
  burger_icon.classList.toggle("pulse");
  menu_background.classList.toggle("menu-background-open");
  nav.classList.toggle("visible-nav");
  if (menuIsOpen) {
    nav_letters_container.forEach((container) => {
      let i = 200;
      setTimeout(() => {
        container.querySelectorAll(".nav-item-letter").forEach((letter) => {
          setTimeout(() => {
            letter.classList.toggle("nav-item-letter-visible");
          }, i);
          i += 30;
        });
      }, t);
      t += 280;
    });
  } else {
    nav_link_letters.forEach((letter) =>
      letter.classList.toggle("nav-item-letter-visible")
    );
  }
};

burger_icon.addEventListener("click", () => {
  toggleMenu();
});

nav_items.forEach((item) => item.addEventListener("click", toggleMenu));



// Header hide  on scroll
//========================================
const header = document.querySelector(".header-content");
const footer = document.querySelector("footer");
const project1 = document.querySelector(".project1");
const checkpoint = 800;
const checkpointFooter =
  project1.getBoundingClientRect().top + document.documentElement.scrollTop;
let opacityHeader = 1;

const hideHeader = (currentScroll) => {
  if (currentScroll < checkpoint) {
    opacityHeader = 1 - currentScroll / 500;
    navIndicator.style.opacity = 0;
  } else {
    opacityHeader = 0;
    navIndicator.style.opacity = 1;
  }
  document
    .querySelectorAll(".scroll-opacity")
    .forEach((el) => el.style.setProperty("opacity", opacityHeader));
  opacityHeader === 0
    ? header.classList.add("no-display")
    : header.classList.remove("no-display");
};

window.addEventListener("scroll", () => {
  hideHeader(window.pageYOffset);
});


// Circles following cursor =============
//=======================================
const cursorInner = document.querySelector(".cursor");
const cursor = document.querySelector("#cursor");
const cursorCircle = cursor.querySelector(".cursor-circle");
const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

window.addEventListener("mousemove", updateCoordinates);

function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  const maxSqueeze = 0.15;
  const accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}

const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);

  pos.x += diffX * speed;
  pos.y += diffY * speed;

  const angle = getAngle(diffX, diffY);
  const squeeze = getSqueeze(diffX, diffY);

  const scale = "scale(" + (1 + squeeze) + ", " + (1 - squeeze) + ")";
  const rotate = "rotate(" + angle + "deg)";
  const translate = "translate3d(" + pos.x + "px ," + pos.y + "px, 0)";

  cursorInner.style.transform = translate;
  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

const cursorModifiers = document.querySelectorAll("a");

const growCursor = () => {
  cursorCircle.classList.add("cursor-circle-grow");
  cursorInner.style.opacity = "0";
};
const shrinkCursor = () => {
  cursorCircle.classList.remove("cursor-circle-grow");
  cursorInner.style.opacity = "1";
};

cursorModifiers.forEach((curosrModifier) => {
  curosrModifier.addEventListener("mouseenter", growCursor);
  curosrModifier.addEventListener("mouseleave", shrinkCursor);
});

document.querySelectorAll(".cursor-hover").forEach((el) => {
  el.addEventListener("mouseenter", growCursor);
  el.addEventListener("mouseleave", shrinkCursor);
});
