import UserProfile from "../components-JSON/user-profile.js";

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

  for (const item of userProfiles) {
    // Em cada div adiciona o seguinte código HTML:
    userProfilesElement.innerHTML = userProfilesElement.innerHTML + UserProfile(item);
  }
};

export default Home;
