import Vue from 'vue';
import Router from 'vue-router';
import Spotify from '@/views/Spotify.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'spotify',
      component: Spotify
    }
  ]
});

export default router;
