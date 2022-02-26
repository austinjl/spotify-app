import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import vuetify from './vuetify';
import 'vuetify/dist/vuetify.min.css';

import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/phone-alt'
import 'vue-awesome/icons/directions'
import 'vue-awesome/icons/brands/facebook-square'
import 'vue-awesome/icons/brands/yelp'
import 'vue-awesome/icons/sync-alt'


import Icon from 'vue-awesome/components/Icon';

Vue.component('v-icon', Icon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
