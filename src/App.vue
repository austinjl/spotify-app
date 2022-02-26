<template>
  <div id="app">
    <div id="myContainer">
      <v-app>
        <navigation />
        <v-content>
          <router-view />
        </v-content>
      </v-app>
    </div>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation.vue';
  export default {
    data: () => ({
    }),
    components: {
      Navigation
    }
  };
  </script>


<style lang="scss">
  @import 'src/assets/styles/styles.scss';

</style>
