const headerModule = () => {
  const header = document.querySelector("[data-header]"); // Busca o Header no HTML.
  const openNavSubMenu = document.querySelector("[data-open-navsubmenu]"); // Busca o ícone do header
  const navSubmenu = document.querySelector("[data-navsubmenu]"); // Busca o conteúdo do ícone do header
  const openUserMenu = document.querySelector("[data-usermenu]"); // Busca a aba de perfis toda do header.
  const userMenu = document.querySelector("[data-open-usermenu]"); // Busca o perfil mostrado primeiro na página.

  // Vai colocar o touch no menu mobile (aba de perfis).
  const onTouchMobileOpenPefil = (e) => {
    e.preventDefault(); // Previne o comportamento padrão (quando o clicar no link, atualizar a página).
    openUserMenu.classList.toggle("active");
  };

  // Vai colocar o touch no menu mobile (ícone dos 3 pontos).
  const onTouchMobileOpen = (e) => {
    e.preventDefault(); // Previne o comportamento padrão (quando o clicar no link, atualizar a página).
    navSubmenu.classList.toggle("active");
  };

  // Adiciona o efeito visual de scroll para o site.
  function onWindowScroll() {
    if (window.scrollY > 20 /*px*/) {
      header.style.backgroundColor = "#0c0d14";
    } else {
      header.style.backgroundColor = "transparent";
    }
  }

  // Adiciona os eventos de cada função
  function setlisteners() {
    window.addEventListener("scroll", onWindowScroll);
    openNavSubMenu.addEventListener("touchstart", onTouchMobileOpen);
    userMenu.addEventListener("touchstart", onTouchMobileOpenPefil);
  }

  // Inicializa a função que armazena os eventos de cada função.
  function start() {
    setlisteners();
  }

  // Exporta este documento js para o main. (modules)
  return {
    start,
  };
};

export default headerModule;
