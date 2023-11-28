var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,
    loopedSlides: 5,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  }); 

document.querySelectorAll('.survey_button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
  });
});

const previev = document.querySelector('.img-responsive'),
      slides = document.querySelectorAll('.swiper-slide');
console.log(previev);

slides.forEach(slide => {
    slide.addEventListener('click', () => {
        previev.src = slide.children[0].getAttribute('src');
    });
});
