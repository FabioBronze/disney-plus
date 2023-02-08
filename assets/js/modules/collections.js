const carouselList = document.querySelector('[data-carousel="list"]');
const carouselItems = document.querySelectorAll('[data-carousel="item"]');
const btnPrev = document.querySelector('[data-carousel="btn-prev"]');
const btnNext = document.querySelector('[data-carousel="btn-next"]');

const state = {
  mouseDownPosition: 0,
  movement: 0,
};

const preventDefault = (e) => {
  e.preventDefault();
};

const translateSlide = (position) => {
  // Função que permite o slide mover-se.
  carouselList.style.transform = `translateX${position}px`; // Permite o slide mover-se em px.
};

const onMouseDown = (e) => {
  const item = e.currentTarget; // Guarda o elemento atual.
  state.mouseDownPosition = e.clientX; // Guarda a POSIÇÃO DELE na horizontal (X) (Posição Inícial).
  item.addEventListener("mousemove", onMouseMove);
  console.log("MouseDown");
};

const onMouseUp = (e) => {
  const item = e.currentTarget; // Guarda o elemento atual.
  item.removeEventListener("mousemove", onMouseMove);
  console.log("MouseUp");
};

const onMouseMove = (e) => {
  state.movement = e.clientX - state.mouseDownPosition; // POSIÇÃO a que se está movimentando o mouse.
  translateSlide(state.movement);
  console.log("MouseMove");
};

const onMouseLeave = (e) => {
  const item = e.currentTarget; // Guarda o elemento atual.
  item.removeEventListener("mousemove", onMouseMove);
  console.log("MouseLeave");
};

const setListeners = () => {
  carouselItems.forEach((item, index) => {
    // Listas
    const link = item.querySelector(".movie-carousel-link");
    link.addEventListener("click", preventDefault); // Previne que a página dê refresh ao clicar no filme.
    item.addEventListener("dragstart", preventDefault); // Previne que a imagem seja movida.
    item.addEventListener("mousedown", onMouseDown);
    item.addEventListener("mouseup", onMouseUp);
    item.addEventListener("mousemove", onMouseMove);
    item.addEventListener("mouseleave", onMouseLeave);
  });
};

const start = () => {
  setListeners();
};

export default {
  start,
};
