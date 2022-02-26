<template>
  <div class="home ma-2">
    <v-layout row>

      <v-flex xs12 md4>
        <HoursAndLocation />
      </v-flex>

      <v-flex xs12 md8>
        <AboutUs />
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
// @ is an alias to /src
import HoursAndLocation from "@/components/HoursAndLocation.vue";
import AboutUs from "@/components/AboutUs.vue";


export default {
  name: "Home",
  components: {
    HoursAndLocation,
    AboutUs
  }
};
</script>
