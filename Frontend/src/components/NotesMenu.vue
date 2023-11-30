<template>
  <!-- Componente para exibir o menu de notas -->
  <div id="notes-menu">
    <!-- Itera sobre as notas para exibir a prévia de cada uma -->
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
</template>
    
<script>
import db from "../../../Backend/db.js";
import NoteResume from "./NoteResume.vue";

export default {
  name: "NotesMenu",
  components: { NoteResume }, // Importa o componente de prévia de nota
  emits: ["editNote"],
  data() {
    return {
      notes: null, // Inicializa a lista de notas como nula
    };
  },
  methods: {
    // Método para emitir o evento de edição de nota
    editNote(noteId) {
      this.$emit("editNote", noteId);
    },
  },
  // Método assíncrono executado após o componente ser montado
  async mounted() {
    try {
      // Consulta as anotações do banco local e atualiza a lista
      this.notes = await db.consultarAnotacoes();
    } catch (error) {
      // Exibe um erro caso haja problemas ao carregar as anotações
      console.error("Erro ao carregar anotações:", error);
    }
  },
};
</script>
    
<style>
/* Estilos para o menu de notas */
#notes-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(180, 180, 180);
}
</style>
