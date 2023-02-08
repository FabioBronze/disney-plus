const carouselList = document.querySelector('[data-carousel="list"]');
const carouselItems = document.querySelectorAll('[data-carousel="item"]');
const btnPrev = document.querySelector('[data-carousel="btn-prev"]');
const btnNext = document.querySelector('[data-carousel="btn-next"]');

const state = {
  mouseDownPosition: 0,
  movement: 0,
  lastTranslatePosition: 0,
  currentSlidePosition: 0,
  currentIndexItem: 0,
  currentSlideIndex: 0,
};

const preventDefault = (e) => {
  e.preventDefault();
};

const translateSlide = (position) => {
  // Função que permite o slide mover-se.
  state.lastTranslatePosition = position;
  carouselList.style.transform = `translateX(${position}px)`; // Permite o slide mover-se em px.
};

const getCenterPosition = (slideIndex) => {
  const item = carouselItems[state.currentIndexItem]; // Guarda a posição do Slide.
  const itemWidth = item.offsetWidth; // Largura do item (slide individual).
  const bodyWidth = document.body.clientWidth; // Largura do Body.
  const slideWidth = itemWidth * 5; // Tamanho total dos 5 slides.
  const margin = (bodyWidth - slideWidth) / 2;
  return margin - slideWidth * slideIndex;
};

const animateTransition = (active) => {
  if (active) {
    carouselList.style.transition = "transform .3s";
  } else {
    carouselList.style.removeProperty("transition");
  }
};

const setVisibleSlide = (slideIndex) => {
  state.currentSlideIndex = slideIndex;
  const centerPosition = getCenterPosition(slideIndex);
  animateTransition(true);
  translateSlide(centerPosition);
};

const backwardSlide = () => {
  if (state.currentSlideIndex > 0) {
    setVisibleSlide(state.currentSlideIndex - 1);
  } else {
    setVisibleSlide(state.currentSlideIndex);
  }
};

const forwardSlide = () => {
  const lastItemIndex = carouselItems.length - 1;
  const lastSlideIndex = Math.floor(lastItemIndex / 5);
  if (state.currentSlideIndex < lastSlideIndex) {
    setVisibleSlide(state.currentSlideIndex + 1);
  } else {
    setVisibleSlide(state.currentSlideIndex);
  }
};

const onMouseDown = (e, index) => {
  const item = e.currentTarget; // Guarda o elemento atual.
  item.addEventListener("mousemove", onMouseMove);
  state.currentSlidePosition = e.clientX - state.lastTranslatePosition; // Guarda a posição clicada - a última posição clicada.
  state.mouseDownPosition = e.clientX; // Guarda a POSIÇÃO DELE na horizontal (X) (Posição Inícial). Ao Clicar.
  state.currentIndexItem = index; // Guarda a posição do Slide (0, 1, 2...).
  animateTransition(false);
};

const onMouseMove = (e) => {
  const position = e.clientX - state.currentSlidePosition; // Guarda a última posição clicada.
  state.movement = e.clientX - state.mouseDownPosition; // POSIÇÃO a que se está movimentando o mouse. Ao Movimentar.
  translateSlide(position);
};

const onMouseUp = (e) => {
  if (state.movement > 150) {
    backwardSlide();
  } else if (state.movement < -150) {
    forwardSlide();
  } else {
    setVisibleSlide(state.currentSlideIndex);
  }
  const item = e.currentTarget; // Guarda o elemento atual.
  item.removeEventListener("mousemove", onMouseMove);
};

const onMouseLeave = (e) => {
  const item = e.currentTarget; // Guarda o elemento atual.
  item.removeEventListener("mousemove", onMouseMove);
};

const setListeners = () => {
  btnNext.addEventListener("click", forwardSlide);
  btnPrev.addEventListener("click", backwardSlide);
  carouselItems.forEach((item, index) => {
    const link = item.querySelector(".movie-carousel-link");
    link.addEventListener("click", preventDefault); // Previne que a página dê refresh ao clicar no filme.
    item.addEventListener("dragstart", preventDefault); // Previne que a imagem seja movida.
    item.addEventListener("mousedown", (e) => {
      onMouseDown(e, index);
    });
    item.addEventListener("mouseup", onMouseUp);
    item.addEventListener("mouseleave", onMouseLeave);
  });
};

const start = () => {
  setListeners();
  setVisibleSlide(0);
};

export default {
  start,
};
