// Importa a função createApp do Vue
import { createApp } from 'vue';

// Importa o componente principal (App.vue)
import App from './App.vue';

// Importa o roteador Vue Router
import router from './router';

// Importa funcionalidades do Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPaperclip, faTrash } from '@fortawesome/free-solid-svg-icons';

// Importa o plugin VueSweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Adiciona ícones Font Awesome ao registro global
library.add(faPaperclip, faTrash);

// Cria a instância do aplicativo Vue, adiciona o roteador e o plugin VueSweetalert2,
// registra o componente FontAwesomeIcon globalmente e monta o aplicativo no elemento com o id 'app'
createApp(App)
  .use(router)
  .use(VueSweetalert2)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
