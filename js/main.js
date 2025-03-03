"use strict";
(function () { //самовызывающаяся функция, чтоб не объявлять глобальные переменные, чтоб не было конфликтов
  //BURGER
  const body = document.body
  document.addEventListener('click', burgerInit)
  function burgerInit(e) {    
    const burgerIcon = e.target.closest('.burger') //Метод, который возвращает ближайший родительский элемент или его самого
    const burgerNavLink = e.target.closest('.header__nav-link')
    if (!burgerIcon && !burgerNavLink) return //если удовлетворяет условию, то дальше читаться не будет
    if (document.documentElement.clientWidth > 1000) return //измерение ширины окна  
    body.classList.toggle('body--opened-menu') 
    document.addEventListener("keydown", function (event) {
      if (event.key == "Escape" && body.classList.contains("body--opened-menu")) {
          body.classList.toggle("body--opened-menu");
      }
    });
  }
  //ФОРМА ОБРАТНОЙ СВЯЗИ
  const feedbackForm = document.querySelector('.feedback-form')
  const overlay = document.querySelector('.overlay')
  const closeIconFeedback = document.querySelector('.feedback-form__close-icon')
  const thanksForm = document.querySelector('.thanks-form')
  const closeIconThanks = document.querySelector('.thanks-form__close-icon')

  document.querySelector('.header__body-button').addEventListener('click', () => {
    activeFeedbackForm()
  })
  document.addEventListener("keydown", function (event) {
    if (event.key == "Escape" && body.classList.contains("body--fixed") && feedbackForm.classList.contains('feedback-form--active') && overlay.classList.contains('active')) {
      activeFeedbackForm()
    }
  })  
  function activeFeedbackForm() {
    body.classList.toggle('body--fixed')
    feedbackForm.classList.toggle('feedback-form--active')
    overlay.classList.toggle('active')
  }
  function activeThanksForm() {
    thanksForm.classList.toggle('active')
    body.classList.toggle('body--fixed')
    overlay.classList.toggle('active')
  }
  closeIconFeedback.addEventListener("click", function () {
    activeFeedbackForm()
  })  
  overlay.addEventListener("click", function () {
    if(!feedbackForm.classList.contains('feedback-form--active')) return
    if(feedbackForm.classList.contains('feedback-form--active')) activeFeedbackForm()
  })
  document.querySelector('.feedback-form__btn').addEventListener('click', (e) => {
    e.preventDefault()
    feedbackForm.classList.remove('feedback-form--active')
    thanksForm.classList.add('active')
    // activeFeedbackForm()
    // activeThanksForm()
    })
  document.addEventListener("keydown", function (event) {
    if (event.key == "Escape" && body.classList.contains("body--fixed") && thanksForm.classList.contains('active') && overlay.classList.contains('active')) {
      activeThanksForm()
    }
  })
  closeIconThanks.addEventListener("click", function () {
    activeThanksForm()
  }) 
  overlay.addEventListener("click", function () {
    if(!thanksForm.classList.contains('active')) return
    if(thanksForm.classList.contains('active')) activeThanksForm()
  })
 //certificate
  document.querySelector('.certificate__btn').addEventListener('click', () => {
    activeFeedbackForm()
  })
  //SLIDER Our Works

const slider = document.querySelector(".our-work__slider");
const slides = document.querySelectorAll(".our-work__slide");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
const dotsContainer = document.querySelector(".dots");
const activeSlide = document.querySelector(".our-work__slide--active");

function createDots() {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `
      <button class="dots__dot" data-slide="${i}"></button>
    `
    );
  });
}
function activateDots(slide) {
  document.querySelectorAll(".dots__dot").forEach(function (dot) {
    dot.classList.remove("dots__dot--active");
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
}
createDots();
activateDots(0);

let current = 0, 
    prev = 0, 
    next = 0;

const prevSlide = () =>
  current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);
const nextSlide = () => 
  (current < slides.length - 1 ? gotoNum(current + 1) : gotoNum(0));

function gotoNum(number) {
  current = number;
  prev = current - 1;
  next = current + 1;
  slides.forEach(slide => slide.classList.remove("our-work__slide--prev", "our-work__slide--active", "our-work__slide--next"));  
  if (next === slides.length) {
    next = 0;
  }
  if (prev === -1) {
    prev = slides.length - 1;
  }
  slides[prev].classList.add("our-work__slide--prev");
  slides[current].classList.add("our-work__slide--active");
  slides[next].classList.add("our-work__slide--next");
  activateDots(current);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = +e.target.dataset.slide;
    gotoNum(slide);
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  }
  if (e.key === "ArrowRight") {
    nextSlide();
  }
});

