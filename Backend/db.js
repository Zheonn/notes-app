// Função para abrir o banco de dados IndexedDB
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("AnotacoesDB", 1);

    // Tratamento de erro ao abrir o banco de dados
    request.onerror = (event) => {
      reject(`Erro ao abrir o banco de dados: ${event.target.error}`);
    };

    // Configuração do banco de dados durante a atualização
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("Anotacoes", { keyPath: "id", autoIncrement: true });
    };

    // Sucesso ao abrir o banco de dados
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
};

// Função para adicionar uma anotação ao banco de dados
const adicionarAnotacao = (anotacao) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(["Anotacoes"], "readwrite");
      const notasStore = transaction.objectStore("Anotacoes");
      const addRequest = notasStore.add(anotacao);

      // Sucesso ao adicionar a anotação
      addRequest.onsuccess = () => {
        resolve("Anotação adicionada com sucesso!");
      };

      // Erro ao adicionar a anotação
      addRequest.onerror = () => {
        reject(`Erro ao adicionar anotação: ${addRequest.error}`);
      };
    } catch (error) {
      reject(`Erro ao abrir o banco de dados: ${error}`);
    }
  });
};

// Função para editar uma anotação no banco de dados
const editarAnotacao = (id, novosDados) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(["Anotacoes"], "readwrite");
      const notasStore = transaction.objectStore("Anotacoes");
      const anotacaoExistente = await notasStore.get(id);

      // Verifica se a anotação existe
      if (!anotacaoExistente) {
        reject(`Anotação com ID ${id} não encontrada.`);
        return;
      }

      // Atualiza os dados da anotação
      const { text, potential, category, reminder } = anotacaoExistente;
      const anotacaoAtualizada = {
        id,
        text: novosDados.text || text,
        potential: novosDados.potential || potential,
        category: novosDados.category || category,
        reminder: novosDados.reminder || reminder,
      };

      // Realiza a operação de atualização
      const putRequest = notasStore.put(anotacaoAtualizada);

      // Sucesso ao editar a anotação
      putRequest.onsuccess = () => {
        resolve("Anotação editada com sucesso!");
      };

      // Erro ao editar a anotação
      putRequest.onerror = () => {
        reject(`Erro ao editar anotação: ${putRequest.error}`);
      };
    } catch (error) {
      reject(`Erro ao abrir o banco de dados: ${error}`);
    }
  });
};

// Função para excluir uma anotação do banco de dados
const excluirAnotacao = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(["Anotacoes"], "readwrite");
      const notasStore = transaction.objectStore("Anotacoes");
      const deleteRequest = notasStore.delete(id);

      // Sucesso ao excluir a anotação
      deleteRequest.onsuccess = () => {
        resolve("Anotação excluída com sucesso!");
      };

      // Erro ao excluir a anotação
      deleteRequest.onerror = () => {
        reject(`Erro ao excluir anotação: ${deleteRequest.error}`);
      };
    } catch (error) {
      reject(`Erro ao abrir o banco de dados: ${error}`);
    }
  });
};

// Função para consultar todas as anotações do banco de dados
const consultarAnotacoes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(["Anotacoes"], "readonly");
      const notasStore = transaction.objectStore("Anotacoes");
      const consulta = notasStore.getAll();

      // Sucesso ao consultar as anotações
      consulta.onsuccess = () => {
        resolve(consulta.result);
      };

      // Erro ao consultar as anotações
      consulta.onerror = () => {
        reject(`Erro ao consultar anotações: ${consulta.error}`);
      };
    } catch (error) {
      reject(`Erro ao abrir o banco de dados: ${error}`);
    }
  });
};

// Função para consultar uma anotação específica por ID
const consultarAnotacaoPorId = (id) => {
  return new Promise(async (resolve, reject) => {
    const db = await openDB();
    const transaction = db.transaction(["Anotacoes"], "readonly");
    const store = transaction.objectStore("Anotacoes");
    const getRequest = store.get(id);

    // Sucesso ao consultar a anotação por ID
    getRequest.onsuccess = (event) => {
      const anotacao = event.target.result;
      resolve(anotacao);
    };

    // Erro ao consultar a anotação por ID
    getRequest.onerror = (event) => {
      reject(new Error("Erro ao consultar a anotação por ID"));
    };
  });
};

// Função para limpar todas as anotações do banco de dados
const limparAnotacoes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(["Anotacoes"], "readwrite");
      const notasStore = transaction.objectStore("Anotacoes");
      const clearRequest = notasStore.clear();

      // Sucesso ao limpar as anotações
      clearRequest.onsuccess = () => {
        resolve("Anotações excluídas com sucesso!");
      };

      // Erro ao limpar as anotações
      clearRequest.onerror = () => {
        reject(`Erro ao limpar anotações: ${clearRequest.error}`);
      };
    } catch (error) {
      reject(`Erro ao abrir o banco de dados: ${error}`);
    }
  });
};

// Exporta as funções do módulo
module.exports = {
  adicionarAnotacao,
  editarAnotacao,
  excluirAnotacao,
  consultarAnotacoes,
  consultarAnotacaoPorId,
  limparAnotacoes
};
