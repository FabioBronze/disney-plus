const header = document.querySelector("[data-header]"); // Busca o Header no HTML.

const start = () => {
  setlistener();
};

const setlistener = () => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20 /*px*/) {
        header.style.backgroundColor = "#0c0d14"
    } else {
        header.style.backgroundColor = "transparent"
    }
  });
};

// Exporta este documento js para o main.
export default {
  start,
};
