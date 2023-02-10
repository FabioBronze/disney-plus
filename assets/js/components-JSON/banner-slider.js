const BannerSlider = (proprieties) => {
  return `<div class="banner-slide-item" data-banner="item" data-id="${proprieties.id}"> 
            <a href="${proprieties.slug}" class="banner-slide-link">
            <img class="banner-slide-img" src="${proprieties.imageCover}" alt="${proprieties.title}"/>
            <img class="banner-slide-title" src="${proprieties.imageTitle}" alt="${proprieties.title}"/>
            </a>
        </div>`;
};

export default BannerSlider;
