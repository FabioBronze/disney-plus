/* import header from "./modules/header.js"; // Importação do ficheiro header.js
import bannerSlider from "./modules/banner-slider.js"; // Importação do ficheiro bannerSlider.js
import collections from "./modules/collections.js"; // Importação do ficheiro collections.js
header.start();
bannerSlider.start();
collections.start();
*/

import { getHomeContent } from "./services/getHomeContent.js";
import Home from "./pages/home.js";

getHomeContent()
  .then((data) => {
    Home(data)
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
