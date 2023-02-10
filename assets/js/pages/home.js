import UserProfile from "../components-JSON/user-profile.js";
import BannerSlide from "../components-JSON/banner-slider.js";
import ControlSlider from "../components-JSON/control-slider.js";
import Collection from "../components-JSON/collections.js";
import MovieCarouselItem from "../components-JSON/movie-carousel.js";
import bannerSliderModule from "../modules/banner-slider.js";
import collectionModule from "../modules/collections.js";
import headerModule from "../modules/header.js";

const Home = (data) => {
  const userProfilesElement = document.querySelector(
    '[data-usermenu="user-profiles"]'
  );
  const controlsSliderElement = document.querySelector(
    '[data-banner="controls"]'
  );
  const bannerSlideElement = document.querySelector('[data-banner="slider"]');
  const collectionsElement = document.querySelector(
    '[data-carousel="collections"]'
  );
  const { banners, categories, movies, userProfiles } = data;

  for (const profile of userProfiles) {
    // Em cada div adiciona o seguinte código HTML:
    userProfilesElement.innerHTML += UserProfile(profile);
  }

  for (const banner of banners) {
    bannerSlideElement.innerHTML += BannerSlide(banner);
    controlsSliderElement.innerHTML += ControlSlider();
  }

  for (const category of categories) {
    collectionsElement.innerHTML += Collection(category);
    const collectionElement = document.querySelector(
      `[data-id="${category.id}"]`
    );
    const movieCarouselList = collectionElement.querySelector(
      '[data-carousel="list"]'
    );
    const collectionMovies = movies.filter((movie) =>
      movie.categories.includes(category.id)
    );
    for (const movie of collectionMovies) {
      movieCarouselList.innerHTML += MovieCarouselItem(movie);
    }
  }
  headerModule().start();
  bannerSliderModule().start();
  collectionModule().start();
};

export default Home;
