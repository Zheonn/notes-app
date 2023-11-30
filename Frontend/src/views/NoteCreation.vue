<template>
  <!-- Componente para criar ou editar uma anotação -->
  <div id="new-note">
    <!-- Campos de entrada para a anotação -->
    <label class="first-label" for="note-text">Descrição</label>
    <textarea id="note-text" name="note-text" v-model="noteText" />
    <label for="potential">Potencial do negócio (R$)</label>
    <input id="potential" name="potential" type="number" v-model="potential" />
    <label for="category">Categoria</label>
    <select id="category" name="category" v-model="category">
      <option value="work">Trabalho</option>
      <option value="leisure">Lazer</option>
      <option value="bills">Contas</option>
      <option value="shopping">Compras</option>
    </select>
    <label for="reminder">Lembrete</label>
    <input id="reminder" name="reminder" type="date" v-model="reminder" />
    <!-- Botões para salvar ou cancelar a anotação -->
    <div id="new-note-buttons">
      <CustomButton
        class="new-note-button"
        text="Cancelar"
        type="1"
        @click="cancelNote"
      />
      <CustomButton
        class="new-note-button"
        text="Salvar"
        type="0"
        @click="salvarAnotacao"
      />
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue"; // Importa o componente de botão personalizado
import db from "../../../Backend/db.js"; // Importa o módulo de banco de dados local

export default {
  name: "NoteCreation", 
  components: { CustomButton }, 
  data() {
    return {
      note: null, // Objeto de anotação
      noteText: null, // Texto da anotação
      potential: null, // Potencial do negócio
      category: null, // Categoria da anotação
      reminder: null, // Data de lembrete
    };
  },
  methods: {
    // Método assíncrono para salvar uma nova anotação ou editar uma existente
    async salvarAnotacao() {
      let anotacao = {
        text: this.noteText,
        potential: this.potential,
        category: this.category,
        reminder: this.reminder,
      };

      // Se houver um ID na rota, trata-se de uma edição
      if (this.$route.params.id) {
        try {
          await db.editarAnotacao(parseInt(this.$route.params.id), anotacao);
          console.log("Anotação editada com sucesso!");
          this.$router.push("/");
        } catch (error) {
          console.error("Erro ao editar anotação:", error);
          this.$router.push("/");
        }
      } else {
        // Caso contrário, é uma nova anotação
        try {
          await db.adicionarAnotacao(anotacao);
          console.log("Anotação salva com sucesso!");
        } catch (error) {
          console.error("Erro ao salvar anotação:", error);
        }

        // Após salvar, redireciona de volta para a página inicial
        this.$router.push("/");
      }
    },
    // Método para cancelar a criação ou edição e voltar para a página inicial
    cancelNote() {
      this.$router.push("/");
    },
  },
  // Método assíncrono executado após o componente ser montado
  async mounted() {
    // Se houver um ID na rota, significa que estamos editando uma anotação existente
    if (this.$route.params.id) {
      let noteId = parseInt(this.$route.params.id);

      try {
        // Consulta a anotação pelo ID e preenche os campos com seus valores
        const fetchedNote = await db.consultarAnotacaoPorId(noteId);
        if (fetchedNote) {
          this.note = fetchedNote;
          this.noteText = this.note.text;
          this.potential = this.note.potential;
          this.category = this.note.category;
          this.reminder = this.note.reminder;
        } else {
          console.error("Nenhuma anotação encontrada para o ID fornecido.");
        }
      } catch (error) {
        console.error("Erro ao carregar anotação:", error);
      }
    }
  },
};
</script>

<style>
/* Estilos para o formulário de criação/edição de anotações */
#new-note {
  width: 90%;
  justify-self: center;
  display: flex;
  flex-direction: column;
}

/* Estilos específicos para cada campo de entrada */
#note-text, #potential, #category, #reminder {
  height: 50px;
  border: none;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 50px;
}

#note-text {
  height: 200px;
}

/* Estilos para os botões de salvar e cancelar */
#new-note-buttons {
  height: 5%;
  display: flex;
  justify-content: center;
}

#new-note .new-note-button {
  height: 100%;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 0;
}

/* Ajustes para o primeiro rótulo (label) */
#new-note .first-label {
  margin-top: 20px;
}

/* Estilos específicos para telas pequenas */
@media screen and (max-width: 430px) and (max-height: 932px) {
  #new-note {
    justify-content: center;
  }

  #new-note-buttons {
    height: 5%;
  }

  .new-note-button {
    width: 100%;
    height: 100%;
  }
}
</style>
