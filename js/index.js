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
// const all_sections = document.querySelectorAll(".to-reveal");

// all_sections.forEach(function (section) {
//   sectionObserver.observe(section);
// });

nav_letters_container.forEach((container) => {
  container.innerHTML = container.textContent.replace(
    /\S/g,
    "<span class='nav-item-letter'>$&</span>"
  );
});
const nav_link_letters = document.querySelectorAll(".nav-item-letter");


// Reveal Elements on Scroll
// const revealSectionImg = function (entries, observer) {
//   const [entry] = entries;
//   if (entry.isIntersecting) {
//       entry.target.classList.add("reveal");
//     observer.unobserve(entry.target);
//   }
// };

// const sectionObserver = new IntersectionObserver(revealSectionImg, {
//   root: null,
//   threshold: 1,
// });


// Momentum scroll with Butter JS
var options = {
  wrapperId: "butter",
  wrapperDamper: 0.06,
  cancelOnTouch: true,
};
// butter.init(options);

// Open the burger menu
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
}
  
burger_icon.addEventListener("click", () => {
  
  toggleMenu();

});

nav_items.forEach((item)=> item.addEventListener("click", toggleMenu))

// Parallax effect

// function parallaxScroll = () => {
//   window.addEventListener('scroll', () => {
//     var value = window.scrollY;
//     name_heading.style.top = (-value * 0.015 + 30) + "%";
//     goal_heading.style.top = (-value * 0.015 + 50) + "%";
//     svg_heading.style.bottom = (value * 0.03 + 15) + "%";
//     welcome_heading.style.bottom = (value * 0.015 + 30) + "%";
//   })
// }

// Header & Footer reveal  on scroll
//========================================
const header = document.querySelector(".header-content");
const footer = document.querySelector("footer");
const project1 = document.querySelector(".project1");
const checkpoint = 800;
const checkpointFooter = project1.getBoundingClientRect().top + document.documentElement.scrollTop;
let opacityHeader = 1;


const hideHeader = (currentScroll) => {
  if (currentScroll < checkpoint) {
    opacityHeader = 1 - currentScroll / 700;
  } else {
    opacityHeader = 0;
  }
  document
    .querySelectorAll(".scroll-opacity")
    .forEach((el) => el.style.setProperty("opacity", opacityHeader));
  opacityHeader === 0 ? header.classList.add("no-display") : header.classList.remove("no-display");
  
}

// const revealfooter = (currentScroll) => {
//   if (currentScroll > checkpointFooter) {
//     opacityFooter = 1;
//     footer.classList.remove("no-display");
//   }
//   else {
//     opacityFooter = 0;
//   }
//   currentScroll < checkpointFooter-500 ? footer.classList.add("no-display") : footer.classList.remove("no-display");
//   footer.style.setProperty("opacity", opacityFooter);
  
// }

window.addEventListener("scroll", () => {
  hideHeader( window.pageYOffset);
// revealfooter(window.pageYOffset)
});



// Circles following cursor ///////////////
//=======================================
const cursorInner = document.querySelector('.cursor');
const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor-circle');
const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

window.addEventListener('mousemove', updateCoordinates);

function getAngle(diffX, diffY) {
    return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

function getSqueeze(diffX, diffY) {
    const distance = Math.sqrt(
        Math.pow(diffX, 2) + Math.pow(diffY, 2)
    );
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

    const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
    const rotate = 'rotate(' + angle +'deg)';
    const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';


    cursorInner.style.transform = translate;
    cursor.style.transform = translate;
    cursorCircle.style.transform = rotate + scale;
};

function loop() {
    updateCursor();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

const cursorModifiers = document.querySelectorAll('a');

const growCursor=()=> {
  cursorCircle.classList.add("cursor-circle-grow");
  cursorInner.style.opacity = "0";
  console.log("hi");
}
const shrinkCursor=()=> {
  cursorCircle.classList.remove("cursor-circle-grow");
  cursorInner.style.opacity = "1";
}


cursorModifiers.forEach(curosrModifier => {
  curosrModifier.addEventListener('mouseenter', growCursor);
  curosrModifier.addEventListener('mouseleave', shrinkCursor);
})

document.querySelectorAll(".cursor-hover").forEach(el => {
  console.log("hi");
  el.addEventListener('mouseenter', growCursor);
  el.addEventListener('mouseleave', shrinkCursor);
})