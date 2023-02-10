const MovieCarousel = (proprieties) => {
  return ` <li class="movie-carousel-item" data-carousel="item" data-id="${proprieties.id}">
            <a class="movie-carousel-link" href="${proprieties.slug}">
            <img class="movie-carousel-cover" src="${proprieties.imageCover}" alt="${proprieties.title}"/>
        </a>
    </li>`;
};

export default MovieCarousel; // Exportação do ficheiro
