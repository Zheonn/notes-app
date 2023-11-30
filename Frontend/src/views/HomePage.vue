<template>
  <!-- Componente principal da página inicial -->
  <div id="home-main">
    <!-- Menu de notas à esquerda -->
    <div id="home-menu">
      <NotesMenu @editNote="editNote" />
    </div>
    <!-- Lista de prévias de notas -->
    <div id="notes-list">
      <NoteResume
        v-for="note in notes"
        :key="note.id"
        :id="note.id"
        :text="note.text"
        :potential="note.potential"
        :category="note.category"
        :reminder="note.reminder"
        @editNote="editNote"
      />
    </div>
    <!-- Conteúdo principal no centro -->
    <div id="content">
      <font-awesome-icon icon="fa-solid fa-paperclip" class="primary-icon" />
      <div class="primary-text">Anotações</div>
      <div class="secondary-text">by Leonnardo Trindade</div>
      <!-- Botão para criar nova anotação -->
      <button class="new-note-button" @click="newNote">+ Criar Anotação</button>
    </div>
  </div>
</template>

<script>
import db from "../../../Backend/db.js";
import NotesMenu from "../components/NotesMenu.vue";
import NoteResume from "../components/NoteResume.vue";

export default {
  components: { NotesMenu, NoteResume },
  name: "HomePage",
  data() {
    return {
      notes: null, // Inicializa a lista de notas como nula
    };
  },
  methods: {
    // Método para navegar para a página de criação de nova nota
    newNote() {
      this.$router.push("/new-note");
    },
    // Método para navegar para a página de edição de nota
    editNote(noteId) {
      this.$router.push(`/edit-note/${noteId}`);
    },
  },
  // Método assíncrono executado após o componente ser montado
  async mounted() {
    // Consulta as anotações do banco local e atualiza a lista
    this.notes = await db.consultarAnotacoes();

    // Obtém a largura e altura da tela
    const larguraDaTela =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const alturaDaTela =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    // Condição para ajustar o layout se houver notas e a tela for grande o suficiente
    if (this.notes.length > 0 && larguraDaTela >= 430 && alturaDaTela >= 932) {
      // Oculta elementos do conteúdo principal
      document.getElementsByClassName("primary-text")[0].style.display = 'none';
      document.getElementsByClassName("secondary-text")[0].style.display = 'none';
      document.getElementsByClassName("primary-icon")[0].style.display = 'none';
      // Ajusta o layout do grid
      document.getElementById("home-main").style.gridTemplateRows = '90% 10%';
      // Exibe a lista de notas
      document.getElementById("notes-list").style.display = 'flex';
      // Ajusta o estilo do botão de nova nota
      document.querySelector('#home-main .new-note-button').style.height = '70%';
      document.querySelector('#home-main .new-note-button').style.width = '70%';
      document.querySelector('#home-main .new-note-button').style.marginTop = '0';
    }
  }
};
</script>

<style>
/* Estilos para o layout e componentes da página inicial */
#home-main {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 20% 80%;
}

#home-main #content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#notes-list {
  display: none; 
}

.new-note-button {
  margin-top: 50px;
  border: none;
  border-radius: 20px;
  height: 5%;
  width: 10%;
  font-size: 16px;
  color: white;
  background-color: rgb(18, 149, 253);
}

.new-note-button:hover {
  background-color: rgb(16, 127, 218);
}

#home-menu {
  overflow: auto; 
}

@media screen and (max-width: 430px) and (max-height: 932px) {
  /* Estilos específicos para telas pequenas */
  #home-main {
    width: 100vw;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    justify-content: center;
  }

  #home-menu {
    display: none; /* Oculta o menu de notas em telas pequenas */
  }

  #notes-list {
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    overflow: scroll; 
  }

  #home-main .new-note-button {
    height: 8%;
    width: 50%;
  }
}
</style>
