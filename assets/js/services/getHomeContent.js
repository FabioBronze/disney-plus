// Com este export, podemos exportar mais do que uma função, diferente do export default que apenas dá para exportar uma.
export const getHomeContent = () => {
  // Método utilizado - GET (Padrão)
  /* Outras Alternativas de métodos - 
        GET: Recupera os dados. (Padrão)
        POST: Adiciona um novo dado no link onde estou a fazer a requisição.
        PUT: Atualiza um usuário especifico. (editar usuários)
        PATCH: Atualiza um usuário especifíco. (editar usuários)
        DELETE: Apaga os dados do usuário.
    */
  return new Promise((resolve, reject) => {
    fetch("/content/data.json")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};
