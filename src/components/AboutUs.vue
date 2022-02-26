<template>
  <div class="ma-2">
    <v-card class="pa-10" flat color="#f1f1f1">

      <v-img :src="background" height="200"> </v-img>

      <v-card-title class="headline font-weight-medium justify-center px-2">
        Welcome to Lincoln's Waffle Shop!
      </v-card-title>

      Since 1990, we have been a family-run business committed to serving affordable, quality food to friendly faces in the Washington, DC community as well as to visitors from all over the world.   We take pride in our customers entering with their stomachs growling and leave full with a big smile on their face ready to take on the day!
      <br />
      <br />
      No matter what time of day, grab a seat at the counter and tell us your story. We would love to hear from you!

    </v-card>
  </div>
</template>

<script>
const image2 = require('../assets/images/Image-1.jpeg');

export default {
  data () {
    return {
      description: 'Since 1990, we have been a family-run business committed to serving affordable, quality food to friendly faces in the Washington, DC community as well as to visitors from all over the world.   We take pride in our customers entering with their stomachs growling and leave full with a big smile on their face ready to take on the day! No matter what time of day, grab a seat at the counter and tell us your story. We would love to hear from you!',
      background: image2
    }
  }
}
</script>