const openSlider = document.querySelector(".slider-open");
const openSliderWrap = document.querySelector(".slider-open__wrapper");
const btnRightOpen = document.querySelector(".slider-open__btn--right");
const btnLeftOpen = document.querySelector(".slider-open__btn--left");

slider.addEventListener('click', function (e) {
  if (e.target.parentNode.classList.contains("our-work__slide--active")) {
    openSlider.classList.remove('hiddenSlider');
    slider.classList.add('hiddenSlider');
    let slideClone = null;
    slides.forEach(function(block) {
      slideClone = block.cloneNode(true);
      openSliderWrap.append(slideClone); 
    });  
  }
  const activeSlideIndex = Array.from(slides).findIndex(slide => slide === e.target.parentNode);
  const textSlider = openSliderWrap.querySelectorAll(".our-work__text");
  textSlider.forEach(text => {
    text.style.display = 'block';
  });
  const openSlides = openSliderWrap.querySelectorAll("div"); //если нужны только div
  openSlides.forEach((div) => {
    div.className = 'slider-open__slide';
  });
  function goToSlide(slide) {
    openSlides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;      
    });
  }
  goToSlide(activeSlideIndex);
  let currSlide = activeSlideIndex;
  const maxSlidesOpen = openSlides.length - 1;
  function nextSlideOpen() {
    goToSlide(currSlide);
    if (currSlide === maxSlidesOpen) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);    
  }
  
  function prevSlideOpen() {
    if (currSlide === 0) {
      currSlide = maxSlidesOpen;
    } else {
      currSlide--;
    }  
    goToSlide(currSlide);
  }
  btnRightOpen.addEventListener("click", nextSlideOpen);
  btnLeftOpen.addEventListener("click", prevSlideOpen);

  document.addEventListener("keydown", function (event) {
    if (event.key == "Escape" && !openSlider.classList.contains("hiddenSlider")) {
      openSlider.classList.add('hiddenSlider');
      slider.classList.remove('hiddenSlider');
    }
  });
});
openSliderWrap.addEventListener('click', function (e) {
  openSlider.classList.add('hiddenSlider');
  slider.classList.remove('hiddenSlider');
})

  //SLIDER locations
  const swiper1 = new Swiper('.locations__swiper', {
    slidesPerView: 1,
    loop: true, 
    navigation: {
      nextEl: '.locations__swiper-button-prev',
      prevEl: '.locations__swiper-button-next',
    },
    breakpoints: {

      600: {
          slidesPerView: 2,
          spaceBetween: 15
      },

      1100: {
          slidesPerView: 3,
          spaceBetween: 27
      }
  }
  });
  const locationsSlides = document.querySelectorAll('.locations__swiper-slide');
  // Переменная для хранения исходного количества видимых слайдов
  let originalSlidesPerView = swiper1.params.slidesPerView; 
  locationsSlides.forEach((value, index) => {
    value.addEventListener('click', () => {
      const currentIndex = index
      // Определяем текущее количество видимых слайдов
      const currentSlidesPerView = swiper1.params.slidesPerView;
      
      const locationSwiper = document.querySelector('.locations__swiper');
      const locationButton = document.querySelector('.locations__button');
      
      // Изменяем количество видимых слайдов
      if (currentSlidesPerView > 1) {      
        swiper1.params.slidesPerView = 1; // Устанавливаем 1 видимый слайд
        swiper1.update();
        swiper1.slideTo(index);
        locationSwiper.classList.add('fullscreen');
        locationButton.classList.add('fullscreen-btn');
      }  else if (locationSwiper.classList.contains('fullscreen') && swiper1.params.slidesPerView == 1) {
        swiper1.params.slidesPerView = originalSlidesPerView; 
        swiper1.update();
        locationSwiper.classList.remove('fullscreen');
        locationButton.classList.remove('fullscreen-btn');
      } 
      swiper1.update();
    });
  });
  //SELECT
  const element = document.querySelector('.js-choice')
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    placeholder: true,
  })

  const locationForm = document.querySelector('.locationSelection-form')
  const closeIconlocation = document.querySelector('.locationSelection-form__close-icon')

  function activeLocationForm() {
    body.classList.toggle('body--fixed')
    locationForm.classList.toggle('locationSelection-form--active')
    overlay.classList.toggle('active')
  }
  document.querySelector('.locations__button').addEventListener('click', () => {
    activeLocationForm()
  })
  closeIconlocation.addEventListener("click", function () {
    activeLocationForm()
  }) 
  overlay.addEventListener("click", function () {
    if(!locationForm.classList.contains('locationSelection-form--active')) return
    if(locationForm.classList.contains('locationSelection-form--active')) activeLocationForm()
  })
  document.addEventListener("keydown", function (event) {
    if (event.key == "Escape" && body.classList.contains("body--fixed") && locationForm.classList.contains('locationSelection-form--active') && overlay.classList.contains('active')) {
      activeLocationForm()
    }
  })
  document.querySelector('.locationSelection-form__btn').addEventListener('click', (e) => {
    e.preventDefault()
    activeLocationForm()
  })

  //fotostudio TEXT MORE
  const fotostudioDots = document.querySelector('.fotostudio__dots')
  const fotostudioMore = document.querySelector('.fotostudio__more')
  const fotostudioBtn =  document.querySelector('.fotostudio__btn')
  fotostudioBtn.addEventListener('click', () => {
    fotostudioBtn.classList.toggle('btnActive')
    fotostudioDots.classList.toggle('dotsHide')
    fotostudioMore.classList.toggle('moreTextActive')
    if (fotostudioBtn.textContent === "Подробнее") {
      fotostudioBtn.textContent = "Скрыть"
    } else {
      fotostudioBtn.textContent = "Подробнее"
    }
  })
  //costPhotoSession-popUp
  const costPhotoSessionPopUpForm = document.querySelector('.costPhotoSession-popUp')
  const costPhotoSessionPopUpCloseIcon = document.querySelector('.costPhotoSession-popUp__close-icon')
  const costPhotoSessionPopUp = document.querySelectorAll('.costPhotoSession__addServices-block')
  function activeCostPhotoSessionForm () {
    body.classList.toggle('body--fixed')
    costPhotoSessionPopUpForm.classList.toggle('active')
    overlay.classList.toggle('active')
  }
  for (let value of costPhotoSessionPopUp){
    value.addEventListener('click', () => {
      activeCostPhotoSessionForm ()
    })
  }
  document.addEventListener("keydown", function (event) {
    if (event.key == "Escape" && body.classList.contains("body--fixed") && costPhotoSessionPopUpForm.classList.contains('active') && overlay.classList.contains('active')) {
      activeCostPhotoSessionForm ()
    }
  })
  costPhotoSessionPopUpCloseIcon.addEventListener('click', () => {
    activeCostPhotoSessionForm ()
  })
  overlay.addEventListener("click", function () {
    if(!costPhotoSessionPopUpForm.classList.contains('active')) return
    if(costPhotoSessionPopUpForm.classList.contains('active')) activeCostPhotoSessionForm ()
  })
  document.querySelector('.costPhotoSession-popUp__btn').addEventListener('click', (e) => {
    e.preventDefault()
    activeCostPhotoSessionForm ()
  })
  //photoTrend TEXT MORE
  const photoTrendDots = document.querySelector('.photoTrend__dots')
  const photoTrendMore = document.querySelector('.photoTrend__more')
  const photoTrendBtn =  document.querySelector('.photoTrend__btn')
  photoTrendBtn.addEventListener('click', () => {
    photoTrendBtn.classList.toggle('btnActive')
    photoTrendDots.classList.toggle('dotsHide')
    photoTrendMore.classList.toggle('moreTextActive')
    if (photoTrendBtn.textContent === "Подробнее") {
      photoTrendBtn.textContent = "Скрыть"
    } else {
      photoTrendBtn.textContent = "Подробнее"
    }
  })
  //REVIEWS
  const reviewsBtn =  document.querySelectorAll('.reviews__btn-more')
  for(let value of reviewsBtn) {
    value.addEventListener('click', () => {
      const hiddenText = value.previousElementSibling;
      const block = value.parentNode;
      if (value.textContent === "Показать ещё") {
        value.textContent = "Скрыть"
        hiddenText.style.maxHeight = hiddenText.scrollHeight + "px"; // Устанавливаем max-height в высоту содержимого
      } else {
        value.textContent = "Показать ещё"
        hiddenText.style.maxHeight = '0';
      }
      swiper2.update();
    })
  }
  //REVIEWS SLIDER
  const swiper2 = new Swiper('.reviews__swiper', {
    slidesPerView: 1,
    loop: true,
    speed: 600,
    navigation: {
      nextEl: '.reviews__swiper-button-prev',
      prevEl: '.reviews__swiper-button-next',
    },
    breakpoints: {
      800: {
          slidesPerView: 2,
          spaceBetween: 20,
          centeredSlides: false,
      }, 
      1200: {
          slidesPerView: 3,
          spaceBetween: 20,
          centeredSlides: true,
      }
  }
  });
  //BUTTON добавить отзыв
  const reviewsForm = document.querySelector('.reviews-form')
  const closeIconReviews = document.querySelector('.reviews-form__close-icon')
  const reviewsThanksForm = document.querySelector('.reviews-thanks-form')
  const closeIconThanksReviews = document.querySelector('.reviews-thanks-form__close-icon')
  const btnReviews = document.querySelector('.reviews__btn')
  function activeReviewsForm() {
    body.classList.toggle('body--fixed')
    reviewsForm.classList.toggle('reviews-form--active')
    overlay.classList.toggle('active')
  }
  btnReviews.addEventListener('click', () => {
    activeReviewsForm()
  })
  closeIconReviews.addEventListener("click", function () {
    activeReviewsForm()
  }) 
  overlay.addEventListener("click", function () {
    if(!reviewsForm.classList.contains('reviews-form--active')) return
    if(reviewsForm.classList.contains('reviews-form--active')) activeReviewsForm()
  })
  document.addEventListener("keydown", function (event) {
    if (event.key == "Escape" && body.classList.contains("body--fixed") && reviewsForm.classList.contains('reviews-form--active') && overlay.classList.contains('active')) {
      activeReviewsForm()
    }
  })
  function activeReviewsThanksForm() {
    body.classList.toggle('body--fixed')
    reviewsThanksForm.classList.toggle('active')
    overlay.classList.toggle('active')
  }
  document.querySelector('.reviews-form__btn').addEventListener('click', (e) => {
    e.preventDefault()
    reviewsForm.classList.remove('reviews-form--active')
    reviewsThanksForm.classList.add('active')
    })
  document.addEventListener("keydown", function (event) {
    if (event.key == "Escape" && body.classList.contains("body--fixed") && reviewsThanksForm.classList.contains('active') && overlay.classList.contains('active')) {
      activeReviewsThanksForm()
    }
  })
  closeIconThanksReviews.addEventListener("click", function () {
    activeReviewsThanksForm()
  }) 
  overlay.addEventListener("click", function () {
    if(!reviewsThanksForm.classList.contains('active')) return
    if(reviewsThanksForm.classList.contains('active')) activeReviewsThanksForm()
  })
  document.querySelector('.coordinates__btn').addEventListener('click', (e) => {
    e.preventDefault()
  })
}())