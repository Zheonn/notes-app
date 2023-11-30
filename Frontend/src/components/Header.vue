<template>
  <div id="main-header">
    <!-- Título da aplicação -->
    <div class="header-text">Anotações</div>
    <!-- Botões para carregar e persistir dados -->
    <div id="data-buttons">
      <!-- Botão para carregar dados -->
      <CustomButton
        class="header-button"
        text="Carregar Dados"
        type="0"
        :length="buttonWidth"
        :height="buttonHeight"
        @click="carregarDados"
      />
      <!-- Botão para persistir dados -->
      <CustomButton
        class="header-button"
        text="Persistir Dados"
        type="0"
        :length="buttonWidth"
        :height="buttonHeight"
        @click="persistirDados"
      />
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import CustomButton from "@/components/CustomButton.vue";
import db from "../../../Backend/db.js";

export default {
  name: "AppHeader",
  components: { CustomButton },
  data() {
    return {
      buttonHeight: null,
      buttonWidth: null,
    };
  },
  methods: {
    // Função para carregar dados
    carregarDados() {
      // Exibe um modal com um campo para inserir um token
      this.$swal({
        title: "Insira o seu token:",
        html: `
          <input type="text" id="token-input" class="swal2-input" placeholder="Digite seu token">
        `,
        showCancelButton: true,
        confirmButtonText: "Carregar Dados",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const token = document.getElementById("token-input").value;
          this.importData(token);
        },
        allowOutsideClick: () => !this.$swal.isLoading(),
      });
    },
    // Função para persistir dados
    async persistirDados() {
      // Exibe um modal com opções para gerar um novo token ou usar um existente
      try {
        const { isConfirmed, isDenied } = await this.$swal.fire({
          title: "Selecione uma opção",
          confirmButtonText: "Gerar um novo token",
          confirmButtonColor: "#007BFF",
          denyButtonColor: "#007BFF",
          showCloseButton: true,
          showDenyButton: true,
          denyButtonText: "Já possuo um token",
        });

        if (isDenied) {
          // Se o usuário já possui um token, solicita o token existente
          const { value: existingToken } = await this.$swal.fire({
            title: "Informe seu token",
            input: "text",
            inputValidator: (value) => {
              if (!value) {
                return "Você precisa inserir um token!";
              }
            },
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            confirmButtonColor: "#007BFF",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#DC3545",
          });

          // Obtém as anotações do banco local e persiste no MongoDB
          let dbNotes = await db.consultarAnotacoes();
          await axios.post("http://localhost:3000/api/persistir-dados", {
            token: existingToken,
            notes: dbNotes,
          });

          // Exibe uma mensagem de sucesso
          this.$swal({
            title: "Dados Persistidos com Sucesso",
            text: `Os dados foram persistidos no MongoDB com o token: ${existingToken}`,
            icon: "success",
          });
        } else if (isConfirmed) {
          // Gera um novo token
          const newToken = this.gerarToken();

          // Obtém as anotações do banco local e persiste no MongoDB
          let dbNotes = await db.consultarAnotacoes();
          await axios.post("http://localhost:3000/api/persistir-dados", {
            token: newToken,
            notes: dbNotes,
          });

          // Exibe uma mensagem de sucesso
          this.$swal({
            title: "Dados Persistidos com Sucesso",
            text: `Os dados foram persistidos no MongoDB com o token: ${newToken}`,
            icon: "success",
          });
        } else {
          return;
        }
      } catch (error) {
        // Exibe uma mensagem de erro em caso de falha
        console.error("Erro ao persistir dados:", error);
        this.$swal({
          title: "Erro",
          text: "Ocorreu um erro ao persistir os dados.",
          icon: "error",
        });
      }
    },

    // Função para gerar um token
    gerarToken() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    
    // Função para importar dados usando um token
    async importData(token) {
      // Obtém as anotações associadas ao token do MongoDB
      let notes = await axios(
        `http://localhost:3000/api/recuperar-dados/${token}`
      ).then((res) => res.data);

      // Se houver anotações, limpa o banco local e as adiciona
      if (notes.length > 0) {
        db.limparAnotacoes();

        const promises = notes.map(async (note) => {
          const currentNote = {
            text: note.text,
            potential: note.potential,
            category: note.category,
            reminder: note.reminder,
          };

          await db.adicionarAnotacao(currentNote);
        });

        await Promise.all(promises);

        // Exibe uma mensagem de sucesso e recarrega a página
        this.$swal
          .fire({
            icon: "success",
            title: "Dados carregados com sucesso!",
            showConfirmButton: false,
            timer: 1500,
          })
          .then(() => {
            window.location.reload();
          });
      } else {
        // Exibe uma mensagem de erro em caso de falha
        console.error("Erro ao importar dados");

        this.$swal.fire({
          icon: "error",
          title: "Falha ao carregar dados",
          text: "Ocorreu um erro ao carregar os dados.",
        });
      }
    },
  },
};
</script>
  
<style>
/* Estilos para o cabeçalho principal */
#main-header {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(211, 211, 211);
}

/* Estilos para o texto do cabeçalho */
.header-text {
  margin-left: 20px;
}

/* Estilos para os botões de ação */
#data-buttons {
  width: 25%;
  height: 100%;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Estilos para os botões de ação no cabeçalho */
.header-button {
  width: 40%;
  height: 50%;
}

/* Estilos para dispositivos com largura e altura máximas específicas */
@media screen and (max-width: 430px) and (max-height: 932px) {
  .header-button {
    width: 100px;
    height: 50px;
    margin-left: 10px;
  }

  #data-buttons {
    width: 50%;
  }

  #token-input {
    padding: 5px;
  }
}
</style>
