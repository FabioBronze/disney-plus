const Collections = (proprieties) => {
  return `<div class="collection" data-carousel="collection" data-id="${proprieties.id}">
        <h3 class="collection-title">${proprieties.title}</h3>
        <div class="movie-carousel">
        <button class="arrow-slider arrow-prev" data-carousel="btn-prev"></button>
        <button class="arrow-slider arrow-next" data-carousel="btn-next"></button>
        <ul class="movie-carousel-list" data-carousel="list"></ul>
        </div>
        </div>`;
};

export default Collections;
