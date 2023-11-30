<template>
  <!-- Componente para exibir uma prévia de uma nota -->
  <div class="note-resume">
    <font-awesome-icon class="font-awesome-icon fa-paperclip" icon="fa-solid fa-paperclip" @click="$emit('editNote', id)"/>
    <div class="resume-content" @click="$emit('editNote', id)">
      <!-- Texto da nota -->
      <span class="note-text">{{ text }}</span>
      <!-- Lembrete da nota -->
      <span class="note-reminder">{{ reminder }}</span>
    </div>
    <!-- Ícone para excluir a nota -->
    <font-awesome-icon class="font-awesome-icon fa-trash" icon="fa-solid fa-trash" @click="confirmDeleteNote"/>
  </div>
</template>

<script>
import db from "../../../Backend/db.js";
import Swal from "sweetalert2";

export default {
  name: "NoteResume",
  emits: ["editNote"],
  props: {
    id: Number,         // ID da nota
    text: String,       // Texto da nota
    potential: Number,  // Potencial da nota
    category: String,   // Categoria da nota
    reminder: String,   // Lembrete da nota
  },
  methods: {
    // Método para excluir uma nota
    async deleteNote() {
      try {
        await db.excluirAnotacao(this.id);
        this.$emit("noteDeleted"); // Emitir evento para informar ao pai que a nota foi excluída
      } catch (error) {
        console.error("Erro ao excluir anotação:", error);
      }
    },
    // Método para exibir um modal de confirmação antes de excluir a nota
    confirmDeleteNote() {
      Swal.fire({
        title: "Confirmar exclusão",
        text: "Tem certeza de que deseja excluir esta nota?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteNote(); // Excluir a nota se o usuário confirmar
          window.location.reload(); // Recarregar a página para refletir a exclusão
        }
      });
    },
  },
};
</script>
  
<style>
/* Estilos para o componente de prévia de nota */
.note-resume {
  display: flex;
  height: 6%;
  width: 90%;
  padding: 5px;
  margin-top: 10px;
  border: none;
  border-radius: 20px;
  background-color: white;
}

/* Estilos quando o mouse passa sobre o componente */
.note-resume:hover {
  background-color: rgb(18, 149, 253);
  color: white;
  transition: 0.2s;
  cursor: pointer;
}

/* Estilos para o conteúdo resumido da nota */
.resume-content {
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 5px;
}

/* Estilos para o texto da nota e lembrete */
.resume-content span {
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis; 
}

/* Estilos para os ícones dentro da prévia de nota */
.note-resume .font-awesome-icon {
  align-self: center;
  width: 10%;
}

/* Estilos específicos para o ícone de exclusão */
.fa-trash {
  color: rgb(252, 96, 96);
}

/* Estilos para dispositivos com largura e altura máximas específicas */
@media screen and (max-width: 430px) and (max-height: 932px) {
  .note-resume {
    height: 6%;
  }
}
</style>
