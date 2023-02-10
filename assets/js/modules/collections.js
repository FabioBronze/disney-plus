const collectionModule = () => {
  const collections = document.querySelectorAll('[data-carousel="collection"]');
  const collectionData = [];
  let currentCollectionIndex = 0;
  let itemsPerSlide = 5;

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const translateSlide = (position) => {
    // Função que permite o slide mover-se.
    const { state, carouselList } = collectionData[currentCollectionIndex];
    state.lastTranslatePosition = position;
    carouselList.style.transform = `translateX(${position}px)`; // Permite o slide mover-se em px.
  };

  const getCenterPosition = (slideIndex) => {
    const { state, carouselItems } = collectionData[currentCollectionIndex];
    const item = carouselItems[state.currentIndexItem]; // Guarda a posição do Slide.
    const itemWidth = item.offsetWidth; // Largura do item (slide individual).
    const bodyWidth = document.body.clientWidth; // Largura do Body.
    const slideWidth = itemWidth * itemsPerSlide; // Tamanho total dos 5 slides.
    const margin = (bodyWidth - slideWidth) / 2;
    return margin - slideWidth * slideIndex;
  };

  const getLastSlideIndex = () => {
    const { carouselItems } = collectionData[currentCollectionIndex];
    const lastItemIndex = carouselItems.length - 1;
    return Math.floor(lastItemIndex / itemsPerSlide);
  };

  const animateTransition = (active) => {
    const { carouselList } = collectionData[currentCollectionIndex];
    if (active) {
      carouselList.style.transition = "transform .3s";
    } else {
      carouselList.style.removeProperty("transition");
    }
  };

  const setArrouButtonsDisplay = () => {
    const { btnPrev, btnNext, state } = collectionData[currentCollectionIndex];
    btnPrev.style.display = state.currentSlideIndex === 0 ? "none" : "block"; // Se for true, se for false.
    btnNext.style.display =
      state.currentSlideIndex === getLastSlideIndex() ? "none" : "block"; // Se for true, se for false.
  };

  const setVisibleSlide = (slideIndex) => {
    const { state } = collectionData[currentCollectionIndex];
    state.currentSlideIndex = slideIndex;
    const centerPosition = getCenterPosition(slideIndex);
    setArrouButtonsDisplay();
    animateTransition(true);
    translateSlide(centerPosition);
  };

  const backwardSlide = () => {
    const { state } = collectionData[currentCollectionIndex];
    if (state.currentSlideIndex > 0) {
      setVisibleSlide(state.currentSlideIndex - 1);
    } else {
      setVisibleSlide(state.currentSlideIndex);
    }
  };

  const forwardSlide = () => {
    const { state } = collectionData[currentCollectionIndex];
    const lastSlideIndex = getLastSlideIndex();
    if (state.currentSlideIndex < lastSlideIndex) {
      setVisibleSlide(state.currentSlideIndex + 1);
    } else {
      setVisibleSlide(state.currentSlideIndex);
    }
  };

  const onMouseDown = (e, itemIndex) => {
    const { state } = collectionData[currentCollectionIndex];
    const item = e.currentTarget; // Guarda o elemento atual.
    item.addEventListener("mousemove", onMouseMove);
    state.currentSlidePosition = e.clientX - state.lastTranslatePosition; // Guarda a posição clicada - a última posição clicada.
    state.mouseDownPosition = e.clientX; // Guarda a POSIÇÃO DELE na horizontal (X) (Posição Inícial). Ao Clicar.
    state.currentIndexItem = itemIndex; // Guarda a posição do Slide (0, 1, 2...).
    animateTransition(false);
  };

  const onMouseMove = (e) => {
    const { state } = collectionData[currentCollectionIndex];
    const position = e.clientX - state.currentSlidePosition; // Guarda a última posição clicada.
    state.movement = e.clientX - state.mouseDownPosition; // POSIÇÃO a que se está movimentando o mouse. Ao Movimentar.
    translateSlide(position);
  };

  const onMouseUp = (e) => {
    const { state } = collectionData[currentCollectionIndex];
    if (state.movement > 150) {
      backwardSlide();
    } else if (state.movement < -150) {
      forwardSlide();
    } else {
      setVisibleSlide(state.currentSlideIndex);
    }
    state.movement = 0;
    const item = e.currentTarget; // Guarda o elemento atual.
    item.removeEventListener("mousemove", onMouseMove);
  };

  const onMouseLeave = (e) => {
    const item = e.currentTarget; // Guarda o elemento atual.
    item.removeEventListener("mousemove", onMouseMove);
  };

  const onTouchStart = (e, itemIndex) => {
    const item = e.currentTarget; // Chama o elemento slide. (elemento atual)
    item.addEventListener("touchmove", onTouchMove);
    e.clientX = e.touches[0].clientX;
    onMouseDown(e, itemIndex);
  };

  const onTouchMove = (e) => {
    e.clientX = e.touches[0].clientX;
    onMouseMove(e);
  };

  const onTouchEnd = (e) => {
    const item = e.currentTarget; // Chama o elemento slide. (elemento atual)
    item.removeEventListener("touchmove", onTouchMove);
    onMouseUp(e);
  };

  const insertCollectionData = (collection) => {
    collectionData.push({
      carouselList: collection.querySelector('[data-carousel="list"]'),
      carouselItems: collection.querySelectorAll('[data-carousel="item"]'),
      btnPrev: collection.querySelector('[data-carousel="btn-prev"]'),
      btnNext: collection.querySelector('[data-carousel="btn-next"]'),

      state: {
        mouseDownPosition: 0,
        movement: 0,
        lastTranslatePosition: 0,
        currentSlidePosition: 0,
        currentIndexItem: 0,
        currentSlideIndex: 0,
      },
    });
  };

  const setItemsPerSlide = () => {
    if (document.body.clientWidth < 1024) {
      itemsPerSlide = 2;
      return;
    }
    itemsPerSlide = 5;
  };

  const setWindowResizeListener = () => {
    let resizeTimeout;
    window.addEventListener("resize", function (e) {
      // Ajusta o tamanho das imagens para Mobile.
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        setItemsPerSlide();
        collections.forEach((_, collectionIndex) => {
          currentCollectionIndex = collectionIndex;
          setVisibleSlide(0);
        });
      }, 800);
    });
  };

  const setListeners = (collectionIndex) => {
    const { btnNext, btnPrev, carouselItems } = collectionData[collectionIndex];

    btnNext.addEventListener("click", () => {
      currentCollectionIndex = collectionIndex;
      forwardSlide();
    });
    btnPrev.addEventListener("click", () => {
      currentCollectionIndex = collectionIndex;
      backwardSlide();
    });

    carouselItems.forEach((item, itemIndex) => {
      const link = item.querySelector(".movie-carousel-link");
      link.addEventListener("click", preventDefault); // Previne que a página dê refresh ao clicar no filme.
      item.addEventListener("dragstart", preventDefault); // Previne que a imagem seja movida.
      item.addEventListener("mousedown", (e) => {
        currentCollectionIndex = collectionIndex; // ARRAY[0, 1, 2, 3...]
        onMouseDown(e, itemIndex);
      });
      item.addEventListener("mouseup", onMouseUp);
      item.addEventListener("mouseleave", onMouseLeave);
      item.addEventListener("touchstart", function (e) {
        currentCollectionIndex = collectionIndex; // ARRAY[0, 1, 2, 3...]
        onTouchStart(e, itemIndex);
      });
      item.addEventListener("touchend", onTouchEnd);
    });
  };

  const start = () => {
    setItemsPerSlide();
    setWindowResizeListener();
    collections.forEach((collection, collectionIndex) => {
      currentCollectionIndex = collectionIndex;
      insertCollectionData(collection);
      setListeners(collectionIndex);
      setVisibleSlide(0);
    });
  };

  return {
    start,
  };
};

export default collectionModule;
