const UserProfile = (proprieties) => {
  // Vai simular um Fetch API Externo e vai buscar os nomes do perfil no arquivo JSON.
  return `<li class="user-menu-item" data-id="${proprieties.id}">
        <div class="user-profile">
        <img class="user-profile-avatar" src="${proprieties.avatar}"/>
      <span class="user-profile-title">${proprieties.name}</span>
    </div>
  </li>`;
};

export default UserProfile; // Exportação do ficheiro
