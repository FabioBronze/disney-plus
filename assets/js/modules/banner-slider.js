const sliderItems = document.querySelectorAll('[data-banner="item"]'); // Busca cada slide individualmente.
const slider = document.querySelector('[data-banner="slider"]');
const btnPrev = document.querySelector('[data-banner="btn-prev"]');
const btnNext = document.querySelector('[data-banner="btn-next"]');
const btnControls = document.querySelectorAll('[data-banner="btn-control"]');
const imgTitles = document.querySelectorAll('[data-banner="img-title"]');

const state = {
  mouseDownPosition: 0,
  lastTranslatePosition: 0,
  currentSliderPosition: 0,
  MovPosition: 0,
  currentSlideIndex: 0,
};

function translateSlide(position) {
  state.lastTranslatePosition = position;
  slider.style.transform = `translateX(${position}px)`;
}

function activeBtnControl(index) {
  btnControls.forEach(function (item) {
    item.classList.remove("active");
  });
  const btnControl = btnControls[index];
  btnControl.classList.add("active");
}

function activeImageTitle(index) {
  imgTitles.forEach(function (item) {
    item.classList.remove("active");
  });
  const imgTitle = imgTitles[index];
  imgTitle.classList.add("active");
}

function getCenterPosition(index) {
  const slide = sliderItems[index];
  const margin = (window.innerWidth - slide.offsetWidth) / 2;
  const centerPosition = margin - slide.offsetWidth * index;
  return centerPosition;
}

function forwardSlide() {
  if (state.currentSlideIndex < sliderItems.length - 1) {
    setVisibleSlide(state.currentSlideIndex + 1);
  } else {
    setVisibleSlide(state.currentSlideIndex);
  }
}

function backwardSlide() {
  if (state.currentSlideIndex > 0) {
    setVisibleSlide(state.currentSlideIndex - 1);
  } else {
    setVisibleSlide(state.currentSlideIndex);
  }
}

function animateTransition(active) {
  if (active) {
    slider.style.transition = "transform .3s";
  } else {
    slider.style.removeProperty("transition");
  }
}

function setVisibleSlide(index) {
  state.currentSlideIndex = index;
  const position = getCenterPosition(index);
  activeBtnControl(index);
  activeImageTitle(index);
  animateTransition(true);
  translateSlide(position);
}

function preventDefault(e) {
  e.preventDefault();
}

function onControlButtonClick(e, index) {
  setVisibleSlide(index);
}

function onMouseDown(e, index) {
  const slide = e.currentTarget; // Chama o elemento slide. (elemento atual)
  state.mouseDownPosition = e.clientX; // Guarda a posição ao executar a função mouseDown.
  state.currentSliderPosition = e.clientX - state.lastTranslatePosition;
  state.currentSlideIndex = index;
  animateTransition(false);
  slide.addEventListener("mousemove", onMouseMove);
}

function onMouseUp(e) {
  const slide = e.currentTarget; // Chama o elemento slide. (elemento atual)
  const movPosQtd = e.type.includes("touch") ? 50 : 150

  if (state.MovPosition > movPosQtd) {
    // Mover mais do que 150px.
    backwardSlide();
  } else if (state.MovPosition < -movPosQtd) {
    forwardSlide();
  } else {
    setVisibleSlide(state.currentSlideIndex);
  }
  slide.removeEventListener("mousemove", onMouseMove);
}

function onMouseMove(e) {
  state.MovPosition = e.clientX - state.mouseDownPosition;
  translateSlide(e.clientX - state.currentSliderPosition);
}

function onMouseLeave(e) {
  const slide = e.currentTarget; // Chama o elemento slide. (elemento atual)
  slide.removeEventListener("mousemove", onMouseMove);
}

function onTouchStart(e, index) {
  const slide = e.currentTarget; // Chama o elemento slide. (elemento atual)
  slide.addEventListener("touchmove", onTouchMove);
  e.clientX = e.touches[0].clientX;
  onMouseDown(e, index);
}

function onTouchMove(e) {
  e.clientX = e.touches[0].clientX;
  onMouseMove(e);
}

function onTouchEnd(e) {
  const slide = e.currentTarget; // Chama o elemento slide. (elemento atual)
  slide.removeEventListener("touchmove", onTouchMove);
  onMouseUp(e);
}

function onResizeWindow() {
  setVisibleSlide(state.currentSlideIndex);
}

function setListeners() {
  btnNext.addEventListener("click", forwardSlide);
  btnPrev.addEventListener("click", backwardSlide);
  // Para cada item (slide), executa a função.
  sliderItems.forEach(function (
    slide /*Valor Atual do Array*/,
    index /*Índice (número do array atual.)*/
  ) {
    const link = slide.querySelector(".banner-slide-link");
    link.addEventListener("click", preventDefault); // Faz com que a página não de refresh ao clicar.
    slide.addEventListener("dragstart", preventDefault); // Não deixa a imagem ser movida com o mouse.
    slide.addEventListener("mousedown", function (e) {
      onMouseDown(e, index);
    });
    slide.addEventListener("mouseup", onMouseUp);
    slide.addEventListener("mouseleave", onMouseLeave);
    btnControls[index].addEventListener("click", function (e) {
      onControlButtonClick(e, index);
    });
    slide.addEventListener("touchstart", function (e) {
      onTouchStart(e, index);
    });
    slide.addEventListener("touchend", onTouchEnd);
  });
  let resizeTimeout;
  window.addEventListener("resize", function (e) {
    // Ajusta o tamanho das imagens para Mobile.
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      onResizeWindow();
    }, 800);
  });
}

function start() {
  setVisibleSlide(2);
  setListeners();
}

export default {
  start,
};
