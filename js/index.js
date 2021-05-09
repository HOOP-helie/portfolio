const circle_cursor = document.querySelector(".circle-cursor");
const burger_icon = document.querySelector(".burger-icon");
const burger_item1 = document.querySelector(".burger-item1");
const burger_item2 = document.querySelector(".burger-item2");
const burger_item3 = document.querySelector(".burger-item3");
const menu_background = document.querySelector(".menu-background");
const nav = document.querySelector(".navigation");
const nav_items = document.querySelectorAll(".navigation-item");
const smiley = document.querySelector(".smiley-face");
const cv_btn = document.querySelector(".cv-btn");
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
const name_heading = document.querySelector('.name');
const goal_heading = document.querySelector('.goal');
const svg_heading = document.querySelector('.svg-circle');
const welcome_heading = document.querySelector('.welcome-msg');
const main = document.querySelector('main')



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
  wrapperId: 'butter',
  wrapperDamper: 0.07,
  cancelOnTouch: true,
};
butter.init(options)


// Open the burger menu
let menuIsOpen = false;
burger_icon.addEventListener("click", () => {
  menuIsOpen = !menuIsOpen;
  let t = 0;
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
    nav_link_letters.forEach((letter)=> letter.classList.toggle("nav-item-letter-visible"))
  }
});

// Follow cursor 
// document.addEventListener("mousemove", function (e) {
//     circle_cursor.style.left = `${e.pageX}px`;
//   circle_cursor.style.top = `${e.pageY}px`;
//   });

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


// Header content disappearing on scroll
const checkpoint = 800;
window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
  if (currentScroll < checkpoint) {
      opacity = 1 - currentScroll/700;
  } else {
    opacity = 0;
  }
    document.querySelectorAll(".scroll-opacity").forEach((el)=> 
        el.style.setProperty("opacity", opacity))
});


// let doit;
// let butterInit = () => {
//   if(window.innerWidth>1000)butter.init(options);

// }
// window.addEventListener("resize", () => {
//   clearTimeout(doit);

//   doit=setTimeout(()=>console.log(window.innerWidth),1000)
// })

