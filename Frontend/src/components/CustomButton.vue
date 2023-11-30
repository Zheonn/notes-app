<template>
  <!-- Componente de botão personalizado -->
  <button :class="buttonClass">{{ text }}</button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    text: String, // Propriedade para o texto do botão
    type: {
      type: String,
      default: '0' // Propriedade para o tipo de botão (0 para azul, 1 para vermelho)
    }
  },
  computed: {
    buttonClass() {
      // Calcula a classe do botão com base no tipo
      return this.type == 0 ? 'blue-button' : 'red-button';
    }
  }
};
</script>

<style scoped>
button {
  border-radius: 20px; /* Estilo padrão para a borda do botão */
}

.blue-button {
  border: none;
  background-color: rgb(18, 149, 253); /* Estilo para botão azul */
  color: white; /* Cor do texto no botão azul */
}

.blue-button:hover {
  background-color: rgb(14, 120, 207); /* Estilo ao passar o mouse sobre o botão azul */
}

.red-button {
  border: none;
  background-color: rgb(249, 115, 95); /* Estilo para botão vermelho */
  color: white; /* Cor do texto no botão vermelho */
}

.red-button:hover {
  background-color: rgb(190, 88, 73); /* Estilo ao passar o mouse sobre o botão vermelho */
}
</style>
