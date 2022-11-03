import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import vi from 'vuetify/es5/locale/vi';

Vue.use(Vuetify);

const opts = {
  lang: {
    locales: { vi },
    current: 'vi',
  },
  icons: {
    iconFont: 'md'
  }
}

export default new Vuetify(opts);
