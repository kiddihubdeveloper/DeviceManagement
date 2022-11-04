import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import VueCompositionApi from '@vue/composition-api'

import '@/assets/styles/main.scss';

Vue.use(VueCompositionApi)

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
