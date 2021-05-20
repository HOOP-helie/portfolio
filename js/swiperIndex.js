const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
  loop: false,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
    breakpoints: {
      800: {
        slidesPerView: 2,
        spaceBetween: 0
      },
      1100: {
        slidesPerView: 3,
        spaceBetween: 0
      }
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable : true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
 
  });